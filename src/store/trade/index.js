import { reqAddressInfo,reqOrderInfo } from "@/api"

const state = {
  address: [],
  orderInfo:{}
}


const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
 GETORDERINFO(state,orderInfo){
  state.orderInfo = orderInfo
 }

}

const actions = {
  //获取用户地址
  async getUserAddress({ commit }) {
    let results = await reqAddressInfo();
    if (results.code == 200) {
      commit('GETUSERADDRESS', results.data)
    }
  },
  //获取商品清单
  async getOrderInfo({commit}){
    let results = await reqOrderInfo();
    if(results.code==200){
      commit('GETORDERINFO',results.data)
    }
  }
}


const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
