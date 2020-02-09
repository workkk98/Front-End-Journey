# webpack



#### webpack介绍
webpack本质上是个事件流的机制，它的工作流程就是将各个插件串联起来。
webpack中**最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例。**
[tapable](https://github.com/webpack/tapable)

#### tapable

类似于EventEmmiter一样的类

**SyncHook**

```


BMW.hooks.accelerate.tap("LoggerPlugin" , (newSpeed,unit) => console.log(`newSpeed is ${newSpeed+unit}`))

accelerate(newSpeed , unit) {
  return this.hooks.accelerate.call(newSpeed , unit)
}
BMW.accelerate(60,'mph')
```
new SyncHook()应该是个函数
同步hook就是通过tap方法在这个**函数对象**上增加监听函数，调用hook后 依次执行。

值得注意一点，hook 是按照(this,...参数数组)的形式调用监听函数的(因为用了call调用函数) 或者是修改了call函数？


#### webpack 入口

```
const webpack = (options, callback) => {
    // ...
    // 验证options正确性
    // 预处理options
  options = new WebpackOptionsDefaulter().process(options); // webpack4的默认配置
	compiler = new Compiler(options.context); // 实例Compiler
	// ...
  // 若options.watch === true && callback 则开启watch线程 fs.watch？
	compiler.watch(watchOptions, callback);
	compiler.run(callback);
	return compiler;
};

```

入口文件中，实例化了compiler对象 ， 并调用compiler.run(callback)


#### 编译的执行顺序(compiler.run)
* before-run 清除缓存
* run 注册缓存数据钩子
* before-compile
* compile 开始编译
* make 从入口分析依赖以及间接依赖模块，创建模块对象
* build-module 模块构建
* seal 构建结果封装， 不可再更改
* after-compile 完成构建，缓存数据
* emit 输出到dist目录


#### compilation负责 编译和构建过程

```
class Compilation extends Tapable {
	constructor(compiler) {
		super();
		this.hooks = {
			// hooks
		};
		// ...
		this.compiler = compiler;
		// ...
		// template
		this.mainTemplate = new MainTemplate(this.outputOptions);
		this.chunkTemplate = new ChunkTemplate(this.outputOptions);
		this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(
			this.outputOptions
		);
		this.runtimeTemplate = new RuntimeTemplate(
			this.outputOptions,
			this.requestShortener
		);
		this.moduleTemplates = {
			javascript: new ModuleTemplate(this.runtimeTemplate),
			webassembly: new ModuleTemplate(this.runtimeTemplate)
		};

		// 构建生成的资源
		this.chunks = [];
		this.chunkGroups = [];
		this.modules = [];
		this.additionalChunkAssets = [];
		this.assets = {};
		this.children = [];
		// ...
	}
	// 
	buildModule(module, optional, origin, dependencies, thisCallback) {
		// ...
		// 调用module.build方法进行编译代码，build中 其实是利用acorn编译生成AST
		this.hooks.buildModule.call(module);
		module.build(/**param*/);
	}
	// 将模块添加到列表中，并编译模块
	_addModuleChain(context, dependency, onModule, callback) {
		    // ...
		    // moduleFactory.create创建模块，这里会先利用loader处理文件，然后生成模块对象
		    moduleFactory.create(
				{
					contextInfo: {
						issuer: "",
						compiler: this.compiler.name
					},
					context: context,
					dependencies: [dependency]
				},
				(err, module) => {
					const addModuleResult = this.addModule(module);
					module = addModuleResult.module;
					onModule(module);
					dependency.module = module;
					
					// ...
					// 调用buildModule编译模块
					this.buildModule(module, false, null, null, err => {});
				}
		});
	}
	// 添加入口模块，开始编译&构建
	addEntry(context, entry, name, callback) {
		// ...
		this._addModuleChain( // 调用_addModuleChain添加模块
			context,
			entry,
			module => {
				this.entries.push(module);
			},
			// ...
		);
	}

	
	seal(callback) {
		this.hooks.seal.call();

		// ...
		const chunk = this.addChunk(name);
		const entrypoint = new Entrypoint(name);
		entrypoint.setRuntimeChunk(chunk);
		entrypoint.addOrigin(null, name, preparedEntrypoint.request);
		this.namedChunkGroups.set(name, entrypoint);
		this.entrypoints.set(name, entrypoint);
		this.chunkGroups.push(entrypoint);

		GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk);
		GraphHelpers.connectChunkAndModule(chunk, module);

		chunk.entryModule = module;
		chunk.name = name;

		 // ...
		this.hooks.beforeHash.call();
		this.createHash();
		this.hooks.afterHash.call();
		this.hooks.beforeModuleAssets.call();
		this.createModuleAssets();
		if (this.hooks.shouldGenerateChunkAssets.call() !== false) {
			this.hooks.beforeChunkAssets.call();
			this.createChunkAssets();
		}
		// ...
	}


	createHash() {
		// ...
	}
	
	// 生成 assets 资源并 保存到 Compilation.assets 中 给webpack写插件的时候会用到
	createModuleAssets() {
		for (let i = 0; i < this.modules.length; i++) {
			const module = this.modules[i];
			if (module.buildInfo.assets) {
				for (const assetName of Object.keys(module.buildInfo.assets)) {
					const fileName = this.getPath(assetName);
					this.assets[fileName] = module.buildInfo.assets[assetName]; 
					this.hooks.moduleAsset.call(module, fileName);
				}
			}
		}
	}

	createChunkAssets() {
	 // ...
	}
}

```

看来这块骨头很难啃，慢慢来😩

#### 参考链接

[webpack详解](https://juejin.im/post/5aa3d2056fb9a028c36868aa)