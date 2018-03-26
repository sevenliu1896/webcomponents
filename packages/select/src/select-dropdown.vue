<template>
    <div
        class="xc-select-dropdown xc-popper"
        :style="{ minWidth: minWidth }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'XcSelectDropdown',

        componentName: 'XcSelectDropdown',

        data() {
            return {
                minWidth: ''
            }
        },

        watch: {
            '$parent.inputWidth'(val) {
                this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
            }
        }
    }
</script>