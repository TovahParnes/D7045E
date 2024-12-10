"use strict";
let canvas; // The canvas where WebGL draws.
let gl; // The WebGL graphics context.
let camera;
let shaderProgram;

let nodes = [];
let playerNode;
let playerNodeTransform1 = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 5, 0, 0, 0, 1);
//let playerNodeTransform = mat4.create();

const minSize = 0.1;
const maxSize = 0.6;
const numCubes = 10;

function init() {
	canvas = document.getElementById("webglcanvas");
	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw "Browser does not support WebGL";
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1);
	gl.enable(gl.DEPTH_TEST);

	const vertexShader = new Shader(gl, gl.VERTEX_SHADER, "vertex-shader");
	const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, "fragment-shader");
	shaderProgram = new ShaderProgram(
		gl,
		vertexShader.getShader(),
		fragmentShader.getShader()
	);

	let cube = new Cuboid(gl, 0.1, 0.1, 0.1, shaderProgram.getProgram());
	let greenMaterial = new MonoMaterial(
		gl,
		shaderProgram.getProgram(),
		[0, 1, 0, 1]
	);
	playerNode = new GraphicsNode(gl, cube, greenMaterial, playerNodeTransform1);

	render();
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	shaderProgram.activate();
	playerNode.draw();
}
