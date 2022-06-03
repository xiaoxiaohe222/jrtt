<template>
  <div id="app-container">
    <div class="container">
  <keep-alive include="Home">
        <router-view></router-view>
  </keep-alive>
    </div>
    <Footer style="background-color: white;" v-show="$route.meta.showFooter"></Footer>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {

  }
}
</script>

<style lang="less">
.container{
  padding-bottom: 50px;
}
</style>
