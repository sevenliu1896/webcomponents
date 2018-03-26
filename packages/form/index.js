import XcForm from './src/form';

/* istanbul ignore next */
XcForm.install = function(Vue) {
  Vue.component(XcForm.name, XcForm);
};

export default XcForm;