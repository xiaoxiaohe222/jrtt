<template>
  <div id="app-container">
    <div class="container">
      <router-view></router-view>
    </div>
    <Footer style="background-color: white;" v-show="$route.meta.showFooter"></Footer>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
.container{
  padding-bottom: 50px;
}
</style>
