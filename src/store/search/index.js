//search模块的仓库
//
import { reqGetSearchInfo } from '@/api/index.js'

const state = {
  SearchList: {},
};
const mutations = {
  GETSEARCHINFO(state, searchlist) {
    state.SearchList = searchlist
  }
};

const actions = {
  //获取search模块数据
  async getSearchListInfo({ commit }, params = {}) {
    //当前这个reqGetSearchInfo函数在调用时候，至少传递一个参数（空对象）
    //params是当用户派发action的时候第二个参数传递过来的，至少是一个空对象
    let results = await reqGetSearchInfo(params)
    if (results.code == 200) {
      commit('GETSEARCHINFO', results.data)
    }
  }
};
//项目中getters是为了简化仓库中的数据
const getters = {
  //当前形参state是当前仓库中的state，不是大仓库中的state
  goodsList(state){
    //假如网络慢，或者没网，state.SearchList.goodsList会放回undfined,后面加个空数组
    return state.SearchList.goodsList || [];
  },
  trademarkList(state){
    return state.SearchList.trademarkList || []
  },
  attrsList(state){
    return state.SearchList.attrsList || []
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
}
