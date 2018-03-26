/*
 * @Desc 股票搜索
 * @Author: liuzeyafzy@gmail.com; wei.li
 * @Time: 2018-01-15 星期一
 * @Ps: 此处的请求地址，是假数据。请注意，正确使用位置是在xcfrontend下的 /src/webpack_js/components/common/stock-search/v3.0.0
 */
<template>
  <div class="stock-search">
    <div class="stock-search__box">
      <!-- 输入框 -->
      <input
        class="stock-search__input"
        type="text"
        :disabled="disabled"
        @focus="focusFlag = true"
        @blur="focusFlag = false"
        :placeholder="placeholder"
        v-model.trim="stockInput"
        @input="getStockList()" />

      <!-- 股票名称 -->
      <span class="stock-search__selected">{{ stockName == stockId ? '' : stockName }}</span>

      <!-- 转圈Icon -->
      <span class="stock-search__icon" v-if="hasLoadingIcon && isLoading"></span>
    </div>

    <!-- 股票列表 -->
    <ul v-show="focusFlag && stockList.length > 0" class="stock-search__ul">
      <li
        v-for="stock in stockList"
        :key="stock.stock_code"
        @mousedown="selectOneStock(stock.stock_id, stock.stock_name)" >
        {{ stock.stock_id + '&nbsp' + stock.stock_name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import json from './assets/mock.json';
  export default {
    name: "VueStockSearch",
    props: {
      // 占位符
      placeholder: String,
      // 是否禁用
      disabled: Boolean,
      // 初始化股票
      stockInit: {
        type: Object,
        default() {
          return {
            id: '',
            name: ''
          }
        }
      },
      // 查询的股票类型  e 股票  f 基金 repo为国债 IDX指数 ehk 纯港股 ehksz 港股通（深） ehksh 港股通（沪）
      assetsClass: String,
      // 是否显示股票代码后面的英文  (如: 000001.sz的".sz", 默认不显示.sz)
      stockFullname: [Array, String],
      // 是否需要转圈
      hasLoadingIcon: {
        type: Boolean,
        default: true
      },
      // 所处市场
      curMarket: String,
    },
    data() {
      return {
        focusFlag: false,   // 焦点状态
        stockId: "",        // 股票ID
        stockName: "",      // 股票名称
        stockInput: "",     // 输入内容
        stockList: [],      // 搜索到的内容
        ajaxTimes: '',      // 避免输入过快ajax发送过于频繁
        last_request_timestamp: '', // 最后一次请求的时间戳
        isLoading: false,   // 是否正在加载中
      };
    },
    watch: {
      stockInit(newVal, oldVal) {
        this.stockId = newVal.id;
        this.stockName = newVal.name;
        //判断是否显示股票代码全称 sh沪股，sz深股，hksh沪港通，hksz深港通
        let lower_id = newVal.id.toLowerCase();
        if (this.stockFullname == 'all') {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('sh') != -1 && /\.sh/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('sz') != -1 && /\.sz/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('hksh') != -1 && /\.hksh/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('hksz') != -1 && /\.hksz/.test(lower_id)) {
          this.stockInput = id;
        } else {
          this.stockInput = newVal.id.match(/^\d*/i)[0];
        }
      },
      stockInput(newVal, oldVal) {
        if (newVal == '') {
          this.stockId = '';
          this.stockName = '';
          this.stockList = [];
        }
      },
      stockId(newVal, oldVal) {
        this.$emit('stock_id', this.stockId);
        this.$emit('stock_name', this.stockName);
      }
    },
    methods: {
      // 判断是否新股
      getNewStockInfo(stock_code) {
        let result = false;
        // 只在A股中处理新股
        if ('marketA' != this.curMarket) {
          return false;
        }
        window.new_stock_list &&
          window.new_stock_list.forEach(function(e) {
            if (
              stock_code == e.ticker ||
              stock_code == e.stock_id ||
              stock_code == e.ipo_code
            ) {
              result = e;
              result.trading_unit = e.min_volume;
              result.stock_id = e.ipo_code + "." + e.stock_id.split(".")[1];
              result.asset_class = "new";
            }
          });
        return result;
      },
      // 选择某只股票
      selectOneStock(id, name) {
        this.stockId = id;
        this.stockName = name;
        this.stockList = [];

        //判断是否显示股票代码全称 sh沪股，sz深股，hksh沪港通，hksz深港通
        let lower_id = id.toLowerCase();
        if (this.stockFullname == 'all') {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('sh') != -1 && /\.sh/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('sz') != -1 && /\.sz/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('hksh') != -1 && /\.hksh/.test(lower_id)) {
          this.stockInput = id;
        } else if (this.stockFullname && this.stockFullname.indexOf('hksz') != -1 && /\.hksz/.test(lower_id)) {
          this.stockInput = id;
        } else {
          this.stockInput = id.match(/^\d*/i)[0];
        }
      },
      // 根据输入内容搜索股票
      getStockList() {
        clearTimeout(this.ajaxTimes);
        let _this = this;
        // 判断stockInput 和 stockId前六位是否一致
        if (this.stockInput !== this.stockId.substring(0, 6)) {
          this.stockId = "";
          this.stockName = "";
        }

        if (!this.stockInput) {
          return;
        }

        // 新增判断，新股时，直接填充假的数据
        let newStock = this.getNewStockInfo(this.stockInput);
        if (newStock) {
          this.selectOneStock(
            newStock.ipo_code + "." + newStock.stock_id.split(".")[1],
            newStock.stock_name
          );
          return;
        }

        let get_assets_class = "";
        if (this.assetsClass) {
          get_assets_class = "&assets_class=" + this.assetsClass;
        }

        // var url = (window.REQUEST_PREFIX||"") + "/oms/helper/code_genius?stock_code=" + this.stockInput + get_assets_class;
        // var url = "./assets/mock.json";
        this.last_request_timestamp = new Date().valueOf();
        let last_request_timestamp = this.last_request_timestamp;
        this.ajaxTimes = setTimeout(() => {
          this.isLoading = true;
          setTimeout(() => {
            if (last_request_timestamp != this.last_request_timestamp) {
              return;
            }
            this.stockList = json.data;
            this.isLoading = false;
          }, 1000);
          // this.$http.get(url)
          // .then(({code,msg,data}) => {
          //   if (code == 0 || code == 1123124) {
          //     this.stockList = data;
          //     if (1 == this.stockList.length) {
          //       this.selectOneStock(
          //         this.stockList[0].stock_id,
          //         this.stockList[0].stock_name
          //       );
          //     }
          //   }
          // })
          // .finally(() => {
          //   this.isLoading = false;
          // })
        }, 300);
      },
    }
  }
</script>

<style lang="less">
  .stock-search {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    .stock-search__box {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0 10px;
      .stock-search__input {
        flex: 1;
        height: 100%;
        font-size: 14px;
        color: #33414F;
        outline: none;
        border: none;
        background: none;
        min-width: 0;
      }
      .stock-search__selected {
        flex-shrink: 0;
        font-size: 14px;
        color: #33414F;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .stock-search__icon {
        flex-shrink: 0;
        width: 22px;
        height: 22px;
        background: url('./assets/loading_google.gif') no-repeat;
        background-size: 100%;
      }
    }
    .stock-search__ul {
      position: absolute;
      z-index: 100;
      width: 100%;
      max-height: 144px;
      top: 100%;
      left: 0;
      background: #fff;
      padding: 0 10px;
      border: 1px solid #ccc;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      box-sizing: border-box;
      li {
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid #EBEBEB;
        font-size: 14px;
        color: #33414F;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
    }
  }
</style>
