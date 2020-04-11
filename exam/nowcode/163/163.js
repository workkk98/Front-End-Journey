function getInnerText(html, selector) {
    var element = '', stack = [], start, end;
    for(let i = 0; i < html.length; i ++) {
        if(html[i] == "<") {
            end = i -1;
            if(start && end) {
                if(html.slice(start, end+1) !== "") {
                    stack.push(html.slice(start, end+1))
                }
            }
            start = i
        }
        if(html[i] == ">") {
            end = i
            stack.push(html.slice(start, end+1))
            start = end+1
        }
    }
    var count = 0, innerText = ''
    var patternStart = new RegExp('<'+selector+'.*'+'>'),patternEnd = new RegExp('</'+selector+'.*'+'>'), notTag = new RegExp('<.*>')
    for(let i =0; i < newStack.length; i++) {
        if(patternStart.test(newStack[i])) {
            count++
        }
        if(patternEnd.test(newStack[i])) {
            count--
            if(count == 0) {
                break;
            }
        }
        if(count>0 && !notTag.test(newStack[i])) {
            innerText +=newStack[i]
        }
    }
    return innerText
}
console.log(getInnerText('<div class="demo1"><p><p>害 我真是太菜了</p>阴阳师</p></div>',  'p'))

// function flat(arr) {
//   var result = [];
//   for(let i of arr) {
//       if(Array.isArray(i)) {
//           result = result.concat(flat(i))
//       } else {
//           result.push(i)
//       }
//   }
//   return Array.from(new Set(result))
// }

// console.log(flat([1,[[2,true],false],[['3'],4],[2,1,null]]))