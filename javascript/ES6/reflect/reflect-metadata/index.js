"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function logType(target, key) {
    var t = Reflect.getMetadata('design:type', target, key);
    console.log(key + " type: " + t.name);
}
function logParamTypes(target, key) {
    var types = Reflect.getMetadata("design:paramtypes", target, key);
    var s = types.map(function (a) { return a.name; }).join();
    var returnTypes = Reflect.getMetadata("design:returntype", target, key);
    console.log(key + " param types: " + s);
    console.dir("returnTypes: " + returnTypes.name);
}
var prototype1;
// 这个函数原本是想用来证明
function normalDecorator(prototype, key) {
    console.log('origin func:', prototype[key]);
    Object.defineProperty(prototype, 'handler2', {
        value: 'handler2'
    });
    prototype1 = prototype;
}
var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.prototype.doSomething = function (param1, param2, param4, param6, param7) {
        return 1;
    };
    __decorate([
        logType,
        __metadata("design:type", String)
    ], Demo.prototype, "attr1", void 0);
    __decorate([
        logParamTypes // apply parameter decorator
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number, Object, Function, Function]),
        __metadata("design:returntype", Number)
    ], Demo.prototype, "doSomething", null);
    return Demo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.handler = function () {
    };
    __decorate([
        normalDecorator,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Bar.prototype, "handler", null);
    return Bar;
}());
var bar = new Bar();
console.log('handler', bar.handler);
// @ts-ignore
console.log('handler2', bar.handler2);
console.dir(Object.getPrototypeOf(bar) === prototype1);
delete prototype1.handler;
