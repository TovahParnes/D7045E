// Andreas Form och Marcus Asplund

class Mesh {
	constructor(gl, vertices, indices, shaderProgram) {
		this.vertices = vertices;
		this.indices = indices;

		// Create a vertex array object
		let vertexArr = gl.createVertexArray();
		let vertexBuff = gl.createBuffer();
		let indexBuff = gl.createBuffer();

		gl.bindVertexArray(vertexArr);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuff);
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);

		let verticeArray = new Float32Array(this.vertices);
		let indiceArray = new Uint8Array(this.indices);

		gl.bufferData(gl.ARRAY_BUFFER, verticeArray, gl.STATIC_DRAW);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indiceArray, gl.STATIC_DRAW);

		let prog = shaderProgram.getProgram();
		let pos = gl.getAttribLocation(prog, "a_vertexPosition");

		gl.vertexAttribPointer(pos, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(pos);
	}

	getIndices() {
		return this.indices;
	}

	getVertices() {
		return this.vertices;
	}
}

class cuboid extends Mesh {
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

		let indices = [
			1, 0, 3, 3, 2, 1, 2, 3, 7, 7, 6, 2, 3, 0, 4, 4, 7, 3, 6, 5, 1, 1, 2, 6, 4,
			5, 6, 6, 7, 4, 5, 4, 0, 0, 1, 5,
		];

		super(gl, flatten(vertices), indices, shaderProgram);

		this.x = x;
		this.y = y;
		this.z = z;
	}

	// Getters
	getCordinates() {
		return [this.x, this.y, this.z];
	}

	getWidth() {
		return this.x * 2;
	}

	getHeight() {
		return this.y * 2;
	}

	getDepth() {
		return this.z * 2;
	}
}
