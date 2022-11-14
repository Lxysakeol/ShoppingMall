<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 在登陆注册中不显示footer,在其他也面中显示footer 配置路由元信息，在路由中添加meta-->
    <Footer v-show="$route.meta.show"></Footer>
    
  </div>
  
</template>

<script>

import Header from './components/Header/index'
import Footer from './components/Footer/index'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //通知vuex发请求，获取数据，存放在仓库中
    this.$store.dispatch("categoryList");
   
  }
}
</script>

<style>

</style>
