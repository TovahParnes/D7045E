class Mesh {
	//vertexBufferObject: GLuint;
	//indexBufferObject: GLuint;
	//vertexArrayObject: GLuint;
	constructor(gl, vertices, indices, shaderProgram) {
		this.gl = gl;
		this.indicesLength = indices.length;
		this.verticesLength = vertices.length;

		this.vertexArray = gl.createVertexArray();
		gl.bindVertexArray(this.vertexArray);

		this.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint8Array(indices),
			gl.STATIC_DRAW
		);

		this.vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
		this.gl.vertexAttribPointer(
			this.vertexPosition,
			4,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.vertexPosition);
	}

	getIndicesLength() {
		return this.indicesLength;
	}

	getVertices() {
		return this.verticesLength;
	}
}

class Cuboid extends Mesh {
	constructor(gl, width, height, depth, shaderProgram) {
		const x = width / 2;
		const y = height / 2;
		const z = depth / 2;

		const vertices = [
			vec4(-x, -y, z, 1),
			vec4(-x, y, z, 1),
			vec4(x, y, z, 1),
			vec4(x, -y, z, 1),
			vec4(-x, -y, -z, 1),
			vec4(-x, y, -z, 1),
			vec4(x, y, -z, 1),
			vec4(x, -y, -z, 1),
		];

		const indices = [
			1, 0, 3, 3, 2, 1, 2, 3, 7, 7, 6, 2, 3, 0, 4, 4, 7, 3, 6, 5, 1, 1, 2, 6, 4,
			5, 6, 6, 7, 4, 5, 4, 0, 0, 1, 5,
		];

		super(gl, flatten(vertices), indices, shaderProgram);
	}
}
