<script>
    import TabNav from './tab-nav'

    export default {
        name: 'XcTabs',

        components: {
            TabNav
        },

        provide() {
            return {
                rootTabs: this
            };
        },

        props: {
            activeName: String,
            value: {},
        },

        data() {
            return {
                currentName: this.value || this.activeName,
                panes: []
            };
        },

        methods: {
            handleTabClick(tab, tabName, event) {
                this.setCurrentName(tabName);
                this.$emit('tab-click', tab, event);
            },
            addPanes(item) {
                const index = this.$slots.default.filter(item => {
                    return item.elm.nodeType === 1 && /\bxc-tab-pane\b/.test(item.elm.className);
                }).indexOf(item.$vnode);
                this.panes.splice(index, 0, item);
            },
            setCurrentName(value) {
                this.currentName = value;
                this.$emit('input', value);
            }
        },

        render(h) {
            let {
                currentName,
                handleTabClick,
                panes,
            } = this;

            const navData = {
                props: {
                    currentName,
                    onTabClick: handleTabClick,
                    panes
                },
                ref: 'nav'
            }

            const header = (
                <div class="xc-tabs__header">
                    <tab-nav {...navData}></tab-nav>
                </div>
            );
            const panels = (
                <div class="xc-tabs__content">
                    {this.$slots.default}
                </div>
            );

            return (
                <div class="xc-tabs">
                    {[header, panels]}
                </div>
            )
        }
    }
</script>