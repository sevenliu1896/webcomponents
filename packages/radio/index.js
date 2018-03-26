import Radio from './src/radio'

Radio.install = function(Vue) {
    Vue.component(Radio.componentName, Radio);
}

export default Radio;