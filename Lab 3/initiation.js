let canvas; // The canvas where WebGL draws.
let gl; // The WebGL graphics context.

function init() {
	try {
		canvas = document.getElementById("webglcanvas");
		let options = {
			// no need for alpha channel or depth buffer in this program
			alpha: false,
			depth: false,
		};
		gl = canvas.getContext("webgl", options);
		// (Note: this page would work with "webgl2", with no further modification.)
		if (!gl) {
			throw "Browser does not support WebGL";
		}
	} catch (e) {
		document.getElementById("canvas-holder").innerHTML =
			"<p>Sorry, could not get a WebGL graphics context.</p>";
		return;
	}
	try {
		initGL(); // initialize the WebGL graphics context
	} catch (e) {
		document.getElementById("canvas-holder").innerHTML =
			"<p>Sorry, could not initialize the WebGL graphics context: " +
			e +
			"</p>";
		return;
	}

	document.getElementById("numPointsRange").onchange = function () {
		getNumPoints();
		createPointData();
		draw();
	};

	document.getElementById("coloring").onchange = function () {
		colorTriangles();
		draw();
	};

	getNumPoints();
	draw();
}

function initGL(gl) {
	//vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
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
