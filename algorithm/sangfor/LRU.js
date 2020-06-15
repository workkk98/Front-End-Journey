function Node (key, val) {
  this.key = key
  this.val = val
  this.before = null
  this.after = null
}

Node.prototype.setBefore = function (node) {
  this.before = node
}

Node.prototype.setAfter = function (node) {
  this.after = node
}

function DoubleList (capacity, hash) {
  this.capacity = capacity
  this.hash = hash
  this.size = 0
  this.head = new Node('head', null)
  this.tail = new Node('tail', null)
  this.head.setAfter(this.tail)
  this.tail.setBefore(this.head)
}

DoubleList.prototype.remove = function removeNode (key) {
  var node = this.hash[key]
  node.before.setAfter(node.after)
  node.after.setBefore(node.before)
  this.size--
  this.hash[key] = null
  return node
}

DoubleList.prototype.removeLast = function removeLastNode () {
  var node = this.tail.before
  this.remove(node.key)
}

DoubleList.prototype.addFirst = function addFirstNode (node) {
  var old = this.head.after
  this.head.after = node
  node.before = this.head

  node.after = old
  old.before = node
  this.size++
  this.hash[node.key] = node
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.hash = {}
  this.doubleList = new DoubleList(capacity, this.hash)
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if(this.hash[key]) {
    let node = this.hash[key]
    this.put(key, node.val)
    return node.val
  } else {
    return -1
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  var node = new Node(key, value)
  // 如果哈希表中存在，则把节点挪到队头
  if(this.hash[key]) {
    this.doubleList.remove(key)
    this.doubleList.addFirst(node)
  } else {
    // 超过容纳数，去掉队尾节点后，新的节点加到队头
    if(this.doubleList.size === this.capacity) {
      this.doubleList.removeLast()
      this.doubleList.addFirst(node)
    } else {
      this.doubleList.addFirst(node)
    }
  }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

 const lru = new LRUCache(2)
 lru.put(2, 1)
 lru.put(2, 2)
 console.log(lru.get(2))
 lru.put(1, 1)
 lru.put(4, 1)
 console.log(lru.get(2))