<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3>
        <i class="icon-pc-right"></i>商品已成功加入购物车！
      </h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg" />
          </div>
          <div class="right-info">
            <p class="title">{{skuInfo.skuName}}</p>
            <p
              class="attr"
            >{{skuInfo.skuDesc}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数量:{{$route.query.skuNum}}</p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
          <router-link to="/shopcart">查看商品详情</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCartSuccess",
  computed: {
    skuInfo() {
      return JSON.parse(sessionStorage.getItem("SKUINFO"));
    }
  }
};
</script>

<style lang="less" scoped>
@import url(./css/index.css);
</style>