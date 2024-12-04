class Shader {
	shaderHandle: GLuint;
	constructor(gl, shaderType, sourceCode) {}

	getShader() {}

	getShaderType() {
		//return shader type as enum
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
