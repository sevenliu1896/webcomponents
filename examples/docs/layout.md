# Layout 布局

---

### 概述

栅格化设计是按照一定的规则把页面分成固定的相同宽度，然后列出各种组合的可能性，以便于在进行页面呈现的时候能够快速的进行布局。市面上一般使用 12栅格 系统，也有采用 8栅格 系统的，但是随着设备屏幕越来越大，传统的 12栅格 系统在一些业务场景下，没办法很好的解决元素布局的问题，所以我们使用了 24栅格 系统。也就是将页面区域 24 等分。

### 基础布局

使用单一分栏创建基础的栅格布局。

<div class="demo-block">
    <xc-row>
        <xc-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
        </xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="12"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
</div>

::: demo
```html

<div>
    <xc-row>
        <xc-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
        </xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="12"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
    <xc-row>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple-light"></div></xc-col>
    </xc-row>
</div>

```
:::

### 分栏间隔

分栏之间存在间隔。

<div class="demo-block">
    <xc-row :gutter="20">
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>

::: demo
```html
<div>
    <xc-row :gutter="20">
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="12"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>
```
:::

### 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

<div class="demo-block">
     <xc-row :gutter="20">
        <xc-col :span="16"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="16"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>

::: demo
```html
<div>
    <xc-row :gutter="20">
        <xc-col :span="16"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="8"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="16"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="4"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>
```
:::

### 分栏偏移

支持偏移指定的栏数。

<div class="demo-block">
    <xc-row :gutter="20">
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>

::: demo
```html
<div>
    <xc-row :gutter="20">
        <xc-col :span="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
        <xc-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
    <xc-row :gutter="20">
        <xc-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></xc-col>
    </xc-row>
</div>
```
:::

### Row Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| gutter     | 栅格间隔   | number  |   —   |    0    |

### Col Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| span     | 栅格占据的列数   | number  |   —   |    24    |
| offset     | 栅格左侧的间隔格数  | number  |   —   |   0   |