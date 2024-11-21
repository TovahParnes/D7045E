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

function mergeEdges(left, right) {
	let arr = new Float32Array(left.length + right.length); // the sorted items will go here
	let i = 0,
		l = 0,
		r = 0;
	//The while loops check the conditions for merging

	while (l < left.length && r < right.length) {
		if (left[l] == right[r]) {
			compare = "equal";
		}
		if (left[l] < right[r]) {
			compare = "left";
		} else {
			compare = "right";
		}

		switch (compare) {
			case "equal":
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
				break;
			case "left":
				arr[i] = left[l];
				arr[i + 1] = left[l + 1];
				l += 2;
				i += 2;
				break;
			case "right":
				arr[i] = right[r];
				arr[i + 1] = right[r + 1];
				r += 2;
				i += 2;
			default:
				break;
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

function mergeSortEdges(arr) {
	if (arr.length <= 2) return arr;
	let mid = Math.floor(arr.length / 2);
	mid = mid % 2 === 0 ? mid : mid + 1;
	// Recursive calls
	let left = mergeSortEdges(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}
