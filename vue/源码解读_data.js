function Vue(params) {
    
}


Vue.prototype._initData = function () {
    var dataFn = this.$options.data
    //初始化data，假如返回的是对象 ， 那么只是浅拷贝了this.$options.data
    var data = this._data = dataFn ? dataFn() : dataFn|| {}
    if (!isPlainObject(data)) {
      data = {}
      process.env.NODE_ENV !== 'production' && warn(
        'data functions should return an object.',
        this
      )
    }
    var props = this._props
    // proxy data on instance
    var keys = Object.keys(data)
    var i, key
    i = keys.length
    while (i--) {
      key = keys[i]
      // there are two scenarios where we can proxy a data key:
      // 1. it's not already defined as a prop-> 未在prop属性中定义
      // 2. it's provided via a instantiation option AND there are no
      //    template prop present
      if (!props || !hasOwn(props, key)) {
        this._proxy(key)
      } else if (process.env.NODE_ENV !== 'production') {
        warn(
          'Data field "' + key + '" is already defined ' +
          'as a prop. To provide default value for a prop, use the "default" ' +
          'prop option; if you want to pass prop values to an instantiation ' +
          'call, use the "propsData" option.',
          this
        )
      }
    }
    // observe data
    observe(data, this)
  }
//_proxy函数就是把vue实例中的 vm.key通过difineProperty()，直接访问vm._data
Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
        // need to store ref to self here
        // because these getter/setters might
        // be called by child scopes via
        // prototype inheritance.
        var self = this
        Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter () {
            return self._data[key]
        },
        set: function proxySetter (val) {
            self._data[key] = val
        }
        })
    }
}

//value即data对象
function observe (value, vm) {
  if (!value || typeof value !== 'object') {
    return
  }
  var ob //首先判断 value 是否已经添加了 ob 属性，它是一个 Observer 对象的实例。如果是就直接用
  if (
    hasOwn(value, '__ob__') &&
    value.__ob__ instanceof Observer
  ) {
    ob = value.__ob__
  } else if (
    shouldConvert &&
    (isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (ob && vm) {
    ob.addVm(vm)
  }
  return ob
}

//value即data对象
function Observer (value) {
  this.value = value
  this.dep = new Dep()
  //创建dep对象 
  //把自身this添加到value的ob属性上
  def(value, '__ob__', this)
  //最后对 value 的类型进行判断，如果是数组则观察数组，否则观察单个元素。
  //其实 observeArray 方法就是对数组进行遍历，递归调用 observe 方法，最终都会调用 walk 方法观察单个元素。
  if (isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    //对data的每一个属性进行遍历
    this.walk(value)
  }
}

//obj即value对象
Observer.prototype.walk = function (obj) {
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      this.convert(keys[i], obj[keys[i]])
    }
  }
//this.value即是data对象
Observer.prototype.convert = function (key, val) {
    defineReactive(this.value, key, val)
}

/**
 * 
 * @param {data对象} obj 
 * @param {*} key 
 * @param {*} val 
 */
function defineReactive (obj, key, val) {
  var dep = new Dep()
  var property = Object.getOwnPropertyDescriptor(obj, key)//    返回该属性的配置 读enumerable 删configurable 写writable
  if (property && property.configurable === false) {
    return
  }
  // cater for pre-defined getter/setters
  var getter = property && property.get
  var setter = property && property.set
  var childOb = observe(val) //深层次遍历
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i]
            e && e.__ob__ && e.__ob__.dep.depend()
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val
      if (newVal === value) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = observe(newVal)
      dep.notify()
    }
  })
}


function Dep () {
  this.id = uid++
  this.subs = []
}
// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null

Dep.prototype.depend = function () {
  Dep.target.addDep(this)
}


Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs)
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}