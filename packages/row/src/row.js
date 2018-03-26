export default {
    name: 'XcRow',

    componentName: 'XcRow',

    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: Number
    },

    computed: {
        style() {
            let ret = {};

            if(this.gutter) {
                ret.marginLeft = `-${this.gutter / 2}px`;
                ret.marginRight = ret.marginLeft;
            }

            return ret;
        }
    },

    render(h) {
        return h(this.tag, {
            class: [
                'xc-row'
            ],
            style: this.style
        }, this.$slots.default);
    }
}