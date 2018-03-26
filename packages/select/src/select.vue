<template>
    <div
        class="xc-select"
        v-clickoutside="handleClose">
        <xc-input 
            ref="reference"
            v-model="selectedLabel"
            :placeholder="currentPlaceholder"
            :disabled="disabled"
            :readonly="!filterable"
            :class="{ 'is-focus': visible }"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.native.down.stop.prevent="navigateOptions('next')"
            @keydown.native.up.stop.prevent="navigateOptions('prev')"
            @keydown.native.enter.prevent="selectOption"
            @keydown.native.esc.stop.prevent="visible = false"
            @mousedown.native="handleMouseDown"
            @mouseenter.native="inputHovering = true"
            @keyup.native="debouncedOnInputChange"
            @paste.native="debouncedOnInputChange"
            @mouseleave.native="inputHovering = false">
            <i slot="suffix" 
                :class="['iconfont', 'xc-icon-' + iconClass]" 
                @click="handleIconClick"></i>
        </xc-input>
        <transition 
            name="xc-zoom-in-top"
            @before-enter="handleMenuEnter"
            @after-leave="doDestroy">
            <xc-select-menu
                ref="popper"
                v-show="visible">
                <xc-scrollbar
                    tag="ul"
                    wrap-class="xc-select-dropdown__wrap"
                    view-class="xc-select-dropdown__list"
                    ref="scrollbar"
                    v-show="options.length > 0 && filteredOptionsCount !== 0">
                    <slot></slot>
                </xc-scrollbar>
                <p class="xc-select-dropdown__empty" v-if="emptyText && options.length === 0 || filteredOptionsCount === 0" v-html="emptyText"></p>
            </xc-select-menu>
        </transition>
    </div>
</template>

<script>
    import Emitter from 'xc-ui/src/mixins/emitter';
    import XcSelectMenu from './select-dropdown.vue';
    import XcInput from 'xc-ui/packages/input';
    import Clickoutside from 'xc-ui/src/utils/clickoutside'
    import NavigationMixin from './navigation-mixin';
    import { getValueByPath } from 'xc-ui/src/utils/util';
    import scrollIntoView from 'xc-ui/src/utils/scroll-into-view';
    import XcScrollbar from 'xc-ui/packages/scrollbar';
    import { debounce } from 'xc-ui/src/utils/throttle-debounce';

    export default {
        name: 'XcSelect',

        componentName: 'XcSelect',

        mixins: [NavigationMixin, Emitter],

        components: {
            XcSelectMenu,
            XcInput,
            XcScrollbar
        },

        directives: { Clickoutside },

        provide() {
            return {
                'select': this
            }
        },

        props: {
            value: {
                required: true
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: Boolean,
            clearable: Boolean,
            filterable: Boolean,
            noDataText: {
                type: String,
                default: '无数据'
            },
            noMatchText: {
                type: String,
                default: '无匹配数据'
            },
            blurReserve: Boolean,
        },

        data() {
            return {
                options: [],
                cachedOptions: [],
                cachedPlaceHolder: '',
                currentPlaceholder: '',
                selectedLabel: '',
                selected: {},
                visible: false,
                inputWidth: 0,
                hoverIndex: -1,
                inputHovering: false,
                optionsCount: 0,
                filteredOptionsCount: 0,
                query: '',
                previousQuery: ''
            }
        },

        computed: {
            emptyText() {
                if (this.remote && this.query === '' && this.options.length === 0) return false;
                if(this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
                    return this.noMatchText;
                }
                if (this.options.length === 0) {
                    return this.noDataText;
                }
                return null;
            },
            iconClass() {
                let criteria = this.clearable && 
                this.inputHovering && 
                this.value !== undefined &&
                this.value !== '';
                return criteria ? 'guanbi' : 'arw-top'
            }
        },

        watch: {
            placeholder(val) {
                this.cachedPlaceHolder = this.currentPlaceholder = val;
            },
            visible(val) {
                if (!val) {
                    this.$refs.reference.$el.querySelector('input').blur();
                    if(this.filterable && this.blurReserve) {
                        if(this.options.length === 0 || this.filteredOptionsCount === 0) {
                            this.$emit('input', this.query);
                            return false;
                        }
                    };
                    this.query = '';
                    this.selectedLabel = '';
                    if (this.selected) {
                        this.selectedLabel = this.selected.currentLabel || '';
                        if (this.filterable) {
                            this.query = this.selectedLabel;
                        }
                    }
                }else{
                    if(this.filterable) {
                        this.query = this.selectedLabel;
                        this.handleQueryChange(this.query);
                        this.broadcast('XcOption', 'queryChange', '');
                        this.broadcast('XcInput', 'inputSelect');
                    }
                }
            },
            value(val) {
                this.setSelected();
            }
        },

        created() {
            this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
            this.$on('handleOptionClick', this.handleOptionSelect);
            
            this.debouncedOnInputChange = debounce(this.onInputChange, 200, true);
        },

        methods: {
            handleQueryChange(val) {
                if(this.previousQuery === val) return;
                this.previousQuery = val;
               
                this.hoverIndex = -1;
                this.filteredOptionsCount = this.optionsCount;
                this.broadcast('XcOption', 'queryChange', val);
            },
            handleClose() {
                this.visible = false;
            },
            handleFocus(event) {
                this.visible = true;
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
            handleIconClick(event) {
                if (this.iconClass.indexOf('guanbi') > -1) {
                    this.deleteSelected(event);
                } else {
                    this.toggleMenu();
                }
            },
            deleteSelected(event) {
                event.stopPropagation();
                this.$emit('input', '');
                this.visible = false;
                this.$emit('clear');
            },
            toggleMenu() {
                if (!this.disabled) {
                    this.visible = !this.visible;
                    if (this.visible) {
                        this.$refs.reference.$el.querySelector('input').focus();
                    }
                }
            },
            handleMouseDown(event) {
                if (event.target.tagName !== 'INPUT') return;
                if (this.visible) {
                    this.handleClose();
                    event.preventDefault();
                }
            },
            selectOption() {
                if (this.options[this.hoverIndex]) {
                    this.handleOptionSelect(this.options[this.hoverIndex]);
                }
            },
            getOption(value) {
                let option;
                for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
                    const cachedOption = this.cachedOptions[i];
                    const isEqual = cachedOption.value === value;
                    if(isEqual) {
                        option = cachedOption;
                        break;
                    }
                }
                if (option) return option;
                const label = value;
                let newOption = {
                    value: value,
                    currentLabel: label
                };
                return newOption;
            },
            scrollToOption(option) {
                const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
                if (this.$refs.popper && target) {
                    const menu = this.$refs.popper.$el.querySelector('.xc-select-dropdown__wrap');
                    scrollIntoView(menu, target);
                }
                this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
            },
            handleOptionSelect(option) {
                this.$emit('input', option.value);
                this.visible = false;
            },
            setSelected() {
                let option = this.getOption(this.value);
                this.selectedLabel = option.currentLabel;
                this.selected = option;
            },
            onInputChange() {
                if (this.filterable && this.query !== this.selectedLabel) {
                    this.query = this.selectedLabel;
                    this.handleQueryChange(this.query);
                }
            },
            handleMenuEnter() {
                this.$nextTick(() => this.scrollToOption(this.selected));
            },
            doDestroy() {
                //this.$refs.popper && this.$refs.popper.doDestroy();
            }
        },

        mounted() {
            this.$nextTick(() => {
                if (this.$refs.reference && this.$refs.reference.$el) {
                    this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
                }
            })
        }
    }
</script>