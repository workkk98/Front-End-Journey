var a = false


async function checkPhoneNumber(params) {
    let promise = await checkPhone();

    console.log(promise);

    console.log(typeof a)

    console.log(a)
}

async function checkPhone(ms) {
    await new Promise(function (reslove) {
        setTimeout(function (params) {
            console.log("checkPhone"+a);
            reslove()
        },ms)
    })
    a = true
    console.log("checkPhone"+a)
    return Promise.resolve()
}

// checkPhoneNumber()

let pro = new Promise(function (params) {
    return {}
})
console.log(pro)