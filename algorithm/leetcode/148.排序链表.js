var sortList = function(head) {
  let nodes = [];
  while (head !== null) {
      nodes.push(head);
      head = head.next;
  }

  function quickSort (arr, start, end) {
      if (start >= end ) {
          return;
      }
      let pivot = Math.round((end - start) / 2 + start);
      let pivotValue = nodes[pivot].val;

      // 因为要原地排序
      // 交换位置
      swap(arr, pivot, end);
      let index = helper(nodes, start, end, pivotValue);

      // 再交换回来
      swap(arr, index, end);

      quickSort(arr, start, index - 1);
      quickSort(arr, index + 1, end);
  }

  function helper (nodes, start, end, pivotValue) {
      let slow = start,
          quick = start;
      
      // 不需要考虑end
      for (; quick < end; ++quick) {
          let val = nodes[quick].val;

          if (val < pivotValue) {
              swap(nodes, slow++, quick);
          }
      }

      return slow;
  }

  quickSort(nodes, 0, nodes.length - 1);

  for (let i = 0; i < nodes.length; ++i) {
      let curr = nodes[i];
      curr.next = nodes[i + 1]
      if (i === nodes.length - 1) {
          curr.next = null;
      }
  }

  return nodes[0];
};

function swap (nodes, i, j) {
  let temp = nodes[i];
  nodes[i] = nodes[j];
  nodes[j] = temp;
}

var head = {
  val: 3,
  next: {
    val: 4,
    next: {
      val: 1,
      next: null
    }
  }
}

let node = sortList(head);
console.log(node);