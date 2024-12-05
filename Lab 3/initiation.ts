let canvas; // The canvas where WebGL draws.
let gl; // The WebGL graphics context.

export function init() {
	//vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	try {
		const canvas = document.getElementById(
			"webglcanvas"
		) as HTMLCanvasElement | null;
		if (!canvas) {
			throw new Error("Canvas element with ID 'webglcanvas' not found.");
		}

		const options: WebGLContextAttributes = {
			alpha: false,
		};
		const gl = canvas.getContext("webgl", options);
		if (!gl) {
			throw new Error("Browser does not support WebGL");
		}

		try {
			initGL(gl); // Ensure initGL is defined to take WebGLRenderingContext as a parameter
		} catch (e) {
			document.getElementById(
				"canvas-holder"
			)!.innerHTML = `<p>Sorry, could not initialize the WebGL graphics context: ${e}</p>`;
		}
	} catch (e) {
		const holder = document.getElementById("canvas-holder");
		if (holder) {
			holder.innerHTML = `<p>Sorry, could not get a WebGL graphics context.</p>`;
		}
		console.error(e);
	}
}

function initGL(gl) {}

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
