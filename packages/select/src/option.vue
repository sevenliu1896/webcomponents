<template>
    <li
        @mouseenter="hoverItem"
        @click.stop="selectOptionClick"
        class="xc-select-dropdown__item"
        v-show="visible"
        :class="{
            'selected': itemSelected,
            'hover': hover
        }">
        <span>{{ currentLabel }}</span>
    </li>
</template>

<script>
    import Emitter from 'xc-ui/src/mixins/emitter';
    import { getValueByPath } from 'xc-ui/src/utils/util';

    export default {
        name: 'XcOption',

        componentName: 'XcOption',

        inject: ['select'],

        mixins: [Emitter],

        props: {
            value: {
                required: true
            },
            label: [String, Number]
        },

        data() {
            return {
                hover: false,
                visible: true
            }
        },

        created() {
            this.select.options.push(this);
            this.select.cachedOptions.push(this);
            this.select.optionsCount++;
            this.select.filteredOptionsCount++;

            this.$on('queryChange', this.queryChange);
        },

        computed: {
            currentLabel() {
                return this.label || this.value;
            },
            itemSelected() {
                return this.contains(this.select.value, this.value);
            }
        },

        methods: {
            hoverItem() {
                this.select.hoverIndex = this.select.options.indexOf(this);
            },
            selectOptionClick() {
                this.dispatch('XcSelect', 'handleOptionClick', this);
            },
            contains(arr = [], target) {
                return arr == target;
            },
            queryChange(query) {
                // query 里如果有正则中的特殊字符，需要先将这些字符转义
                let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
                this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
                if (!this.visible) {
                    this.select.filteredOptionsCount--;
                }
            }
        }
    }
</script>