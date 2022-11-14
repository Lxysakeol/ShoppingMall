<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="entercolor(index)">
                  <a
                    v-show="show"
                    :data-catName="c1.categoryName"
                    :data-cat1id="c1.categoryId"
                  >{{ c1.categoryName }}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a
                          :data-catName="c2.categoryName"
                          :data-cat2id="c2.categoryId"
                        >{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-catName="c3.categoryName"
                            :data-cat3id="c3.categoryId"
                          >{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入，只引入节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true
    };
  },
  //当组件挂载完毕，就可以像服务器发起请求
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    //右侧需要一个函数，当使用这个计算属性时，右侧函数会立即执行一次
    //注入一个参数state,即为大仓库中的state,包含home、search
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    //节流，每过50毫秒执行一次
    entercolor: throttle(function(index) {
      this.currentIndex = index;
    }, 50),
    leaveshow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    entershow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 点击a标签才会进行路由跳转，如何找到a标签呢？
    // 即使确定了a标签，如何区分是一级分类还是二级分类还是三级分类的a标签呢
    //答：把子节点中的a标签加一个自定义标签（catName），其余子节点是没有的
    //节点有一个dataset属性，可以获取到节点的自定义属性与属性值
    goSearch() {
      let element = event.target;
      let { catname, cat1id, cat2id, cat3id } = element.dataset;
      if (catname) {
        let location = { name: "search" };
        let query = { categoryName: catname };
        if (cat1id) {
          query.category1Id = cat1id;
        } else if (cat2id) {
          query.category2Id = cat2id;
        } else {
          query.category3Id = cat3id;
        }
        if (this.$route.params) {
          location.params = this.$route.params;
          // console.log(this.$route.params)
          //动态给location添加quer参数
          location.query = query; //整理完参数
          this.$router.push(location);
        }
      }
    }
  }
};
</script>

<style lang="less">
@import url(./css/TypeNav.css);
</style>