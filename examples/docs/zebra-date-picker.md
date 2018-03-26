# VueZebraDatePicker(日期选择组件)

----

## 前言 [Zebra_Datepicker.js](https://github.com/stefangabos/Zebra_Datepicker)
VueZebraDatePicker.vue是封装的jquery Zebra_Datepicker插件的组件。<br>
Zebra_Datepicker has no dependencies other than jQuery 1.7.0+ and requires that the page you are using the plugin on to have a strict doctype like:
```
<!doctype html>
```

## 基础用法
* 引入相关文件：
```
//css
<link rel="stylesheet" href="/omsv2/3rd/datepicker/css/zebra_datepicker.css">
```
```
//js
<script src="/omsv2/js/jquery.min.js"></script>
<script src="/omsv2/3rd/datepicker/zebra_datepicker.js"></script>
```
* webpack版本使用
```
<template>
  <vue-zebra-date-picker :value="currentDate" v-on:select="currentDate = ($event)" :date_direction="date_direction" :disabled_dates="disabled_dates"></vue-zebra-date-picker>
</template>


<script>
import VueZebraDatePicker from '../common/zebra-date-picker/v3.0.0/VueZebraDatePicker.vue'

export default {
  data (){
    return: {
      date_direction: false,//可选的日期
      disabled_dates: false,//不可选的日期
      currentDate: (function(){return moment().format('YYYY-MM-DD')})()//默认时间格式
    }
  },
  components: {
    VueZebraDatePicker
  }

  //...
}
</script>
```
__注释：__
VueZebraDatePicker接收三个props: <br>
__1.value:用于展示已经选择的日期，设置日期；__<br>
__2.date_direction:可选日期的限制__
| date_direction | 可选日期 |
| ------| ------ | ------ |
| ['2013-01-01', '2014-01-01'] | 2013-01-01到2014-01-01之间的日期可选 |
| ['2013-01-01', false] | 2013-01-01之后的日期可选 |
| [false, '2014-01-01'] | 2014-01-01之前的日期可选 |
| n(正整数) | 从现在开始n天后的日期可选 |
| -n(负整数) | 从现在开始n天前的日期可选 |
| 0 | 没有限制 |
| true | 今天以后的可选 |
| false | 截止到当前时间可以选择 |
__3.disabled_dates:不可选的日期__
| disabled_dates | 不可选日期 |
| ------| ------ | ------ |
| false | 在可以选择的日期范围内没有不可以选择的日期 |
| ['01 01 2012'] | 2012-01-01不可选 |
| ['* 01 2012'] | 2012-01（月）不可选 |
| ['01-10 01 2012'] | 2012-01（月）1到10不可选  |
| ['1,10 1 2012'] | 2012-01（月）1和10不可选 |
| ['1-10,20,22,24 1-3 *'] | 每年1到3月 1-10，20，22，24不可选 |
| ['* * * 0,6'] | 所有的周六周日不可选 |
| ['01 07 2012', '* 08 2012'] | 2012年1月1日和8月不可选 |
v-on:select监听选取的日期事件改变value
