<template>
  
</template>

<script>
    export default {
        name: 'XcTableBody',
        props: {
            tableConfig: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        methods: {
            handleBodyScroll(e) {
                console.log(this.$parent.$options.name)
                //console.log(e.target.scrollLeft);
            }
        }
    }
</script>