var input = 'abc'

function orderOfStack (input, index, result, stack) {
    // 超出访问范围时
    if(index === input.length) {
        return [result + stack.reverse().join('')]
    }
    var orderList3 = []
    // 可能有这种情况 先要栈中的顶层元素弹出
    if (stack.length > 0) {
        var stack3 = stack.slice(0)
        orderList3 = orderOfStack(input, index, result + stack3.pop(), stack3)
    }
    var currChar = input[index]
    // 该字符出栈
    var orderList = orderOfStack(input, index+1, result+currChar, stack.slice(0))
    // 该字符入栈
    var stack2 = stack.slice(0)
    stack2.push(currChar)
    var orderList2 = orderOfStack(input, index+1, result, stack2)
    return orderList3.concat(orderList, orderList2)
}

// 处理重复的数组
function handleRepeat (array) {
    var cleanArray = []
    for(var i = 0; i < array.length; i++) {
        // 如果cleanArray已经有该元素了
        if(cleanArray.findIndex(function (val) {
            return val === array[i]
        }) > -1) {
            continue
        } else {
            cleanArray.push(array[i])
        }
    }
    return cleanArray
}

var array = orderOfStack(input, 0, '', [])
handleRepeat(array).forEach(function (val) {
    console.log(val)
})