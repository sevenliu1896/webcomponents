<template>
  <div class="xc-loading" v-show="show">
    <div class="box">
      <div class="xc-loading__spinner"></div>
      <p class="xc-loading__text" v-show="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'XcLoading',
    props: {
      show: Boolean,
      text: {
        type: String,
        default: '加载中...'
      }
    }
  }
</script>

<style lang="less">
  .xc-loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;

    .box {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      display: flex;
      flex-direction: column;
      max-width: 80%;
      line-height: 1.5;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      background: #fff;
      border-radius: 10px;
      padding: 20px;
      overflow: hidden;
      background: #000;
    }

    .xc-loading__spinner {
      width: 32px;
      height: 32px;
      border: 4px solid transparent;
      border-top-color: rgb(204, 204, 204);
      border-left-color: rgb(204, 204, 204);
      border-bottom-color: rgb(204, 204, 204);
      align-self: center;
      border-radius: 50%;
      animation: spinner-rotate .8s infinite linear;
    }

    .xc-loading__text {
      margin-top: 10px;
      color: #fff;
    }
  }

  @keyframes spinner-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
