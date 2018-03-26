<template>
  <div class="xc-message" v-show="show && text">{{ text }}</div>
</template>

<script>
  export default {
    name: 'XcMessage',
    props: {
      // 控制显示
      show: Boolean,
      // 消息文本
      text: {
        type: String,
        default: ''
      },
      duration: {
        type: [String, Number],
        default: 3000
      }
    }
  }
</script>

<style lang="less">
  .xc-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 5px;
    background-color: rgba(43, 54, 66, 0.85);
    max-width: 250px;
    font-size: 14px;
    color: #fff;
    padding: 8px 20px;
    text-align: center;
    z-index: 9999999;
  }
</style>
