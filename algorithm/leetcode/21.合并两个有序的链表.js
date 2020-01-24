/**
 * 解题主要思路，通过指针，不断指向最小的节点，返回新的长链
 * @param {*} l1 
 * @param {*} l2 
 */

var mergeTwoLists = function(l1, l2) {
  let head = null , newChain = null;
  if(l2=== null || l1 === null) {
    return l1 || l2;
  }
  if( l1.val <= l2.val ) {
    head = newChain = l1;
    l1 = l1.next;
  } else {
    head =  newChain = l2;
    l2 = l2.next;
  }
  while(l1 !== null || l2!== null) {
    if(l1 === null ) {
      head.next = l2;
      break;
    }
    if(l2 === null ) {
      head.next = l1;
      break;
    }
    if(l1.val <= l2.val) {
      head.next = l1;
      l1 = l1.next;
      head = head.next
    } else {
      head.next = l2;
      l2 = l2.next;
      head = head.next;
    }
  }
  return newChain
};