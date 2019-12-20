# vue-router解析

## 从操作流程去分析vue-router
引入vue-router模块的原理就不具体讲解了

从 vue.use 和 new VueRouter() 开始
先看一下类VueRouter的源码

```
export default class VueRouter {
  static install: () => void; // static 类的静态变量，只能通过VueRouter.install访问
  static version: string;
  // 构造函数
  constructor (options: RouterOptions = {}) {
    this.app = null  // 根实例 Vue
    this.apps = []  // 拥有router的Vue实例
    this.options = options  // 用户定义的 options
    this.beforeHooks = []  // 钩子函数 通过beforeEach
    this.resolveHooks = [] // 钩子函数 beforeResolve
    this.afterHooks = []  // 钩子函数 afterEach
    this.matcher = createMatcher(options.routes || [], this) // 超级重要 return { match方法, addRoutes方法 }

    let mode = options.mode || 'hash' // 路由模式
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {  // 如果浏览器不支持history.pushState 退回hash模式
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode
    // history 路由历史的具体的实现实例 根据mode
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
    // 这里还有很多函数
  }
```

上面的代码我们可以总结几点
* **VueRouter.install 是个类的静态方法（与Vue.use插件系统相关)**
* **构造器函数通过用户传入的options,创造出router实例**
* **router实例中有很多和vue instance有关的东西，可以看代码注释**

科普下,Vue.use(plugin)其实做了两件事
* **确认插件是否被安装，有安装则返回**
* **plugin是对象则调用plugin.install(Vue),是函数则直接调用**
然后就是执行VueRouter.install的过程了 目录地址 src/install

```
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }
  // 混入 通过生命周期初始化router
  Vue.mixin({ // 目录 vue-dev/src/core/global-api/mixin.js
    beforeCreate () {
      if (isDef(this.$options.router)) {  // 如果在new Vue中引入了用户的配置 则进入该分支
        this._routerRoot = this  // 对于根实例表示自身
        this._router = this.$options.router 
        this._router.init(this)  // vue-router-dev/src/index.js
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })
  // 在原型上访问代理，最终都访问根元素的router相关属性
  Object.defineProperty(Vue.prototype, '$router', {   // router 路由对象
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {   // route 路由信息
    get () { return this._routerRoot._route }
  })
  // 定义全局组件
  Vue.component('RouterView', View) // router-view组件
  Vue.component('RouterLink', Link) // router-link组件

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

install函数在执行过程中,主要做了这3件事
* **通过mixin API,混入hook,作用初始化router或获取根实例**
* **通过Object.defineProperty(),暴露\$route和$router**
* **注册全局组件,router-view、router-link**

所以我记得，vue-router官方文档里也强调了一定得Vue.use(VueRouter)
否则，你只是将router写入配置项，没有任何作用。

再回头来，new VueRouter(options)
```
  constructor (options: RouterOptions = {}) {
    this.app = null  // 根实例 Vue
    this.apps = []  // 拥有router的Vue实例
    this.options = options  // 用户定义的 options
    this.beforeHooks = []  // 钩子函数 通过beforeEach
    this.resolveHooks = [] // 钩子函数 beforeResolve
    this.afterHooks = []  // 钩子函数 afterEach
    this.matcher = createMatcher(options.routes || [], this) // 超级重要 return { match方法, addRoutes方法 }

    let mode = options.mode || 'hash' // 路由模式
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {  // 如果浏览器不支持history.pushState 退回hash模式
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode
    // history 路由历史的具体的实现实例 根据mode
    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }
```
生成router对象，几个重点
* **决定了history的模式（history对象很重要）**
* **初始化matcher对象（用于匹配创建route）**

好了，经过上面的步骤，我们就成功安装了VueRouter，可以使用组件以及一些暴露的路由信息。那么下面你可能就要跳转到某个路径，中间发生了什么？

-------

一般来说，会在某个监听事件中使用\$router.push({})

```
  Vue-Router
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }
```
这里有两种写法，但最后都会调用this.history.push()
上面有提到初始化router对象时，会选择不同的history模式，
这里以 $HASH$ 模式为准
```
  History
  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        pushHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }
```

核心就是this.transitionTo()
有趣的是这个定义在基类history中

```
  transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    // 最后返回匹配到的route对象 location = this.getCurrentLocation this.current 当前路径也是个route对象
    const route = this.router.match(location, this.current)
    this.confirmTransition(
      route,
      () => { // onComplete
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          this.ready = true
          this.readyErrorCbs.forEach(cb => {
            cb(err)
          })
        }
      }
    )
  }
```
这里主要有两步,也很好理解
* 先去找到匹配到的routeRecord **const route = this.router.match(location, this.current)**
* 既然找到相应的路径了，确认跳转 **this.confirmTransition**
  
接下来我们一步步解析这个过程。我们先得回到VueRouter的构造函数中,不知道你是否还记得这个函数
this.matcher = createMatcher(options.routes || [], this)
调用**this.router.match**就是调用this.matcher.match()所以我们先来看看matcher的定义


### createMatcher

* createRouteMap() 通过用户定义的routes创建pathList,pathMap和nameMap
* 封装了几个函数例如addRoutes、match,addRoutes其实就是调用了createRouteMap
* 返回了一个 **{ addRoutes , match }**

所以接下来我们着重讲一下 createRouteMap 和 match

```
export function createMatcher (
  routes: Array<RouteConfig>, // 用户定义的routes数组
  router: VueRouter // 生成的实例router
): Matcher {
  const { pathList, pathMap, nameMap } = createRouteMap(routes) // 根据routes创建 路径映射表
  // 动态添加路由配置
  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
  }
  // 根据传入的 raw 和当前的路径 currentRoute 计算出一个新的路径并返回。
  function match ( 
    raw: RawLocation, // 既可以是个string，又可以是location对象 /flow/declaration
    currentRoute?: Route, // 当前route对象
    redirectedFrom?: Location // 与重定向相关
  ): Route {
    const location = normalizeLocation(raw, currentRoute, false, router) // 封装跳转的location
    const { name } = location
    // name location
    if (name) {
      const record = nameMap[name] // 从字典中找到record
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${name}' does not exist`)
      }
      if (!record) return _createRoute(null, location) // record不存在则创建新路由 #_createRoute
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom) // 返回新建的route对象
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) { // 顺序遍历
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom) // 返回新建的route对象
        }
      }
    }
    // no match
    return _createRoute(null, location) // #_createRoute
  }

  function redirect () {
  }

  function alias () {
  }

  function _createRoute () {
  }

  return {
    match,
    addRoutes
  }
}
```

#### createRouteMap
这个函数定义在 'src/create-route-map'
按照用户定义的routes数组，遍历调用addRouteRecord方法,
并对pathList排序，这里先介绍下addRouteRecord方法


```
// 创建RouteRecord 在pathMap,nameMap中添加记录,并有children则递归
function addRouteRecord (
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>,
  route: RouteConfig,
  parent?: RouteRecord,
  matchAs?: string
) {
  const { path, name } = route
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, `"path" is required in a route configuration.`)
    assert(
      typeof route.component !== 'string',
      `route config "component" for path: ${String(
        path || name
      )} cannot be a ` + `string id. Use an actual component instead.`
    )
  }

  const pathToRegexpOptions: PathToRegexpOptions =
    route.pathToRegexpOptions || {}
  const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict) // 标准化路径

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }
  // 创建RouteRecord对象
  const record: RouteRecord = {
    path: normalizedPath, // path 子路径会 合并父路径
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions), //把path解析成一个正则表达式的扩展
    components: route.components || { default: route.component }, // 这里注意components和component的区别，route.components是个对象
    // components: { default: xxx, a: xxx, b:xxx } 分别对应不同name的router-view
    instances: {}, // 表示 组件实例
    name,  //
    parent, // parent是指 父级路由
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter, // user定义的hook
    meta: route.meta || {}, // user定义的元信息
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  }
  // children 树形结构 chidren结构其实和routes一致
  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(child => /^\/?$/.test(child.path))
      ) {
        warn(
          false,
          `Named Route '${route.name}' has a default child route. ` +
            `When navigating to this named route (:to="{name: '${
              route.name
            }'"), ` +
            `the default child route will not be rendered. Remove the name from ` +
            `this route and use the name of the default child route for named ` +
            `links instead.`
        )
      }
    }
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }
  // 这一步对pathList和pathMap 引用数据修改 pathMap像一个字典
  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }
  // alias 可以使用[]写法 对别名也调用add
  if (route.alias !== undefined) {
    const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
    for (let i = 0; i < aliases.length; ++i) {
      const alias = aliases[i]
      if (process.env.NODE_ENV !== 'production' && alias === path) {
        warn(
          false,
          `Found an alias with the same value as the path: "${path}". You have to remove that alias. It will be ignored in development.`
        )
        // skip in dev to make it work
        continue
      }

      const aliasRoute = {
        path: alias,
        children: route.children
      }
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      )
    }
  }
  // 在nameMap里加一条记录
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        `Duplicate named routes definition: ` +
          `{ name: "${name}", path: "${record.path}" }`
      )
    }
  }
}
```
addRouteRecord
整个过程
* normalizePath() 标准化路径 格式化规则具体可以看下源码
* 创建RouteRecord对象
* 如果有children属性，则遍历children，递归。（其实children的结构和routes类似）
* pathMap中没这个path，则pathList添加一条，pathMap增加path: RouteRecord
* alias 遍历route的alias属性并递归 addRouteRecord
* 最后在nameMap中增加这一个name: record

#### match

```
  // 根据传入的 raw 和当前的路径 currentRoute 计算出一个新的路径并返回。
  function match ( 
    raw: RawLocation, // 既可以是个string，又可以是location对象 /flow/declaration
    currentRoute?: Route, // 当前route对象
    redirectedFrom?: Location // 与重定向相关
  ): Route {
    const location = normalizeLocation(raw, currentRoute, false, router) // 封装跳转的location
    const { name } = location
    // name location
    if (name) {
      const record = nameMap[name] // 从字典中找到record
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${name}' does not exist`)
      }
      if (!record) return _createRoute(null, location) // record不存在则创建新路由 #_createRoute
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom) // 返回新建的route对象
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) { // 顺序遍历
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom) // 返回新建的route对象
        }
      }
    }
    // no match
    return _createRoute(null, location) // #_createRoute
  }
```

* 我们先看一下match的入参(raw,currentRoute,redirectedForm) 类型分别是 string或location对象, Route对象, location对象，这些个对象的类型声明可以具体看/flow/declaration
* 第一步调用了normalizeLocation() 创建了location对象 这个函数，主要作用就是根据 raw参数中的name或path，**todo: 这里该讲的更详细些** 整合参数返回一个location对象
* 根据name,调用_createRoute()方法 
* 或根据path,调用_createRoute()方法 
* 最终都会返回一个route对象

我们先喝口水，整理下上述内容
首先在new VueRouter的时候,router对象内部初始化了matcher对象（通过createMatcher方法，函数内部有pathList,pathMap,nameMap）
然后在使用this.\$router.push的过程中，也就是在history.transitionTo()中
通过matcher对象的match方法匹配到新路径route（在match的过程中，通过之前的pathMap或nameMap，以及用户传入的rawLocation对象，对route进行赋值）最重要的一点是**你可能会疑问匹配到的record是一个，为什么我console.log($route.matched)是一个数组，事实上对route.matched过程中还调用了formatMatch函数，也就是通过Route.record是个树结构一步步找到parent，并放在数组里。**

### confirmTransition

```
  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    // 定义abort函数
    const abort = err => {
      // after merging https://github.com/vuejs/vue-router/pull/2771 we
      // When the user navigates through history through back/forward buttons
      // we do not want to throw the error. We only throw it if directly calling
      // push/replace. That's why it's not included in isError
      if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => {
            cb(err)
          })
        } else {
          warn(false, 'uncaught error during route navigation:')
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    //route 和 history的current相同
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort(new NavigationDuplicated(route))
    }

    const { updated, deactivated, activated } = resolveQueue(
      this.current.matched,
      route.matched
    )// matched数组里存放里 若干个route对象
    // 初始化一个 导航守卫hook的队列queue
    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated), // 失活组件调用 beforeRouteLeave, 提取失活组件中的beforeRouteLeave方法数组
      // global before hooks
      this.router.beforeHooks, // 全局beforeEach钩子 beforeHooks是个hooks数组
      // in-component update hooks
      extractUpdateHooks(updated), // 重用的组件beforeRouteUpdate
      // in-config enter guards
      activated.map(m => m.beforeEnter), // 在路由配置里调用 beforeEnter。
      // async components
      resolveAsyncComponents(activated) // 解析异步路由组件 '../util/resolve-components'
    )

    this.pending = route
    // 执行每一个导航守卫 hook 
    const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort()
      }
      try {
        // 入参对应 to from next ,必须在hook中调用next的原因
        hook(route, current, (to: any) => {
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(to)
          } else if ( // 跳转到一个不同的地址
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
    // runQueue '../util/async', 最后一个参数也就是cb 当第一个队列执行完毕后
    runQueue(queue, iterator, () => {
      const postEnterCbs = [] // 存放用户在beforeRouteEnter 在next回调函数中传入的cb函数
      const isValid = () => this.current === route
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)  //因为执行cb时，不论异步还是同步组件都有了，所以肯定能拿到这个enter守卫
      const queue = enterGuards.concat(this.router.resolveHooks)  // 全局的resolve
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route)  // 
        if (this.router.app) { // this.router.app 的根实例
          this.router.app.$nextTick(() => {
            postEnterCbs.forEach(cb => {
              cb() // 相当于执行 poll  
            })
          })
        }
      })
    })
  }
```

#### confirmTransition的流程
* 整理队列1
* runQueue(实际上队列1执行完毕后执行队列2)

##### 整理队列1

* resolveQueue() 通过对比current.matched和next.matched，区分为updated,
  activated,deactivated
  ```
  // 入参 this.current.matched route.matched
  function resolveQueue (
    current: Array<RouteRecord>,
    next: Array<RouteRecord>
  ): {
    updated: Array<RouteRecord>,
    activated: Array<RouteRecord>,
    deactivated: Array<RouteRecord>
  } {
    let i
    const max = Math.max(current.length, next.length) // 比较matched的route路径数组长度
    // 找到不同位置i
    for (i = 0; i < max; i++) {
      if (current[i] !== next[i]) {
        break
      }
    }
    return {
      updated: next.slice(0, i),
      activated: next.slice(i),
      deactivated: current.slice(i)
    }
  }
  ```
* 初始化队列,通过extractLeaveGuards()等函数提取hooks,值得注意的是每个函数返回的都是一维数组，最后我们看下resolveAsyncComponents()这个函数返回一个封装好的hook，是调用另外一个队列的导火线
  ```
    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated), // 失活组件调用 beforeRouteLeave, 提取失活组件中的beforeRouteLeave方法数组
      // global before hooks
      this.router.beforeHooks, // 全局beforeEach钩子 beforeHooks是个hooks数组
      // in-component update hooks
      extractUpdateHooks(updated), // 重用的组件beforeRouteUpdate
      // in-config enter guards
      activated.map(m => m.beforeEnter), // 返回beforeEnter数组
      // async components
      resolveAsyncComponents(activated) // 解析异步路由组件 '../util/resolve-components'
    )
  ```

之前也有讲到这个是个队列，所以接下来就是依次执行hook，即出队。

```
    this.pending = route
    // 执行每一个导航守卫 hook 
    const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort()
      }
      try {
        // 入参对应 to from next ,必须在hook中调用next的原因
        hook(route, current, (to: any) => {
          if (to === false || isError(to)) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(to)
          } else if ( // 跳转到一个不同的地址
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort()
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
    // runQueue '../util/async', 最后一个参数也就是cb 当第一个队列执行完毕后
    runQueue(queue, iterator, () => {
      const postEnterCbs = [] // 存放用户在beforeRouteEnter 在next回调函数中传入的cb函数
      const isValid = () => this.current === route
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)  //因为执行cb时，不论异步还是同步组件都有了，所以肯定能拿到这个enter守卫
      const queue = enterGuards.concat(this.router.resolveHooks)  // 全局的resolve
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route)  // 
        if (this.router.app) { // this.router.app 的根实例
          this.router.app.$nextTick(() => {
            postEnterCbs.forEach(cb => {
              cb() // 相当于执行 poll  
            })
          })
        }
      })
    })

export function runQueue (queue: Array<?NavigationGuard>, fn: Function, cb: Function) {
  // 每次根据index 从queue中拿出guard,调用fn函数即iterator
  const step = index => {
    if (index >= queue.length) { //执行完先前定义的queue队列后 执行cb()
      cb()
    } else {
      // fn = iterator 
      if (queue[index]) { // 队列中hook存在,就例如 在组件中不定义hook
        fn(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }
  step(0)  // step 功能递归调用iterator
}
```

**我们可以看到在runQueue中声明了一个step函数。根据队列的长度，调用fn，并在fn里传入hook和自身，到队尾时执行cb。这种方式无疑就是递归。其实vue-router文档里就讲到，声明hook必须调用next，不然不会进行到下一步。那么在源码这里我们就可以清楚的了解到这个原理。如果不主动调用next，就无法进行递归。**
  

执行到队尾，我们回过头看下通过resolveAsyncComponents()返回到hook
```
export function resolveAsyncComponents (matched: Array<RouteRecord>): Function {
  return (to, from, next) => {  // 返回的是一个导航守卫函数
    let hasAsync = false
    let pending = 0
    let error = null
    // matched , fn      fn（m.components[key],m.instances[key],m, key）
    flatMapComponents(matched, (def, _, match, key) => {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved. 如果是个异步函数则执行下面if语句
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true
        pending++

        const resolve = once(resolvedDef => { // 下面传入了两次resolve 所以使用once 避免调用两次剪头函数
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef) 
          match.components[key] = resolvedDef  //把解析好的异步组件放到对应的
          pending--  // components数组都执行完fn后调用next
          if (pending <= 0) {  // 有点像promise.all
            next()
          }
        })

        const reject = once(reason => {
          const msg = `Failed to resolve async component ${key}: ${reason}`
          process.env.NODE_ENV !== 'production' && warn(false, msg)
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg)
            next(error)
          }
        })

        let res
        try {
          res = def(resolve, reject) // 假如按照 () => import('./')的写法 res是个promise对象1
        } catch (e) {
          reject(e)
        }
        if (res) {
          if (typeof res.then === 'function') {  // 则会走到这一步2
            res.then(resolve, reject)
          } else {
            // new syntax in Vue 2.3
            const comp = res.component
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject)
            }
          }
        }
      }
    })

    if (!hasAsync) next()
  }
}
```

简而言之 ，**如果使用路由懒加载，例如我们写component: () => import('Cpn')
返回的是一个promise对象，对它的then()传入定义的resolve和reject回调，等到最后一个执行完毕，调用next也就是执行另外一个队列,
那如果不是异步组件，直接调用next即可。**
调用next后也就是执行到队尾，调用runqueue中的cb函数，也就是传入的这个箭头函数

```
() => {
      const postEnterCbs = [] // 存放用户在beforeRouteEnter 在next回调函数中传入的cb函数
      const isValid = () => this.current === route
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)  //因为执行cb时，不论异步还是同步组件都有了，所以肯定能拿到这个enter守卫
      const queue = enterGuards.concat(this.router.resolveHooks)  // 全局的resolve
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort()
        }
        this.pending = null
        onComplete(route)  // 
        if (this.router.app) { // this.router.app 的根实例
          this.router.app.$nextTick(() => {
            postEnterCbs.forEach(cb => {
              cb() // 相当于执行 poll  
            })
          })
        }
      })
    }
```

你可以看到其实也就是启动了另一个队列，
* onComplete函数中会更新所有vue实例的route对象，以及执行afterHooks也就是afterEach函数构建的hooks数组
* 值得注意的是postEnterCbs存放的是**你在beforeRouteEnter传入next回调的函数cb**，函数通过nextTick这个api，保证组件渲染完毕后执行回调，且cb参数绑定的是当前的instance也就是vue实例。


> 总结: 主要就是对 使用vue-router插件和调用this.\$router.push()发生的过程，实际上还有很多东西可讲。例如router-view的原理
> 我们在可以看看这篇文章，我也是从中学习整理总结出来的。[Vue.js技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/vue-router/)
