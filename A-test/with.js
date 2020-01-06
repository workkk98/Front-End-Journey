var obj = {
  a: 'a'
}
// 作用是将代码的作用域设置到一个特定到对象中。
with(obj) {
  var a = a
}

console.log(a)

function buildSome (url) {
  const location = {
    href:  'www.apple.com'
  }
  with(location) {
    var newUrl = href+url
  }
  return newUrl
}

console.log(buildSome('?macpro=2019'))