/*
 * 子页顶部tab页签 公共组件
 * Author: jiangjian; liuzeyafzy@gmail.com;
 * Time: 2017-12-20 星期三
*/
<template>
  <ul class="common-tabtop">
    <li 
      v-for="(item,index) in displayOptions"
      v-bind:class="calcClass(item)"
      @click="chgActive(item.value)" 
      @mouseenter="mouseenter(item.value)"
      @mouseleave="mouseleave()"
    >
      {{ item.label }}
      <span class="common-tabtop-flash" v-if="item.tipsNum > 0" v-html="item.tipsNum"></span>
    </li>
  </ul>
</template>

<script>

  //参数说明
  // const options = [
  //   {
  //     label: '风控监控',
  //     value: 'windControlTest',
  //     visible: true,
  //   },{
  //     label: '风控设置',
  //     value: 'windControlSetting',
  //     visible: true,
  //   },{
  //     label: '股票池管理',
  //     value: 'StockPoolManagement',
  //     visible: true,
  //   }
  // ]
  // 
  export default {
    name:'tab-top',
    props: {
      // tab选项
      options: {
        type: Array,
        required: true,
        default: [],
      },
      // 选中的tab，主要支持外部切换页签。可以不传。
      value: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        // 当前选中的页签的value值
        activeValue: '',
        // 当前hover的页签的value值
        hoverValue: '',
        // 判断是否初始化数据
        initialised: false,
      }
    },
    computed: {
      displayOptions: function(){
        let temp = [];
        temp = this.options.filter((item) => {
          return item.visible;
        });
        return temp;
      }
    },
    watch:{
      // 接受从外部传入修改激活的tab
      value(){
        this.displayOptions.forEach((e) => {
          // 选项中有这个值，而当前又不是这个值，则修改
          if (e.value == this.value) {
            this.chgActive(this.value);
          }
        })
      },
      options(){
        this.$nextTick(() => {
          if (this.initialised == false && this.displayOptions.length > 0) {
            this.initialised = true;
            this.chgActive(this.displayOptions[0].value);
          }
        })
        
      }
    },
    methods:{
      // 计算样式
      calcClass(item){
        let clsStr = '';
        if (this.activeValue == item.value) {
          clsStr += ' active';
        }
        if (this.hoverValue == item.value) {
          clsStr += ' hover';
        }
        return clsStr;
      },
      // 修改tab激活状态
      chgActive(value){
        // 想要修改就执行这个函数，但是函数内部保证不滥用$emit，只在想要修改到别的tab的时候才进行修改。
        if (value != this.activeValue) {
          this.activeValue = value;
          this.hoverValue = value;
          this.$emit('change', value);
        }
      },
      // 鼠标移入事件回调
      mouseenter(value){
        this.hoverValue = value;
      },
      // 鼠标移出事件回调
      mouseleave(){
        this.hoverValue = this.activeValue;
      }
    },
    mounted(){
      if (!this.activeValue) {
        if (!this.value) {
          if (this.displayOptions.length != 0) {
            this.chgActive(this.displayOptions[0].value);
            this.initialised = true;
          }else{
            // 空
          }
        }else{
          this.chgActive(this.value);
          this.initialised = true;
        }
        
      }else{
        this.chgActive(this.activeValue);
        this.initialised = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  .common-tabtop{
    margin: 0;
    padding: 0;
    background-color: #F5F5F5;
    color: #9E9E9E;
    border-bottom: 1px solid #C5C9D0;
  }
  .common-tabtop>li{
    margin-left: -1px;
    color: #7D8083;
    font-size: 14px;
    padding: 0 3px;
    font-weight: bold;
    cursor: pointer;
    float: left;
    width: 150px;
    text-align: center;
    height: 30px;
    line-height: 31px;
    list-style: none;
    background-color: #E9EBEC;
    border-left: 1px solid #C5C9D0;
    border-right: 1px solid #C5C9D0;
    &>span{
      // top和margin-top以及height凑成上下剧中
      top: 50%;
      margin-top: -8px;
      width: 15px;

      margin-left: 2px;
      height: 15px;
      // border: 1px solid #979797;
      border: 0 none;
      border-radius: 50%;
      background-color: #f44336;
      display: inline-block;
      position: absolute;
      font-size: 12px;
      line-height: 14px;
      color: #fff;
      font-weight: 400;
    }
  }
  .common-tabtop>li.active{
    color:#2196f3;
    background-color: white;
    position: relative;
    // border-left:1px solid #E4EAF0;
    // border-right:1px solid #E4EAF0;
    position: relative;
    // &:before{
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   height: 4px;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   background-color: #2196F3;
    // }
    // &:after{
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   height: 4px;
    //   left: 0;
    //   right: 0;
    //   bottom: -1px;
    //   background-color: white;
    // }
  }
  .common-tabtop>li.hover{
    position: relative;
    background-color: white;
    // &:before{
    //   content: "";
    //   display: block;
    //   position: absolute;
    //   height: 4px;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   background-color: #2196F3;
    // }
  }
  .common-tabtop:after, .common-tabtop:before {
    content: "";
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
  //闪烁动画
  .common-tabtop-flash{
    animation: flash 3s infinite;
  }
  @keyframes flash {
    0%,50%,to {
        opacity: 1
    }
    25%,75% {
        opacity: 0
    }
  }
</style>