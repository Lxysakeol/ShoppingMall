<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./img/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="./img/today01.png" />
        </li>
        <li class="banner">
          <img src="./img/today02.png" />
        </li>
        <li class="banner">
          <img src="./img/today03.png" />
        </li>
        <li class="banner">
          <img src="./img/today04.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style lang="less">
@import url(./css/Recommend.css);
</style>