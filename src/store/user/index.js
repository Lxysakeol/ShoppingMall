import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken ,removeToken} from '@/utils/token.js'
const state = {
  code: '',
  token: getToken(),
  userInfo: {},
}
const mutations = {
  GETCODE(state, CODE) {
    state.code = CODE
  },
  USERLOGIN(state, Token) {
    state.token = Token
  },
  GTEUSERINFO(state, userinfo) {
    state.userInfo = userinfo
  },
  CLEAR(state) {
    state.token = '';
    state.userInfo = {};
    removeToken();
    console.log('成功删除token1111')
  }
}
const actions = {
  //后台的api接口没有直接发手机的功能，所以验证码会以返回值得形式返回
  async getCode({ commit }, phone) {
    let results = await reqGetCode(phone);
    // alert(results.data)
    if (results.code == 200) {
      commit('GETCODE', results.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({ commit }, userData) {
    let results = await reqUserRegister(userData)
    if (results.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('验证码错误或两次输入密码不匹配'))
    }
  },
  //用户登陆
  async userLogin({ commit }, data) {
    let results = await reqUserLogin(data);
    if (results.code == 200) {
      commit('USERLOGIN', results.data.token);
      //持久化存储
      setToken(results.data.token);
      return 'ok'
    } else {
      return Promise.reject(new Error('账号密码输入错误'))
    }
  },
  //获取用户信息,在首页展示
  async getUserInfo({ commit }) {
    let results = await reqUserInfo();
    if(results.code==200){
      commit('GTEUSERINFO', results.data);
      return'ok';
    }else{
      return Promise.reject(new Error('faile'))
    }
    
  },
  //退出登陆
  async userLogout({ commit }) {
    let results = await reqLogout();
    if (results.code == 200) {
    console.log('成功删除token2222')
      commit('CLEAR');
      return'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}