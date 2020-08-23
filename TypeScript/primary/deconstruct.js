var array = [1, 2, 3, 4];
var b = array[1], c = array[3];
var api = {
    message: '',
    data: {}
};
var data = api.data, message = api.message;
// 两次的默认值
function f(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
//f({}); // error, 'a' is required if you supply an argument
