//TIME COMPLEXITY: O(n log n) - divides the array in two halves and takes linear time to merge two halves
function mergeSort(arr) {
	// Base case
	if (arr.length <= 2) return arr;
	let mid = Math.floor(arr.length / 2);
	mid = mid % 2 === 0 ? mid : mid + 1;
	// Recursive calls
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

//TIME COMPLEXITY: O(n) - merging to the sorted array takes linear time
function merge(left, right) {
	let arr = new Float32Array(left.length + right.length); // the sorted items will go here
	let i = 0,
		l = 0,
		r = 0;
	//The while loops check the conditions for merging
	while (l < left.length && r < right.length) {
		if (left[l] == right[r]) {
			if (left[l + 1] < right[r + 1]) {
				arr[i] = left[l];
				arr[i + 1] = left[l + 1];
				l += 2;
				i += 2;
			} else {
				arr[i] = right[r];
				arr[i + 1] = right[r + 1];
				r += 2;
				i += 2;
			}
		}
		if (left[l] < right[r]) {
			arr[i] = left[l];
			arr[i + 1] = left[l + 1];
			l += 2;
			i += 2;
		} else {
			arr[i] = right[r];
			arr[i + 1] = right[r + 1];
			r += 2;
			i += 2;
		}
	}
	while (l < left.length) {
		arr[i] = left[l];
		arr[i + 1] = left[l + 1];
		l += 2;
		i += 2;
	}
	while (r < right.length) {
		arr[i] = right[r];
		arr[i + 1] = right[r + 1];
		r += 2;
		i += 2;
	}
	// Use spread operators to create a new array, combining the three arrays
	return arr;
}

//TIME COMPLEXITY: O(n log n) - divides the array in two halves and takes linear time to merge two halves,
//this time a more complex comparison but each comparison is 0(1)
function mergeSortEdges(arr) {
	if (arr.length <= 1) return arr; // A single edge is already sorted
	const mid = Math.floor(arr.length / 2);

	// Recursive calls
	const left = mergeSortEdges(arr.slice(0, mid));
	const right = mergeSortEdges(arr.slice(mid));
	return mergeEdges(left, right);
}

//TIME COMPLEXITY: 0(n) - merging to the sorted array takes linear time
function mergeEdges(left, right) {
	const arr = []; // Result array
	let l = 0,
		r = 0;

	while (l < left.length && r < right.length) {
		if (left[l] === undefined) {
			//throw new Error("Left or right edge is undefined");
			l++;
			continue;
		}
		if (right[r] === undefined) {
			//throw new Error("Left or right edge is undefined");
			r++;
			continue;
		}
		const compare = compareElements(left[l], right[r]);

		switch (compare) {
			case "equal":
				if (left[l][4] < right[r][4]) {
					arr.push(left[l]);
					l++;
				} else {
					arr.push(right[r]);
					r++;
				}
				break;
			case "left":
				arr.push(left[l]);
				l++;
				break;
			case "right":
				arr.push(right[r]);
				r++;
				break;
		}
	}

	// Add remaining edges
	while (l < left.length) {
		arr.push(left[l]);
		l++;
	}
	while (r < right.length) {
		arr.push(right[r]);
		r++;
	}

	return arr;
}

//TIME COMPLEXITY: 0(1)
function compareElements(leftEdge, rightEdge) {
	for (let i = 0; i < 4; i++) {
		if (leftEdge[i] < rightEdge[i]) {
			return "left";
		} else if (leftEdge[i] > rightEdge[i]) {
			return "right";
		}
	}
	return "equal";
}
