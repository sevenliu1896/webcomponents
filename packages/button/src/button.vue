<template>
    <button
        class="xc-button"
        :data-keyboard="keyboard"
        @click="handleClick"
        :disabled="disabled"
        :type="nativeType"
        :class="[
            type ? 'xc-button--' + type : ' ',
            buttonSize ? 'xc-button--' + buttonSize : '',
            {
                'is-disabled': disabled,
            }
        ]"
    >
        <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
    </button>
</template>

<script>
    export default {
        name: 'XcButton',

        props: {
            type: {
                type: String,
                default: 'default'
            },
            nativeType: {
                type: String,
                default: 'button'
            },
            size: String,
            disabled: Boolean,
            keyboard: String
        },

        computed: {
            buttonSize() {
                return this.size
            }
        },

        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            },
            handleInnerClick(evt) {
                if (this.disabled) {
                    evt.stopPropagation();
                }
            }
        }
    }
</script>