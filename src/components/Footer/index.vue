<template>
  <div class="footer">
    <router-link to="/home" class="footer-item">
      <i class="iconfont icon1"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/user" class="footer-item">
      <i class="iconfont iconprofile"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style scoped lang="less">
.footer{
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  .footer-item{
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color:#000;

  }
  .router-link-active{
    color: #3c8bf2;
  }
}
</style>
