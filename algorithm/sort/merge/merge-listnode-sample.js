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

var sortList = function(head) {
  if (head === null) {
      return head;
  }
  let length = 0;
  let node = head;
  // 统计数量
  while (node !== null) {
      length++;
      node = node.next;
  }
  // 哑节点
  const dummyHead = new ListNode(0, head);

  // subLength指数倍增长
  for (let subLength = 1; subLength < length; subLength <<= 1) {
      let prev = dummyHead, curr = dummyHead.next;
      while (curr !== null) {
          let head1 = curr;

          // i代表长度，尾部需要单独处理下，但要保证curr始终指向一个node节点
          for (let i = 1; i < subLength && curr.next !== null; i++) {
              curr = curr.next;
          }

          // head2指向合并的第二个链表
          let head2 = curr.next;
          curr.next = null;
          curr = head2;

          // 也是取出subLength的长度，但要小心可能head2本身就是个null
          for (let i = 1; i < subLength && curr != null && curr.next !== null; i++) {
              curr = curr.next;
          }

          // 下个循环开始的节点。
          let next = null;
          if (curr !== null) {
              next = curr.next;
              curr.next = null;
          }

          // head1和head2指向的有序链表的合并
          const merged = merge(head1, head2);

          // prev就是该子链表的第一个节点
          prev.next = merged;

          // prev设置为合并完子链表的最后一个节点
          while (prev.next !== null) {
              prev = prev.next;
          }
          curr = next;
      }
  }
  return dummyHead.next;
};