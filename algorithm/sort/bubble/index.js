function bubble1 (arr) {
  for (let i = 0; i < arr.length - 1; ++i) {
    for (let j = arr.length - 1; j > i; --j) {
      if (arr[j-1] > arr[j]) {
        swap(arr, j-1, j);
      }
    }
  }
  return arr;
}

function swap (arr, left, right) {
  let temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

console.log(bubble1([8, 2, 16, 10]));