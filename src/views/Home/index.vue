<template>
  <div>
    <TypeNav/>
    <list-container />
    <recommend />
    <rank />
    <like />
    <!-- v-for也能在自定义标签中使用，遍历了两个floor组件 -->
    <floor v-for="floor in FloorList" :key="floor.id" :floorlist="floor"/>
    <brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "./Recommend/Recommend.vue";
import Rank from "./Rank/Rank.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand.vue";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  //要用v-for遍历两个floor组件,所以不能在floor组件中发请求
  mounted() {
    //派发action获取floor组件数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      FloorList: (state) => state.home.FloorList,
    }),
  },
};
</script>

<style>
</style>