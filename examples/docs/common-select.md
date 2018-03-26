# CommonSelect
下拉框组件

个人认为很多组件都会有其相似性的，是可以抽象出来一致性的东西的。例如下拉框与tab切换应该是有着几乎一样的api思想及逻辑。
所以基于上面的想法，我认为——特别是数据查询和报表页面爆了重复查询ajax请求的bug——很多事情（逻辑）是不应该交给子组件来做的。如果本身自己能够完成的情况下。
所以基于旧版，去掉了修改options会导致事件触发的情况

----

### 基础用法

<script>
  export default {
    data() {
      return {
        label: '仅支持单选',
        options: [{
          label:'待审批指令',
          value:'wait',
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
        }],
        optionsAll: [{
          label: '全部',
          value: 'all',
        },{
          label:'待审批指令',
          value:'wait',
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
        }],
        optionsSingle: [{
          label: '审批数据校验',
          value: 'validation'
        }],
        optionsAmount: [{
          label: '1',
          value: '1'
        },{
          label: '2',
          value: '2'
        },{
          label: '3',
          value: '3'
        },{
          label: '4',
          value: '4'
        },{
          label: '5',
          value: '5'
        },{
          label: '6',
          value: '6'
        },{
          label: '7',
          value: '7'
        },{
          label: '8',
          value: '8'
        },{
          label: '9',
          value: '9'
        },{
          label: '10',
          value: '10'
        },{
          label: '11',
          value: '11'
        },{
          label: '12',
          value: '12'
        },{
          label: '13',
          value: '13'
        },{
          label: '14',
          value: '14'
        },{
          label: '15',
          value: '15'
        },{
          label: '16',
          value: '16'
        },{
          label: '17',
          value: '17'
        },{
          label: '18',
          value: '18'
        },{
          label: '19',
          value: '19'
        },{
          label: '20',
          value: '20'
        },{
          label: '21',
          value: '21'
        },{
          label: '22',
          value: '22'
        },{
          label: '23',
          value: '23'
        },{
          label: '24',
          value: '24'
        },{
          label: '25',
          value: '25'
        },{
          label: '26',
          value: '26'
        },{
          label: '27',
          value: '27'
        },{
          label: '28',
          value: '28'
        },{
          label: '29',
          value: '29'
        },{
          label: '30',
          value: '30'
        },{
          label: '31',
          value: '31'
        },{
          label: '32',
          value: '32'
        },{
          label: '33',
          value: '33'
        },{
          label: '34',
          value: '34'
        },{
          label: '35',
          value: '35'
        },{
          label: '36',
          value: '36'
        },{
          label: '37',
          value: '37'
        },{
          label: '38',
          value: '38'
        },{
          label: '39',
          value: '39'
        },{
          label: '40',
          value: '40'
        },{
          label: '41',
          value: '41'
        },{
          label: '42',
          value: '42'
        },{
          label: '43',
          value: '43'
        },{
          label: '44',
          value: '44'
        },{
          label: '45',
          value: '45'
        },{
          label: '46',
          value: '46'
        }],
        selectedAmount: [1],
        selected: ['validation'],
        multiLabel: '支持多选',
        multiable: true,
        placeholder: '自定义为空时的展示'
      }
    },
    methods: {
      chgMenu: function(value){
        // 这里必须要将默认值进行对应的修改
        this.selected = value;
        console.log(this.selected)
        console.log(value)
      }
    }
  };
</script>

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="label"
  >
  </common-select>
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
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="label"
  >
  </common-select>
</div>
```
:::

----

### 支持多选

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="multiLabel" 
    :multiable="true"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        options: [{
          label:'待审批指令',
          value:'wait',
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
        }],
        multiable: true,
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
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="label" 
    :multiable="true"
  >
  </common-select>
</div>
```
:::

----

### 支持筛选

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="multiLabel" 
    :searchable="true"
    :multiable="true"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        options: [{
          label:'待审批指令',
          value:'wait',
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options=options 
    :selected=selected 
    :label="label" 
    :searchable="true"
    :multiable="true"
  >
  </common-select>
</div>
```
:::

----

### 支持全选

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=optionsAll 
    :selected=selected 
    :label="multiLabel" 
    :searchable="true"
    :multiable="true"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        optionsAll: [{
          label: '全部',
          value: 'all',
        },{
          label:'待审批指令',
          value:'wait',
        },{
          label:'已审批指令',
          value:'done',
        },{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options="optionsAll" 
    :selected=selected 
    :label="label" 
    :searchable="true"
    :multiable="true"
  >
  </common-select>
</div>
```
:::

----

### 只有一个的时候，默认选中一个（产品需求）

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=optionsSingle 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        optionsSingle: [{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options="optionsSingle" 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
  >
  </common-select>
</div>
```
:::

----

### 没数据时，提示（产品需求）

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=[] 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
    :placeholder="placeholder"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        optionsSingle: [{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options="[]" 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
  >
  </common-select>
</div>
```
:::

----

### 大量数据时，且控制列数

<div class="demo-block">
  <common-select 
    @change="chgMenu" 
    :options=optionsAmount 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
    :column_num="3"
  >
  </common-select>
</div>

::: demo
```html
<script>
  export default {
    data() {
      return {
        label: '支持多选',
        optionsSingle: [{
          label:'审批数据校验',
          value:'validation',
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
  <common-select 
    @change="chgMenu" 
    :options="optionsAmount" 
    :selected=selected 
    :label="'单选默认'" 
    :searchable="false"
    :multiable="false"
    :column_num="3"
  >
  </common-select>
</div>
```
:::


### Attributes


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ------ | ------ | --------- | --------- |
| options | 下拉选项。形如：[{label: '菜单标题', value: '该标题的value值，唯一'}]| Array | 必填 | [] |
| selected | 选中值。形如：['选中value1', '选中value2'] | Array |  —  |  []  |
| label | 提示文本。形如：'请选择基金经理' | String |  —  |  ''  |
| placeholder | 下拉选项为空时的文本。形如：'暂无选项' | String |  —  |  '暂无选项'  |
| column_num | 下拉框内选项列数。 | Number |  —  |  5  |
| multiable | 是否支持多选。 | Boolean |  —  |  false  |
| searchable | 是否支持检索 | Boolean |  —  |  false  |
| classname | 组件外层样式 | String |  —  |  ''  |

### Slot

无


### Events

| 事件名称 | 说明 | 回调参数 
| ------ | ------ | ------ |
| change | 用户点击修改后的回调 | selected，由入参options数组中某一项或多项的value值组成的数组，表示选中该选项 |
