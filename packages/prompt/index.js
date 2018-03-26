import Prompt from './src/prompt';

Prompt.install = function(vue) {
    Vue.component(Prompt.name, Prompt);
}

export default Prompt;