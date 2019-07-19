let obj = {
    a:'a'
};

let proxy = new Proxy(obj,{
    get(target, property) {
        return "default";
    }
});

console.log("obj.a="+obj.a);        //原对象无作用
console.log("proxy.a="+proxy.a);    //对proxy实例访问进行拦截


/**
 * get(target,property,[proxy] 依次是目标对象，属性名，以及proxy 实例本身（严格地说，是操作行为所针对的对象）
 * 省略一些方法 ， 这部分内容回来在看
 * 
 * 
 * 
 * 
 * 
 * proxy代理下 ，对象中的this会指向Proxy代理
 */