<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '国金恒生'
                }, {
                    value: '选项12',
                    label: '海通恒生'
                }, {
                    value: '选项3',
                    label: '宽瑞测试'
                }, {
                    value: '选项4',
                    label: '招商金证'
                }, {
                    value: '选项5',
                    label: 'BMS'
                }, {
                    value: '选项6',
                    label: 'OMS'
                }, {
                    value: '选项7',
                    label: 'AMS'
                }, {
                    value: '选项8',
                    label: 'CMS'
                }, {
                    value: '选项9',
                    label: 'DMS'
                }],
                value: '',
                value2: '',
                value3: ''
            }
        },

        methods: {
            clear() {
                console.log('已清空')
            },
            handleBlur() {
                console.log(this.value3)
            }
        }
    }
</script>

# Select 选择器
当选项过多时，使用下拉菜单展示并选择内容。

----

### 基础用法
适用广泛的基础单选

<div class="demo-block">
    <xc-select v-model="value" placeholder="请选择" style="width: 220px">
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
</div>

::: demo
```html
<template>
    <xc-select v-model="value" placeholder="请选择" style="width: 220px">
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '国金恒生'
                }, {
                    value: '选项2',
                    label: '海通恒生'
                }, {
                    value: '选项3',
                    label: '宽瑞测试'
                }, {
                    value: '选项4',
                    label: '招商金证'
                }, {
                    value: '选项5',
                    label: 'BMS'
                }],
                value: ''
            }
        }
    }
</script>
```
:::

### 可清空单选
包含清空按钮，可将选择器清空为初始状态

<div class="demo-block">
    <xc-select 
        v-model="value2" 
        placeholder="请选择" 
        clearable
        style="width: 220px"
        @clear="clear">
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
</div>

::: demo
```html
<template>
    <xc-select 
        v-model="value2" 
        placeholder="请选择" 
        clearable  
        style="width: 220px"
        @clear="clear">
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
</template>

```
:::

### 可搜索
可以利用搜索功能快速查找选项

<div class="demo-block">
    <xc-select 
        v-model="value3" 
        placeholder="请选择" 
        filterable
        blurReserve
        style="width: 220px"
        noMatchText="暂无匹配行业。<br>您可以点击确定，将“输入内容”保存为新的行业。"
    >
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
    
</div>

::: demo
```html
<template>
    <xc-select 
        v-model="value3" 
        placeholder="请选择" 
        filterable  
        style="width: 220px"
        @clear="clear">
        <xc-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </xc-option>
    </xc-select>
</template>

```
:::

### Select Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| clearable | 单选时是否可以清空选项   | boolean |   —   |  false  |
| filterable | 是否可搜索   | boolean |   —   |  false  |

### Select Events
| 参数      | 说明    | 类型 | 
|---------- |-------- |---------- |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur | 当 input 失去焦点时触发 | — |
| focus | 当 input 获得焦点时触发 | — |

### Option Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
value | 选项的值 | string/number/object | — |	—
label | 选项的标签，若不设置则默认与 value 相同 | string/number | — | —
disabled | 是否禁用该选项	| boolean | — | false