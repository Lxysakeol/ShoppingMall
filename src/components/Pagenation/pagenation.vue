<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.startPage > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.startPage > 2">···</button>
    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum.endPage"
      :key="index"
      v-show="page >= startNumAndEndNum.startPage"
      @click="$emit('getPageNo', page)"
      :class="{ active: page == pageNo }"
    >
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-if="startNumAndEndNum.endPage < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.endPage < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>
    <span style="margin-left: 30px">共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: "Pagenation",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页码的起始和结束数字
    startNumAndEndNum() {
      const { pageNo, totalPage, continues } = this;
      let startPage = 0,
        endPage = 0;
      //总页数少于连续页码数
      if (continues > totalPage) {
        startPage = 1;
        endPage = totalPage;
      } else {
        startPage = pageNo - parseInt(continues / 2);
        endPage = pageNo + parseInt(continues / 2);
        if (startPage < 1) {
          startPage = 1;
          endPage = continues;
        }
        if (endPage > totalPage) {
          endPage = totalPage;
          startPage = totalPage - continues + 1;
        }
      }
      return { startPage, endPage };
    },
  },
};
</script>

<style lang="less" scoped>
@import url(./css/pagenation.css);
</style>