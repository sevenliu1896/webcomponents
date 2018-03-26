<script>
    import TabBar from './tab-bar'

    function noop() {}

    export default {
        name: 'TabNav',

        inject: ['rootTabs'],

        components: { TabBar },
        
        props: {
            panes: Array,
            currentName: String,
            onTabClick: {
                type: Function,
                default: noop
            }
        },

        render (h) {
            let {
                onTabClick,
                currentName,
                panes
            } = this;
            const panesLen = panes.length;

            const tabs = this._l(panes, (pane, index) => {
                let tabName = pane.name || pane.index || index;

                pane.index = `${index}`;

                const tabLabelContent = pane.$slots.label || pane.label;
                const tabindex = pane.active ? 0 : -1;
                
                return (
                    <div
                        class={{
                            'xc-tabs__item': true,
                            'is-active': pane.active
                        }}
                        style={{width: 100/panesLen + '%'}}
                        id={`tab-${tabName}`}
                        aria-controls={`pane-${tabName}`}
                        role="tab"
                        ref="tabs"
                        tabindex= {tabindex}
                        refInFor
                        on-click={(ev) => { onTabClick(pane, tabName, ev)}}
                    >
                        {tabLabelContent}
                    </div>
                )
            });
            
            return (
                <div class="xc-tabs__nav-wrap">
                    <div class="xc-tabs__nav" ref="nav"  role="tablist">
                        <tab-bar tabs={panes}></tab-bar>
                        {tabs}
                    </div>
                </div>
            )
        }
    }
</script>