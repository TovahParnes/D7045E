function triangulateWrong(points) {
	const triangleCount = points.length / 2 - 2; // Number of triangles we can form
	const triangles = new Float32Array(triangleCount * 6); // Each triangle has 3 points (6 coordinates)

	let tIndex = 0; // Track index in triangles array
	for (let i = 0; i < triangleCount; i++) {
		// Fill triangles in the order: (1, 2, 3), (2, 3, 4), (3, 4, 5), ...
		triangles[tIndex++] = points[2 * i];
		triangles[tIndex++] = points[2 * i + 1];

		triangles[tIndex++] = points[2 * (i + 1)];
		triangles[tIndex++] = points[2 * (i + 1) + 1];

		triangles[tIndex++] = points[2 * (i + 2)];
		triangles[tIndex++] = points[2 * (i + 2) + 1];
	}

	return triangles;
}

function triangulate(points) {
	const triangleCount = points.length - 5; // Number of triangles we can form
	const triangles = new Float32Array(triangleCount * 6); // Each triangle has 3 points (6 coordinates)
	var lower = [];
	var upper = [];

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
