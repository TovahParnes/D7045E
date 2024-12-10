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

	draw() {
		//draw mesh
		this.material.applyMaterial();
		//graw call to gl
		this.gl.drawElements(
			this.gl.indices,
			this.mesh.getIndicesLength(),
			this.gl.UNSIGNED_BYTE,
			0
		);
	}

	update(mat) {
		//multiply transform by mat
		//this.transform = mat * this.transform;
		mat4.multiply(this.transform, this.transform, mat);
	}
}
