# 迅策大前端优化系列--CSS使用规范

标签（空格分隔）： css bem sass

---

### 当我在寻找一个出色的 CSS 架构时我究竟在找什么

 - `class` 必须 **尽可能的少**；
 - 当我要查找 `class` 时 **必须立即** 可以知道 **它放在整个项目的哪个位置**；
 - 我 **必须立即** 知道当 **编辑更改** 这个 `class` 时 **是否安全**；

### 什么是BEM

BEM拆分开 就是 `Block` `Element` `Modifier`

```
.block { /* styles */ } 
.block__element { /* styles */ } 
.block--modifier { /* styles */ }
```
 
### 块(Block)

一个块就是一个组件。

按钮很好地阐释了可以包含不同样式的块。如果将 `<button>` 元素的背景颜色设置为红色，则所有 `<buttons>` 都将被强制继承红色背景。接下来，你必须通过覆盖你的 `<button>` 元素来修复代码（并且可能会在修复中“伤及无辜” ）。

```css
button { 
    background-color: red; 
} 
.something button { 
    background-color: blue; 
}
```

如果设置了一个 `.button` 类的按钮，则可以在任何 `<button>` 元素上选择是否使用 `.button` 类。那么，如果你需要一个不同的背景颜色，你所做的就是改成一个新的 `class`，比如说 `.button--success`

```
.button { 
    background-color: red; 
} 
.button--success { 
    background-color: blue; 
}
```
这部分也正是引入了BEM中的 `修饰符--Modifier`

### 修饰符(Modifier)

修饰符是改变某个块的外观的标志。要使用修饰符，可以将 `--modifier` 添加到块中。

从上面的按钮示例继续，修改的按钮将被命名为 `.button--success`。

在传统的 BEM 中，当你使用修饰符时，你应该 将块和修饰符添加 到 HTML 中，以便在新的 `.button--success` 中不重写 `.button` 样式。

```
<button class="button">default button</button> 
<button class="button button--success">success button</button> 

<style>
.button { 
    padding: 10px 20px;
    background-color: red; 
} 
.button--success { 
    background-color: blue; 
}
</style>
```

因为在 `.button` 中已经声明了 `padding` , 所以我们无需在 `.button--success` 中重新声明。

那么，还有没有 **更加理想** 的写法呢？

```
<button class="button">default button</button> 
<button class="button--success">success button</button>
```

不幸的是，如果 HTML 中没有 .button，我们必须回到非简洁的 CSS：

```
.button { 
    padding: 10px 20px;
    background-color: red; 
} 
.button--success { 
    padding: 10px 20px;
    background-color: blue; 
}
```

有两种方法可以编写简洁的 CSS，而不需要额外的 `class`！

#### 方法 1：使用 mixin

    注意：因为我平时都是用sass编写css，所以此方式也是通过sass的方式去实现。

在我们的按钮示例中，我们只需要将 padding 写入 mixin。 在这里，我在块中调用这个 mixin：

```
@mixin button {
    padding: 10px 20px;
}
.button {
    @include button;
    background-color: red; 
}
.button--success { 
    @include button;
    background-color: blue; 
}
```

#### 方法 2：使用 CSS 属性选择器

```
[class*='button']:not([class*='button__']) {
    padding: 10px 20px;
}
```
第一部分（  `[class*='button'] ` ）告诉解析器查找包含文本 button 的所有 class。
第二部分（ `:not([class*='button__'])` ）告诉解析器将包含.button__任何东西排除在外，于是排除了 BEM 元素。

我们来看看 BEM 的第三个重要部分 —— 元素。


### 元素(Element)

元素是块的子节点。为了表明某个东西是一个元素，你需要在块名后添加 `__element`。

```
<div class="xc-dailog">
    <div class="xc-dialog__header"></div>
    <div class="xc-dialog__body"></div>
    <div class="xc-dialog__footer"></div>
</div>
```

BEM 元素有两个优点 ：

- 可以让 CSS 的优先级保持相对扁平。
- 能立即知道哪些东西是一个子元素。

> 注意：永远不应该链式命名 BEM 元素，禁止类似 `.dailog__header__title`的命名。

    
有两种方法可以绕过长长的 BEM 链式命名：

- 只把子子元素链接到有意义的块。
- 创建新的块来保存元素。


#### 链接孙元素到块

接下来是一个例子。在下面的代码中，你将看到 `.article__header` 是 `.article` 的子元素。`.article__title` 是 `article` 的孙元素（或者说是 `.article__header` 的子元素，如果你将它们同时表示为 `.article` 的子元素，就没有冲突，因为这个表单同时只有他们存在。

```
<article class="article"> 
    <header class="article__header"> 
        <h1 class="article__title"></h1> 
    </header> 
</article>
```

虽然这样有效，你也会遇到无意义的链接孙元素的情况。举个例子：

```
<section class="comments"> 
    <h2 class="comments__title"></h2> 
    <article class="comments__comment"> 
        <h3 class="comments__comment-title"></h3> 
    </article> 
    <article class="comments__comment"> 
        <h3 class="comments__comment-title"></h3> 
    </article>
</section>
```

此时我们需要创建新块来保存孙元素。

#### 创建新的块来保存孙元素

这时，我们可以把 `.comments__comment` 拆为 `.comments` 和 `.comment` ：

```
<section class="comments"> 
    <h2 class="comments__title"></h2> 
    <article class="comment"> 
        <h3 class="comment-title"></h3> 
    </article> 
    <article class="comment"> 
        <h3 class="comment-title"></h3> 
    </article>
</section>
```

> 注意：请确保将 `.comments` 和 `.comment`块放在同一个文件中，以方便参考。

不幸的是，有时候它不像 `.comments__comment` 那么简单。例如，假设在块中有一个列表元素。

```
<div class="block"> 
    <h3 class="block__title"></h3> 
    <ul class="block__list"> 
        <li class="block__item"> 
            <!-- class name? --> 
            <h3 class="???????"></h3> 
        </li> 
    </ul> 
</div>
```

如果你注意到，我已经链接了`.block__item` ，这是一个 `.block` 的孙元素。 将 `.block__item` 中的元素链接到 `.block` 没有意义，或可能最终会遇到一些糟糕的局面。

然而，同时由于它们被一起使用，所以为 `.block__list` 或 `.block__item` 创建一个新的块是没有意义的 。你会命名什么来保持在上下文中有意义？

在这种情况下，我一般会为 `block__item` 创建一个名为 `.item` 的伪块。看下面的`HTML`。


```
<div class="block"> 
    <h3 class="block__title"></h3> 
    <ul class="block__list"> 
        <li class="block__item"> 
            <h3 class="item__title"></h3> 
        </li> 
    </ul> 
</div>
```

### 命名空间由来


```
<nav class="main-nav"> 
    <a href="#">Home</a> 
    <button class="button">Menu</button> 
</nav>
```

现在，有两个区块。 一个叫 `.main-nav` ，另一个叫 `.button` 。 `.button` 存在于 `.main-nav` 内。

现在需求需要我们把这个 `button` 的颜色从 `blue` 变成 `green` 。同时你也想给 `.button` 加些左边距来和 `home` 链接分开。

那么问题来了，我们应该怎样书写CSS代码呢？这下面有几种可能的答案：

 - 给 `.main-nav .button` 添加 `margin` 和 `background-color`
 - 给 `button--modifier` 添加 `margin` 和 `background-color`
 - 给 `.main-nav .button` 添加 `margin` ，给 `button--modifier` 添加 `background-color`
 - 给 `.main-nav a` 添加 `margin` ，给 `.main-nav .button` 添加 `background-color`
 - 给 `.main-nav a` 添加 `margin`，给 `button--modifier` 添加 `background-color`

实现的方式很多种，如果我们只有BEM，当我们修改已写好的样式时，就不能立即知道此次修改是否安全。

因此我们要引入一套规范的BEM命名空间。

### 命名空间规范

- `.l-` : 布局(layouts)
- `.xc-` : 通用组件(components)
- `.c-` : 局部组件(components)
- `.o-` : 局部对象(objects)
- `.is-` | `.has-` : 状态类(state classes)
- `.t1` | `.s1` : 排版大小(typography sizes)
- `.u-` : 实用类(utility classes)


#### “.l-” —— 布局(layouts)

##### 全局布局

全局布局是应用于所有页面的布局。它们通常是在任何地方都使用的大型网格容器。 一个例子是.l-wrap 类：

```
.l-wrap { 
    padding-left: 10px; 
    padding-right: 10px; 
    @media (min-width: 1000px) { 
        max-width: 800px; 
        margin-left: auto; 
        margin-right: auto; 
    } 
}
```

我们可以在每个地方都使用.l-wrap类，比如在header和footer里来对齐内容：

```
<div class="site-header"> 
    <div class="l-wrap"> 
        <!-- stuff --> 
    </div> 
</div> 
<div class="site-footer">
    <div class="l-wrap"> 
        <!-- stuff --> 
    </div> 
</div>
```

由于这些class在全局使用，所以我们可以把它们写在 `_layouts.scss` 部分。

### “.o-”——对象(Objects)

对象物们都有着以下的属性：

 - 它们的里面不能包含其他对象或组件
 - 它们之于上下文是独立的

### “.is-/.has-” ——状态类

状态类表示对象/组件的当前状态。当应用状态类时，我们可以立即知道对象/组件是否具有下拉 `.has-dropdown` 或当前处于打开状态 `.is-open`。 

### “.t”或“.s”——排版类(Typography)

```
.t1 - 最大的字体大小。
.t2 - 第二大字体大小。
.t3 - 第三大字体大小。
.s1 - 第一字体大小较小的基本字体大小。
.s2 - 第二字体大小较小的基本字体大小。
...
```

排版类是对象的子集，这意味着我们不应该在排版类中添加  `margin`或 `padding`。而这些 `margin` 或 `padding` 应该直接添加到组件。

### “.u-” ——实用类(Utility)

实用类是用来表现样式的一个非常好的辅助类。因此，它们通常只包含一个属性，并且包含 `!important` 声明。

```
.u-text-left { text-align: left !important; } 
.u-text-center { text-align: center !important; } 
.u-text-right { text-align: right !important; } 
.u-hide-st-med { @media (man-width: 599px) { display: none !important; } } 
.u-hide-bp-med { @media (min-width: 600px) { display: none !important; } }
```