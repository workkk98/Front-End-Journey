"use strict";
import 'reflect-metadata';

function logType (target: any, key: string) {
  let t = Reflect.getMetadata('design:type', target, key);
  console.log(`${key} type: ${t.name}`);
}

function logParamTypes(target : any, key : string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key);
  var s = types.map(a => a.name).join();
  let returnTypes = Reflect.getMetadata("design:returntype", target, key);
  console.log(`${key} param types: ${s}`);
  console.dir(`returnTypes: ${returnTypes.name}`)
}

type TPDstr = TypedPropertyDescriptor<string>

let prototype1;

// 这个函数原本是想用来证明使用装饰器会调用metadta函数，使得Reflect可以从中获取元信息
function normalDecorator (prototype: any, key: string) {
  console.log('origin func:', prototype[key]);
  Object.defineProperty(prototype, 'handler2', {
    value: 'handler2'
  })

  prototype1 = prototype;
}

class Demo {
  @logType
  public attr1: string;

  @logParamTypes // apply parameter decorator
  doSomething(
    param1 : string,
    param2 : number,
    param4 : { test : string },
    param6 : Function,
    param7 : (a : number) => void,
  ): number { 
      return 1
  }
}

class Bar {
  @normalDecorator
  public handler () {

  }
}

let bar = new Bar();
console.log('handler', bar.handler);

// @ts-ignore
console.log('handler2', bar.handler2);
console.dir(Object.getPrototypeOf(bar) === prototype1);

// 输出
// attr1 type: String
// doSomething param types: String,Number,Object,Function,Function
// 'returnTypes: Number'