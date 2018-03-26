<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    fundName: '',
                    file: '',
                    type: 'a',
                    desc: '',
                    fund: []
                },
                rules: {
                    name: [
                        { required: true, message: '股票代码不能为空', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    fundName: [
                        { required: true, message: '股票池名称不能为空', trigger: 'blur' },
                    ]
                }
            }
        },

        watch: {
            form: {
                handler: function (val, oldVal) { 
                    //console.log(JSON.stringify(val))
                },
                deep: true
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>

# Form 表单
由输入框、选择器、单选框、多选框等控件组成，用以收集、校验、提交数据。

----

### 典型表单
包括各种表单项，比如输入框、选择器、开关、单选框、多选框等。

<div class="demo-block">
    <xc-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" style="width: 460px;">
        <xc-form-item label="录入股票" prop="name">
            <xc-input v-model="form.name" placeholder="请输入股票代码"></xc-input>
        </xc-form-item>
        <xc-row :gutter="24">
            <xc-col :span="14">
                <xc-form-item label="股票池名称" prop="fundName">
                    <xc-input v-model="form.fundName" placeholder="请输入股票池名称"></xc-input>
                </xc-form-item>
            </xc-col>
            <xc-col :span="10">
                <xc-form-item label="说明" label-width="50px">
                    <xc-input v-model="form.desc" placeholder="请输入说明"></xc-input>
                </xc-form-item>
            </xc-col>
        </xc-row>
        <xc-form-item label="选择模板">
            <xc-input v-model="form.file"  readonly placeholder="请选择股票模板">
                <xc-button slot="append" type="warning">导入</xc-button>
            </xc-input>
        </xc-form-item>
        <xc-form-item label="股票类型">
            <xc-radio-group v-model="form.type">
                <xc-radio label="a">类型一</xc-radio>
                <xc-radio label="b">类型二</xc-radio>
            </xc-radio-group>
        </xc-form-item>
        <xc-form-item label="选择分类">
            <xc-checkbox-group v-model="form.fund">
                <xc-checkbox label="沪深主板"></xc-checkbox>
                <xc-checkbox label="中小板"></xc-checkbox>
                <xc-checkbox label="创业板"></xc-checkbox>
                <xc-checkbox label="港股"></xc-checkbox>
                <xc-checkbox label="香港主板"></xc-checkbox>
                <xc-checkbox label="香港创业板"></xc-checkbox>
                <xc-checkbox label="ST股票"></xc-checkbox>
            </xc-checkbox-group>
        </xc-form-item>
        <xc-form-item>
            <xc-button type="primary" @click="submitForm('ruleForm')">立即创建</xc-button>
        </xc-form-item>
    </xc-form>
</div>


::: demo
```html
<template>
    <xc-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" style="width: 460px;">
        <xc-form-item label="录入股票" prop="name">
            <xc-input v-model="form.name" placeholder="请输入股票代码"></xc-input>
        </xc-form-item>
        <xc-row :gutter="20">
            <xc-col :span="12">
                <xc-form-item label="股票池名称">
                    <xc-input v-model="form.fundName" placeholder="请输入股票池名称"></xc-input>
                </xc-form-item>
            </xc-col>
            <xc-col :span="12">
                <xc-form-item label="说明" label-width="50px">
                    <xc-input v-model="form.desc" placeholder="请输入说明"></xc-input>
                </xc-form-item>
            </xc-col>
        </xc-row>
        <xc-form-item label="选择模板">
            <xc-input v-model="form.file"  readonly placeholder="请选择股票模板">
                <xc-button slot="append" type="warning">导入</xc-button>
            </xc-input>
        </xc-form-item>
        <xc-form-item label="股票类型">
            <xc-radio-group v-model="form.type">
                <xc-radio label="a">类型一</xc-radio>
                <xc-radio label="b">类型二</xc-radio>
            </xc-radio-group>
        </xc-form-item>
        <xc-form-item label="选择分类">
            <xc-checkbox-group v-model="form.fund">
                <xc-checkbox label="沪深主板"></xc-checkbox>
                <xc-checkbox label="中小板"></xc-checkbox>
                <xc-checkbox label="创业板"></xc-checkbox>
                <xc-checkbox label="港股"></xc-checkbox>
                <xc-checkbox label="香港主板"></xc-checkbox>
                <xc-checkbox label="香港创业板"></xc-checkbox>
                <xc-checkbox label="ST股票"></xc-checkbox>
            </xc-checkbox-group>
        </xc-form-item>
        <xc-form-item>
            <xc-button type="primary" @click="submitForm('ruleForm')">立即创建</xc-button>
        </xc-form-item>
    </xc-form>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    fundName: '',
                    file: '',
                    type: 'a',
                    desc: '',
                    fund: []
                },
                rules: {
                    name: [
                        { required: true, message: '股票代码不能为空', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                }
            }
        },

        watch: {
            form: {
                handler: function (val, oldVal) { 
                    //console.log(JSON.stringify(val))
                },
                deep: true
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    };
</script>
```
:::

### Form Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| model | 表单数据对象   | object |   —   |  —  |
| rules | 表单验证规则 | object |  — |  —  |
| disabled | 是否禁用状态 | boolean   | — | false |
| label-width | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | string   | — | — |
| disabled | 是否禁用状态 | boolean   | — | false |

### Form Methods
| 参数      | 说明    | 类型 | 
|---------- |-------- |---------- |
| validate | 对整个表单进行校验的方法。若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean)) |

### Form-Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- | -------- | ---------- | -------------  | -------- |
| prop | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的   | string |  传入 Form 组件的 model 中的字段   |  —  |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string | — | — |