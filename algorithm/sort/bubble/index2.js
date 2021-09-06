function bubleSort (arr) {
  let i = 0, position = 0;
  while (i < arr.length - 1) {
    for (let j = arr.length - 1; j > i; --j) {

      // 相邻的两个元素
      if (arr[j-1] > arr[j]) {
        swap(arr, j-1, j);
        position = j;
      }
    }

    // 本次没有交换任何元素，那么说明次序对了
    if (i == position) {
      return arr;
    }

    // position之前的元素次序都确定了。
    i = position;
  }

  return arr;
}

function swap (arr, left, right) {
  let temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

console.log(bubleSort([8, 2, 16, 10]));
