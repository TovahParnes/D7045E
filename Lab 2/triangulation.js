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
	const triangleCount = points.length - 2; // Number of triangles we can form
	const triangles = new Float32Array(triangleCount * 6); // Each triangle has 3 points (6 coordinates)
	const convexHull = new Float32Array(points.length);
	var lower = [];
	var upper = [];

	// initial triangle
	for (let i = 0; i < 6; i++) {
		triangles[i] = points[i];
		convexHull[i] = points[i];
		lower.push(points[i]);
		upper.push(points[i]);
	}

	ind = 6;

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

			lower.pop(); // remove the last point, aka found a line higher on the hull
			lower.pop(); // remove the last point, aka found a line higher on the hull

			// add the point to the convex hull
			convexHull[i] = points[i];
			convexHull[i + 1] = points[i + 1];
		}
		lower.push(points[i]); // add the point to the lower hull
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

			upper.pop(); // remove the last point, aka found a line higher on the hull
			upper.pop(); // remove the last point, aka found a line higher on the hull

			// add the point to the convex hull
			convexHull[i] = points[i];
			convexHull[i + 1] = points[i + 1];
		}
		upper.push(points[i]); // add the point to the lower hull
		upper.push(points[i + 1]);
	}

	return triangles;
}

function cross(ax, ay, bx, by, ox, oy) {
	return (ax - ox) * (by - oy) - (ay - oy) * (bx - ox);
}

/**
 * @param points An array of [X, Y] coordinates
 */
function convexHull(points) {
	points.sort(function (a, b) {
		return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
	});

	var lower = [];
	for (var i = 0; i < points.length; i++) {
		while (
			lower.length >= 2 &&
			cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0
		) {
			lower.pop();
		}
		lower.push(points[i]);
	}

	var upper = [];
	for (var i = points.length - 1; i >= 0; i--) {
		while (
			upper.length >= 2 &&
			cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0
		) {
			upper.pop();
		}
		upper.push(points[i]);
	}

	upper.pop();
	lower.pop();
	return lower.concat(upper);
}
