<template>
    <div
        class="xc-tab-pane"
        role="tabpanel"
        v-show="active"
        :aria-hidden="!active"
        :id="`pane-${paneName}`"
        :aria-labelledby="`tab-${paneName}`"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'XcTabPane',

        componentName: 'XcTabPane',

        props: {
            label: String,
            name: String
        },

        computed: {
            active() {
                return this.$parent.currentName ===this.name;
            },
            paneName() {
                return this.name;
            }
        },

        mounted() {
            this.$parent.addPanes(this);
        }
    }
</script>
