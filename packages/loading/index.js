import Vue from 'vue';
import XcLoading from './src/loading.vue';

let XcLoadingConstructor = Vue.extend(XcLoading);

let $vm
let watcher

export default {
  show (options = {}) {
    // 如果不存在实例，创建实例，并将 元素追加到页面上
    if (!$vm) {
      $vm = new XcLoadingConstructor({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el);
    }

    watcher && watcher();

    if (typeof options === 'string') {
      $vm.text = options;
    } else if (typeof options === 'object') {
      Object.assign($vm, options);
    }

    if (typeof options === 'object' && options.onShow || options.onHide) {
      watcher = $vm.$watch('show', (val) => {
        val && options.onShow && options.onShow($vm)
        val === false && options.onHide && options.onHide($vm)
      })
    }

    $vm.show = true;
  },
  hide () {
    $vm.show = false;
  },
  isLoading () {
    return $vm.show;
  }
};