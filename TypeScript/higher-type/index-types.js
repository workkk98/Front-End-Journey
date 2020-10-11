function pluck(o, names) {
    return names.map(function (n) { return o[n]; });
}
var person = {
    name: 'Jarid',
    age: 35
};
var strings = pluck(person, ['name']); // ok, string[]
var personKey = 'name';
var keys; // string
var value; // number
/**
 * 萃取data中的内容，并加工。
 * @param data
 * @param key
 */
function pluckData(data, map) {
    var newData = {};
    Object.entries(data).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        newData[key] = map[key] ? map[key](value) : value;
    });
    return newData;
}
var me = {
    name: 'zhang',
    age: 16
};
var meMap = {
    age: function (value) { return value + 'years old'; }
};
console.log(pluckData(me, meMap));
