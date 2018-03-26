<template>
  <div class="xc-prompt">
    <span class="xc-prompt__icon i-yellow" @mouseenter="showMsg" @mouseleave="hideMsg"></span>
    <div :class="['xc-prompt__text', position]" :style="msgStyle" v-show="isShow">{{ message }}</div>
    <div class="xc-prompt__text vh" ref="xc-prompt__text--vh">{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'XcPrompt',
    props: {
      // 内容
      message: String,
      // 展示位置: right || left || top-right || top-left || bottom-right || bottom-left
      position: {
        type: String,
        default: 'right'
      }
    },
    data() {
      return {
        // 是否显示
        isShow: false,
        // msg 样式
        msgStyle: {
          top: 0,
          left: 0,
        },
        // msg 宽高
        msgWidth: '',
        msgHeight: '',
      }
    },
    watch: {
      message(newVal, oldVal) {
        this.$refs['xc-prompt__text--vh'].style.display = 'block';
        this.$nextTick(() => {
          this.msgWidth = this.$refs['xc-prompt__text--vh'].clientWidth;
          this.msgHeight = this.$refs['xc-prompt__text--vh'].clientHeight;
          this.$refs['xc-prompt__text--vh'].style.display = 'none';
        })
      }
    },
    methods: {
      // 显示消息
      showMsg(event) {
        let elRect = event.target.getBoundingClientRect();
        // 元素宽高
        let width = elRect.width;
        let height = elRect.height;
        // 元素偏移量
        let elOffsetLeft = elRect.left;
        let elOffsetTop = elRect.top;
        // 内容msg框偏移量
        let left = elOffsetLeft + width + 10;
        let top = elOffsetTop - width / 2;

        switch (this.position) {
          case 'left':
            left = elOffsetLeft - this.msgWidth - 10;
            top = elOffsetTop - width / 2;
            break;
          case 'right':
            left = elOffsetLeft + width + 10;
            top = elOffsetTop - width / 2;
            break;
          case 'top-left':
            left = elOffsetLeft - this.msgWidth + width + width / 3;
            top = elOffsetTop - this.msgHeight - 10;
            break;
          case 'top-right':
            left = elOffsetLeft - width / 3;
            top = elOffsetTop - this.msgHeight - 10;
            break;
          case 'bottom-left':
            left = elOffsetLeft - this.msgWidth + width + width / 3;
            top = elOffsetTop + this.msgHeight;
            break;
          case 'bottom-right':
            left = elOffsetLeft - width / 3;
            top = elOffsetTop + this.msgHeight;
            break;
          default:
            left = elOffsetLeft + width + 10;
            top = elOffsetTop - width / 2;
            break;
        }

        this.msgStyle['top'] = top + 'px';
        this.msgStyle['left'] = left + 'px';
        this.isShow = true;
      },
      // 隐藏消息
      hideMsg(event) {
        this.isShow = false;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.msgWidth = this.$refs['xc-prompt__text--vh'].clientWidth;
        this.msgHeight = this.$refs['xc-prompt__text--vh'].clientHeight;
        this.$refs['xc-prompt__text--vh'].style.display = 'none';
      })
      document.addEventListener('scroll', () => {
        this.isShow = false;
      })
    }
  }
</script>

<style lang="less">
  .xc-prompt {
    display: inline-block;
    width: 15px;
    height: 15px;

    .xc-prompt__icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      cursor: pointer;
      background-size: 100%;
      background-repeat: no-repeat;

      &.i-yellow {
        background-image: url('../assets/i-yellow.svg')
      }
    }

    .xc-prompt__text {
      position: fixed;
      top: 10px;
      left: 10px;
      white-space: nowrap;
      color: #dc8c01;
      border: 1px solid #dc8c01;
      padding: 4px;
      font-size: 12px;
      line-height: 18px;
      background: #fff;

      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 8px;
        height: 8px;
        background: #fff;
        transform: rotate(45deg);
      }
      &.left::after {
        right: -5px;
        top: 6px;
        border: 1px solid #dc8c01;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
      &.right::after {
        left: -5px;
        top: 6px;
        border: 1px solid #dc8c01;
        border-right-color: transparent;
        border-top-color: transparent;
      }
      &.top-right::after {
        bottom: -5px;
        left: 6px;
        border: 1px solid #dc8c01;
        border-left-color: transparent;
        border-top-color: transparent;
      }
      &.top-left::after {
        bottom: -5px;
        right: 6px;
        border: 1px solid #dc8c01;
        border-left-color: transparent;
        border-top-color: transparent;
      }
      &.bottom-right::after {
        left: 6px;
        top: -5px;
        border: 1px solid #dc8c01;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }
      &.bottom-left::after {
        right: 6px;
        top: -5px;
        border: 1px solid #dc8c01;
        border-right-color: transparent;
        border-bottom-color: transparent;
      }

      &.vh {
        visibility: hidden;
      }
    }
  }
</style>
