const loaderUtils = require('loader-utils')
const hljs = require('highlight.js')
hljs.registerLanguage('html', require('highlight.js/lib/languages/javascript'));

module.exports = function (source) {  
  // 起步
  const options = loaderUtils.getOptions(this) // this指向webpack
  // console.log(options) // 对象
  console.log("source: ", source) // 经html-loader转换后 返回string

  // 捕获script
  let pattern = /\"(.*)\"/, index = 0;
  const htmlString = source.match(pattern)[1]; //获取markdown转换的html文本
  pattern = /<pre>.*<\/pre>/g;
  let formatHTML = htmlString.replace(pattern, function (match,m1,m2) {
    let hljsObj = hljs.highlight('javascript', match);
    return hljsObj.value
  })
  // console.log("formatHTML: ", formatHTML)
  // return source.replace(/(<pre>)(.*)(<\/pre>)/, function (match,m1,m2,m3) {
  //   console.log(m1,m2,m3)
  //   return m1+m3
  // })
  return `module.exports = "<div>带有prettierscript印记的标签</div>${htmlString}";`
}