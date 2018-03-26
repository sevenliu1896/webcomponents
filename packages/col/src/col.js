export default {
    name: 'XcCol',
    
    componentName: 'XcCol',

    props: {
        span: {
            type: Number,
            default: 24
        },
        tag: {
            type: String,
            default: 'div'
        },
        offset: Number,
        pull: Number,
        push: Number,
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        xl: [Number, Object]
    },

    computed: {
        gutter() {
            let parent = this.$parent;
            while(parent && parent.$options.componentName !== 'XcRow') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        }
    },

    render(h) {
        let classList = [];
        let style = {};

        if (this.gutter) {
            style.paddingLeft = this.gutter / 2 + 'px';
            style.paddingRight = style.paddingLeft;
        }

        ['span', 'offset'].forEach(prop => {
            if(this[prop] || this[prop] === 0) {
                classList.push(
                    prop !== 'span' 
                            ? `xc-col-${prop}-${this[prop]}` 
                            : `xc-col-${this[prop]}`
                )
            }
        })

        return h(this.tag, {
            class: [
                'xc-col',
                classList
            ],
            style: style
        }, this.$slots.default);
    }
}