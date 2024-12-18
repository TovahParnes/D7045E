// Andreas Form och Marcus Asplund

var gl;
var shaderProgram;
var boxes = [];
var camera;

function init() {
	// Making the canvas
	let canvas = document.getElementById("gl-canvas");
	gl = canvas.getContext("webgl2");
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1.0);
	gl.enable(gl.DEPTH_TEST);

	// Making the shaders
	let vertexShader = new Shader(gl, gl.VERTEX_SHADER, "vertex-shader");
	let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, "fragment-shader");
	shaderProgram = new ShaderProgram(gl, vertexShader, fragmentShader);

	// Making the camera
	camera = new Camera(gl, shaderProgram, canvas);

	// Making the mesh
	let width = 0.8;
	let height = 0.5;
	let depth = 0.5;
	let cube = new cuboid(gl, width, height, depth, shaderProgram);

	let randomBoxesColor = [0, 1, 0, 1]; // Green
	let playableBoxColor = [1, 0, 1, 1]; // Red
	let randomBoxesMaterial = new MonochromeMaterial(
		gl,
		shaderProgram,
		randomBoxesColor
	);
	let playableBoxMaterial = new MonochromeMaterial(
		gl,
		shaderProgram,
		playableBoxColor
	);
	let playableBoxMatrix = mat4(
		[1, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 0, 1, -3],
		[0, 0, 0, 1]
	);
	playableBox = new GraphicsNode(
		gl,
		cube,
		playableBoxMaterial,
		playableBoxMatrix
	);

	for (let i = 0; i < 50; i++) {
		let x = Math.random() * 5 - 2.5;
		let y = Math.random() * 5 - 2.5;
		let z = -Math.random() * 10 + 2;
		let mat = move([x, y, z]);
		let randomBox = new GraphicsNode(gl, cube, randomBoxesMaterial, mat);
		boxes.push(randomBox);
	}
	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	shaderProgram.activate();
	camera.activate();

	for (let box of boxes) {
		box.draw();
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
