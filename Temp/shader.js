// Andreas Form och Marcus Asplund

class Shader {
	constructor(gl, shaderType, source) {
		if (shaderType == gl.VERTEX_SHADER) {
			this.type = 0;
		} else if (shaderType == gl.FRAGMENT_SHADER) {
			this.type = 1;
		} else {
			throw new Error("Invalid shader type");
		}

		this.shader = gl.createShader(shaderType);
		gl.shaderSource(this.shader, document.getElementById(source).text);
		gl.compileShader(this.shader);
	}

	getShader() {
		return this.shader;
	}

	getShaderType() {
		return this.type;
	}
}
