class Shader {
	shaderHandle: GLuint;
	constructor(gl, shaderType, sourceCode) {}

	getShader() {}

	getShaderType() {
		//return shader type as enum
	}
}

//maybe do this? not quite what is asked for in the lab
class vertexShader extends Shader {
	constructor(gl) {
		const sourceCode =
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
		super(gl, 0, sourceCode);
	}
}

class ShaderProgram {
	shaders: Shader[];
	program: GLuint;
	constructor(gl, vertexShader, fragmentShader) {}

	activate() {
		//activate the shader program
		//glUseProgram(this.program);
	}
}
