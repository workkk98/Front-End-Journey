关于 origin文件夹的一些说明

node/modules里有promise源码
下面记录一些它的字段的用途

promise = {
  _h: 指这个promise跟的then有几个
  _i : 状态 pending ， onfullfilled ， onrejected,
  _j : newValue 通过resolve(newValue) return newValue
  _k : Handler对象 有 成功和失败的回调 有下一个promise对象
}