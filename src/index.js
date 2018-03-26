import XcButton from '../packages/button';
import XcRow from '../packages/row';
import XcCol from '../packages/col';
import XcCheckbox from '../packages/checkbox'
import XcCheckboxGroup from '../packages/checkbox-group'
import XcRadio from '../packages/radio'
import XcRadioGroup from '../packages/radio-group'
import XcInput from '../packages/input'
import XcSelect from '../packages/select'
import XcTabs from '../packages/tabs'
import XcTabPane from '../packages/tab-pane'
import XcDialog from '../packages/dialog'
import XcTable from '../packages/table'
import XcForm from '../packages/form'
import XcFormItem from '../packages/form-item'
import XcOption from '../packages/option'
import XcScrollbar from '../packages/scrollbar';

import XcPrompt from '../packages/prompt';
import XcStockSearch from '../packages/stock-search';
import TabTop from '../packages/tab-top';
import CommonSelect from '../packages/common-select';

const components = [
    XcForm,
    XcFormItem,
    XcForm, 
    XcFormItem,
    XcButton, 
    XcRow, 
    XcCol, 
    XcCheckbox, 
    XcCheckboxGroup, 
    XcRadio, 
    XcRadioGroup, 
    XcTabs, 
    XcTabPane, 
    XcDialog, 
    XcTable, 
    XcInput, 
    XcSelect,
    XcOption,
    XcScrollbar,
    TabTop,
    XcPrompt,
    XcStockSearch,
    CommonSelect,
]

const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component));
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
    XcForm,
    XcFormItem,
    XcButton,
    XcRow,
    XcCol,
    XcCheckbox,
    XcCheckboxGroup,
    XcRadio,
    XcRadioGroup,
    XcTabs,
    XcTabPane,
    XcDialog,
    XcTable,
    XcInput,
    XcSelect,
    XcOption,
    XcScrollbar,
    TabTop,
    XcPrompt,
    XcStockSearch,
    CommonSelect,
};