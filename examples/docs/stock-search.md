<script>
  export default {
    data() {
      return {
        stockId: '',
        stockName: ''
      }
    },

    methods: {
      chioceStockId(id) {
        this.stockId = id;
      },
      chioceStockName(name) {
        this.stockName = name;
      }
    }
  }
</script>

# 股票搜索框

> 此处接口返回数据都是假数据

----

## 基本使用
<div class="demo-block">
  <p>选择的股票ID: {{ stockId }}</p>
  <p>选择的股票名称：{{ stockName }}</p>

  <vue-stock-search style="width: 300px; height: 36px;"
    placeholder="请输入股票代码或名称"
    assets-class="e,ehksz,ehksh"
    stock-fullname="all"
    :has-loading-icon="false"
    cur-market="marketA"
    @stock_id="chioceStockId($event)"
    @stock_name="chioceStockName($event)"
    />
</div>

::: demo
```html
<div class="demo-block">
  <p>选择的股票ID: {{ stockId }}</p>
  <p>选择的股票名称：{{ stockName }}</p>

  <vue-stock-search style="width: 300px; height: 36px;"
    placeholder="请输入股票代码或名称"
    assets-class="e,ehksz,ehksh"
    stock-fullname="all"
    :has-loading-icon="false"
    cur-market="marketA"
    @stock_id="chioceStockId($event)"
    @stock_name="chioceStockName($event)"
    />
</div>

<script>
  export default {
    data() {
      return {
        stockId: '',
        stockName: ''
      }
    },

    methods: {
      chioceStockId(id) {
        this.stockId = id;
      },
      chioceStockName(name) {
        this.stockName = name;
      }
    }
  }
</script>
```
:::

## stockSearch Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |     ps  |
|---------- |-------- |---------- |-------------  |-------- | --------- |
| placeholder | 默认占位符   | String |   —   |  —  |  — |
| disabled | 是否禁用   | Boolean |   —   |  false  | — |
| assetsClass | 查询的股票类型   | String | e(股票),f(基金),repo(国债),IDX(指数),ehk(纯港股),ehksz(港股通（深）),ehksh(港股通（沪）)   |  —  |  多种类型的，通过","分割开 |
| stockFullname | 是否显示股票代码后面的英文 (如: 000001.sz的".sz", 默认不显示.sz)   | [Array, String] |   —   |  —  | 默认情况下，选中股票后，输入框中只会出现股票Id, 不会加后缀，如需全部加后缀，可以传“all”, 如果港股加后缀的话，可以传 ['ehksz', 'ehksh'] |
| hasLoadingIcon | 是否需要转圈   | Boolean |   —   |  true  | — |
| curMarket | 当前所处的市场   | String |   —   |  —  | 目前的逻辑是。当不是A股的时候，我们不需要处理新股 |
| stockInit | 初始化股票   | Object |   —   |  —  | — |


## stockSearch Events
| 参数      | 说明    | 类型 |
|---------- |-------- |---------- |
| stock_id | 点击股票后像上传递的股票ID | — |
| stock_name | 点击股票后像上传递的股票Name | — |
