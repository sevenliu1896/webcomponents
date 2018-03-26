## 命名规范（建议稿

### 组件名为多个单词

例子:
```
Vue.component('todo-item', {
  // ...
})
export default {
  name: 'TodoItem',
  // ...
}

```

### 私有属性名称

在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 $_yourPluginName_)

例子:
```
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```

### 组件名称

只要有能够拼接文件的构建系统，就把每个组件单独分成文件。

例子:

```
components/
|- TodoList.js
|- TodoItem.js
```
  
或者

```
components/
|- TodoList.vue
|- TodoItem.vue
```

### 单文件组件文件大小写

单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。

例子:

```
components/
|- MyComponent.vu TodoItem.js
```




### 基础组件名

应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
根据业务需要采用 Xc

例子:
```
components/
|- XcButton.vue
|- XcTable.vue
|- XcIcon.vue
```

### 单例组件名

只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。


例子:

```
components/
|- TheWindControlSetting.vue
|- TheWindControlTest.vue
|- TheStockPoolSettings.vue

```

### 紧密耦合的组件名

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。


例子:

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

```

### 组件名中的单词顺序

组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。


例子:

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

### 自闭合组件

在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做

自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。
不幸的是，HTML 并不支持自闭合的自定义元素——只有官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML


例子:

        <!-- 在单文件组件、字符串模板和 JSX 中 -->
        <MyComponent/>
        <!-- 在 DOM 模板中 -->
        <my-component></my-component>

### js/jsx中的组件名大小写

JS/JSX 中的组件名应该始终是PascalCase的，尽管在较为简单的应用中只使用Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串。
用Vue.component 进行全局组件注册时，可以使用 kebab-case 字符串


例子:

```
Vue.component('MyComponent', {
  // ...
})
Vue.component('my-component', {
  // ...
})
import MyComponent from './MyComponent.vue'
export default {
  name: 'MyComponent',
  // ...
}
```

### 完整单词组件名

组件名应该倾向于完整单词而不是缩写。

例子:

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue

```



### prop名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。

例子:

```
props: {
  greetingText: String
}
<WelcomeMessage greeting-text="hi"/>
```

### 多个特性的元素

多个特性的元素应该分多行撰写，每个特性一行。
在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。模板和 JSX 值得我们做相同的考虑。

例子:

```
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

### 模版中简单的表达式


多个特性的元素应该分多行撰写，每个特性一行。
组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法

例子:

        <!-- 在模板中 -->
        {{ normalizedFullName }}
        // 复杂表达式已经移入一个计算属性
        computed: {
            normalizedFullName: function () {
                return this.fullName.split(' ').map(function (word) {
                    return word[0].toUpperCase() + word.slice(1)
                }).join(' ')
            }
        }

### 简单的计算属性

应该把复杂计算属性分割为尽可能多的更简单的属性。

例子:

```
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```

### 带引号的特性值

非空 HTML 特性值应该始终带引号 (单引号或双引号，选你 JS 里不用的那个)。
在 HTML 中不带空格的特性值是可以没有引号的，但这样做常常导致带空格的特征值被回避，导致其可读性变差。

例子:

```
<input type="text">
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

### 指令缩写

指令缩写 (用 : 表示 v-bind: 和用 @ 表示 v-on:) 应该要么都用要么都不用。

例子:

```
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>
<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>
<input
  @input="onInput"
  @focus="onFocus"
>
<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>
```

### 组件／实例的选项的顺序


组件/实例的选项应该有统一的顺序。
这是我们推荐的组件选项默认顺序。它们被划分为几大类，所以你也能知道从插件里添加的新属性应该放到哪里。


1. 副作用 (触发组件外的影响)

	* el
2.  全局感知 (要求组件以外的知识)
	* name
	*  parent
3.  组件类型 (更改组件的类型)
 	* functional
4.  模板修改器 (改变模板的编译方式)
 	* delimiters
 	* comments
5.  模板依赖 (模板内使用的资源)
 	* components
 	*  directives
 	*  filters
6.  组合 (向选项里合并属性)
 	* extends
 	*  mixins
7.  接口 (组件的接口)
 	*  inheritAttrs
 	*  model
 	* props/propsData
8.  本地状态 (本地的响应式属性)
 	*  data
 	*  computed
9.  事件 (通过响应式事件触发的回调)
 	* watch
 	*  生命周期钩子 (按照它们被调用的顺序)
10. 非响应式的属性 (不依赖响应系统的实例属性)
 	*  methods
11. 渲染 (组件输出的声明式描述)
 	* template/render
 	*  renderError



### 元素特性的顺序
元素 (包括组件) 的特性应该有统一的顺序。
这是我们为组件选项推荐的默认顺序。它们被划分为几大类，所以你也能知道新添加的自定义特性和指令应该放到哪里。

1.  定义 (提供组件的选项)
	* is
2.  列表渲染 (创建多个变化的相同元素)
	* v-for
3.  条件渲染 (元素是否渲染/显示)
	* v-if
	* v-else-if
	* v-else
	* v-show
	* v-cloak
4.  渲染方式 (改变元素的渲染方式)
	* v-pre
	* v-once
5.  全局感知 (需要超越组件的知识)
	* id
6.  唯一的特性 (需要唯一值的特性)
	* ref
	* key
	* slot
7.  双向绑定 (把绑定和事件结合起来)
	* v-model
8.  其它特性 (所有普通的绑定或未绑定的特性)

9.  事件 (组件事件监听器)
	* v-on
10. 内容 (复写元素的内容)
	* v-html
	* v-text
	
### 单文件组件的顶级元素的顺序

单文件组件应该总是让 < script >、< template > 和 < style > 标签的顺序保持一致。且< style > 要放在最后，因为另外两个标签至少要有一个。
例子

	   <!-- ComponentA.vue -->
	   <script>/* ... */</script>
	   <template>...</template>
	   <style>/* ... */</style>

	   <!-- ComponentB.vue -->
	   <script>/* ... */</script>
	   <template>...</template>
	   <style>/* ... */</style>

### 隐性的父子组件通信
应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop。
一个理想的 Vue 应用是 prop 向下传递，事件向上传递的。遵循这一约定会让你的组件更易于理解。然而，在一些边界情况下 prop 的变更或 this.$parent 能够简化两个深度耦合的组件。
问题在于，这种做法在很多简单的场景下可能会更方便。但请当心，不要为了一时方便 (少写代码) 而牺牲数据流向的简洁性 (易于理解)。

例子
```
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <input
      :value="todo.text"
      @input="$emit('input', $event.target.value)"
    >
  `
})
Vue.component('TodoItem', {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  template: `
    <span>
      {{ todo.text }}
      <button @click="$emit('delete')">
        X
      </button>
    </span>
  `
})
```
### 非flux的全局状态管理
应该优先通过 Vuex 管理全局状态，而不是通过 this.$root 或一个全局事件总线。
通过 this.$root 和/或全局事件总线管理状态在很多简单的情况下都是很方便的，但是并不适用于绝大多数的应用。Vuex 提供的不仅是一个管理状态的中心区域，还是组织、追踪和调试状态变更的好工具。
例子

```
	   // store/modules/todos.js
	   export default {
 	    state: {
 	      list: []
 	    },
 	    mutations: {
 	      REMOVE_TODO (state, todoId) {
  	       state.list = state.list.filter(todo => todo.id !== todoId)
  	     }
 	    },
 	    actions: {
  	     removeTodo ({ commit, state }, todo) {
  	       commit('REMOVE_TODO', todo.id)
  	     }
 	    }
	   }
	   <!-- TodoItem.vue -->
	   <template>
 	    <span>
  	     {{ todo.text }}
   	    <button @click="removeTodo(todo)">
   	      X
    	   </button>
  	   </span>
	   </template>

	   <script>
	   import { mapActions } from 'vuex'
	   
	   export default {
 	    props: {
  	     todo: {
  	       type: Object,
  	       required: true
   	    }
 	    },
 	    methods: mapActions(['removeTodo'])
	   }
	   </script>

```
### 组件内部名称
区分props 属性 和data属性 
变量名采用变量名采用 下划线 _ 连接单词的方式 不能使用$和_开头 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。
区分props 属性 和data属性 
计算属性和methods方法使用驼峰规则

### method 自定义方法命名
动宾短语（good：jumpPage、openCarInfoDialog）
（bad：go、nextPage、show、open、login）
 
ajax 方法以 get、post 开头，以 data 结尾
（good：getListData、postFormData）
（bad：takeData、confirmData、getList、postForm）
 
  事件方法以 on 开头（onTypeChange、onUsernameInput） 

  init、refresh 单词除外 

  尽量使用常用单词开头（set、get、open、close、jump） 

  驼峰命名（good: getListData）（bad: get_list_data、getlistData)

  用对时态和语态

  注意单复数

  准确用词
  正确拼写

### 参考文献

#### 从达标到卓越 —— API 设计之道

 <http://taobaofed.org/blog/2017/02/16/a-guide-to-api-design/>


#### vue风格指南

<https://cn.vuejs.org/v2/style-guide/>
 



