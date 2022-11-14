import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, cartlist) {
    state.cartList = cartlist
  }
}
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let results = await reqGetCartList();
    if (results.code == 200) {
      commit('GETCARTLIST', results.data)
    }
  },
  //删除购物车中某一个商品数据
  async deleteCartListBySkuId({ commit }, skuId) {
    let results = await reqDeleteCartById(skuId);
    if (results.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('faile'));
    }
  },
  //修改产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let results = await reqUpdateCheckedById(skuId, isChecked);
    if (results.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除购物车中所有选中的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    //context:小仓库，commit:提交mutations修改state,  getters；计算属性  dispatch:派发action  state:当前仓库
    //获取仓库中的所有商品
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
      promiseAll.push(promise)
    });
    //Promise.all[p1,p2,p3] 用法
    //返回的全部Promise对象有一个失败，返回失败。全部成功，返回成功
    return Promise.all(promiseAll)
  },
  //修改所有商品选中的状态
  updateAllCartIsCheck({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    });
    return Promise.all(promiseAll);
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}