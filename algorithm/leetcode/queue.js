/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
function MyCircularQueue(k) {
    this.queue = [];
    this.len = k;
    this.head = undefined;
    this.tail = undefined;
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if(this.len - this.queue.length > 0) {
        if(this.queue.length === 0) {
            this.head = this.tail =this.queue.push(value)-1;
            return true
        } else  {
            this.tail =this.queue.push(value)-1;
            return true
        }
    } else {
        return false;
    }
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if(this.queue.length >0) {
        this.queue.shift();
        --this.tail;
        return true;
    } else {
        return false;
    }
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if(this.queue.length <= 0 ) {
        return -1;
    } else {
        return this.queue[this.head];
    }
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if(this.queue.length > 0) {
        
        return this.queue[this.tail];
    }else {
        return -1;
    }
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    if(this.queue.length === 0) {
        return true;
    } else {
        return false;
    }
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    if(this.queue.length === this.len) {
        return true;
    } else {
        return false;
    }
};

/** 
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

let circularQueue = new MyCircularQueue(3); // 设置长度为 3

circularQueue.enQueue(1);  // 返回 true

circularQueue.enQueue(2);  // 返回 true

circularQueue.enQueue(3);  // 返回 true

circularQueue.enQueue(4);  // 返回 false，队列已满

circularQueue.Rear();  // 返回 3

circularQueue.isFull();  // 返回 true

circularQueue.deQueue();  // 返回 true

circularQueue.enQueue(4);  // 返回 true

circularQueue.Rear();  // 返回 4