function triangulateNextPoint(curInd, points, triangles) {
	let point1 = points[curInd];
	let point2 = points[curInd - 1];
	let point3 = points[curInd - 2];

	triangles.push([point1, point2, point3]);

	/*let trianglesToAdd = [];
	for (let i = 0; i < points.length; i++) {
		let point1 = points[i];
		let point2 = points[(i + 1) % points.length];
		let point3 = points[(i + 2) % points.length];
		if (point1.x == point.x && point1.y == point.y) {
			trianglesToAdd.push([point1, point2, point3]);
		}
	}

	for (let i = 0; i < trianglesToAdd.length; i++) {
		let triangle = trianglesToAdd[i];
		triangles.push(triangle);
	}*/
}

function triangulate(points) {
	let triangles = [[points[0], points[1], points[2]]];
	for (let i = 3; i < points.length; i++) {
		triangulateNextPoint(i, points, triangles);
	}
	return triangles;
}

/*
function triangulateNextPoint(curInd, points, triangles) {
	let point1 = points[curInd];
	let point2 = points[curInd - 1];
	let point3 = points[curInd - 2];

	triangles.push(point1, point2, point3);
}

function triangulate(points, triangles) {
	for (let i = 0; i < triangles.length; i + 3) {
		for (let j = 3; j < points.length; j++) {
			triangles[i] = points[j - 2];
			triangles[i + 1] = points[j - 1];
			triangles[i + 2] = points[j];
		}
	}

	return triangles;
}
    */
