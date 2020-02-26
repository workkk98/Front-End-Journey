let cbsQueue = []
let timeout = null;
module.exports = function asap (cb) {
  cbsQueue.push(cb)
  if(!timeout) {
    timeout = setTimeout(function () {
      for(let i of cbsQueue) {
        i()
      }
      cbsQueue.length = 0;
      timeout = null;
    },0)
  }
}