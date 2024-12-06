class Mesh {
	//vertexBufferObject: GLuint;
	//indexBufferObject: GLuint;
	//vertexArrayObject: GLuint;
	constructor(gl, vertexArray, vertexBuffer, indexBuffer) {
		this.gl = gl;
		this.vertexArray = vertexArray;
		this.vertexBuffer = vertexBuffer;
		this.indexBuffer = indexBuffer;
	}
}

class Cuboid extends Mesh {
	constructor(gl, width, height, depth) {
		//create the mesh
		super(0, 0, 0, 0, 0);
	}

	draw(shaderProgram) {
		//draw the mesh
	}
}
