# Button 按钮
----
### 基础用法
使用```type```属性来定义 Button 的样式。

<div class="demo-block">
    <div>
        <xc-button>默认按钮</xc-button>
        <xc-button type="primary">主要按钮</xc-button>
        <xc-button type="success">成功按钮</xc-button>
        <xc-button type="warning">警告按钮</xc-button>
        <xc-button type="danger">危险按钮</xc-button>
    </div>
</div>

::: demo
```html
<div>
    <xc-button>默认按钮</xc-button>
    <xc-button type="primary">主要按钮</xc-button>
    <xc-button type="success">成功按钮</xc-button>
    <xc-button type="warning">警告按钮</xc-button>
    <xc-button type="danger">危险按钮</xc-button>
</div>
```
:::

### 禁用状态

按钮不可用状态。

<div class="demo-block">
    <div>
        <xc-button disabled>默认按钮</xc-button>
        <xc-button type="primary" disabled>主要按钮</xc-button>
        <xc-button type="success" disabled>成功按钮</xc-button>
        <xc-button type="warning" disabled>警告按钮</xc-button>
        <xc-button type="danger" disabled>危险按钮</xc-button>
    </div>
</div>

::: demo
```html

<div>
    <xc-button disabled>默认按钮</xc-button>
    <xc-button type="primary" disabled>主要按钮</xc-button>
    <xc-button type="success" disabled>成功按钮</xc-button>
    <xc-button type="warning" disabled>警告按钮</xc-button>
    <xc-button type="danger" disabled>危险按钮</xc-button>
</div>

```
:::

### 文字按钮

没有边框和背景色的按钮。

<div class="demo-block">
    <div>
        <xc-button type="text">文字按钮</xc-button>
        <xc-button type="text" disabled>文字按钮</xc-button>
    </div>
</div>

::: demo
```html

<div>
    <xc-button type="text">文字按钮</xc-button>
    <xc-button type="text" disabled>文字按钮</xc-button>
</div>


```
:::

### 不同尺寸

Button 组件提供除默认值以外的两种尺寸，可以在不同场景下选择合适的尺寸。
额外的尺寸：```small```，通过设置```size```属性来配置它们。

<div class="demo-block">
    <xc-button>默认按钮</xc-button>
    <xc-button size="small">小型按钮</xc-button>
    <xc-button size="mini">超小按钮</xc-button>
</div>

::: demo
```html

<div>
    <xc-button>默认按钮</xc-button>
    <xc-button size="small">小型按钮</xc-button>
    <xc-button size="mini">超小按钮</xc-button>
</div>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   default,small,mini   |    —     |
| type     | 类型   | string    |   primary,success,warning,danger,text |     —    |
| disabled  | 是否禁用状态    | boolean   | —   | false   |