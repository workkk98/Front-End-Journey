# yarn

### workspaces

在根目录下的package.json文件中配置以下两个属性:

```JSON
{
  "private": true,
  "workspaces": [
    "wrokspace-a",
    "workspace-b"
  ]
}
```

- private属性是必需的，因为根目录是不会被发布的，所以我们可以确保根目录不会被突然的暴露在加上这个安全措施后。

- workspaces字段的值是一个目录路径关联到每个工作区。

### 与lerna的不同

workspaces只是提供了低层次的基础功能。