<script>
    export default {
        data() {
            return {
                input: '',
                input2: '',
                input3: '',
                input4: ''
            }
        }
    }
</script>

# Input 输入框
通过鼠标或键盘输入字符

----

### 基础用法

<div class="demo-block">
    <xc-input v-model="input" placeholder="请输入内容" style="width: 200px"></xc-input>
</div>

::: demo
```html
<template>
    <xc-input v-model="input" placeholder="请输入内容" style="width: 200px"></xc-input>
</template>
```
:::

### 禁用状态

<div class="demo-block">
    <xc-input 
        v-model="input" 
        style="width: 200px"
        placeholder="请输入内容" 
        :disabled="true">
    </xc-input>
</div>

::: demo
```html
<template>
    <xc-input 
        v-model="input"
        style="width: 200px"
        placeholder="请输入内容" 
        :disabled="true">
    </xc-input>
</template>
```
:::

### 复合型输入框
可后置元素，一般为按钮

<div class="demo-block">
    <xc-input v-model="input3" readonly placeholder="请选择需要导入的文件，支持excel格式" style="width: 500px">
        <xc-button slot="append" type="warning">导入</xc-button>
    </xc-input>
</div>

::: demo
```html
<template>
    <xc-input v-model="input3" readonly placeholder="请选择需要导入的文件，支持excel格式" style="width: 500px">
        <xc-button slot="append" type="warning">导入</xc-button>
    </xc-input>
</template>
```
:::

### 自定义模板
可自定义输入建议的显示

<div class="demo-block">
    <xc-input v-model="input4" placeholder="请输入价格" style="width: 200px">
        <span slot="suffix">元</span>
    </xc-input>
</div>

::: demo
```html
<template>
    <xc-input v-model="input4" placeholder="请输入价格" style="width: 200px">
        <span slot="suffix">元</span>
    </xc-input>
</template>
```
:::
