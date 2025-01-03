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
		const vertices = [];
		const indices = [];

		for (let currStack = 0; currStack <= stacks; currStack++) {
			const theta = (currStack * Math.PI) / stacks;
			const sinTheta = Math.sin(theta);
			const cosTheta = Math.cos(theta);

			for (let currSlice = 0; currSlice <= slices; currSlice++) {
				const phi = (currSlice * 2 * Math.PI) / slices;
				const sinPhi = Math.sin(phi);
				const cosPhi = Math.cos(phi);

				const x = cosPhi * sinTheta;
				const y = cosTheta;
				const z = sinPhi * sinTheta;

				vertices.push(vec4(radius * x, radius * y, radius * z, 1));
			}
		}

		for (let currStack = 0; currStack < stacks; currStack++) {
			for (let currSlice = 0; currSlice < slices; currSlice++) {
				const first = currStack * (slices + 1) + currSlice;
				const second = first + slices + 1;

				indices.push(first, second, first + 1);
				indices.push(second, second + 1, first + 1);
			}
		}

		super(gl, flatten(vertices), indices, shaderProgram);

		this.radius = radius;
		this.stacks = stacks;
		this.slices = slices;
	}
}

class Star extends Mesh {
	constructor(gl, points, outerDist, innerDist, thickness, shaderProgram) {
		if (points < 2) throw new Error("there must be at least 2 points");
		if (outerDist <= innerDist)
			throw new Error("outerDist must be bigger or the same as innerDist");
		if (thickness <= 0) throw new Error("thickness must be bigger than 0");

		const vertices = [];
		const indices = [];
		const angleStep = Math.PI / points;

		// Center vertices
		vertices.push(vec4(0, 0, thickness / 2, 1)); // Front center
		vertices.push(vec4(0, 0, -thickness / 2, 1)); // Back center

		// Outer and inner vertices
		for (let i = 0; i < 2 * points; i++) {
			const angle = i * angleStep;
			const dist = i % 2 === 0 ? outerDist : innerDist;
			vertices.push(vec4(dist * Math.cos(angle), dist * Math.sin(angle), 0, 1));
		}

		// Indices for triangles
		for (let i = 2; i < 2 * points + 2; i++) {
			const next = i === 2 * points + 1 ? 2 : i + 1;
			// Front triangles
			indices.push(0, i, next);
			// Back triangles
			indices.push(1, next, i);
		}

		super(gl, flatten(vertices), indices, shaderProgram);

		this.points = points;
		this.outerDist = outerDist;
		this.innerDist = innerDist;
		this.thickness = thickness;
	}
}

class Torus extends Mesh {
	constructor(gl, innerRadius, outerRadius, segments, shaderProgram) {
		const vertices = [];
		const indices = [];
		let numSegments = segments - 1; // Added the minus one and it seems to work, TODO: check it working in 3d
		const ringRadius = (outerRadius - innerRadius) / 2;
		const centerRadius = innerRadius + ringRadius;

		for (let i = 0; i < numSegments; i++) {
			const theta = (i / numSegments) * 2 * Math.PI;
			const cosTheta = Math.cos(theta);
			const sinTheta = Math.sin(theta);

			for (let j = 0; j < numSegments; j++) {
				const phi = (j / numSegments) * 2 * Math.PI;
				const cosPhi = Math.cos(phi);
				const sinPhi = Math.sin(phi);

				const x = (centerRadius + ringRadius * cosPhi) * cosTheta;
				const y = (centerRadius + ringRadius * cosPhi) * sinTheta;
				const z = ringRadius * sinPhi;

				vertices.push(vec4(x, y, z, 1));

				const nextI = (i + 1) % numSegments;
				const nextJ = (j + 1) % numSegments;

				indices.push(
					i * numSegments + j,
					nextI * numSegments + j,
					nextI * numSegments + nextJ,
					i * numSegments + j,
					nextI * numSegments + nextJ,
					i * numSegments + nextJ
				);
			}
		}

		super(gl, flatten(vertices), indices, shaderProgram);

		this.innerRadius = innerRadius;
		this.outerRadius = outerRadius;
		this.numSegments = numSegments;
	}
}

class Cone extends Mesh {
	constructor(gl, width, height, slices, shaderProgram) {
		let vertices = [];
		let indices = [];
		let normals = [];

		let topPoint = vec4(0.0, height / 2, 0.0, 1.0);
		let bottomMiddlePoint = vec4(0.0, -height / 2, 0.0, 1.0);

		let angleStep = (2.0 * Math.PI) / slices;

		vertices.push(bottomMiddlePoint);
		vertices.push(topPoint);

		let count = vertices.length;
		for (var i = 0; i < slices + 1; i++) {
			var angle = i * angleStep;
			vertices.push(
				vec4(width * Math.cos(angle), -height / 2, width * Math.sin(angle), 1.0)
			);
			indices.push(0, count, count - 1);
			indices.push(1, count, count - 1);
			count++;
		}
		//TODO: check so that each face had a triangle

		super(gl, flatten(vertices), indices, shaderProgram);

		this.width = width;
		this.height = height;
		this.slices = slices;
	}
}

class Cylinder extends Mesh {
	constructor(gl, width, height, slices, shaderProgram) {
		let vertices = [];
		let indices = [];
		let normals = [];

		let topmiddlePoint = vec4(0.0, height / 2, 0.0, 1.0);
		let bottomMiddlePoint = vec4(0.0, -height / 2, 0.0, 1.0);

		let angleStep = (2.0 * Math.PI) / slices;

		vertices.push(topmiddlePoint);
		vertices.push(bottomMiddlePoint);

		let count = vertices.length;
		for (var i = 0; i < slices + 1; i++) {
			var angle = i * angleStep;

			// Top
			vertices.push(
				vec4(width * Math.cos(angle), height / 2, width * Math.sin(angle), 1.0)
			);
			let curTop = count;
			let lastTop = count - 2;

			// Bottom
			vertices.push(
				vec4(width * Math.cos(angle), -height / 2, width * Math.sin(angle), 1.0)
			);
			let curBot = count + 1;
			let lastBot = count - 1;

			// Top circle
			indices.push(0, curTop, lastTop);

			// Bottom circle
			indices.push(1, curBot, lastBot);

			// Sides
			indices.push(curBot, curTop, lastTop);
			indices.push(curBot, lastBot, lastTop);

			count = count + 2;
		}
		//TODO: check so that each face had a triangle

		super(gl, flatten(vertices), indices, shaderProgram);

		this.width = width;
		this.height = height;
		this.slices = slices;
	}
}
