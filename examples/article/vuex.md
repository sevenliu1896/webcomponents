# [Vuex](https://vuex.vuejs.org/zh-cn/intro.html)

----

## Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

__注释__：vuex可以类比理解为组件内部的data提升到全局（管理）。

<div>
  <img src="https://vuex.vuejs.org/zh-cn/images/vuex.png" style="width:700px" alt="vuex工作原理图" align=center />
</div>

__注释__：Vuex有3个部分组成:State，Mutations，Actions。State是储存数据的核心，驱动应用的数据源；Mutations是修改State的唯一方式，必须是同步操作（后面Mutations会讲到）；Actions通过提交Mutations修改State，可以异步操作，主要用来Ajax请求；components以声明方式将State映射到视图，并且可以做Mutations和Actions的提交。

## 为什么使用Vuex

当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：
* 多个视图依赖于同一状态
* 来自不同视图的行为需要变更同一状态 <br>
对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。<br>
对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

__注释__ 类似[综合报表页面](https://192.168.0.33/omsv2/oms/report/report_group)，如果不用vuex那我们需要给每一个组件层层嵌套的传出对应的数据，这样做第一嵌套组件的数据关联需要比较强，第二非父子组件通信比较吃力，第三后期维护成本较高。


# [State](https://vuex.vuejs.org/zh-cn/state.html)

----

State是Vuex的核心，是唯一的数据源，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照(devtools谷歌调试工具)。

## 基础用法

那么我们如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
```
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}

//对于跟组件注入store的模式，在Counter.vue文件内

//...
computed:{
  count(){
  	return this.$store.state.count
  }
}
//...

```
每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

__注释__：这里为什么不能放在components里的data中，这和js的数据类型附值有关系，如果是基本类型，只是一次简单的附值，而引用类型它们指针指向相同，所以如果在data中附值是基本类型就不能做到响应式

## mapState 辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
```
// 在单独构建的版本中辅助函数为 Vuex.mapState

import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
__注释__：大部分情况下我们需要组件内部的computed（计算组件data中的相关属性），这时候需要 [对象展开运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。
```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

# [Getter](https://vuex.vuejs.org/zh-cn/getters.html)

----

有时候我们需要从 store 中的 state 中派生出一些状态，getter是对state数据的处理（可以对比理解为组件内部computed对data的计算）

## 基础用法

接受两个参数 state,getters，第二个可以省略(Getter 会暴露为 store.getters 对象, 我们可以通过getters获取getters内部的getter如下面的doneTodosCount)
```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})

store.getters.doneTodosCount // -> 1
```
```
//组件内使用
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

## mapGetters 辅助函数

类似mapState [参考官网](https://vuex.vuejs.org/zh-cn/getters.html)

# [Mutations](https://vuex.vuejs.org/zh-cn/mutations.html)

----

## 基础用法

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```
你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```
store.commit('increment')
```
```
this.$store.commit('increment')
```
__注释__：type用来暴露mutations对象的key值，在组件内部或者action中cmmmit(Mutations的type)，来执行对应的回调函数。

### 传参

```
//...参数为字符串
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)
//组件中提交
this.$store.commit('increment', 10)
```
```
// 参数为对象
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
//组件中提交
this.$store.commit('increment', {
  amount: 10
})
```
```
提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
store.commit({
  type: 'increment',
  amount: 10
})
```

## Mutation 需遵守 Vue 的响应规则

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：
* 最好提前在你的 store 中初始化好所有所需属性。
* 当需要在对象上添加新属性时，你应该
```
使用 Vue.set(obj, 'newProp', 123), 或者

以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：

state.obj = { ...state.obj, newProp: 123 }
```

## Mutation 必须是同步函数

一条重要的原则就是要记住 mutation 必须是同步函数。为什么？请参考下面的例子：

```
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```
现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。<br>
__注释__ mutation提交异步操作也是会成功修改数据，提交mutation时devtools会获取当时state的一次快照，所以如果我们是异步操作的话，获取快照的数据就会存在误差，破毁了数据流。[参考地址](https://www.zhihu.com/question/48759748)

## mapMutations

mapMutations类似mapState具体参考[vuex官网](https://vuex.vuejs.org/zh-cn/mutations.html)

# [Actions](https://vuex.vuejs.org/zh-cn/actions.html)

----

## actions是什么

Action 类似于 mutation，不同在于：

* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

__注释__：action通常用来做ajax处理

## 基础用法

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({commit},payload) {
    	//可以异步操作，也可以同步操作
    	setTimeout(function(){
    	  console.log(payload)
		  commit('increment')//注意这里是提交mutation
    	},1000)
    },
    actionA ({ commit }) {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
     })
    },
    actionB ({ dispatch, commit }) {
     return dispatch('actionA').then(() => {
      commit('someOtherMutation')
     })
    }
  }
})
```
__注释__：action有两个参数：（第二个可以省略）
* 第一个是对象包括当前vuex实例的方法和属性：dispatch（暴露actions），commit（提交mutation），state，getters；
* 第二个payload是action分发（执行）传过来的参数

### 分发（执行）Action及参数
```
store.dispatch('increment')

//组件内部
this.$store.dispatch('increment')
```
```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

### 组合 Action(actionA,actionB)的分发（执行）

```
//在分发actionB时，actionB 通过对象参数中的dispatch（暴露actions）会先执行actions中的actionA
store.dispatch('actionB')

//组件内部
this.$store.dispatch('actionB')
```

### mapActions

mapActions类似mapState具体参考[vuex官网](https://vuex.vuejs.org/zh-cn/actions.html)

# [Module](https://vuex.vuejs.org/zh-cn/modules.html)

----

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

具体用法参考[官网](https://vuex.vuejs.org/zh-cn/modules.html)
