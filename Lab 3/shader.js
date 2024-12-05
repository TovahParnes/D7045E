class Shader {
	//shaderHandle: GLuint;
	//type: number;
	constructor(gl, shaderType, sourceCode) {
		if (shaderType == gl.VERTEX_SHADER) {
			this.shaderHandle = gl.createShader(gl.VERTEX_SHADER);
			this.type = 0;
		} else if (shaderType == gl.FRAGMENT_SHADER) {
			this.shaderHandle = gl.createShader(gl.FRAGMENT_SHADER);
			this.type = 1;
		} else {
			throw new Error("Invalid shader type");
		}
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
	//shaders: Shader[];
	//program: GLuint;
	constructor(gl, vsh, fsh) {
		this.program = gl.createProgram();
		this.shaders = [vsh, fsh];
		gl.attachShader(this.program, vsh);
		gl.attachShader(this.program, fsh);

		//maybe not use this here?
		gl.linkProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			throw new Error(
				"Link error in program:  " + gl.getProgramInfoLog(this.program)
			);
		}
	}

	activate(gl) {
		//activate the shader program
		gl.UseProgram(this.program);
	}
}
