<template>
    <div class="xc-table">
        <!--表头提示-->
        <div class="th-tips__wrapper" v-if="tipsShow" :style="positionStyle" ref="tipsWrapper">
            <div class="th-tips__inner">
                {{ tips }}
            </div>
        </div>
        <!--表头-->
        <div class="xc-table__header-wrapper" ref="scrollHead">
            <table cellspacing="0" cellpadding="0" border="0" class="xc-table__header">
                <colgroup>
                    <col v-for="column in adaptiveTable" :key="column.key" :width="column.width">
                </colgroup>
                <thead v-if="isDraggable">
                    <draggable element="tr" v-model="tableCopyConfig" @end="dragEnd">
                        <th v-for="column in tableConfig" :key="column.key" 
                            :class="[
                                {'ascending': curSortType === 'ascending' && curSortKey === column.key},
                                {'descending': curSortType === 'descending' && curSortKey === column.key}
                            ]"
                        >
                            <div class="cell" :style="{'justifyContent': column.align}">
                                {{ column.title }}
                                <span class="caret-wrapper" v-if="column.sort" @click="handleSortClick($event, column.key)">
                                    <i class="sort-caret ascending"></i>
                                    <i class="sort-caret descending"></i>
                                </span>
                                <span class="xc-th__tips" v-if="column.tips" @mouseover="showTips($event, column.tips)" @mouseout="hideTips($event)">i</span>
                            </div>
                        </th>
                        <th :style="{width: scrollWidth + 'px'}" v-if="gutterShow"></th>
                    </draggable>
                </thead>
                <thead v-else>
                    <tr>
                        <th v-for="column in tableConfig" :key="column.key" 
                            :class="[
                                {'ascending': curSortType === 'ascending' && curSortKey === column.key},
                                {'descending': curSortType === 'descending' && curSortKey === column.key}
                            ]"
                        >
                            <div class="cell" :style="{'justifyContent': column.align}">
                                {{ column.title }}
                                <span class="caret-wrapper" v-if="column.sort" @click="handleSortClick($event, column.key)">
                                    <i class="sort-caret ascending"></i>
                                    <i class="sort-caret descending"></i>
                                </span>
                                <span class="xc-th__tips" v-if="column.tips" @mouseover="showTips($event, column.tips)" @mouseout="hideTips($event)">i</span>
                            </div>
                        </th>
                        <th :style="{width: scrollWidth + 'px'}" v-if="gutterShow"></th>
                    </tr>
                </thead>
            </table>
        </div>
        <!--表格内容-->
        <div class="xc-table__body-wrapper" ref="tableBodyWrapper"  @scroll="handleBodyScroll" :style="{'maxHeight': maxHeight + 'px'}">
            <table cellspacing="0" cellpadding="0" border="0" class="xc-table__body" ref="tableBody">
                <colgroup>
                    <col v-for="column in adaptiveTable" :key="column.key" :width="column.width">
                </colgroup>
                <tbody>
                    <slot></slot>
                </tbody>
            </table>
        </div>
        <!--固定部分-->
        <div class="xc-table__fixed" :style="{'width': fixedWidth + 'px'}" v-if="$slots.fixtbody">
            <div class="xc-table__fixed-header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="xc-table__header">
                    <colgroup>
                        <col v-for="column in adaptiveTable" :key="column.key" :width="column.width">
                    </colgroup>
                    <thead>
                        <tr>
                            <th v-for="column in tableConfig" :key="column.key" 
                                :class="[
                                    {'ascending': curSortType === 'ascending' && curSortKey === column.key},
                                    {'descending': curSortType === 'descending' && curSortKey === column.key}
                                ]"
                            >
                                <div class="cell" :style="{'justifyContent': column.align}">
                                    {{ column.title }}
                                    <span class="caret-wrapper" v-if="column.sort" @click="handleSortClick($event, column.key)">
                                        <i class="sort-caret ascending"></i>
                                        <i class="sort-caret descending"></i>
                                    </span>
                                    <span class="xc-th__tips" v-if="column.tips" @mouseover="showTips($event, column.tips)" @mouseout="hideTips($event)">i</span>
                                </div>
                            </th>
                            <th :style="{width: scrollWidth + 'px'}" v-if="gutterShow"></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="xc-table__fixed-body-wrapper" ref="scrollFixed" :style="{height: fixedHeight + 'px'}">
                <table cellspacing="0" cellpadding="0" border="0" class="xc-table__body">
                    <colgroup>
                        <col v-for="column in adaptiveTable" :key="column.key" :width="column.width">
                    </colgroup>
                    <slot name="fixtbody"></slot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import getScrollBarWidth from 'xc-ui/src/utils/scrollbar-width';
    import draggable from 'vuedraggable';
    import { sortBy, deepCopy } from 'xc-ui/src/utils/util';
import { setTimeout } from 'timers';

    export default {
        name: 'XcTable',
        data() {
            return {
                scrollWidth: getScrollBarWidth(),
                gutterShow: false,
                curSortKey: this.sort_by,
                curSortType: this.order,
                tableCopyConfig: [],
                tableWidth: 0,
                tips: '',
                tipsShow: false,
                tipsClientX: 0,
                tipsClientY: 0
            }
        },
        components: {
            draggable
        },
        props: {
            sort_by: '',
            order: '',
            isDraggable: {
                type: Boolean,
                default: false
            },
            maxHeight: '',
            tableConfig: {
                type: Array,
                default: function() {
                    return []
                }
            },
            tableData: {
                type: Array,
                default: function() {
                    return []
                }
            },
            tableSotrData: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        watch: {
            tableConfig: {
                handler(val) {
                    this.tableCopyConfig = deepCopy(val);
                },
                immediate: true
            },
            tableSotrData(val) {
                this.$nextTick(() => {
                    this.gutterInit();
                })
            },
            maxHeight(val) {
                this.$nextTick(() => {
                    this.gutterInit();
                })
            },
            tableData: {
                handler(val) {
                    this.$nextTick(() => {
                        this.tableWidth = this.$refs.scrollHead ? this.$refs.scrollHead.clientWidth : 0;
                        this.tableSotrData.sort(sortBy(this.curSortKey, this.curSortType));
                    })
                },
                immediate: true
            }
        },
        computed: {
            positionStyle() {
                let obj = {};
                obj.left = this.tipsClientX + 'px';
                obj.top = this.tipsClientY + 'px';
                return obj;
            },
            adaptiveTable() {
                let tableConfig = deepCopy(this.tableCopyConfig);
                if(tableConfig.every(e => e.width)) {
                    if(tableConfig.length === 0) return tableConfig;
                    let tableWidth = this.tableWidth - this.scrollWidth;
                    let sumWidth = 0, len = tableConfig.length;
                    
                    for(let i = 0; i < len - 1; i++) {
                        if(tableConfig[i] && tableConfig[i].width) {
                            sumWidth += parseInt(tableConfig[i].width);
                        }
                    } 
                    if(sumWidth < tableWidth) {
                        tableConfig[len-1].width = tableWidth - sumWidth;
                        tableConfig[len-1].align = 'left';
                    }
                };

                return tableConfig;
            },
            fixedHeight() {
                return Number(this.maxHeight) - Number(this.scrollWidth);
            },
            fixedWidth() {
                let sumWidth = 0;
                let fixedTable = this.tableConfig.filter(e => e.fixed).map(e => e.width);
                fixedTable.forEach(e => {
                    sumWidth += Number(e)
                })
                return sumWidth;
            }
        },
        mounted() {
            setTimeout(() => {
                this.gutterInit();
            }, 500)
        },
        methods: {
            showTips(event, msg) {
                let e = event || window.event;
                this.tips = msg;
                this.tipsShow = true;
                this.$nextTick(() => {
                    let width = this.$refs.tipsWrapper.clientWidth;
                    this.tipsClientX = e.clientX - width + 12;
                    this.tipsClientY = e.clientY + 20;
                    
                })
            },
            hideTips(event) {
                this.tipsShow = false;
            },
            dragEnd() {
                this.$emit("update:tableConfig", deepCopy(this.tableCopyConfig))
            },
            gutterInit() {
                if(this.$refs.tableBodyWrapper.clientHeight < this.$refs.tableBody.clientHeight) {
                    this.gutterShow = true;
                }else{
                    this.gutterShow = false;
                }
            },
            handleSortClick(event, key){
                if(this.curSortKey !== key) {
                    this.curSortKey = key;
                    this.curSortType = 'ascending';
                    this.tableSotrData.sort(sortBy(key, this.curSortType));
                    this.$emit("update:sort_by", key);
                    this.$emit("update:order", this.curSortType);
                    return false;
                }

                if(this.curSortType === '') {
                    this.curSortType = 'ascending';
                }else if(this.curSortType === 'ascending') {
                    this.curSortType = 'descending'
                }else if(this.curSortType === 'descending') {
                    this.curSortType = '';
                    this.$emit('update:tableSotrData', deepCopy(this.tableData));
                    this.$emit("update:sort_by", key);
                    this.$emit("update:order", this.curSortType);
                    return false;
                }
                this.$emit("update:sort_by", key);
                this.$emit("update:order", this.curSortType);
                this.tableSotrData.sort(sortBy(key, this.curSortType))
            },
            handleBodyScroll(e) {
                this.$refs.scrollHead.scrollLeft = e.target.scrollLeft;
                if(this.$refs.scrollFixed){
                    this.$refs.scrollFixed.scrollTop = e.target.scrollTop;
                }
            }
        }
    }
</script>