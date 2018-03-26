<template>
    <div class="xc-form-item" :class="{'is-error': validateState === 'error',}">
        <label class="xc-form-item__label" v-if="label || $slots.label" :style="labelStyle">
             <slot name="label">{{label}}</slot>
             <i class="iconfont xc-icon-huaban require-icon" v-if="isRequired || required"></i>
        </label>
        <div class="xc-form-item__content" :style="contentStyle">
            <slot></slot>
            <transition name="xc-zoom-in-top">
                <div
                    v-if="validateState === 'error'"
                    class="xc-form-item__error"
                >
                    {{validateMessage}}
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import AsyncValidator from 'async-validator';
    import emitter from '../../../src/mixins/emitter'
    import objectAssign from '../../../src/utils/merge';
    import { noop, getPropByPath } from '../../../src/utils/util';

    export default {
        name: 'XcFormItem',

        componentName: 'XcFormItem',

        mixins: [emitter],

        provide() {
            return {
                xcFormItem: this
            }
        },

        inject: ['xcForm'],

        props: {
            label: String,
            labelWidth: String,
            prop: String,
            required: {
                type: Boolean,
                default: false
            },
            error: String,
        },

        data() {
            return {
                validateState: '',
                validateMessage: '',
                isNested: false
            }
        },

        watch: {
            error: {
                handle(val) {
                    this.validateMessage = val;
                    this.validateState = value ? 'error' : '';
                },
            }
        },

        computed: {
            isRequired() {
                let rules = this.getRules();
                let isRequired = false;
                if (rules && rules.length) {
                    rules.every(rule => {
                        if (rule.required) {
                            isRequired = true;
                            return false;
                        }
                        return true;
                    });
                }
                return isRequired;
            },
            labelStyle() {
                let ret = {};
                let labelWidth = this.labelWidth || this.form.labelWidth;
                if(labelWidth) {
                    ret.width = labelWidth;
                }
                return ret;
            },
            contentStyle() {
                let ret = {};
                let labelWidth = this.labelWidth || this.form.labelWidth;
                if (labelWidth) {
                    ret.marginLeft = labelWidth;
                }
                return ret;
            },
            form() {
                let parent = this.$parent;
                let parentName = parent.$options.componentName;
                while (parentName !== 'XcForm') {
                    if (parentName === 'XcFormItem') {
                        this.isNested = true;
                    }
                    parent = parent.$parent;
                    parentName = parent.$options.componentName;
                }
                return parent;
            },
            fieldValue: {
                cache: false,
                get() {
                    var model = this.form.model;
                    if (!model || !this.prop) { return; }
                    var path = this.prop;
                    if (path.indexOf(':') !== -1) {
                        path = path.replace(/:/, '.');
                    }
                    return getPropByPath(model, path, true).v;
                }
            },
        },

        methods: {
            validate(trigger, callback = noop) {
                this.validateDisabled = false;
                var rules = this.getFilteredRule(trigger);
                if ((!rules || rules.length === 0) && this.required === undefined) {
                    callback();
                    return true;
                }

                var descriptor = {};
                if (rules && rules.length > 0) {
                    rules.forEach(rule => {
                        delete rule.trigger;
                    });
                }
                descriptor[this.prop] = rules;

                var validator = new AsyncValidator(descriptor);
                var model = {};
                model[this.prop] = this.fieldValue;
                validator.validate(model, { firstFields: true }, (errors, fields) => {
                    this.validateState = !errors ? '' : 'error';
                    this.validateMessage = errors ? errors[0].message : '';
                    callback(this.validateMessage);
                });
            },
            getRules() {
                var formRules = this.form.rules;
                var selfRules = this.rules;
                var requiredRule = this.required !== undefined ? { required: !!this.required } : [];

                formRules = formRules ? getPropByPath(formRules, this.prop || '').o[this.prop || ''] : [];

                return [].concat(selfRules || formRules || []).concat(requiredRule);
            },
            getFilteredRule(trigger) {
                var rules = this.getRules();
                return rules.filter(rule => {
                    return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
                }).map(rule => objectAssign({}, rule));
            },
            onFieldBlur() {
                this.validate('blur');
            },
        },

        mounted() {
            if (this.prop) {
                this.dispatch('XcForm', 'xc.form.addField', [this]);
            
                let rules = this.getRules();
                if (rules.length || this.required !== undefined) {
                    this.$on('xc.form.blur', this.onFieldBlur);
                }
            }
        },

        beforeDestroy () {
            this.dispatch('XcForm', 'xc.form.removeField', [this]);
        }
    }
</script>