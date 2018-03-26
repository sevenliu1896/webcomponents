<template>
    <div
        class="xc-input"
        :class="[
           {
                'is-disabled': disabled,
                'xc-input-group': $slots.append,
                'xc-input-group--append': $slots.append,
           }
        ]"
    >
        <input 
            type="text"
            ref="input"
            :data-keyboard="keyboard"
            class="xc-input__inner"
            :style="{paddingRight: suffixWidth + 'px'}"
            v-bind="$props"
            v-model="currentValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
        />
        <div class="xc-input-group__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
        <span class="xc-input__suffix" v-if="$slots.suffix" ref="inputDesc">
            <span class="xc-input__suffix-inner">
                    <slot name="suffix"></slot>
            </span>
        </span>
    </div>
</template>

<script>
    import emitter from 'xc-ui/src/mixins/emitter'

    export default {
        name: 'XcInput',

        componentName: 'XcInput',

        mixins: [emitter],

        // inject: {
        //     xcForm: {
        //         default: ''
        //     },
        //     xcFormItem: {
        //         default: ''
        //     }
        // },

        data() {
            return {
                suffixWidth: 0
            }
        },

        props: {
            value: [String, Number],
            placeholder: String,
            disabled: Boolean,
            keyboard: String,
            readonly: Boolean,
            validateEvent: {
                type: Boolean,
                default: true
            },
        },

        computed: {
            currentValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        },

        methods: {
            focus() {
                this.$refs.input.focus();
            },
            inputSelect() {
                this.$refs.input.select();
            },
            handleInput(event) {
                const value = event.target.value;
                this.$emit('input', value);
            },
            handleChange(event) {
                this.$emit('change', event.target.value);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
                if (this.validateEvent) {
                    const value = event.target.value;
                    this.dispatch('XcFormItem', 'xc.form.blur', [value]);
                }
            }
        },

        created() {
            this.$on('inputSelect', this.inputSelect);
        },

        mounted() {
            if(this.$refs.inputDesc) {
                this.suffixWidth = this.$refs.inputDesc.clientWidth;
            }
        }
    }
</script>