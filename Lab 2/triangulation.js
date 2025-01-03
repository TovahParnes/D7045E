//TIME COMPLEXITY: O(n) - each point is added to the upper or lower array once, and removed once.
function calcTriangleCoords(points, triangleCount) {
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

//TIME COMPLEXITY: O(n) - each triangle has 3 edges that get added to the output array once.
function triangulateSoup(triangles, triangleCount) {
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
	return edges;
}

//TIME COMPLEXITY: O(1) - each edge is created once.
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

//TIME COMPLEXITY: O(n) - each edge is checked against it's neighbor once.
function triangleGraph(edges, triangleCount) {
	// Initialize graph: each triangle has a list of neighbors
	const triangleGraph = Array.from({ length: triangleCount }, () => []);

	// Traverse edges to find shared edges between triangles
	for (let i = 0; i < edges.length - 1; i += 1) {
		let edge1 = edges[i];
		let edge2 = edges[i + 1];

		if (!equalEdges(edge1, edge2)) {
			continue;
		}

		let t1 = edge1[4]; // Pointer to triangle 1
		let t2 = edge2[4]; // Pointer to triangle 2

		if (t1 == t2) {
			continue; // Skip self-edges
		}

		if (!triangleGraph[t1].includes(t2)) {
			triangleGraph[t1].push(t2);
		}
		if (!triangleGraph[t2].includes(t1)) {
			triangleGraph[t2].push(t1);
		}
	}

	return triangleGraph;
}

function equalEdges(edge1, edge2) {
	for (let i = 0; i < 4; i++) {
		if (edge1[i] != edge2[i]) {
			return false;
		}
	}
	return true;
}

//TIME COMPLEXITY: O(n) + 0(n) + 0(n log n) + 0(n) = 0(n log n)
function triangulation(triangles, triangleCount) {
	let edges = triangulateSoup(triangles, triangleCount);
	edges = mergeSortEdges(edges);
	let graph = triangleGraph(edges, triangleCount);

	return graph;
}
