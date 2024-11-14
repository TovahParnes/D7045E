function triangulate(points) {
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
