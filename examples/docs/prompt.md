# prompt 提示
鼠标移上出现提示内容

----

## 基础用法（右）

<div class="demo-block">
  <xc-prompt
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

## 左

<div class="demo-block">
  <xc-prompt
    position="left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    position="left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

## 上左

<div class="demo-block">
  <xc-prompt
    position="top-left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    position="top-left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

## 上右

<div class="demo-block">
  <xc-prompt
    position="top-right"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    position="top-right"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

## 下左

<div class="demo-block">
  <xc-prompt
    position="bottom-left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    position="bottom-left"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

## 下右

<div class="demo-block">
  <xc-prompt
    position="bottom-right"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>

::: demo
```html
<div class="demo-block">
  <xc-prompt
    position="bottom-right"
    message="我是一个提示文案，默认是看不到的"></xc-prompt>
</div>
```
:::

### Prompt Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| message  | 提示的内容   | string   | —   |  —   |
| position  | 提示的位置  | string   | left, right, top-left, top-right, bottom-left, bottom-right   |  right  |