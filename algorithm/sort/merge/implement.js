function ListNode (val) {
  this.val = val;
  this.next = null;
}

const merge = (head1, head2) => {
  const dummyHead = new ListNode(0);
  let temp = dummyHead, temp1 = head1, temp2 = head2;
  while (temp1 !== null && temp2 !== null) {
      if (temp1.val <= temp2.val) {
          temp.next = temp1;
          temp1 = temp1.next;
      } else {
          temp.next = temp2;
          temp2 = temp2.next;
      }
      temp = temp.next;
  }
  if (temp1 !== null) {
      temp.next = temp1;
  } else if (temp2 !== null) {
      temp.next = temp2;
  }
  return dummyHead.next;
}

function mergeSort (head) {
  if (head === null) return head;
  const dummyHead = new ListNode();
  dummyHead.next = head;
  let length = 0;
  while (head !== null) {
    ++length;
    head = head.next;
  }
  for (let subLength = 1; subLength < length; subLength *= 2) {
    // 每次循环都是从头开始，求一个head1和head2
    let prev = dummyHead;

    while (prev.next !== null) {
      // head1就是第一个节点了
      let head1 = prev.next;
      let curr = head1;

      // 用来保证链表的长度不超过subLength
      let count = 1;

      // 避免某个子链表超出
      while (count < subLength && curr.next !== null) {
        curr = curr.next;
        count++;
      }

      // 此时curr指向head1的最后一个节点。
      let head2 = curr.next;
      // 完成了head1构建
      curr.next = null;

      // 接着构建head2
      curr = head2;
      // 重置下
      count = 1;
      // head2可能就是个null
      while (count < subLength && curr !== null && curr.next !== null) {
        curr = curr.next;
        count++;
      }

      // curr可能是null 或是 node
      let next = null;
      if (curr !== null) {
        next = curr.next;
        curr.next = null;
      }

      curr = merge(head1, head2);
      prev.next = curr;
      // 取最后一个节点
      while (curr.next !== null) {
        curr = curr.next;
      }
      curr.next = next;
      // 指向最后一个节点
      prev = curr;
    }
  }

  return dummyHead.next;
}