// LRU = Least Rencently Used，缓存淘汰策略(最少的最近使用)
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

function LRUCache(limit) {
  this.limit = limit
  this.hash = {}
  this.doubleList = new DoubleList(limit, this.hash)
}

function DoubleList (limit, hash) {
  this.limit = limit
  this.hash = hash
  this.size = 0
  this.head = new Node('head', null)
  this.tail = new Node('tail', null)
  this.head.setAfter(this.tail)
  this.tail.setBefore(this.head)
}

LRUCache.prototype.get = function getNode (key) {
  if(this.hash[key]) {
    let node = this.hash[key]
    this.set(key, node.val)
    return node.val
  } else {
    return -1
  }
}

LRUCache.prototype.set = function setNode (key, val) {
  var node = new Node(key, val)
  // 如果哈希表中存在，则把节点挪到队头
  if(this.hash[key]) {
    var node = this.doubleList.remove(key)
    this.doubleList.addFirst(node)
  } else {
    // 超过容纳数，去掉队尾节点后，新的节点加到队头
    if(this.doubleList.size === this.limit) {
      this.doubleList.removeLast()
      this.doubleList.addFirst(node)
    } else {
      this.doubleList.addFirst(node)
    }
  }
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


var LRU = new LRUCache(3)

LRU.set(1, 2)
LRU.set(2, 3)
LRU.set(3, 4)
console.log(LRU.get(1))
console.log(LRU.get(4))
LRU.set(4, 5)
console.log(LRU.get(2))
