---
created: 2023-09-08 09:54:33
updated: 2023-09-08 10:00:35
---
# 前置组件

含有一些基础样式和功能函数，应该在最先插入

## 基本用法

```js
dv.view('Base')
```

## 可选参数

```js
dv.view('Base', ['NumberFont', 'Canvas'])
```

数组中可指定需要插入的样式，默认为全部插入。目前有一个数字字体（`NumberFont`）和白板相关样式（`Canvas`）。