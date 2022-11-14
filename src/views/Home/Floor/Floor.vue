<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floorlist.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(navlist,index) in floorlist.navList" :key="index">
              <a href="#tab1" data-toggle="tab">{{navlist.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floorlist.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floorlist.imgUrl" />
            </div>
            <div class="floorBanner">
              <div class="swiper-container" ref="cur">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="carousel in floorlist.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floorlist.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floorlist.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min.js";

export default {
  name: "Floor",
  props: ["floorlist"],
  //这个可以直接放在mounted中，因为请求数据是在index.html中，组件早就已经挂载好数据了
  mounted(){
    let mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // autoplay: {//自动播放
            //   delay: 2000,
            //   disableOnInteraction: false,
            // },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
  }
};
</script>

<style lang="less">
@import url(./css/Floor.css);
</style>