//路由配置信息
//路由懒加载，Home组件这样下，其他组件简写
const Home = () => {
  return import('@/views/Home')
}
//引入二级组件
// 当打包构建应用时，JavaScript 包会变得非常大，
// 影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就会更加高效。
export default [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home,
    //路由元信息key不能乱写，只能是meta
    meta: {
      show: true
    }
  },
  {
    path: "/login",
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    path: "/register",
    component: () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    path: "/search/:keyword?",
    component: () => import('@/views/Search'),
    meta: {
      show: true
    },
    name: 'search'
  },
  {
    path: "/detail/:skuid",
    component: () => import('@/views/Detail'),
    meta: {
      show: true
    }
  },
  {
    path: '/addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    name: 'addcartsuccess',
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: {
      show: true
    }
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade'),
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      // 路由独享守卫，只监听到该路由的变化
      if (from.path == '/shopcart') {
        //去交易页面，必须是从购物车来
        next();
      } else {
        //其他的路由组件来，停留在当前页面
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // 
      if (from.path == '/trade') {
        next();
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next();
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center'),
    // 二级路由组件
    children: [
      {
        path: '/center',
        redirect: '/center/myorder',

      },
      {
        path: 'myorder',
        component: () => import('@/views/Center/myOrder'),
        meta: { show: true }
      },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/groupOrder'),
        meta: { show: true }
      }
    ]
  }
]
