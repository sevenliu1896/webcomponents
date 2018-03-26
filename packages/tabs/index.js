import XcTabs from './src/tabs';

/* istanbul ignore next */
XcTabs.install = function(Vue) {
  Vue.component(XcTabs.name, XcTabs);
};

export default XcTabs;