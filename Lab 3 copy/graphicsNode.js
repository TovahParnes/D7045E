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
		console.log(indicesLength);
		indicesLength = indicesLength / 2;
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
