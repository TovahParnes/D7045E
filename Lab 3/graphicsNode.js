"use strict";
class GraphicsNode {
	//mesh: Mesh;
	//material: Material;
	//transform: vec4matrixs;
	constructor(gl, mesh, material, transform) {
		this.gl = gl;
		this.mesh = mesh;
		this.material = material;
		this.transform = transform;
	}

	draw(shaderProgram) {
		//draw mesh
		this.material.applyMaterial();

		let transformMatrix = this.gl.getUniformLocation(
			shaderProgram.getProgram(),
			"transformMatrix"
		);
		let flattenedtransformMatrix = flatten(this.transform);
		this.gl.uniformMatrix4fv(transformMatrix, false, flattenedtransformMatrix);

		//draw call to gl
		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.mesh.getIndicesLength(),
			this.gl.UNSIGNED_BYTE,
			0
		);
	}

	update(mat) {
		this.transform = mult(this.transform, mat);
	}
}
