class Shader {
	//shaderHandle: GLuint;
	//type: number;
	constructor(gl, shaderType, sourceCode) {
		if (shaderType == gl.VERTEX_SHADER) {
			this.type = 0;
		} else if (shaderType == gl.FRAGMENT_SHADER) {
			this.type = 1;
		} else {
			throw new Error("Invalid shader type");
		}
		this.shaderHandle = gl.createShader(shaderType);
		gl.shaderSource(this.shaderHandle, sourceCode);
		gl.compileShader(this.shaderHandle);

		if (!gl.getShaderParameter(this.shaderHandle, gl.COMPILE_STATUS)) {
			throw new Error(
				"Error in vertex shader:  " + gl.getShaderInfoLog(this.shaderHandle)
			);
		}
	}

	getShader() {
		return this.shaderHandle;
	}

	getShaderType() {
		//return shader type as enum
		return this.type;
	}
}

class ShaderProgram {
	constructor(gl, vertexShader, fragmentShader) {
		this.gl = gl;
		this.program = gl.createProgram();
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.gl.attachShader(this.program, this.fragmentShader);
		this.gl.attachShader(this.program, this.vertexShader);
		this.gl.linkProgram(this.program);
	}

	activate() {
		//activate the shader program
		this.gl.UseProgram(this.program);
	}

	getProgram() {
		return this.program;
	}
}
