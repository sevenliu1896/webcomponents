/**
 * 下拉输入框
 * author:jjk, liuzeyafzy@gmail.com
 * 支持多选单选 和内容筛选
 * 第二个版本，主要修改了，1.入参名称；2.options传入时不再触发value值的修改

 * options 下拉内容
 * label 下拉框文本提示
 * column_num 列数 默认5列
 * multiable 是否单选多选 默认单选
 * searchable 是否支持筛选 默认不需要
 * classname 外部样式名 ，默认不需要
 * option_select 自定义事件 获取当前点击选中的对象
 * selected 默认选中值
 * 全选功能需要单独添加option对象
 * option.unshift({
    label:"不限",
    value:"all"
  })
  文案随便改
  值固定
 *
 */

<template>
  <label 
    :class="[ 'common-select', classname, showDropdown ? 'active' : '' ]" 
    @mouseenter="showDropdown=true" 
    @mouseleave="showDropdown=false"
  >
    <span class="common-select__text">
      {{label}}
    </span>
    <i class="common-select__icon"></i>
    <div v-show="showDropdown" class="common-select__down-list"> 
      <div class="common-select__search-list" v-if="searchable">
        <span 
          v-for="(item ,index) in indexes" 
          @click="filter_list(index)" 
          :class="index==current_index ? 'selected' : ''"
        >
          {{item}}
        </span>
      </div>
      <div v-if="0 == optionsLength">{{placeholder}}</div>
      <ul v-if="0 < optionsLength" class="common-select__list-ul">
        <template v-if="optionsLength">
          <li v-for="row in rowNum" class="common-select__list-row">
            <template v-for="col in columnLimit" >
              <template v-if="getCurrentOption(row, col)">
                <span :style="widthStyle" 
                  class="common-select__list-col"
                  :class="{'selected': isSelected(row, col)}" 
                  @click="clickFn(row - 1, col - 1)" 
                  :title="get_label(row - 1, col - 1)"
                >
                  {{get_label(row - 1, col - 1)}}
                </span>
              </template>
            </template>
          </li>
        </template>
      </ul>
    </div>
  </label>
</template>

<script>
import VUECOMPONENT from 'xc-ui/src/utils/makepy.js';

export default {
  name: 'common-select',
  props: {
    classname: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: function(){
        return [];
      }
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '暂无选项'
    },
    column_num: {
      type: Number,
      default: 5
    },
    // 是否支持多选
    multiable: {
      type: Boolean,
      default: false
    },
    // 是否支持检索
    searchable: {
      type: Boolean,
      require: false,
      default: false
    },
    // 传入选中的数据，可以支持用户修改。
    selected: {
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data(){
    return {
      defaultLen: 30,
      showDropdown: false, //是否显示下拉框部分
      list_overflow: true, //下拉框是否需要隐藏多余内容
      indexes: [], //检索表
      current_index: 0,
      // 记录选中的value值
      selectedArray: []
    }
  },
  watch:{
    // 监听选项的变化
    options:{
      handler(arr){
        // let temp = [];
        // arr.forEach((ele)=>{
        //   temp.push(Object.assign({},ele))
        // });
        let _this = this;
        // 新增索引项
        if(_this.searchable){
          _this.updateIndex();
        }

        if (this.selectedArray.length === 0) {
          if (this.selected.length === 0) {
            if (this.displayOptions.length != 0) {
              this.updateSelectedArr([this.displayOptions[0].value])
            }
          }else{
            let selectedSet = new Set();
            this.selected.forEach(e => {
              if (this.displayOptions.some(el => {
                return el.value === e;
              })) {
                selectedSet.add(e);
              }
            });
            this.selectedArray = [...selectedSet];
          }
        }
      },
      deep:true,
    },
    // 
    selected(newArr){//监听
      let selectedSet = new Set(this.selectedArray);
      if (newArr.every(function(e){
        return selectedSet.has(e);
      }) && newArr.length === selectedSet.size) {
        // 外部传入数据与记录的选中数据一致，不处理
        return;
      }else{
        this.updateSelectedArr(newArr);
      }
    }
  },
  computed:{
    // 列数限制
    columnLimit(){
      return this.column_num ? this.column_num : 5;
    },
    // options的长度
    optionsLength(){
      return this.displayOptions.length;
    },
    // 行数
    rowNum(){
      if(this.optionsLength && 0 != this.columnLimit){
        return Math.ceil(this.optionsLength / this.columnLimit);
      }else{
        return 0;
      }
    },
    widthStyle(){
      return {
        width: 100 / this.columnLimit +'%'
      };
    },
    // 展示出来的options
    displayOptions(){
      //筛选
      let self = this;
      let temp = this.options.filter(function(ele) {
        if(self.current_index == 0){
          return true
        }
        //当选项为全部时不做处理
        if(ele.index.indexOf(self.indexes[self.current_index]) != -1 && ele.value != 'all'){
          return true
        }
      }) || [];
      return temp;
    }
  },
  mounted(){
    if (this.selectedArray.length === 0) {
      if (this.selected.length === 0) {
        if (this.displayOptions.length != 0) {
          this.updateSelectedArr([this.displayOptions[0].value])
        }
      }else{
        let selectedSet = new Set();
        this.selected.forEach(e => {
          if (this.displayOptions.some(el => {
            return el.value === e;
          })) {
            selectedSet.add(e);
          }
        });
        this.selectedArray = [...selectedSet];
      }
    }
    
    // 个人认为这段代码没用
    // 但实际上，这段代码是有用的，不能删。为了解决筛选的问题
    let temp = [];
    this.options.forEach((ele)=>{
      temp.push(Object.assign({},ele))
    })
    this.copy_options = temp;
    let _this = this;
    if(_this.searchable){
      _this.updateIndex();
    }else{
      // _this.displayOptions = _this.copy_options;
    }

    // Deleted by liuzeyafzy@gmail.com；因为mounted的时候不应该导致选中值变更。
    // this.$nextTick(()=>{
    //   this.update_select_arr(this.select_arr);
    // })
  },
  methods:{
    // 当前option是否已选中
    isSelected: function(row, col){
      let value = this.getCurrentOption(row, col).value;
      let selectedSet = new Set(this.selectedArray);
      return selectedSet.has(value);
    },
    // 获取当前的option
    getCurrentOption: function(row, col){
      return this.displayOptions[ (row-1) * this.columnLimit + (col - 1) ];
    },
    get_label(row,col){
      if(this.displayOptions[(row)*this.columnLimit + (col)]){
        return this.displayOptions[(row)*this.columnLimit + (col)].label;
      }else{
        return '';
      }
    },
    // 新的用户点击选中数据的逻辑
    clickFn: function(row, col){
      let index = row * this.columnLimit + col;
      let value = this.displayOptions[index].value;
      let selectedSet = new Set(this.selectedArray);
      if ('all' == value) {
        selectedSet.clear();
        selectedSet.add(value);
      }else{
        if (selectedSet.has(value)) {
          selectedSet.delete(value);
        }else{
          // 当已经包含了“全部”时，清空
          if (selectedSet.has('all')) {
            selectedSet.clear();
          }
          // 在不含有选中目标的情况下，不支持批量则清空选中数据再选
          if (!this.multiable) {
            selectedSet.clear();
          }

          selectedSet.add(value);
        }
      }

      this.selectedArray = [...selectedSet];
      this.$emit('change', this.selectedArray);
    },
    // 用户点击选中数据
    // select_action(row, col){
    //   if( (row * this.columnLimit + col ) == 0 && this.displayOptions[0].value == "all"){
    //     //如果选中的为第一个子节点 且值为all 时为全选
    //     this.copy_options.forEach((ele)=>{
    //       ele.selected = false
    //     });
    //     this.copy_options[0].selected = true;

    //     // this.selectedSet.add(this.copy_options[row * this.columnLimit + col].value);
    //   }else{
    //     if(this.copy_options[0].value == "all"){
    //       this.copy_options[0].selected = false;
    //     }
    //     let status = this.displayOptions[(row) * this.columnLimit + (col)].selected;
    //     //多选
    //     if(this.multi_radio == 'multi'){
    //       //多选且不是第一个时 把全选变灰
    //       if(this.displayOptions[0].value == 'all'){
    //         this.displayOptions[0].selected = false;
    //       }
    //       if(this.displayOptions[(row) * this.columnLimit + (col)]){
    //         this.displayOptions[(row) * this.columnLimit + (col)].selected = !status;
    //       }
    //     }else{
    //       //单选  默认单选
    //       this.copy_options.forEach((ele)=>{
    //         ele.selected = false
    //       });
    //       this.displayOptions[(row) * this.columnLimit + (col)].selected = !status;
    //     }
    //   }

    //   this.copy_options = [...this.copy_options];
    //   //调用自定义事件将选中对象返回给父组件
    //   this.$emit('option_select',this.copy_options.filter((ele)=>{
    //     return ele.selected ;
    //   }))
    // },

    // 更新索引
    updateIndex(){
      let indexes = [];
      this.options.forEach((ele)=>{
        let index = VUECOMPONENT.makePy(ele.label[0]);
        if(ele.value != 'all'){
          indexes.push(...index);
        }
        ele.index = index;
      })
      this.indexes = [...new Set(indexes)];
      this.indexes = this.indexes.filter(function(ele) {
        return !(ele>=0 && ele<=9);
      });
      this.indexes.sort();
      this.indexes.unshift('全部');
      // this.displayOptions = this.copy_options;
    },
    filter_list(val){
      this.current_index = val;
    },
    // 更新选中的内容
    updateSelectedArr(arr){
      let selectedSet = new Set(this.selectedArray);
      selectedSet.clear();
      if (Object.prototype.toString.call(arr)=='[object Array]') {
        arr.forEach((e) => {
          selectedSet.add(e);
        });
      }else{
        selectedSet.add(arr);
      }
      
      this.selectedArray = [...selectedSet];

      // if(!arr) return;
      // //更新当前下拉列表的选中状态
      // this.copy_options.forEach((ele)=>{
      //   ele.selected = false;
      //   if(arr.indexOf(ele.label)!=-1){
      //     ele.selected = true;
      //   }
      // })
      // this.copy_options.forEach((ele)=>{
      //   ele.selected = false;
      //   if(Object.prototype.toString.call(arr)=='[object Array]'){
      //     let flag = false;
      //     arr.forEach((obj)=>{
      //       if(ele.value == obj){
      //         flag = true;
      //       }
      //     })
      //     ele.selected = flag;
      //   }else{
      //     if(arr == ele.value ){
      //       ele.selected = true;
      //     }
      //   }
      // })
      // //更新后调用事件传递选中对象
      // this.copy_options = [...this.copy_options];

      // //调用自定义事件将选中对象返回给父组件
      // console.log('2.0.0')
      // this.$emit('option_select',this.copy_options.filter((ele)=>{
      //   return ele.selected ;
      // }))
    }
  },
  
}
  
</script>

<style  lang="less" scoped>

.common-select{
    border: 1px solid #bebebe;
    border-radius: 4px;
    margin-right: 15px;
    width: 140px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    user-select: none;
    position: relative;
    display: block;
    .common-select__icon{
        // background: url(../../../css/img/icon_select_up.png);
        background:url('./assets/icon_select_up.png');
        width: 12px;
        height: 7px;
        display: inline-block;
        position: absolute;
        right: 11px;
        top: 13px;
        transform: rotate(0deg);
        transition: all .3s ease-in 0s;
        z-index: 12;
    }
    .common-select__list-ul{
      max-height: 320px;
      overflow-y: auto;
    }
    .common-select__down-list{
        position: absolute;
        top: 30px;
        left: -1px;
        width: 470px;
        border-radius: 4px;
        height: 0;
        overflow: hidden;
        transition: all .3s ease-in 0s;
        border-top-left-radius: 0;
        z-index: 11;
        padding-left: 10px;
        padding-right: 10px;
        .common-select__list-row{
            display: flex;
            .common-select__list-col{
              padding-right: 10px;
              cursor: pointer;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: keep-all;
              white-space: nowrap;
              cursor: pointer;
              &.selected{
                  color: #2196F3;
              }
            }
            .common-select__list-btn{
                display: inline-block;
                text-align: center;
                span{
                    width: 50px;
                    height: 20px;
                    outline: none;
                    border: 1px solid #BEBEBE;
                    vertical-align: middle;
                    border-radius: 1px;
                    background-color: white;
                    line-height: 20px;
                    display: inline-block;
                }
            }
        }
        .common-select__search-list{
            border-bottom: 1px solid #979797;
            span{
                padding: 1px;
                border: 1px solid transparent;
                margin: 1px;

                &:first-child {
                    font-size: 12px;
                }

                &.selected{
                    border-color: #2196F3;
                    color: #2196F3;
                }
            }
        }
    }
    .common-select__text{
        display: inline-block;
        padding-left: 10px;
        height: 35px;
        width: 138px;
        border-radius: 4px;
        z-index: 12;

        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    &.active{
        border: 1px solid #108EE9;
        border-bottom: 1px solid transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        .common-select__icon{
            transform: rotate(180deg);
            transition: all .3s ease-in 0s;
            z-index: 12;
        }
        .common-select__text{
            position: absolute;
            background-color: white;
            z-index: 12;
        }
        .common-select__down-list{
            border: 1px solid #108EE9;
            height: auto;
            background: white;
            z-index: 11;
            // transition: height .3s ease-in 0s;
        }
    }
}
  
</style>