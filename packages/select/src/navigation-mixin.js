export default {
    data() {
        return {
            hoverOption: -1
        }
    },

    watch: {
        hoverIndex(val) {
            if (typeof val === 'number' && val > -1) {
                this.hoverOption = this.options[val] || {};
            }
            this.options.forEach(option => {
                option.hover = this.hoverOption === option;
            });
        }
    },

    methods: {
        navigateOptions(direction) {
            if (!this.visible) {
                this.visible = true;
                return;
            }
            if (this.options.length === 0 || this.filteredOptionsCount === 0) return;
            if (direction === 'next') {
                this.hoverIndex++;
                if (this.hoverIndex === this.options.length) {
                    this.hoverIndex = 0;
                }
            } else if (direction === 'prev') {
                this.hoverIndex--;
                if (this.hoverIndex < 0) {
                    this.hoverIndex = this.options.length - 1;
                }
            }
            const option = this.options[this.hoverIndex];
            if (!option.visible) {
                this.navigateOptions(direction);
            }
            
            this.$nextTick(() => this.scrollToOption(this.hoverOption));
        }
    }
}