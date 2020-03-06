/**
 * 第一种方法 通过增加entry, 分离两个模块的代码
 * @param {*} name 
 * @param {*} methods 
 */
// import _ from 'lodash'
// function step1 (name, methods) {
//   console.log(
//     _.join([name, methods],'-')
//   )
// }

// step1('step1', '通过增加entry')

// 问题在于 假设两个entry 都有相同的模块lodash，导致两个打包过的bundle都会有该模块
// 优化方法 splitChunksPlugin

function getComponent () {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then( _ => {
    let textNode = document.createTextNode(_.join(['textNode', 'import', 'ajax'], '-'))
    return textNode
  }).catch((err) => {
    console.log(err)
  })
}

setTimeout(function () {
  console.log('10s后启动')
  getComponent().then((textNode) => {
    document.body.appendChild(textNode)
  })  
}, 10000)
