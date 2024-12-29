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
		console.log(this.vertices.length);
		console.log(this.indices.length);

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

/* AI code - at least it displays something
class Cone extends Mesh {
	constructor(gl, radius, height, slices, shaderProgram) {
		const vertices = [];
		for (let i = 0; i <= slices; i++) {
			const angle = (i / slices) * Math.PI * 2;
			const x = radius * Math.cos(angle);
			const z = radius * Math.sin(angle);

			// Vertex at base
			vertices.push(vec4(x, -height / 2, z, 1));

			// Vertex on side
			if (i < slices) {
				const t = i / slices;
				const y = height * t;
				vertices.push(vec4(x, y, z, 1));
			}
		}

		// Calculate indices
		let indices = [];
		for (let i = 0; i < slices; i++) {
			indices.push(i + 1, i, slices + 1); // Triangle for each slice
		}

		super(gl, flatten(vertices), indices, shaderProgram);

		this.radius = radius;
		this.height = height;
		this.slices = slices;
	
	}
}
*/

class Cone extends Mesh {
	constructor(gl, width, height, slices, shaderProgram) {
		let bottomCircle = [];
		let triangles = [];
		let bottomSurface = [];

		let normals = [];
		let vertices = [];
		let indices = [];

		let topPoint = vec4(0.0, height, 0.0, 1.0);
		let bottomMiddlePoint = vec4(0.0, -height, 0.0, 1.0);

		let phi = (2.0 * Math.PI) / slices;

		bottomCircle.push(bottomMiddlePoint);
		triangles.push(topPoint);

		for (var i = 0; i < slices + 1; i++) {
			var angle = i * phi;
			bottomCircle.push(
				vec4(width * Math.cos(angle), -height, width * Math.sin(angle), 1.0)
			);
		}

		for (var i = 0; i < bottomCircle.length - 1; i++) {
			vertices.push(bottomCircle[i], topPoint, bottomCircle[i + 1]);

			var t1 = subtract(topPoint, bottomCircle[i]);
			var t2 = subtract(bottomCircle[i + 1], topPoint);
			var normal = cross(t1, t2);
			var normal = normalize(vec4(normal[0], normal[1], normal[2], 0.0));

			normals.push(normal);
			normals.push(normal);
			normals.push(normal);
		}

		for (var i = 0; i < bottomCircle.length - 1; i++) {
			vertices.push(bottomCircle[i], bottomCircle[i + 1], bottomMiddlePoint);
		}

		super(gl, flatten(vertices), indices, shaderProgram);
	}
}
