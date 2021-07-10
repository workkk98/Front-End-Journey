var LRUCache = function(capacity) {
  this.size = capacity;
  this.head = new Node('head', 0);
  this.tail = new Node('tail', 3001);

  this.head.next = this.tail;
  this.tail.prev = this.head;

  // hash表, key 映射到 链表中的位置
  this.map = new Map();
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  let node = this.map.get(key);
  if (!node) {
      return -1;
  }
  
  // 有的话就考虑刷新
  MoveToTail(node, this.tail);
  return node.value;
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  // 这里也需要刷新
  if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      MoveToTail(node, this.tail);
      return;
  }

  // 长度超过限制
  if (this.map.size === this.size) {
      const head = this.head.next;
      this.head.next = head.next;
      head.next.prev = this.head;
      this.map.delete(head.key);
  }

  const node = new Node(key, value);
  this.map.set(key, node);
  const tail = this.tail.prev;
  tail.next = node;
  node.prev = tail;
  node.next = this.tail;
  this.tail.prev = node;
};

function Node (key, value) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.next = null;
}


function MoveToTail (node, tail) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  tail.prev.next = node;
  node.prev = tail.prev;
  node.next = tail;
  tail.prev = node;
}

 const lru = new LRUCache(2)
lru.put(2, 1);
lru.put(1, 1);
lru.put(2, 3);
lru.put(4, 1);
lru.get(1);
lru.get(2);
