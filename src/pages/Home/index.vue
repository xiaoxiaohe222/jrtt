<template>
  <div class="home-container clearfix">
    <!--    头部-->
    <div class="home-header">
      <img src="../../assets/images/logo.png" alt="logo">
      <i class="iconfont iconsousuo1"></i>
    </div>
    <!--    导航bar-->
    <van-tabs  sticky :offset-top="'50px'" @change="changeChannel" animated v-model="active">
      <van-tab
          :name="channel.id"
          :key="channel.id"
          v-for="channel in channels"
          :title="channel.name"
      >
        <!--    内容区域-->
        <div class="main"  >
          <ArticleList   :channel_id="channel_id"/>
        </div>
      </van-tab>

    </van-tabs>

<!--   面板-->
    <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
    />
  </div>
</template>
<script>
import {reqUseChannels,} from "@/api";
import ArticleList from './ArticleList'

export default {
  name: 'Home',
  components: {ArticleList},
  data() {
    return {
      channels: [],
      active: 0,
      channel_id: '',
      show: false,
      actions: [
        { name: '不感兴趣' },
        { name: '反馈垃圾内容' },

      ],
    }
  },
  mounted() {
    this.$BUS.$on('closeBtn',()=>{
      this.show=true
    })
    this.getUserChannels()
  },
  watch: {
    channels(newV) {
      this.channel_id = newV[0].id

    }
  },
  methods: {
    handlerClientHeight(data){
      //console.log(data);
      this.clientHeight =data
    },

    changeChannel(channel_id) { //当tab改变时
      this.channel_id = channel_id

    },

    async getUserChannels() { //获取用户频道列表
      const res = await reqUseChannels()
      if (res.message === 'OK') {
        this.channels = res.data.channels
      }
    }
  }
}
</script>
<style scoped lang="less">
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

.clearfix:after {
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.home-container {
  padding-top: 50px;

  .home-header {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #2e7ef6;
    color: white;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 100px;
      height: 30px;
    }
  }

  .van-tab__pane {
    background-color: pink;
  }

}
</style>
<style>
.van-tabs {
  position: relative;
  left: 0;
  top: 0;
}

.van-tabs__line {
  background-color: #3c8bf2;
}
</style>
