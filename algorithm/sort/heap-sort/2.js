// 堆排

// 堆是一种完全二叉树结构， 构建大顶堆。
// length指整个堆的长度。
function heapify (arr, start, length) {
  if (start > length - 1) {
    return;
  }
  const left = 2 * start + 1,
        right = 2 * start + 2;
  let temp = start;

  // 注意是否超出长度
  if (left < length && arr[left] > arr[start]) {
    temp = left;
  }

  // 注意长度，以及比对的是temp
  if (right < length && arr[right] > arr[temp]) {
    temp = right;
  }

  console.log(arr[start], arr[left], arr[right]);
  if (temp !== start) {
    swap(arr, start, temp);
    heapify(arr, temp, length);
  }

  return arr;
}

function heapSort (arr, length) {
  let lastIndex = length - 1;

  // 为什么要lastIndex + 1,因为求父节点比较方便。
  let start = Math.floor((lastIndex + 1) / 2) - 1;

  // 排序好了
  while (start >= 0) {
    heapify(arr, start, length);
    --start;
  }

  while (length > 0) {
    // 取大顶堆中第一个元素，替换到未排序队列的最后一个元素
    swap(arr, length - 1, 0);

    // 最后一个元素排序好了，所以length-1
    heapify(arr, 0, --length);
    console.log('after heapify', arr);
  }
}

function swap (arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;  
}

// const arr = [1, 7, 3, 9, 2]
// heapSort(arr, 5)
// console.log(arr);

console.log(heapify([4, 3, 6, 7], 3, 4))