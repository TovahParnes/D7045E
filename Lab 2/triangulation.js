function triangleSoup(points) {
	const triangleCount = points.length - 5; // Number of triangles we can form
	const triangles = new Float32Array(triangleCount * 6); // Each triangle has 3 points (6 coordinates)
	let lower = [];
	let upper = [];

	ind = 0;

	for (let i = ind; i < points.length; i = i + 2) {
		while (
			lower.length >= 2 &&
			cross(
				lower[lower.length - 4],
				lower[lower.length - 3],
				lower[lower.length - 2],
				lower[lower.length - 1],
				points[i],
				points[i + 1]
			) <= 0
		) {
			// create a new triangle
			triangles[ind++] = lower[lower.length - 4];
			triangles[ind++] = lower[lower.length - 3];
			triangles[ind++] = lower[lower.length - 2];
			triangles[ind++] = lower[lower.length - 1];
			triangles[ind++] = points[i];
			triangles[ind++] = points[i + 1];

			lower.pop();
			lower.pop();
		}
		lower.push(points[i]);
		lower.push(points[i + 1]);

		while (
			upper.length >= 2 &&
			cross(
				upper[upper.length - 4],
				upper[upper.length - 3],
				upper[upper.length - 2],
				upper[upper.length - 1],
				points[i],
				points[i + 1]
			) >= 0
		) {
			// create a new triangle
			triangles[ind++] = upper[upper.length - 4];
			triangles[ind++] = upper[upper.length - 3];
			triangles[ind++] = upper[upper.length - 2];
			triangles[ind++] = upper[upper.length - 1];
			triangles[ind++] = points[i];
			triangles[ind++] = points[i + 1];

			upper.pop();
			upper.pop();
		}
		upper.push(points[i]);
		upper.push(points[i + 1]);
	}

	return triangles;
}

function cross(ax, ay, bx, by, ox, oy) {
	return (ax - ox) * (by - oy) - (ay - oy) * (bx - ox);
}

function triangulateSoup(triangles) {
	const triangleCount = triangles.length / 6;
	let edges = new Array(triangleCount * 3);
	ind = 0;

	for (let i = 0; i < triangleCount; i++) {
		let x1, y1, x2, y2, x3, y3;
		x1 = triangles[i * 6 + 0];
		y1 = triangles[i * 6 + 1];
		x2 = triangles[i * 6 + 2];
		y2 = triangles[i * 6 + 3];
		x3 = triangles[i * 6 + 4];
		y3 = triangles[i * 6 + 5];

		if (x1 == 0 || y1 == 0 || x2 == 0 || y2 == 0 || x3 == 0 || y3 == 0) {
			continue;
		}

		// Create edges
		edges[ind++] = createEdge(x1, y1, x2, y2, i);
		edges[ind++] = createEdge(x2, y2, x3, y3, i);
		edges[ind++] = createEdge(x3, y3, x1, y1, i);
	}
	edges = mergeSortEdges(edges);
	return edges;
}

function createEdge(x1, y1, x2, y2, pointer) {
	xmin = Math.min(x1, x2);
	xmax = Math.max(x1, x2);
	ymin = Math.min(y1, y2);
	ymax = Math.max(y1, y2);

	edge = new Float32Array(5);
	edge[0] = xmin;
	edge[1] = ymin;
	edge[2] = xmax;
	edge[3] = ymax;
	edge[4] = pointer;
	return edge;
}
