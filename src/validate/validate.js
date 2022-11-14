import Vue from 'vue';
//引入表单校验插件
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field) =>`${field}必须与密码相同 `  //修改内置规则message,让确认密码和密码相同
  },
  attributes:{
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
})
//自定义规则
VeeValidate.Validator.extend('agree',{
  validate: value =>{return value},
  getMessage: field=>field + '必须同意'
})