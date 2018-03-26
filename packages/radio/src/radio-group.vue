<template>
    <div class="xc-radio-group"  role="group" aria-label="radio-group">
        <slot></slot>    
    </div>
</template>

<script>
    export default {
        name: 'XcRadioGroup',
        
        componentName: 'XcRadioGroup',

        props: {
            value: {},
            disabled: Boolean,
            keyboard: String
        }
    }
</script>