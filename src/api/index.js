//统一管理api
//引入二次封装的axios（带有响应、请求拦截器）
import requests from './ajax'
import mockRequests from './mockAjax'
//三级联动接口:/api/product/getBaseCategoryList
export const reqCategoryList = () => {
  return requests({
    //发请求：axios发请求放回结果是Promise对象
    url: '/product/getBaseCategoryList',
    method: 'get',
  })
}
//请求轮播图(banner)数据
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get', })
//请求floor数据
export const reqFloorList = () => mockRequests.get('/floor')
//获取搜索模块数据，地址：/api/list  请求方式：post  参数：带参数
/*{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}*/
export const reqGetSearchInfo = (params) => requests({
  url: "/list",
  method: "post",
  data: params,
})
//获取产品信息Detail URL:/api/item/{skuid} get请求
export const reqGetGoodsInfo = (skuid) => requests({
  url: `/item/${skuid}`,
  method: "get"
})

//将产品添加到购物车中（获取更新某一个产品的个数） /api/cart/addToCart/{skuid}/{skuNum} post请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: "post"
})
//获取购物车列表数据接口  URL：/api/cart/cartList  get请求
export const reqGetCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})
//删除购物产品的接口 URL：api/cart/deleteCart/{skuId}   method：delete
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})
//修改商品选中的状态的接口  URL：api/cart/checkCart/{skuId}/{isChecked}  get请求
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})
//获取验证码
export const reqGetCode = phone => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})
//注册的接口
export const reqUserRegister = (data) => requests({
  url: 'user/passport/register',
  data: data,
  method: 'post'
})
//登陆接口
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'post',
  data,
})
//获取用户信息，带着token向服务器获取用户信息
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})
//退出登陆
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})
//获取用户收货地址信息
export const reqAddressInfo = ()=> requests({
  url:'/user/userAddress/auth/findUserAddressList',
  method:'get'
})
//获取用户清单
export const reqOrderInfo = ()=> requests({
  url:'/order/auth/trade',
  method:'get'
})
//提交订单的接口
//这次处理数据不用vuex了，直接用组件存储数据
export const reqSubmitOrder = (tradeNo,data) => requests({
  url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method:'post',
  data,
})
//获取支付信息（在pay页面展示支付的信息）
export const reqPayInfo = (orderId)=> requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:'get',
})
//获取支付订单状态
export const reqPayStatus = (orderId) => requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:"get"
})
//获取我的订单数据接口
export const reqGetMyOrder = (page,limit)=>requests({
  url:`/order/auth/${page}/${limit}`,
  method:'get'
})