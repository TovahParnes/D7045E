let canvas; // The canvas where WebGL draws.
let gl; // The WebGL graphics context.

let uniformWidth;
let uniformHeight;
let uniformColor;

let attributeCoords;
let bufferCoords;

function init() {
	canvas = document.getElementById("webglcanvas");
	gl = canvas.getContext("webgl2");
	if (!gl) {
		throw "Browser does not support WebGL";
	}

	vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	program = new ShaderProgram(
		gl,
		vertexShader.getShader(),
		fragmentShader.getShader()
	);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1, 0, 0, 1); // specify the color to be used for clearing
	gl.clear(gl.COLOR_BUFFER_BIT);

	//Binding buffers here

	document.getElementById("xButton").onclick = function () {
		axis = xAxis;
	};
	document.getElementById("yButton").onclick = function () {
		axis = yAxis;
	};
	document.getElementById("zButton").onclick = function () {
		axis = zAxis;
	};
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
