// Andreas Form och Marcus Asplund

class material {
	constructor(gl, shaderProgram) {
		this.gl = gl;
		this.shaderProgram = shaderProgram;
	}

	applyMaterial() {
		throw new Error("abstract method, must be implemented");
	}
}

class MonoMaterial extends material {
	constructor(gl, shaderProgram, color) {
		super(gl, shaderProgram);
		this.color = color;
	}

	applyMaterial(transformMatrix) {
		let program = this.shaderProgram.getProgram();

		let colorLocation = this.gl.getUniformLocation(program, "u_color");
		let flattenedColor = flatten(this.color);
		this.gl.uniform4fv(colorLocation, flattenedColor);

		let transformLocation = this.gl.getUniformLocation(
			program,
			"u_transformMatrix"
		);
		let flattenedtransformMatrix = flatten(transformMatrix);
		this.gl.uniformMatrix4fv(
			transformLocation,
			false,
			flattenedtransformMatrix
		);
	}
}
