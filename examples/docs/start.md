# 快速开始

----

本节将介绍如何在项目中使用 XC-UI。

## 使用 vue-cli

我们还可以使用[vue-cli](https://github.com/vuejs/vue-cli)初始化项目，命令如下：

```bash
> npm i -g vue-cli
> mkdir my-project && cd my-project
> vue init webpack
> npm i && npm i xc-ui
```

## 引入 xc-ui

可以在项目的入口文件中引入所有组件或所需组件

```js
import XcUI from 'xcui' // 引入组件库
import '../node_modules/XCUI/packages/theme-default/lib/index.css' // 引入样式库

Vue.use(XcUI)
```