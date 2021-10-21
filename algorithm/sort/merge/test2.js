function mergeSort (arr, left, right, temp = []) {
  if (left === right) {
    return;
  }

  let middle = Math.floor((right - left) / 2 + left);
  mergeSort(arr, left, middle, temp);
  mergeSort(arr, middle + 1, right, temp);

  merge(arr, left, middle, right, temp);
  return arr;
}

function merge (arr, left, middle, right, nums) {
  // 第一遍写的时候，直接考虑复制整个数组了没必要。可以这样子(必须要拷贝一份，因为原地排序可能会污染源数组)
  for (let i = left; i <= right; ++i) {
    nums[i] = arr[i];
  }
  let min = Math.min((middle - left + 1), right - middle);
  let start = left;
  let leftStart = left;
  let rightStart = middle + 1;
  for (let i = 0; i < min; ++i) {
    if (nums[leftStart] < nums[rightStart]) {
      arr[start++] = nums[leftStart++];
    } else {
      arr[start++] = nums[rightStart++];
    }
  }

  while (leftStart <= middle) {
    arr[start++] = nums[leftStart++]
  }

  while (rightStart <= right) {
    arr[start++] = nums[rightStart++]
  }
}

module.exports = (arr) => {
  return mergeSort(arr, 0, arr.length - 1);
};