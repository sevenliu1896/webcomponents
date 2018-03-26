<template>
    <div class="xc-checkbox-group" role="group" aria-label="checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'XcCheckboxGroup',

        componentName: 'XcCheckboxGroup',

        props: {
            value: {},
            disabled: Boolean
        }
    }
</script>