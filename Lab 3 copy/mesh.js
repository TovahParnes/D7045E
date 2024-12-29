// Tovah Parnes - tovpar-9@student.ltu.se

class Mesh {
	constructor(gl, vertices, indices, shaderProgram) {
		this.vertices = vertices;
		this.indices = indices;

		let vertexArray = gl.createVertexArray();
		gl.bindVertexArray(vertexArray);

		let vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		let verticeArray = new Float32Array(this.vertices);
		gl.bufferData(gl.ARRAY_BUFFER, verticeArray, gl.STATIC_DRAW);

		let indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		let indiceArray = new Uint8Array(this.indices);
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
}

class Sphere extends Mesh {
	constructor(gl, radius, slices, stacks, shaderProgram) {
		const sphere = uvSphere(radius, slices, stacks);
		const vertices = sphere.vertexPositions;
		const indices = sphere.indices;
		const normals = sphere.vertexNormals;

		super(gl, vertices, indices, shaderProgram);

		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
	}

	// Getters
	getRadius() {
		return this.radius;
	}
}

function uvSphere(radius, slices, stacks) {
	radius = radius || 0.5;
	slices = slices || 16;
	stacks = stacks || 8;
	var vertexCount = (slices + 1) * (stacks + 1);
	var vertices = new Float32Array(3 * vertexCount);
	var normals = new Float32Array(3 * vertexCount);
	var texCoords = new Float32Array(2 * vertexCount);
	var indices = new Uint16Array(2 * slices * stacks * 3);
	var du = (2 * Math.PI) / slices;
	var dv = Math.PI / stacks;
	var i, j, u, v, x, y, z;
	var indexV = 0;
	var indexT = 0;
	for (i = 0; i <= stacks; i++) {
		v = -Math.PI / 2 + i * dv;
		for (j = 0; j <= slices; j++) {
			u = j * du;
			x = Math.cos(u) * Math.cos(v);
			y = Math.sin(u) * Math.cos(v);
			z = Math.sin(v);
			vertices[indexV] = radius * x;
			normals[indexV++] = x;
			vertices[indexV] = radius * y;
			normals[indexV++] = y;
			vertices[indexV] = radius * z;
			normals[indexV++] = z;
			texCoords[indexT++] = j / slices;
			texCoords[indexT++] = i / stacks;
		}
	}
	var k = 0;
	for (j = 0; j < stacks; j++) {
		var row1 = j * (slices + 1);
		var row2 = (j + 1) * (slices + 1);
		for (i = 0; i < slices; i++) {
			indices[k++] = row1 + i;
			indices[k++] = row2 + i + 1;
			indices[k++] = row2 + i;
			indices[k++] = row1 + i;
			indices[k++] = row1 + i + 1;
			indices[k++] = row2 + i + 1;
		}
	}
	return {
		vertexPositions: vertices,
		vertexNormals: normals,
		vertexTextureCoords: texCoords,
		indices: indices,
	};
}
