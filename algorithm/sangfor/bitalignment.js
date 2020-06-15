// 位对齐

function align_n(hex, n) {
  if(hex === '0x80000000') {
    return '0x80000000'
  }
  hex = parseInt(hex, 16)
    // lastN代表hex最后的n位， add表示第n为为1的数
    var lastN = 0, add = 1, result
    var hexCopy = hex
    var flag = false
    for(var i = 0; i < n; i++) {
        var res = hex & 1
        var bitI = 1
        if(res === 1) {
            flag = true
            for(var j = 0; j < i; j++) {
              bitI = bitI << 1
            }
            lastN += bitI
        }
        hex = hex >>> 1
        add = add << 1
    }
    result = lastN ^ hexCopy
    if(flag === true) {
        result +=add
    }
    return '0x' + result.toString(16)
}


console.log(align_n('0x80000000', 30))