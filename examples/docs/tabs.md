<script>
    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab.name);
            }
        }
    };
</script>

# Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

----

### 基础用法
基础的、简洁的标签页。

<div class="demo-block">
    <xc-tabs v-model="activeName" @tab-click="handleClick">
        <xc-tab-pane label="基金估值" name="first">基金估值</xc-tab-pane>
        <xc-tab-pane label="费用设置" name="second">费用设置</xc-tab-pane>
        <xc-tab-pane label="停牌估值" name="third">停牌估值</xc-tab-pane>
        <xc-tab-pane label="场外资产" name="four">场外资产</xc-tab-pane>
    </xc-tabs>
</div>

::: demo
```html

<template>
    <xc-tabs v-model="activeName" @tab-click="handleClick">
        <xc-tab-pane label="基金估值" name="first">基金估值</xc-tab-pane>
        <xc-tab-pane label="费用设置" name="second">费用设置</xc-tab-pane>
        <xc-tab-pane label="停牌估值" name="third">停牌估值</xc-tab-pane>
        <xc-tab-pane label="场外资产" name="four">场外资产</xc-tab-pane>
    </xc-tabs>
</template>

<script>
    export default {
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab.name);
            }
        }
    };
</script>

```
:::

### 其他用法
嵌入到Dialog中。

<div class="demo-block">
    <xc-tabs v-model="activeName">
        <xc-tab-pane label="内部基金" name="first">内部基金</xc-tab-pane>
        <xc-tab-pane label="外部基金" name="second">外部基金</xc-tab-pane>
     </xc-tabs>
</div>

::: demo
```html

<template>
    <xc-tabs v-model="activeName">
        <xc-tab-pane label="内部基金" name="first">内部基金</xc-tab-pane>
        <xc-tab-pane label="外部基金" name="second">外部基金</xc-tab-pane>
    </xc-tabs>
</template>

```
:::