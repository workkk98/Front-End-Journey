"use strict";
exports.__esModule = true;
// observable.ts stays the same
// map.ts
var observable_1 = require("./observable");
observable_1.Observable.prototype.map = function (f) {
    // ... another exercise for the reader
    var res = f(this.value);
    return new observable_1.Observable(res);
};
