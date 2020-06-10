function Node (val) {
  this.val = val
  this.left = null
  this.right = null
}

var n = 3
var heap = [
0,
1,
2,
3,
'#',
'#',
4,
'#',
5,
6,
'#'
]

function main (heap) {
  var head = indexTree(heap)
  var result = []
  DFS(head, result)
  return result
}
// 建树
function indexTree (heap) {
  var head
  var current, count = 0
  for(var i = 0; i < heap.length; i++) {
      var node
      if(heap[i] === '#') {
          node = null
      } else {
          node = new Node(heap[i])
      }
      heap[i] = node
      while(heap[current] === null) {
          current++
      }
      if(i === 0) {
          head = node
          current = 0
      } else {
        // count控制左右节点的赋值
        if(count === 0) {
          heap[current].left = node
        } else {
          heap[current++].right = node
        }
        count = 1 - count
      }
  }
  return head
}

function DFS (node, result) {
  if(node === null) {
    result.push('#')
    return
  }
  result.push(node.val)
  DFS(node.left, result)
  DFS(node.right, result)
}

console.log(main(heap))