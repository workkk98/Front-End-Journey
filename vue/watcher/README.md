# watcher

#### RenderWatcher
在我看来watcher对象对于Vue来说非常重要。之前总是想不明白Vue是怎么更新视图的，以及beforeUpdate、updated这两个钩子函数的由来。
秘密其实藏在\$mount()中，仔细看\$mount()函数中的mountcomponent函数中的代码片段，如下。
```js
  updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };
  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
```
在这段代码中有创建一个watcher，这个watcher实际上就是**renderwatcher**对象。Vue给它传递了一个函数updateComponent。而且watcher在new的过程中，已然把自己赋值给了Dep.target，在后续依赖收集时，该**renderwatcher**就会被收集到data的dep中。具体收集过程就是当watcher调用这个updateComponent函数时，先调用了render函数(render函数是用户手写模版后编译成的，也可能是用户用JSX手写的,render函数类似于下方代码)

```js
  data () {
    return {
      title: 'renderwatcher'
    }
  },
  render (h) {
    return h('div', null, [this.title])
  }
```

当执行render函数时，**renderwatcher**就被收入了this.title的dep中。所以当title更新时，**renderwatcher**就会触发更新事件。

#### update钩子

在我们之前new watcher的过程中，还传递了一个before参数。before参数里实际上就是调用了beforeupdate的钩子函数，而调用它的时机，可以仔细看这个flushSchedulerQueue函数。
```js
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn(
            'You may have an infinite update loop ' + (
              watcher.user
                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                : "in a component render function."
            ),
            watcher.vm
          );
          break
        }
      }
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }
```

当watcher存在before函数时，先执行before函数即调用beforeUpdate钩子函数。待所有watcher更新完成后后，执行updated钩子函数。