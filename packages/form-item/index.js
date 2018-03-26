import XcFormItem from '../form/src/form-item';

/* istanbul ignore next */
XcFormItem.install = function(Vue) {
  Vue.component(XcFormItem.name, XcFormItem);
};

export default XcFormItem;