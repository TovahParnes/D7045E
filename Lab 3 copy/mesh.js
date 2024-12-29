// Tovah Parnes - tovpar-9@student.ltu.se

class Mesh {
	constructor(gl, vertices, indices, shaderProgram) {
		/*
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
		*/

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

class Star extends Mesh {
	constructor(
		gl,
		spikes,
		outerDistance,
		innerDistance,
		thickness,
		shaderProgram
	) {
		if (spikes < 2) throw new Error("spikes must be larger than 2");
		if (outerDistance <= innerDistance)
			throw new Error(
				"outerDistance must be bigger or the same as innerDistance"
			);

		let vertices = [0, 0, thickness / 2, 0, 0, -thickness / 2];
		for (let i = 0; i < spikes; i++) {
			let angle = Math.PI / 2 + (i / spikes) * 2 * Math.PI;
			let x = Math.cos(angle) * outerDistance;
			let y = Math.sin(angle) * outerDistance;
			vertices.push(x, y, 0);
		}

		for (let i = 0; i < spikes; i++) {
			let angle = (i / spikes) * 2 * Math.PI + Math.PI / 2 + Math.PI / spikes;
			let x = Math.cos(angle) * innerDistance;
			let y = Math.sin(angle) * innerDistance;
			vertices.push(x, y, 0);
		}

		let indices = [];
		for (let i = 0; i < spikes; i++) {
			let last = spikes + 2 + ((i + spikes - 1) % spikes);
			indices.push(0, i + 2, i + spikes + 2);
			indices.push(0, i + 2, last);
			indices.push(1, i + 2, i + spikes + 2);
			indices.push(1, i + 2, last);
		}

		//let normals = calculateNormals(vertices, indices);
		super(gl, vertices, indices, shaderProgram);
	}
}
