#### 控制台
> console对象的各种方法向控制台中进行标准输出流与标准错误输出流的输出


**log和info**

```
console.log("%d", [arguments]) 指定输出格式
```

console.log方法与console.info()方法 作用和使用方法完全相同


**error和warn**

console.error方法与console.warn方法 作用和使用方法完全相同

**dir**

查看对象内容，并输出

**time和timeEnd**

参数为同一个字符串,输出运行时间
例如
```
console.time('IO')

for(var i = 0 ; i< 1000 ; i++ ) {

}

console.timeEnd('IO')
```

**trace**
```
console.trace('任意字符串')
// Trace: 任意字符串
    at Object.<anonymous> (/Users/zhanghefan/Desktop/web/web_study/node/console/index.js:17:9)
    at Module._compile (internal/modules/cjs/loader.js:959:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
    at Module.load (internal/modules/cjs/loader.js:815:32)
    at Function.Module._load (internal/modules/cjs/loader.js:727:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
    at internal/main/run_main_module.js:17:11
```

**assert** 中文:断言
评估参数结果
```
console.assert('abc' === 3)

// Assertion failed
```