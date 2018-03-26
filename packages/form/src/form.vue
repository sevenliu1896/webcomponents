<template>
    <form class="xc-form">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'XcForm',

        componentName: 'XcForm',

        provide() {
            return {
                xcForm: this
            }
        },

        props: {
            model: Object,
            rules: Object,
            labelWidth: String
        },

        watch: {
            rules() {
                this.validate();
            }
        },

        data() {
            return {
                fields: []
            }
        },

        created() {
            this.$on('xc.form.addField', (field) => {
                if (field) {
                    this.fields.push(field);
                }
            });
            this.$on('xc.form.removeField', (field) => {
                if (field.prop) {
                    this.fields.splice(this.fields.indexOf(field), 1);
                }
            });
        },

        methods: {
            validate(callback) {
                if (!this.model) {
                    console.warn('[Element Warn][Form]model is required for validate to work!');
                    return;
                }

                let promise;
                if (typeof callback !== 'function' && window.Promise) {
                    promise = new window.Promise((resolve, reject) => {
                        callback = function(valid) {
                            valid ? resolve(valid) : reject(valid);
                        };
                    });
                }

                let valid = true;
                let count = 0;
                // 如果需要验证的fields为空，调用验证时立刻返回callback
                if (this.fields.length === 0 && callback) {
                    callback(true);
                }

                this.fields.forEach((field, index) => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false;
                        }
                        if (typeof callback === 'function' && ++count === this.fields.length) {
                            callback(valid);
                        }
                    });
                });

                if (promise) {
                    return promise;
                }
            }
        }
    }
</script>