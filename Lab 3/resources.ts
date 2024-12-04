class Mesh {
	vertexBufferObject: GLuint;
	indexBufferObject: GLuint;
	vertexArrayObject: GLuint;
	constructor(gl, vertices, normals, texCoords, indices) {}
}

class Cuboid extends Mesh {
	constructor(gl, width, height, depth) {
		//create the mesh
		super(0, 0, 0, 0, 0);
	}

	draw(shaderProgram): void {
		//draw the mesh
	}
}

abstract class Material {
	prog: ShaderProgram;
	constructor(gl, shaderProgram) {
		this.prog = shaderProgram;
	}

	abstract ApplyMaterial(): void;
}

class MonoMaterial extends Material {
	color: GLfloat[];
	//color: GLfloat[3];
	constructor(gl, shaderProgram, color) {
		super(gl, shaderProgram);
		this.color = color;
	}

	ApplyMaterial() {
		//apply material
		//color as uniform
	}
}

class GraphicsNode {
	mesh: Mesh;
	material: Material;
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
