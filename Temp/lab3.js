// Andreas Form och Marcus Asplund

let canvas;
let gl;
let camera;
let shaderProgram;

let objects = [];

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

	// Making the player
	let width = 0.8;
	let height = 0.5;
	let depth = 0.5;
	let cube = new cuboid(gl, width, height, depth, shaderProgram);

	let playableBoxMatrix = mat4(
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, -3],
		[0, 0, 0, 1]
	);
	playableBox = new GraphicsNode(gl, cube, redMaterial, playableBoxMatrix);

	for (let i = 0; i < 50; i++) {
		let x = Math.random() * 5 - 2.5;
		let y = Math.random() * 5 - 2.5;
		let z = -Math.random() * 10 + 2;
		let mat = move([x, y, z]);
		let randomBox = new GraphicsNode(gl, cube, greenMaterial, mat);
		objects.push(randomBox);
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
	playableBox.draw();
}

window.addEventListener("keydown", function (event) {
	let moveVector = mat4([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
	if (event.key == "w") {
		moveVector[1][3] += 0.03;
	}
	if (event.key == "s") {
		moveVector[1][3] -= 0.03;
	}
	if (event.key == "a") {
		moveVector[0][3] -= 0.03;
	}
	if (event.key == "d") {
		moveVector[0][3] += 0.03;
	}
	if (event.key == "e") {
		moveVector[2][3] += 0.03;
	}
	if (event.key == "c") {
		moveVector[2][3] -= 0.03;
	}

	playableBox.update(moveVector);
	render();
});

window.onload = init;
