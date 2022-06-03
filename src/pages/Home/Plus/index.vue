<template>
  <div>
    <van-button
        style="background-color: #2e7ef6;border: none;font-weight: bold;"
        type="primary" size="large">
      频道管理
      <van-icon @click="$emit('changeShow')" style="position:fixed;top: 20px;right: 8px;" name="cross"/>
    </van-button>
<!--    我的频道-->
    <div class="my-channel">
          <div class="my">
            <span>我的频道</span>
            <span class="del-channel">点击{{showIcon?'删除':'进入'}}频道</span>
          </div>
         <div class="done" @click="showIcon = !showIcon">
           {{showIcon?'完成':'编辑'}}
         </div>
    </div>
    <div class="my-channel-list">
      <div
          v-for="item in channels" :key="item.id"
          class="channel-item">
        {{item.name}}
        <i class="iconfont iconclose1" v-show="showIcon"></i>
      </div>
    </div>
<!--    点击添加更多频道-->
    <h3 class="add-more">点击添加更多频道:</h3>
    <div class="add-channel my-channel-list">
      <div class="channel-item">推荐</div>
      <div class="channel-item">开发者咨询</div>
      <div class="channel-item">c++</div>
      <div class="channel-item">css</div>
      <div class="channel-item">数据库</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Plus',
  props:['channels'],
  data(){
    return {
      showIcon:false
    }
  }
}
</script>
<style scoped lang="less">
.my-channel{
  padding: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .del-channel{
    font-size: 12px;
    color: #868686;
  }
}
.add-more{
  margin: 5px 0;
  font-size: 14px;
}
.my-channel-list{
  display: flex;
  flex-wrap: wrap;
  .channel-item{
    position: relative;
    text-align: center;
    width: 19%;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    margin-left: 5%;
    margin-top: 5px;
    .iconfont{
      position: absolute;
      right: 0;
      top: -11px;
      width: 12px;
      height: 12px;
    }
    /*&::after{
      display: none;
      content: "\e6dc";
      font-family: 'iconfont';
      font-size: 12px;
      position: absolute;
      right: 0;
      width: 12px;
      height: 12px;
      top: -12px;
    }*/
  }
}

</style>
