// 堆排

// 堆是一种完全二叉树结构， 构建大顶堆。
// length指整个堆的长度。
function heapify (arr, start, length) {
  if (start > length - 1) {
    return;
  }
  const left = 2 * start + 1,
        right = 2 * start + 2;

  // 这里很细节，用个temp变量来看到底是有没有被left或right修改。而且数组上的元素没有改动
  // temp永远指向最小的那个index
  let temp = start;

  // 注意是否超出长度
  if (left < length && arr[left] > arr[start]) {
    temp = left;
  }

  // 注意长度，以及**比对的是temp**
  if (right < length && arr[right] > arr[temp]) {
    temp = right;
  }

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

  // while (length > 0) {
  //   // 取大顶堆中第一个元素，替换到未排序队列的最后一个元素
  //   swap(arr, length - 1, 0);

  //   // 最后一个元素排序好了，所以length-1
  //   heapify(arr, 0, --length);
  // }

  return arr;
}

function swap (arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;  
}


function heapPush (arr, item, itemIndex) {
  if (itemIndex <= 0) {
      return;
  }

  function dfs (arr, itemIndex) {
      let parent = itemIndex % 2 === 0 ? (itemIndex - 2) / 2 : (itemIndex - 1) / 2;

      if (arr[itemIndex] > arr[parent]) {
          let temp = arr[itemIndex];
          arr[itemIndex] = arr[parent];
          arr[parent] = temp;
          dfs(arr, parent);
      }
  }
  arr[itemIndex] = item;
  dfs(arr, itemIndex);
}

const arr = heapSort([4, 3, 6, 7], 4);
console.log(arr);
heapPush(arr, 10, arr.length);

console.log(arr);