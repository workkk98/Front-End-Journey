/**
 * 7. If SameValue(resolution, promise) is true, then
 * a. Let selfResolutionError be a newly created TypeError object.
 * b. Return RejectPromise(promise, selfResolutionError).
 */

var p = new Promise((resolve) => {
  setTimeout(() => {
    resolve(p)
  }, 0);
});

p.then(() => {

}, (reason) => {
  console.log(reason);
  console.log('do something');
})
