import {
    reqGetGoodsInfo,
    reqAddOrUpdateShopCart
} from '@/api/index.js'
//封装游客身份模块uuid-->生成一串随机字符串（不能改变）  利用到了uuid插件
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    //游客零时身份
    uuid_token:getUUID(),
};


const mutations = {
    GETGOODSINFO(state, goodinfo) {
        state.goodInfo = goodinfo
    }
};


const actions = {
    //获取产品信息
    async getGoodsInfo({
        commit
    }, skuid) {
        let results = await reqGetGoodsInfo(skuid)
        if (results.code == 200) {
            commit('GETGOODSINFO', results.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        //加入购物车返回的结果
        //加入购物车后（发请求），前台将参数带给服务器，服务器写入数据成功，并没有返回其他数据
        //只是返回code=200,代表这次操作成功了，不用进行三连环操作
        let results = await reqAddOrUpdateShopCart(skuId, skuNum);
        console.log(results)
        if (results.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

};

//简化数据
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}