<template>
    <transition name="dialog-fade">
        <div class="xc-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
            <div class="xc-dialog" ref="dialog" :style="style">
                <div class="xc-dialog__header">
                    <slot name="title">
                        <div>
                            <span class="xc-dialog__title">{{ title }}</span>
                            <span class="xc-dialog__tips">{{ tips }}</span>
                        </div>
                        <a style="color: #272636"><i class="iconfont xc-icon-close" @click="hide" v-if="showClose"></i></a>
                    </slot>
                </div>
                <div class="xc-dialog__body" v-if="rendered"><slot></slot></div>
                <div class="xc-dialog__footer" :class="[alignStyle]" v-if="$slots.footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Popup from '../../../src/mixins/popup'
    import { getChildNode } from '../../../src/utils/dom'

    export default {
        name: 'XcDialog',

        mixins: [Popup],

        props: {
            title: {
                type: String,
                default: ''
            },
            tips: {
                type: String,
                default: ''
            },
            top: {
                type: String,
                default: '15vh'
            },
            modal: {
                type: Boolean,
                default: true
            },
            appendToBody: {
                type: Boolean,
                default: false
            },
            openKeyboard: {
                type: Boolean,
                default: false
            },
            closeOnClickModal: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            align: {
                type: String,
                default: 'right'
            },
            width: {
                type: String,
                default: '580px'
            },
            beforeClose: Function
        },

        data() {
            return {
                closed: false,
                keyDom: [],
                currentMinIndex: '',
                currentMaxIndex: '',
                currentIndex: ''
            };
        },

        watch: {
            visible(val) {
                if ( val ) {
                    this.closed = false;
                    this.$emit('open');
                    if (this.appendToBody) {
                        document.body.appendChild(this.$el);
                    }
                    if(!this.openKeyboard) return;
                    this.$nextTick(() => {
                        this.getFocusDom();
                    })
                    window.addEventListener('keydown', this.getKeyCode);
                } else {
                    if (!this.closed) this.$emit('close');
                    this.currentIndex = '';
                    if(!this.openKeyboard) return;
                    window.removeEventListener('keydown', this.getKeyCode);
                }
            }
        },

        computed: {
            alignStyle() {
                return `xc-dialog__footer--${this.align}`
            },
            style() {
                let style = {};
                if (this.width) {
                    style.width = this.width;
                }
                if (!this.fullscreen) {
                    style.marginTop = this.top;
                }
                return style;
            }
        },

        methods: {
            getKeyCode(e) {
                if(this.keyDom.length == 0) return;
                switch(e.keyCode) {
                    case 27:
                        this.handleClose();
                        break;
                    case 38:
                        if ( this.currentIndex === this.currentMinIndex - 1 ) {
                            this.currentIndex = this.currentMinIndex;
                        }
                        this.currentIndex > this.currentMinIndex && this.currentIndex --;
                        this.keyDom.filter(e => e.id == this.currentIndex)[0].dom.focus();
                        break;
                    case 40:
                        this.currentIndex < this.currentMaxIndex && this.currentIndex ++;
                        this.keyDom.filter(e => e.id == this.currentIndex)[0].dom.focus();
                        break;
                }
            },
            getFocusDom() {
                if(!this.openKeyboard) return;
                this.keyDom = getChildNode(this.$el, 'data-keyboard');
                this.currentMinIndex = this.keyDom[0].id;
                this.currentMaxIndex = this.keyDom[this.keyDom.length - 1].id;
                this.currentIndex = this.currentMinIndex - 1;
            },
            handleWrapperClick() {
                if (!this.closeOnClickModal) return;
                this.handleClose();
            },
            handleClose() {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(this.hide);
                } else {
                    this.hide();
                }
            },
            hide(cancel) {
                if (cancel !== false) {
                    this.$emit('update:visible', false);
                    this.$emit('close');
                    this.closed = true;
                }
            },
        },

        mounted() {
            if (this.visible) {
                this.rendered = true;
                this.open();
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            }
        }
    }
</script>