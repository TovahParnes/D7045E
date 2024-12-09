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

const vertexShaderSource =
	"attribute vec2 a_coords;\n" +
	"attribute vec3 a_color;\n" +
	"varying vec3 v_color;\n" +
	"uniform float u_pointsize;\n" +
	"uniform float u_width;\n" +
	"uniform float u_height;\n" +
	"void main() {\n" +
	"   float x = -1.0 + 2.0*(a_coords.x / u_width);\n" +
	"   float y = 1.0 - 2.0*(a_coords.y / u_height);\n" +
	"   gl_Position = vec4(x, y, 0.0, 1.0);\n" +
	"   v_color = a_color;\n" +
	"   gl_PointSize = u_pointsize;\n" +
	"}\n";

const fragmentShaderSource =
	"precision mediump float;\n" +
	"varying vec3 v_color;\n" +
	"uniform vec3 u_color;\n" +
	"uniform bool u_useUniformColor;\n" +
	"void main() {\n" +
	"	vec3 finalColor = u_useUniformColor ? u_color : v_color; \n" +
	"   gl_FragColor = vec4(finalColor, 1.0);\n" +
	"}\n";

function init() {
	canvas = document.getElementById("webglcanvas");
	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw "Browser does not support WebGL";
	}

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);

	const vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = new Shader(
		gl,
		gl.FRAGMENT_SHADER,
		fragmentShaderSource
	);
	const program = new ShaderProgram(
		gl,
		vertexShader.getShader(),
		fragmentShader.getShader()
	);

	let cube = new Cuboid(gl, 0.1, 0.1, 0.1);
}
