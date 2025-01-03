// Tovah Parnes - tovpar-9@student.ltu.se

class GraphicsNode {
	constructor(gl, mesh, material, transform) {
		this.gl = gl;
		this.mesh = mesh;
		this.material = material;
		this.transform = transform;
	}

	draw() {
		this.material.applyMaterial(this.transform);
		let indicesLength = this.mesh.getIndices().length;
		this.gl.drawElements(
			this.gl.TRIANGLES,
			indicesLength,
			this.gl.UNSIGNED_BYTE,
			0
		);
	}

	update(transform) {
		transform = mult(this.transform, transform);
		this.transform = transform;
	}
}

class Light extends GraphicsNode {
	constructor(gl, shaderProgram, mesh, material, transform) {
		super(gl, mesh, material, transform);
		this.shaderProgram = shaderProgram;
	}

	applyLight() {
		let prog = this.shaderProgram.getProgram();
		// TODO: continue here
	}
}
