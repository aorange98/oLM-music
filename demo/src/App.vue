<template>
<div id="app">
  <!-- search路由组件 -->
  <router-view name="search" />
  <!-- 歌单路由组件 -->
  <transition name="playlist" mode="out-in">
    <router-view name="playdetail" />
    <router-view name="rankingplaydetail" />
  </transition>

  <!-- 顶部导航栏 -->
  <nav-bar />

  <!-- <keep-alive> -->
    <!-- 导航栏目匹配到的路由组件 -->
    <router-view name="home" />
    <router-view name="find" />
  <!-- </keep-alive> -->


  <!-- 播放器 -->
  <a-player />
</div>
</template>

<script>
import APlayer from "./components/APlayer/APlayer.vue";
import NavBar from "./components/NavBar/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar,
    APlayer
  },
};
</script>

<style lang="less" scoped>
.playlist-enter-active {
  transform: translateY(100%);
  transition: all 0.8s ease;
}

.playlist-enter-to {
  transform: translateY(0px);

}
.playlist-leave-active {
  transform: translateX(0px);
  transition: all 0.8s ease;
}

.playlist-leave-to {
  transform: translateX(100%);

}

</style>