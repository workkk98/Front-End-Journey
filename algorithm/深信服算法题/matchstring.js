var input = 'abc'
var pattern = 'a?'

function match (input, pattern) {
    var replace = pattern.replace(/\*|\?/g, function (match, m1) {
      if(match === '*') {
        return '[a-z0-9A-Z]+'
      }
      if(match === '?') {
        return '[a-z0-9A-Z]{1}$'
      }
    })
    var regx = new RegExp(replace)
    return input.match(regx) !== null ? 'match' : 'unmatch'
}

console.log(match(input, pattern))