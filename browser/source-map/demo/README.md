# 使用手册

1. 安装java JDK
2. [下载compiler.jar包](https://developers.google.com/closure/compiler/docs/gettingstarted_app)
3. 调用下面语句
```s
java -jar compiler.jar --js demo.js --js_output_file demo.min.js --create_source_map demo.min.map
```
当然，与上个文件夹中的参数有些出入，是因为更新版本了吧。