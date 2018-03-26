import Vue from 'vue';
import PopupManager from './popup-manager';
import merge from '../../utils/merge'
import getScrollBarWidth from '../../utils/scrollbar-width'
import { setTimeout } from 'timers';

let idSeed = 1;
let scrollBarWidth;

const getDOM = function(dom) {
    if ( dom.nodeType === 3 ) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
}

export default {
    data () {
        return {
            opened: false,
            rendered: false,
            bodyOverflow: null,
            bodyPaddingRight: null,
        }
    },

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            type: Boolean,
            default: true
        }
    },

    beforeMount() {
        this._popupId = `popup-${idSeed++}`;
        PopupManager.register(this._popupId, this);
    },

    watch: {
        visible(val) {
            if ( val ) {
                if ( this._opening ) return;
                if ( !this.rendered ) {
                    this.rendered = true;
                    Vue.nextTick(() => {
                        this.open();
                    })
                } else {
                    this.open();
                }
            } else {
                this.close();
            }
        }
    },

    methods: {
        open(options) {
            if (!this.rendered) {
                this.rendered = true;
            }
            const props = merge({}, this.$props || this, options);
            this.doOpen(props);
        },
        doOpen(props) {
            if (this.$isServer) return;
            if (this.opened) return;

            const dom = getDOM(this.$el);
            const modal = props.modal;
            const zIndex = props.zIndex;

            if (zIndex) {
                PopupManager.zIndex = zIndex;
            }
      
            if (modal) {
                PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), props.modalFade);
                if(props.lockScroll) {
                    this.bodyOverflow =  document.body.style.overflow;
                    this.bodyPaddingRight = document.body.style.paddingRight;
                    document.body.style.overflow = 'hidden';
                }
                scrollBarWidth = getScrollBarWidth();
                let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
                if (scrollBarWidth > 0 &&  bodyHasOverflow) {
                    document.body.style.paddingRight = scrollBarWidth + 'px';
                }
            }
            dom.style.zIndex = PopupManager.nextZIndex();
            this.opened = true;
        },
        close() {
            if (this.lockScroll) {
                setTimeout(() => {
                    if (this.modal && this.bodyOverflow !== 'hidden') {
                        document.body.style.overflow = this.bodyOverflow;
                        document.body.style.paddingRight = this.bodyPaddingRight;
                    }
                    this.bodyOverflow = null;
                    this.bodyPaddingRight = null;
                }, 200)
            }
            this.opened = false;
            PopupManager.deregister(this._popupId);
            PopupManager.closeModal(this._popupId);
        }
    }
}

export {
    PopupManager
}