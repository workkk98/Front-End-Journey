// 这里我感觉就像 使用了with() {}
//console.log("WorkerGlobalScope",this);

// 有意思的函数 是个同步函数
importScripts("/utils.js")

console.log("通过importScripts 引入", sum(1,2));
postMessage("from worker: hello world")

onmessage = function (e) {
  console.log("URL contetns: " + e.data);
}