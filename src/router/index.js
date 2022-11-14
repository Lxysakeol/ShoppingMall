import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
//引入store
import store from '@/store'

Vue.use(VueRouter);
//先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写push|replace
//第一个参数：告诉原来push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点，都可以调用函数一次，都可以篡改函数上下文一次
    //不同点，call与apply传递参数:call传递参数用逗号隔开，apply方法执行，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
  //to:可以获取到你要跳到那个路由信息
  //from:可以获取到你从哪个路由而来的信息
  //next:放行函数
  // next();
  //用户登陆了才会有token
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户已经登陆了，不能去/login
    if (to.path == '/login') {
      next('/home')
    } else {
      //登陆了，但去的不是/login
      // 一定要有name，才能跳转
      if (name) {
        next();
      } else {
        //没有用户信息,就派发action获取用户信息后再跳转
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效了
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    //未登录，不能去交易相关、支付相关[pay|paysuccess],不能去个人中心
    //未登录--去登陆页面
    //去的不是上面这些页面【home|search|shopcart】放行
    let toPath = to.path

    if (toPath == '/trade' || toPath.indexOf('/pay') !== -1 || toPath.indexOf('center') != -1) {//indexOf('字符串')找不到字符串返回-1
      next(`/login?redirect=${toPath}`)
    } else {
      next();
    }
  }
})
export default router;