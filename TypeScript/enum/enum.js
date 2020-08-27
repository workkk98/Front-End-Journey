var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var e = Color.Green;
var eIndex = Color[1];
console.log(e);
console.log(eIndex);
// enum枚举类型的实质，就是把花括号里的当成string，并从0开始映射string(当让你可以选择)
var company;
(function (company) {
    company["apple"] = "us";
    company["tencent"] = "china";
    company["bbc"] = "uk";
})(company || (company = {}));
