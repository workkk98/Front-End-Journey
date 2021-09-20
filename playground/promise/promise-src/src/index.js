const asap = require('./asap')
// promise是个构造函数
// 0表示pending , 1表示fulfilled , 2表示 reject
var _Promise = function _PromiseFun(excutor) {
  // 判断excutor的类型
  if(typeof excutor !== 'function') {
    throw new TypeError('excutor is not a function')
  }
  // 使用私有变量 存储 状态以及传递值
  this._promiseStatus = 0, this._promiseValue,this.handlers = [];
  var resolve = (value)  => {
    this._promiseStatus = 1;
    this._promiseValue = value;
    doResolve(this)
  }
  var reject = (error) => {
    this._promiseStatus = 2;
    this._promiseValue = error;
    doResolve(this)
  }
  try{
    excutor(resolve,reject)
  } catch (err) {
    console.log(err.message)
  }

}

_Promise.prototype.then = function _then(fulCb , rejCb) {
  // 返回一个新的promise对象
  const deferred = new _Promise(noop);
  handle.call(this, fulCb, rejCb, deferred)
  return deferred;
}

// 空函数
function noop () {}

// 判断promise对象的状态 分别是成功的回调 失败的回调和 下一个的promise
function handle(fulCb, rejCb, deferred) {
  // 如果 是pending状态
  if(this._promiseStatus === 0) {
    this.handlers.push({
      fulCb,
      rejCb,
      deferred:deferred
    })
  }
  // 假如 是fulfilled状态
  if(this._promiseStatus === 1) {
    handleResolve(fulCb, this._promiseValue, deferred)
  }
  if(this._promiseStatus === 2) {
    handleResolve(rejCb, this._promiseValue,deferred)
  }
}

// 处理promise对象的then
function handleResolve(cb, _promiseValue, deferred) {
  // 加入到异步队列中
 asap(function () {
  let ret = cb(_promiseValue);
  // ret决定了 deferred这个promise对象的状态
 })
}

// 复用handle
function doResolve(promise,value) {
  if(promise.handlers.length > 0) {
    for(let handler of promise.handlers) {
      handle.call(promise, handler.fulCb, handler.rejCb, handler.deferred)
    }
  }
}

module.exports = _Promise;