<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="logo in trademarkList"
            :key="logo.tmId"
            @click="tradeMarkHandler(logo)"
          >
            {{ logo.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            <a @click="attrInfo(attr, attrValue)">{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchSelector",
  computed: {
    ...mapGetters(["trademarkList", "attrsList"]),
  },
  methods: {
    tradeMarkHandler(trademarkList) {
      this.$emit("trademarkinfo", trademarkList);
      // console.log('子组件',trademarkList)
    },
    attrInfo(attr, attrValue) {
      this.$emit("attrInfo", attr, attrValue);
      console.log("子组件", attrValue);
    },
  },
};
</script>

<style lang="less" scoped>
@import url(./css/SearchSelector.css);
</style>