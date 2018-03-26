# TabTop
子页面tab菜单切换组件

----

### 基础用法

<script>
  export default {
    data() {
      return {
        options: [{
          label:'待审批指令',
          value:'wait',
          visible:true,
        },{
          label:'已审批指令',
          value:'done',
          visible:true,
        },{
          label:'审批数据校验',
          value:'validation',
          visible:true,
        }],
        value: 'validation'
      }
    },
    methods: {
      chgMenu: function(value){
        console.log(value)
      }
    }
  };
</script>

<div class="demo-block">
  <tab-top v-on:change="chgMenu" :options=options :value=value></tab-top>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        options: [{
          label:'待审批指令',
          value:'wait',
          visible:true,
        },{
          label:'已审批指令',
          value:'done',
          visible:true,
        },{
          label:'审批数据校验',
          value:'validation',
          visible:true,
        }],
        value: 'validation'
      }
    },
    methods: {
      chgMenu: function(value){
        console.log(value)
      }
    }
  };
</script>

<div class="demo-block">
  <tab-top v-on:change="chgMenu" :options=options :value=value></tab-top>
</div>
```
:::


### Attributes


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | --------- | --------- |
| options | tab菜单选项。形如：[{label: '菜单标题', value: '该标题的value值，唯一', visible: '是否展示'}]| Array | 必填 | - |
| value | 选中值 | String |  —  |  ''  |


### Slot

无


### Events

| 事件名称 | 说明 | 回调参数 
| ------ | ------ | ------ |
| change | 用户点击修改后的回调 | value，与入参options数组中某一项的value值匹配，表示选中该菜单项 |
