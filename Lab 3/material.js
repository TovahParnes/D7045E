"use strict";

//abstract class
class Material {
	//prog: ShaderProgram;
	constructor(gl, shaderProgram) {
		this.gl = gl;
		this.prog = shaderProgram;
	}

	applyMaterial() {
		throw new Error("not yet implemented");
	}
}

class MonoMaterial extends Material {
	//color: GLfloat[];
	//color: GLfloat[4];
	constructor(gl, shaderProgram, color) {
		super(gl, shaderProgram);
		this.color = color;
	}

	applyMaterial() {
		this.fragColorLocation = this.gl.getUniformLocation(
			this.prog.getProgram(),
			"uFragColor"
		);
		this.gl.uniform4fv(this.fragColorLocation, flatten(this.color));

		//TODO: update color to show depth
	}
}
