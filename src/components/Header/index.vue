<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有登陆 -->
          <p v-if="!this.$store.state.user.userInfo.name">
            <span>请</span>
            <router-link to="/login">登陆</router-link>
            <router-link to="/register" class="register">注册</router-link>
          </p>
          <!-- 用户登陆 -->
          <p v-else>
            <a href>{{this.$store.state.user.userInfo.name}}</a>
            <a href class="register" @click="logout">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    //跳转到search路由
    goSearch() {
      //路由传参
      //1.字符创形式传参
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      //2.模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //3.对象,常用
      if (this.$route.query) {
        let location = {
          name: "search",
          params: {
            keyword: this.keyword || undefined
          }
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    //退出登陆
    async logout() {
      try {
        //如果退出成功，回到首页
        await this.$store.dispatch("userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted() {
    //全局总线清楚关键字
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
   
  }
};
</script>

<style scoped lang="less">
@import url(./css/index.css);
</style>