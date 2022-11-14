import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'
//home模块的仓库
const state = {
  categoryList: [],
  bannerList: [],
  FloorList: [],
};
const mutations = {
  CATEGORYLIST(state, categorylist) {
    state.categoryList = categorylist
  },
  BANNERLIST(state, bannerlist) {
    state.bannerList = bannerlist
  },
  GETFLOORLIST(state,floorlist){
    state.FloorList = floorlist
  }
};
const actions = {
  //通过api发送请求，三级联动获取数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }

  },
  //获取轮播图数据
  async getBannerList({ commit }) {
    let result = await reqBannerList()
    if (result.code == 200) {
      commit('BANNERLIST', result.data)
    }

  },
  //获取floor数据
  async getFloorList({commit}){
    let result = await reqFloorList()
    if(result.code == 200){
      commit('GETFLOORLIST',result.data)
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
}
