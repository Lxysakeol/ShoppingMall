import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条的样式
import "nprogress/nprogress.css";
//在当前模块中引入store
import store from '@/store';
//对axios进行二次封装
//利用axios对象里的create方法创建一个axios实例
const requests = axios.create({
  //配置对象
  //requests就是axios,但是可以配置一下
  baseURL:"/api",
  timeout:5000
})

//请求拦截器
//axios.interceptors
requests.interceptors.request.use((config)=>{
  //config：配置对象，里面有一个属性很重要，Headers,请求头
  //使用进度条
  nprogress.start();
  //
  if(store.state.detail.uuid_token){
    //给请求头添加一个字段(userTempId)，（和后台商量好了）
    config.headers.userTempId = store.state.detail.uuid_token
  };
  //需要携带token给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
  //进度条结束
  nprogress.done();
  return res.data;
}, 
(error)=>{
  return Promise.reject(new Error('faile'));
});

//对外暴露
export default requests;

//可以参考axios文档进行