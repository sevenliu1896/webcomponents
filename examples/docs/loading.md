<script>
  export default {
    methods: {
      openLoading_1() {
        this.$loading.show({
          text: 'hhh',
        });
        setTimeout(() => {
          this.$loading.hide();
        }, 1000)
      },
      openLoading_2() {
        this.$loading.show();
        setTimeout(() => {
          this.$loading.hide();
        }, 1000)
      },
      openLoading_3() {
        this.$loading.show('');
        setTimeout(() => {
          this.$loading.hide();
        }, 1000)
      },
      openLoading_4() {
        this.$loading.show({
          text: '哈哈哈哈',
          onShow() {
            console.log('显示前');
          },
          onHide() {
            console.log('隐藏后');
          }
        });
        setTimeout(() => {
          this.$loading.hide();
        }, 1000)
      }
    }
  }
</script>
# loading 加载中

----

## 用法

> 在入口文件中加载 Loading ，并赋值给 Vue 的原型。然后在此单页应用中，就可以使用 **this.$loading.show()** 来显示。 **this.$loading.hide()** 来隐藏

:::demo
```html
import Vue from 'vue'
import Loading from '../packages/loading/index.js'

Vue.prototype.$loading = Loading

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

```
:::

## 基本用法

<div class="demo-block">
  <xc-button type="text" @click="openLoading_1">点击显示 loading</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_1">点击显示 loading</xc-button>

  <script>
    export default {
      methods: {
        openLoading_1() {
          this.$loading.show({
            text: 'hhh',
          });
          setTimeout(() => {
            this.$loading.hide();
          }, 1000)
        }
      }
    }
  </script>
```
:::

## 默认文字 - 加载中...

<div class="demo-block">
  <xc-button type="text" @click="openLoading_2">点击显示 loading</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_2">点击显示 loading</xc-button>

  <script>
    export default {
      methods: {
        openLoading_2() {
          this.$loading.show();
          setTimeout(() => {
            this.$loading.hide();
          }, 1000)
        }
      }
    }
  </script>
```
:::

## 不要文字

<div class="demo-block">
  <xc-button type="text" @click="openLoading_3">点击显示 loading</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_3">点击显示 loading</xc-button>

  <script>
    export default {
      methods: {
        openLoading_3() {
          this.$loading.show('');
          setTimeout(() => {
            this.$loading.hide();
          }, 1000)
        }
      }
    }
  </script>
```
:::

## 显示前，与隐藏后

<div class="demo-block">
  <xc-button type="text" @click="openLoading_4">点击显示 loading</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_4">点击显示 loading</xc-button>

  <script>
    export default {
      methods: {
        openLoading_4() {
          this.$loading.show({
            text: '哈哈哈哈',
            onShow() {
              console.log('显示前');
            },
            onHide() {
              console.log('隐藏后');
            }
          });
          setTimeout(() => {
            this.$loading.hide();
          }, 1000)
        }
      }
    }
  </script>
```
:::




## 主要提供3个方法

- this.$loading.show(options) [显示]

options 支持 String 类型 或 Object 类型

- this.$loading.hide()  [隐藏]

- this.$loading.isLoading()   [判断是否显示]







