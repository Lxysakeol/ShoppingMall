<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkinfo="trademarkinfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a @click="changeOrder('1')"
                    >综合
                    <span v-show="isOne && isAsc">↑</span>
                    <span v-show="isOne && !isAsc">↓</span>
                  </a>
                </li>
                <li :class="{ active: isTwo }">
                  <a @click="changeOrder('2')"
                    >价格
                    <span v-show="isTwo && isAsc">↑</span>
                    <span v-show="isTwo && !isAsc">↓</span>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>

          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <Pagenation
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continues="5"
            :total="total"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        category3Id: "",
        //分类名字
        categoryName: "",
        //搜索框关键字
        keyword: "",
        //排序
        order: "1:desc",
        // 分页器参数
        pageNo: 1,
        // 每一页展示的个数
        pageSize: 5,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  //当组件挂载完毕之前执行一次
  beforeMount() {
    // console.log(this.$route)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getDate();
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    //拿到仓库中的total
    ...mapState({
      total: (state) => state.search.SearchList.total,
    }),
  },

  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getDate() {
      this.$store.dispatch("getSearchListInfo", this.searchParams);
    },
    //删除分类名字
    removeCategoryName() {
      //把带给服务器的参数置空了，但还要再发一次请求
      this.searchParams.categoryName = undefined; //设置成undefined发送请求不会将这些参数带过去，提升性能，但设置成空也会传
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getDate();
      //路由地址也要改变
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除关键字面包屑
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getDate();
      //通知兄弟组件hearder删除关键字
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //自定义事件回调
    trademarkinfo(trademarkList) {
      this.searchParams.trademark = `${trademarkList.tmId}:${trademarkList.tmName}`;
      this.getDate();
    },
    //删除品牌面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getDate();
    },
    //收集平台属性的回调函数
    // ["属性ID:属性值:属性名"]
    attrInfo(attr, attrValue) {
      let props2 = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props2) == -1) {
        this.searchParams.props.push(props2);
      }

      this.getDate();
    },
    //删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getDate();
    },
    //排序操作
    changeOrder(flag) {
      console.log(flag);
      //获取最初的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      //准备一个新的order
      let newOrder = "";
      //点击的是综合
      if (originFlag == flag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getDate();
    },
    //
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getDate();
    },
  },
  watch: {
    $route(newValue, oldValue) {
      //每一次都要清id
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getDate();
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // this.searchParams.keyword = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
@import url(./css/index.css);
</style>