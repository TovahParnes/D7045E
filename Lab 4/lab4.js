// Tovah Parnes - tovpar-9@student.ltu.se

let canvas;
let gl;
let camera;
let shaderProgram;

let objects = [];
const numObjects = 30;
const minSize = 0.3;
const maxSize = 1.5;

function init() {
	// Canvas
	let canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw "Browser does not support WebGL";
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	// Shaders
	const vertexShader = new Shader(gl, gl.VERTEX_SHADER, "vertex-shader");
	const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, "fragment-shader");
	shaderProgram = new ShaderProgram(gl, vertexShader, fragmentShader);

	// Camera
	camera = new Camera(gl, shaderProgram, canvas);

	// ColorMaterials
	let greenMaterial = new MonoMaterial(gl, shaderProgram, vec4(0, 1, 0, 1.0));
	let redMaterial = new MonoMaterial(gl, shaderProgram, vec4(1, 0, 0, 1.0));

	// Shapes
	let cube = new cuboid(gl, 0.8, 0.5, 0.5, shaderProgram);
	//let sphere = new Sphere(gl, 0.5, 16, 8, shaderProgram);
	//let star = new Star(gl, 5, 0.3, 0.2, 0.1, shaderProgram);
	//let torus = new Torus(gl, 0.25, 0.5, 15, shaderProgram);
	//let cone = new Cone(gl, 0.5, 1, 10, shaderProgram);
	//let cylinder = new Cylinder(gl, 0.5, 1, 16, shaderProgram);

	let playerMatrix = mat4(
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 0, 0, 1]
	);
	player = new GraphicsNode(gl, cube, redMaterial, playerMatrix);

	// Making the objects
	var max = 2.5;
	var min = -2.5;
	var maxZ = 10;
	var minZ = 2;
	for (let i = 0; i < numObjects; i++) {
		var x = Math.floor(Math.random() * (max - min)) + min;
		var y = Math.floor(Math.random() * (max - min)) + min;
		var z = -Math.floor(Math.random() * (maxZ - minZ)) + minZ;
		let mat = translate(x, y, z);
		//let object = new GraphicsNode(gl, cube, greenMaterial, mat);
		//objects.push(object);
	}

	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	shaderProgram.activate();
	camera.activate();

	for (let object of objects) {
		object.draw();
	}
	player.draw();
}

window.addEventListener("keydown", function (event) {
	let translation = vec3(0, 0, 0);
	if (event.key === "w") {
		translation[1] += 0.1; // Move up
	} else if (event.key === "s") {
		translation[1] -= 0.1; // Move down
	} else if (event.key === "a") {
		translation[0] -= 0.1; // Move left
	} else if (event.key === "d") {
		translation[0] += 0.1; // Move right
	} else if (event.key === "e") {
		translation[2] += 0.1; // Move forward
	} else if (event.key === "c") {
		translation[2] -= 0.1; // Move backward
	}

	const moveMatrix = translate(translation);
	player.update(moveMatrix);
	render();
});

window.onload = init;
