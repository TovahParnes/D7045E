// Tovah Parnes - tovpar-9@student.ltu.se

import { uvSphere } from "./basic-object-models-IFS";

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

class sphere extends Mesh {
	constructor(gl, radius, slices, stacks, shaderProgram) {
		const sphere = uvSphere(radius, slices, stacks);

		const vertices = [
			//vertices for a sphere
		];

		let indices = [
			//indices for a sphere
		];

		super(gl, flatten(vertices), indices, shaderProgram);

		this.radius = radius;
	}

	// Getters
	getRadius() {
		return this.radius;
	}
}
