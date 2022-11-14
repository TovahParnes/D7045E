function merge(left, right) {
	let sortedArr = []; // the sorted items will go here
	while (left.length && right.length) {
		// Insert the smallest item into sortedArr
		if (left[0] == right[0]) {
			if (left[1] < right[1]) {
				sortedArr.push(left.shift());
				sortedArr.push(left.shift());
			} else {
				sortedArr.push(right.shift());
				sortedArr.push(right.shift());
			}
		}
		if (left[0] < right[0]) {
			sortedArr.push(left.shift());
			sortedArr.push(left.shift());
		} else {
			sortedArr.push(right.shift());
			sortedArr.push(right.shift());
		}
	}
	// Use spread operators to create a new array, combining the three arrays
	return [...sortedArr, ...left, ...right];
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

//pointCoords = new Float32Array(2 * 6);
//pointCoords = [3.0, 5.0, 5.0, 1.0, 8.0, 9.0, 5.0, 2.0, 99.0, 68.0, 1.0, 8.0];
//console.log(pointCoords);

//pointCoords = mergeSort(pointCoords); // [1, 8, 3, 5, 5, 1, 5, 2, 8, 9, 99, 68]
//console.log(pointCoords);
