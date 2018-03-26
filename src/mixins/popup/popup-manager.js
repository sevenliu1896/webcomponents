import Vue from 'vue';
import { addClass, removeClass } from '../../utils/dom';

let hasModal = false;

const getModal = function() {
    if (Vue.prototype.$isServer) return;
    let modalDom = PopupManager.modalDom;
    //是否已创建过实例
    if (modalDom) {
        hasModal = true;
    } else {
        hasModal = false;
        modalDom = document.createElement('div');
        PopupManager.modalDom = modalDom;
    }

    return modalDom;
}

const instances = {};

const PopupManager = {
    zIndex: 2000,

    modalFade: true,
    //获取实例
    getInstance: function(id) {
        return instances[id];
    },
    //注册实例
    register: function(id, instance) {
        if ( id && instance)  instances[id] = instance;
    },
    //注销实例
    deregister: function(id) {
        if(id) {
            instances[id] = null;
            delete instances[id];
        }
    },
    //遮盖当前实例
    nextZIndex: function() {
        return this.zIndex++;
    },
    //modal栈
    modalStack: [],
    //创建实例
    openModal: function(id, zIndex, modalFade) {
        if (Vue.prototype.$isServer) return;
        if (!id || zIndex === undefined) return;
        this.modalFade = modalFade;

        const modalStack = this.modalStack;

        if (modalStack.some(item => item.id === id)) return;

        const modalDom = getModal();

        addClass(modalDom, 'v-modal');
        if (this.modalFade && !hasModal) {
            addClass(modalDom, 'v-modal-enter');
        }
       
        setTimeout(() => {
            removeClass(modalDom, 'v-modal-enter');
        }, 200);

        document.body.appendChild(modalDom);

        if (zIndex) {
            modalDom.style.zIndex = zIndex;
        }
        modalDom.tabIndex = 0;
        modalDom.style.display = '';

        this.modalStack.push({ id: id, zIndex: zIndex});
    },
    //销毁实例
    closeModal: function(id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();
       
        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            } else {
                for (let i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }

            if (modalStack.length === 0) {
                if (this.modalFade) {
                    addClass(modalDom, 'v-modal-leave');
                }
                setTimeout(() => {
                    if (modalStack.length === 0) {
                        if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
                        modalDom.style.display = 'none';
                        PopupManager.modalDom = undefined;
                    }
                    removeClass(modalDom, 'v-modal-leave');
                }, 200)
            }
        }
    }
}

//获取最顶层的实例
const getTopPopup = function() {
    if (Vue.prototype.$isServer) return;
    if (PopupManager.modalStack.length > 0) {
        const topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topPopup) return;
        const instance = PopupManager.getInstance(topPopup.id);
    
        return instance;
    }
}

export default PopupManager;