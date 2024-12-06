class GraphicsNode {
	//mesh: Mesh;
	//material: Material;
	//transform: vec4matrixs;
	constructor(gl, mesh, material, transform) {
		this.mesh = mesh;
		this.material = material;
		//this.transform = transform;
	}

	draw() {
		//draw mesh
		this.material.ApplyMaterial();
		//graw call to gl
	}

	update(mat) {
		//multiply transform by mat
		//this.transform = mat * this.transform;
	}
}
