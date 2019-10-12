//
Vue.prototype._compile = function (el) {
    var options = this.$options
    // transclude and init element
    // transclude can potentially replace original
    // so we need to keep reference; this step also injects
    // the template and caches the original attributes
    // on the container node and replacer node.
    var original = el
    el = transclude(el, options) //通过该方法把 template 编译成一段 document fragment,拿到el对象
    this._initElement(el)
    // handle v-pre on root node (#2026)
    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
      return
    }
    // root is always compiled per-instance, because
    // container attrs and props can be different every time.
    var contextOptions = this._context && this._context.$options
    var rootLinker = compileRoot(el, options, contextOptions)
    // resolve slot distribution
    resolveSlots(this, options._content)
    // compile and link the rest
    var contentLinkFn
    var ctor = this.constructor
    // component compilation can be cached
    // as long as it's not using inline-template
    if (options._linkerCachable) {
      contentLinkFn = ctor.linker
      if (!contentLinkFn) {
        contentLinkFn = ctor.linker = compile(el, options)  //指令解析
      }
    }
    // link phase
    // make sure to link root with prop scope!
    var rootUnlinkFn = rootLinker(this, el, this._scope)
    var contentUnlinkFn = contentLinkFn
      ? contentLinkFn(this, el)
      : compile(el, options)(this, el)
    // register composite unlink function
    // to be called during instance destruction
    this._unlinkFn = function () {
      rootUnlinkFn()
      // passing destroying: true to avoid searching and
      // splicing the directives
      contentUnlinkFn(true)
    }
    // finally replace original
    if (options.replace) {
      replace(original, el)
    }
    this._isCompiled = true
    this._callHook('compiled')
}

//compile方法 通过compileNode来完成节点的解析，
//如果节点有子节点则调用compileNodeList(el.childNodes, options) 方法完成子节点的解析
//
function compile (el, options, partial) {
  // link function for the node itself.
  var nodeLinkFn = partial || !options._asComponent
    ? compileNode(el, options)  
    : null
  // link function for the childNodes
  var childLinkFn =!(nodeLinkFn && nodeLinkFn.terminal) &&!isScript(el) && el.hasChildNodes()
      ? compileNodeList(el.childNodes, options)
      : null

      //nodeLinkFn和childLinkFn都是compileNode或调用compilNodeList返回的函数或函数集合
  /**
   * A composite linker function to be called on a already
   * compiled piece of DOM, which instantiates all directive
   * instances.
   *
   * @param {Vue} vm
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host] - host vm of transcluded content
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - link context fragment
   * @return {Function|undefined}
   */
  return function compositeLinkFn (vm, el, host, scope, frag) {
    // cache childNodes before linking parent, fix #657
    var childNodes = toArray(el.childNodes)
    // link
    var dirs = linkAndCapture(function compositeLinkCapturer () {
      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag)  //nodeLinkFn === textNodeLinkFn
      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag)
    }, vm)
    return makeUnlinkFn(vm, dirs)
  }
}
//通过调用 compile 过程中生成的 link 方法创建指令对象，再对指令对象做一些绑定操作。
function linkAndCapture (linker, vm) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // reset directives before every capture in production
    // mode, so that when unlinking we don't need to splice
    // them out (which turns out to be a perf hit).
    // they are kept in development mode because they are
    // useful for Vue's own tests.
    vm._directives = []
  }
  var originalDirCount = vm._directives.length
  linker() //linker === compositeLinkCapturer
  //调用linker方法，遍历compile过程中生成的所有linkFn  
  //本例中会调用到之前定义的 textNodeLinkFn。这个方法会遍历 tokens
  //判断如果 token 的 tag 属性值为 true 且 oneTime 属性值为 false，
  //则调用 vm.bindDir(token.descriptor, node, host, scope) 方法创建指令对象


  //下面的步骤就是对创建好的directives进行排序
  var dirs = vm._directives.slice(originalDirCount)
  dirs.sort(directiveComparator)
  for (var i = 0, l = dirs.length; i < l; i++) {
      //对每个directives进行绑定,也就是和watcher捆绑
    dirs[i]._bind()
  }
  return dirs
}



function compileNode (node, options) {
  var type = node.nodeType
  if (type === 1 && !isScript(node)) {    //通过判断节点的类型
    return compileElement(node, options)  //如果是简单的非script普通的元素，则调用compileElement
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options) //如果是非空的文本节点，则调用compileTextNode 例如<div>{{name}}</div>
  } else {
    return null
  }
}


function compileTextNode (node, options) {
  // skip marked text nodes
  if (node._skip) {
    return removeText
  }
  var tokens = parseText(node.wholeText) //首先通过 parseText()函数 ,对node.wholeText做解析
  //token是个对象数组,如果是count这些普通文本 => 对象则是个只含value字段的对象，
  //类似{{name}}=>则对象会有html、onTime、tag、value 等字段
  if (!tokens) {
    return null
  }
  // mark adjacent text nodes as skipped,
  // because we are using node.wholeText to compile
  // all adjacent text nodes together. This fixes
  // issues in IE where sometimes it splits up a single
  // text node into multiple ones.
  var next = node.nextSibling
  while (next && next.nodeType === 3) {
    next._skip = true
    next = next.nextSibling
  }
  //接下来创建fragment
  var frag = document.createDocumentFragment()
  var el, token
  //对每个对象
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i]
    el = token.tag
      ? processTextToken(token, options)   //如果tag存在，调用processTextToken(token, options) 方法创建 DOM 节点和扩展 token 对象
      : document.createTextNode(token.value)  //无tag就直接创建文本节点
    frag.appendChild(el)
  }
  return makeTextNodeLinkFn(tokens, frag, options)  //入参tokens,fragment
}

//makeTextNodeLinkFn 这个方法什么也没做，它仅仅是返回了一个新的方法 textNodeLinkFn。
//往前回溯，这个方法最终作为 compileNode 的返回值，被添加到 compile 方法生成的 childLinkFn 中
function makeTextNodeLinkFn (tokens, frag) {
  return function textNodeLinkFn (vm, el, host, scope) {
    var fragClone = frag.cloneNode(true)
    var childNodes = toArray(fragClone.childNodes)
    var token, value, node
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i]
      value = token.value
      if (token.tag) {
        node = childNodes[i]
        if (token.oneTime) {
          value = (scope || vm).$eval(value)
          if (token.html) {
            replace(node, parseTemplate(value, true))
          } else {
            node.data = _toString(value)
          }
        } else {
          vm._bindDir(token.descriptor, node, host, scope)   //_bindDir方法
        }
      }
    }
    replace(el, fragClone)
  }
}

//根据 descriptor 实例化不同的 Directive 对象，并添加到 vm 实例 directives 数组中的
Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
    this._directives.push(
      new Directive(descriptor, this, node, host, scope, frag)
    )
  }



Directive.prototype._bind = function () {
  var name = this.name
  var descriptor = this.descriptor  //该token的描述
  // remove attribute
  if (
    (name !== 'cloak' || this.vm._isCompiled) &&
    this.el && this.el.removeAttribute
  ) {
    var attr = descriptor.attr || ('v-' + name)
    this.el.removeAttribute(attr)
  }
  // copy def properties
  var def = descriptor.def    //this.descriptor.def 则是包含指令相关操作的对象。比如对于 v-text 指令 👇
  if (typeof def === 'function') {
    this.update = def
  } else {
    extend(this, def) //通过node的 descriptor 属性中的def 对实例扩展def的方法
  }
  // setup directive params
  this._setupParams()
  // initial bind
  if (this.bind) {
    this.bind()
  }
  this._bound = true
  if (this.literal) {
    this.update && this.update(descriptor.raw)
  } else if (
    (this.expression || this.modifiers) &&
    (this.update || this.twoWay) &&
    !this._checkStatement()
  ) {
    // wrapped updater for context
    var dir = this
    if (this.update) {
      this._update = function (val, oldVal) {
        if (!dir._locked) {
          dir.update(val, oldVal)
        }
      }
    } else {
      this._update = noop
    }
    var preProcess = this._preProcess
      ? bind(this._preProcess, this)
      : null
    var postProcess = this._postProcess
      ? bind(this._postProcess, this)
      : null
    var watcher = this._watcher = new Watcher(   //directive 初始化watcher
      this.vm,
      this.expression,
      this._update, // callback
      {
        filters: this.filters,
        twoWay: this.twoWay,
        deep: this.deep,
        preProcess: preProcess,
        postProcess: postProcess,
        scope: this._scope
      }
    )
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {
      this.afterBind()
    } else if (this.update) {
      this.update(watcher.value)
    }
  }
}

//v-text的语法
//Directive 在初始化时还定义了 this.update 方法，
//并创建了 Watcher，把 this.update 方法作为 Watcher 的回调函数
//当 Watcher 观察到指令表达式值变化时，会调用 Directive 实例的 _update 方法，
//最终调用 v-text 的 update 方法更新 DOM 节点。
export default {
    bind () {
      this.attr = this.el.nodeType === 3
        ? 'data'
        : 'textContent'
    },
    update (value) {
      this.el[this.attr] = _toString(value)
    }
  }


//Directive 实例在初始化 Watche r时，会传入指令的 expression。
//Watcher 构造函数会通过 parseExpression(expOrFn, this.twoWay) 方法对 expression 做进一步的解析。
function Watcher (vm, expOrFn, cb, options) {
    // mix in options
    if (options) {
      extend(this, options)
    }
    var isFn = typeof expOrFn === 'function'
    this.vm = vm
    vm._watchers.push(this)
    this.expression = expOrFn
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.prevError = null // for async error stacks
    // parse expression for getter/setter
    if (isFn) {
      this.getter = expOrFn
      this.setter = undefined
    } else {
      var res = parseExpression(expOrFn, this.twoWay)
      //Watcher 构造函数会通过 parseExpression(expOrFn, this.twoWay) 方法对 expression 做进一步的解析
      this.getter = res.get   //例如 之前的{{times}} 
      //那么res.get =>  function (scope) {
      //    return scope.times
      //}
      this.setter = res.set
    }
    this.value = this.lazy
      ? undefined
      : this.get()
    // state for avoiding false triggers for deep and Array
    // watchers during vm._digest()
    this.queued = this.shallow = false
  }
  
//功能就是对当前 Watcher 进行求值，收集依赖关系。
Watcher.prototype.get = function () {
  this.beforeGet()  //function () { Dep.target = this}  
  var scope = this.scope || this.vm
  var value
  try {
    value = this.getter.call(scope, scope)  //这里的scope 是this.vm，也就是当前 Vue 实例结合this.getter函数
    //也就是调用了vm.times 也就是触发了 vm.__times的getter方法，其中调用了dep.depend()
  } catch (e) {
    if (
      process.env.NODE_ENV !== 'production' &&
      config.warnExpressionErrors
    ) {
      warn(
        'Error when evaluating expression ' +
        '"' + this.expression + '": ' + e.toString(),
        this.vm
      )
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value)
  }
  if (this.preProcess) {
    value = this.preProcess(value)
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false)
  }
  if (this.postProcess) {
    value = this.postProcess(value)
  }
  this.afterGet()
  return value
}