<script>
  export default {
    methods: {
      openLoading_1() {
        this.$message('hello');
      },
      openLoading_2() {
        this.$message({
          text: '我要6秒',
          duration: 6000
        });
      }
    }
  }
</script>
# message 消息提示

----

## 基本用法 【默认3秒关闭】

<div class="demo-block">
  <xc-button type="text" @click="openLoading_1">点击显示 message</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_1">点击显示 message</xc-button>

  <script>
    export default {
      methods: {
        openLoading_1() {
          this.$message('hello');
        }
      }
    }
  </script>
```
:::

## 自定义关闭时间，设置 duration 属性

<div class="demo-block">
  <xc-button type="text" @click="openLoading_2">点击显示 message</xc-button>
</div>

:::demo
```html
  <xc-button type="text" @click="openLoading_2">点击显示 message</xc-button>

  <script>
    export default {
      methods: {
        openLoading_2() {
          this.$message({
            text: '我要6秒',
            duration: 6000
          });
        }
      }
    }
  </script>
```
:::