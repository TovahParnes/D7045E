//abstract class
class Material {
	//prog: ShaderProgram;
	constructor(gl, shaderProgram) {
		this.prog = shaderProgram;
	}

	applyMaterial() {
		throw new Error("not yet implemented");
	}
}

class MonoMaterial extends Material {
	//color: GLfloat[];
	//color: GLfloat[3];
	constructor(gl, shaderProgram, color) {
		super(gl, shaderProgram);
		this.color = color;
	}

	applyMaterial() {
		//apply material
		//color as uniform
	}
}
