<template>
    <label
        class="xc-checkbox"
        role="checkbox"
         :class="{
             'is-checked': isChecked,
             'is-disabled': isDisabled
         }"
    >   
        <span class="xc-checkbox__input"
            :class="{
                'is-checked': isChecked,
                'is-disabled': isDisabled,
                'is-indeterminate': indeterminate
            }"
        >
            <span class="xc-checkbox__inner"></span>
            <input 
                type="checkbox" 
                class="xc-checkbox__original"
                :value="label"
                :name="name"
                v-model="model"
                :disabled="isDisabled"
                @change="handleChange"
            >
        </span>
        <span class="xc-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    import Emitter from '../../../src/mixins/emitter'

    export default {
        name: 'XcCheckbox',

        componentName: 'XcCheckbox',

        mixins: [Emitter],

        props: {
            value: {},
            disabled: Boolean,
            label: {},
            checked: Boolean,
            name: String,
            indeterminate: Boolean
        },

        data() {
            return {
                selfModel: false
            }
        },

        computed: {
            model: {
                get() {
                    return this.isGroup
                        ? this.store : this.value !== undefined
                        ? this.value : this.selfModel;
                },
                set(val) {
                    if (this.isGroup) {
                        this.dispatch('XcCheckboxGroup', 'input', [val])
                    } else {
                        this.$emit('input', val);
                        this.selfModel = val;
                    }
                }
            },
            isChecked() {
                if ({}.toString.call(this.model) === '[object Boolean]') {
                    return this.model;
                } else if (Array.isArray(this.model)) {
                    return this.model.indexOf(this.label) > -1;
                }
            },
            isDisabled() {
                return this.isGroup
                    ? this._checkboxGroup.disabled || this.disabled
                    : this.disabled;
            },
            isGroup() {
                let parent = this.$parent;

                while(parent) {
                    if(parent.$options.componentName !== 'XcCheckboxGroup') {
                        parent = parent.$parent;
                    } else {
                        this._checkboxGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            store() {
                return this._checkboxGroup ? this._checkboxGroup.value : this.value;
            },
        },

        methods: {
            addToStore() {
                if (Array.isArray(this.model) &&this.model.indexOf(this.label) === -1) {
                    this.model.push(this.label);
                } else {
                    this.model = true;
                }
            },
            handleChange(ev) {
                let value;
                if (ev.target.checked) {
                    value = true;
                } else {
                    value = false;
                }
                this.$emit('change', value, ev);
                this.$nextTick(() => {
                    if (this.isGroup) {
                        this.dispatch('XcCheckboxGroup', 'change', [this._checkboxGroup.value]);
                    }
                });
            }
        },

        created() {
            this.checked && this.addToStore();
        }
    }
</script>