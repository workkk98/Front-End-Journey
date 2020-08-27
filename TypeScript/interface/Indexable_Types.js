// Indexable Types = 可索引的类型
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
// 这个索引代表了，当用number去索引StringArray时会得到string类型的返回值。
// TypeScript支持两种索引签名：字符串和数字, 但是数字索引的返回值必须是字符串索引返回值类型的子类型
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，也就是说两者返回的东西得一致，
// 否则会出现问题。
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var myArray2 = ["Alice", "Bob"];
myArray2[2] = "Mallory"; // error!
myArray2['Myallory'] = 222;
// 防止对索引指向的值赋值？
