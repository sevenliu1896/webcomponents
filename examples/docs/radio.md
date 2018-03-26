<script>
export default {
    data () {
        return {
            radio: '1',
            radio1: '选中且禁用',
            radio2: 3
        };
    }
}
</script>

# Radio 单选框
在一组备选项中进行单选

----

### 基础用法
由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

要使用 ```Radio``` 组件，只需要设置```v-model```绑定变量，选中意味着变量的值为相应 ```Radio label```属性的值，```label```可以是```String```、```Number```或```Boolean```。

<div class="demo-block">
    <xc-radio v-model="radio" label="1">备选项</xc-radio>
    <xc-radio v-model="radio" label="2">备选项</xc-radio>
</div>

:::demo
```html
<template>
    <xc-radio v-model="radio" label="1">备选项</xc-radio>
    <xc-radio v-model="radio" label="2">备选项</xc-radio>
</template>

<script>
    export default {
        data() {
            return {
                 radio: '1'
            };
        }
    };
</script>
```
:::

### 禁用状态
单选框不可用的状态

只要在```xc-radio```元素中设置```disabled```属性即可，它接受一个```Boolean```，```true```为禁用。

<div class="demo-block">
    <xc-radio disabled v-model="radio1" label="禁用">备选项</xc-radio>
    <xc-radio disabled v-model="radio1" label="选中且禁用">备选项</xc-radio>
</div>

:::demo
```html
<template>
    <xc-radio disabled v-model="radio1" label="禁用">备选项</xc-radio>
    <xc-radio disabled v-model="radio1" label="选中且禁用">备选项</xc-radio>
</template>

<script>
    export default {
        data() {
            return {
                 radio1: '选中且禁用'
            };
        }
    };
</script>
```
:::

### 单选框组
适用于在多个互斥的选项中选择的场景

<div class="demo-block">
    <xc-radio-group v-model="radio2">
        <xc-radio :label="3">备选项</xc-radio>
        <xc-radio :label="6">备选项</xc-radio>
        <xc-radio :label="9">备选项</xc-radio>
        <xc-radio :label="12" disabled>备选项</xc-radio>
    </xc-radio-group>
</div>

:::demo
```html
<template>
    <xc-radio-group v-model="radio2">
        <xc-radio :label="3">备选项</xc-radio>
        <xc-radio :label="6">备选项</xc-radio>
        <xc-radio :label="9">备选项</xc-radio>
        <xc-radio :label="12" disabled>备选项</xc-radio>
    </xc-radio-group>
</template>

<script>
    export default {
        data() {
            return {
                 radio2: '3'
            };
        }
    };
</script>
```
:::

### Radio Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | --------- | --------- |
| label | Radio 的 value | string / number / boolean | — | — |
| disabled | 是否禁用 | boolean |  —  |  —  |
| name  | 原生 name 属性 | string | — |  —  |

### Radio Event
| 事件名称  | 说明   | 回调参数 | 
|---------- |-------- |---------- |
| change  | 当绑定值变化时触发的事件   | 更新后的值  |

### Radio-group Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | --------- | --------- |


### Radio-group Event
| 事件名称  | 说明   | 回调参数 | 
|---------- |-------- |---------- |
| handleChange  | 当绑定值变化时触发的事件   | 更新后的值  |