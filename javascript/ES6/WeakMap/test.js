let foo = {};
let bar = new Array(5 * 1024 * 1024);

let wm = new WeakMap();
wm.set(foo, bar);

bar = null;