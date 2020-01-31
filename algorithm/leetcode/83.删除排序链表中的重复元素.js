var deleteDuplicates = function(head) {
  if(head == null) {
    return head;
  }
  let currentNode = head;
  while(currentNode.next) {
    if(currentNode.val === currentNode.next.val) {
      currentNode.next = currentNode.next.next;
    } else {
      currentNode = currentNode.next;
    }
  }
  return head
};

// 事实上做的并不好 稍微优化了一些也没有特别棒的感觉 才击败了43%的运行速度:(