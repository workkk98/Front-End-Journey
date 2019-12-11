//使用Symbol.iterator 实现iterator

var obj = {
    data: ['hello' , 'world'],
    [Symbol.iterator] () {
        const self = this;  //如果注释掉这一句 会出现TypeError: Cannot read property 'length' of undefined
        let index = 0;
        return {
            next () {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return {value:undefined , done:true}
                }
            }
        }
    }
}


for( let i of obj) {
    console.log(i);
}