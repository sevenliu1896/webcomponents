import Vue from 'vue';
import XcMessage from './src/message.vue';

let XcMessageConstructor = Vue.extend(XcMessage);

let $vm

export default (options) => {
  // 如果不存在实例，创建实例，并将 元素追加到页面上
  if (!$vm) {
    $vm = new XcMessageConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild($vm.$el);
  }

  clearTimeout($vm.timer);

  if (typeof options === 'string') {
    $vm.text = options;
  } else if (typeof options === 'object') {
    Object.assign($vm, options);
  }

  $vm.show = true;
  $vm.timer = setTimeout(() => {
    $vm.show = false;
  }, $vm.duration);
}
