
* <a href="#unit_az">安装</a>
* <a href="#unit_yr">引入</a>
* <a href="#unit_sy">使用</a>
* <a href="#unit_qtly">嵌套路由（子路由）</a>
* <a href="#unit_mmst">命名视图（视图拆分）</a>
* <a href="#unit_qt">其它</a>
***
### <a name="unit_az"></a>安装
##### 在命令行输入
> npm install vue-router --save
##### 在pack.json文件中会生成对应的依赖项，安装完成。
```
"dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
},
```

### <a name="unit_yr"></a>引入
* 在入口文件中引入, 并注册使用
```
 import vueRouter from 'vue-router'

 // 注册使用
 Vue.use(VueRouter)
 ```

### <a name="unit_sy"></a>使用
 * 1 进行配置
 ```
  // 设置
  let router = new VueRouter({
      routes: [
          {
              path: '/path1',
              component: youComponent
          },
          {
              path: '/path2',
              component: youComponent
          }
      ]
  })

  //引入到项目中
  new Vue({
    el: '#app',
    //加入项目中
    // router:router,
    router,
    components: { App },
    template: '<App/>'
  })
 ```

 * 2 在页面中设置渲染视图
 ```
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 to 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 <a> 标签 -->
    <router-link to="/path1">Go to A</router-link>
    <router-link to="/path2">Go to B</router-link>

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
 ```
 
 ### <a name="unit_qtly"></a>嵌套路由（子路由）
 * 1 在router对象中设置子路由
 ```
 let router = new VueRouter({
     routes: [
         {
             path: '/parent',
             component: PageA,
             // 子路由
             children: [
                 {
                     path: 'son',
                     component: Children
                 }
             ]
         }
     ]
 })
 ```
 * 2 在父组件中设置导航和视图
```
    <template>
        <div>
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 to 属性指定链接. -->
            <router-link to="/parent/son">go to son</router-link>
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </div>
    </template>
```

### <a name="mmst"></a>命名视图
* 1 在router对象中的设置
```
let router = new VueRouter({
    routes: [
        {
            path: 'path1',
            // 注：单个组件用component，包含对象用components
            components: {
                // 渲染到名为viewA的router-view上
                viewA: Header
                viewB: Body
            }
        }
    ]
})
```
* 2 在组件中对router-view设置nmae
```
<template>
    <div>
        <router-view name="viewA"></router-view>
        <router-view name="viewB"></router-view>
    </div>
</template>
```

### <a name="unit_qt"></a>其它
* 编程式导航
##### 想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
##### 当你点击 \<router-link\> 时，这个方法会在内部调用，所以说，点击 \<router-link :to="..."\> 等同于调用 router.push(...)
```
    // 字符串
    router.push('home')

    // 对象
    router.push({ path: 'home' })

    // 命名的路由
    router.push({ name: 'user', params: { userId: 123 }})

    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' }})
```

* 重定向
##### 访问a会重定向跳到b
```
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b'}
  ]
})
```

* 别名
##### 访问/b时，url会保持/b，但路由匹配为/a，并渲染/a视图
##### 让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构
```
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```













