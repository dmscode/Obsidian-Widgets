---
created: 2023-09-08 09:41:53
updated: 2023-09-08 09:56:21
---

# Obsidian sidebar widgets.

Obsidian 的侧边栏小挂件，其实就是用 Dataview 插件写的一些功能组件（自定义视图），可以放在一篇笔记内，然后把这篇笔记拖到侧边栏，这样就有侧边栏小挂件啦~

也可以放在白板（canvas）中，优点是更自由的布局，缺点是移动端目前不支持，而且即便支持大概也很难用和电脑端相同的布局方案。

当然这些视图你也可以放在任意笔记中，比如大家都喜欢去装扮的入口笔记。

## 支持

如果这些东西对您有帮助，希望可以到我的爱发电——[https://afdian.net/item/e808efe84f7a11ed86ec52540025c377](https://afdian.net/item/e808efe84f7a11ed86ec52540025c377) 支持一下。这样才有动力更新下去啊。

## 使用

- 首先必须安装 [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 插件，然后在设定中开启 `Enable JavaScript Queries`。
- 每个组件文件夹中的 Readme.md 文件中都写有详细的使用方法。
- 注意代码块的语言需设定为：`dataviewjs`（文档中为避免被错误的执行，均写为 js）
- **必须先插入前置组件 Base**

## 组件列表

- [Base](Base/Readme.md) 前置组件，需在所有组件之前插入