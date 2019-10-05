async function http(params) {
    console.log(2)
    let res;
    res = await new Promise(function (resolve,reject) {
        setTimeout(function (params) {
            resolve("这是伪装的response");
        },1000)
    });
    console.log(res);
}

console.log(1)
http();
console.log(3)