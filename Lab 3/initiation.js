let canvas; // The canvas where WebGL draws.
let gl; // The WebGL graphics context.

function init() {
	canvas = document.getElementById("webglcanvas");
	gl = canvas.getContext("webgl2");

	vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	program = new ShaderProgram(
		gl,
		vertexShader.getShader(),
		fragmentShader.getShader()
	);

	gl.clearColor(1, 0, 0, 1); // specify the color to be used for clearing
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function initGL(gl) {
	vertexShader = new Shader(gl, "vertex", vertexShaderSource);
	fragmentShader = new Shader(gl, "fragment", fragmentShaderSource);
	program = new ShaderProgram(
		gl,
		vertexshader.getShader(),
		fragmentShader.getShader()
	);

	/*
	let prog = createProgram(gl, vertexShaderSource, fragmentShaderSource);
	gl.useProgram(prog);
	attributeCoords = gl.getAttribLocation(prog, "a_coords");
	bufferCoords = gl.createBuffer();
	attributeColor = gl.getAttribLocation(prog, "a_color");
	bufferColor = gl.createBuffer();
	uniformHeight = gl.getUniformLocation(prog, "u_height");
	uniformWidth = gl.getUniformLocation(prog, "u_width");
	gl.uniform1f(uniformHeight, canvas.height);
	gl.uniform1f(uniformWidth, canvas.width);
	uniformPointsize = gl.getUniformLocation(prog, "u_pointsize");
	uniformColor = gl.getUniformLocation(prog, "u_color");
	uniformUseUniformColor = gl.getUniformLocation(prog, "u_useUniformColor");
	createPointData();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferColor);
	gl.bufferData(gl.ARRAY_BUFFER, triangleColors, gl.STREAM_DRAW);
	gl.vertexAttribPointer(attributeColor, 3, gl.FLOAT, false, 0, 0);
	*/
}

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
