import XcTabPane from '../tabs/src/tab-pane';

XcTabPane.install = function(Vue) {
    Vue.component(XcTabPane.name, XcTabPane);
}

export default XcTabPane;