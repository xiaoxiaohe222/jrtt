<template>
  <div>
    <div v-show="!isShowPlusPage" class="home-container clearfix">
      <!--    头部-->
      <div class="home-header">
        <img src="../../assets/images/logo.png" alt="logo">
        <i @click="$router.push('/search')" class="iconfont iconsousuo1"></i>
      </div>
      <!--    导航bar-->
      <van-tabs sticky :offset-top="'50px'" @change="changeChannel" animated v-model="active">
        <template #nav-left>
          <i @click="plus" style="position: fixed;left: 360px;
        top: 62px;z-index: 1;
        width: 20px;
        height: 20px;
        background-color:#fff;" class="iconfont iconjiahao"></i>
        </template>
        <van-tab
            :name="channel.id"
            :key="channel.id"
            v-for="channel in channels"
            :title="channel.name"

        >
          <!--    内容区域-->
          <div class="main">
            <ArticleList :channel_id="channel_id"/>
          </div>
        </van-tab>

      </van-tabs>

      <!--   面板-->
      <van-action-sheet
          v-model="show"
          :actions="actions"
          :cancel-text="cancelText"
          close-on-click-action
          @select="onSelect"
          @cancel="onCancel"
          @click-overlay="clickMask"
      />
    </div>
    <!--    点击+号出现的页-->
    <div v-show="isShowPlusPage" class="plus-page">
      <Plus
          :channels="channels"
          @changeShow="isShowPlusPage=false"/>
    </div>
  </div>

</template>
<script>
import {reqUseChannels, reqDislikeArticle, reqReportArticle} from "@/api";
import ArticleList from './ArticleList';
import Plus from './Plus';
import {Notify} from 'vant';

export default {
  name: 'Home',
  components: {ArticleList, Plus},
  data() {
    return {
      isShowPlusPage: false,//是否显示+号页面
      channels: [],
      active: 0,
      channel_id: '',
      show: false,
      cancelText: '取消',
      actions: [
        {name: '不感兴趣'},
        {name: '反馈垃圾内容'},
      ],
      art_id: ''
    }
  },
  mounted() {
    this.$BUS.$on('closeBtn', (articleItem) => { //item里面点击X号的回调监听
      this.show = true
      //console.log('点击X号传递过来的item：',articleItem);
      this.art_id = articleItem.art_id;

    })
    this.getUserChannels()
  },
  watch: {
    channels(newV) {
      this.channel_id = newV[0].id
    }
  },
  methods: {
    //点击导航右边的+号
    plus() {
      this.isShowPlusPage = true
    },
    clickMask() {
      this.actions = [
        {name: '不感兴趣'},
        {name: '反馈垃圾内容'},
      ]
    },
    //点击取消或者返回的按钮
    onCancel() {
      if (this.cancelText === '返回') {
        this.cancelText = '取消'
        this.show = true
        this.actions = [
          {name: '不感兴趣'},
          {name: '反馈垃圾内容'},
        ]
      }
    },
    async onSelect(item) { //当弹出框选择点击每个select-item时
      if (item.name === "不感兴趣") {
        await reqDislikeArticle(this.art_id)
        Notify({type: 'success', message: '反馈成功'});
      } else if (item.name === "反馈垃圾内容") {
        this.show = true
        this.cancelText = '返回'
        this.actions = [
          {id: 0, name: '其他问题'},
          {id: 1, name: '标题夸张'},
          {id: 2, name: '低俗色情'},
          {id: 3, name: '错别字多'},
          {id: 4, name: '就问重复'},
          {id: 5, name: '内容不实'},
          {id: 6, name: '侵权'},
          {id: 7, name: '广告软文'},
          {id: 8, name: '涉嫌违法犯罪'},
        ]
      } else {
        await reqReportArticle(this.art_id, item.id)
        this.actions = [
          {name: '不感兴趣'},
          {name: '反馈垃圾内容'},
        ]
        Notify({type: 'success', message: '举报成功'});
      }
    },

    changeChannel(channel_id) { //当tab改变时
      this.channel_id = channel_id

    },

    async getUserChannels() { //获取用户频道列表
      const res = await reqUseChannels()
      // console.log(res);
      if (res.message === 'OK') {
        this.channels = res.data.channels
      }
    }
  },
  computed: {
    res() {
      let arr1 = [
        {id: 0, name: '推荐'},
        {id: 1, name: 'html'},
        {id: 2, name: '开发者咨询'},
        {id: 4, name: 'c++'},
        {id: 6, name: 'css'},
        {id: 7, name: '数据库'},
        {id: 8, name: '区块链'},
        {id: 9, name: 'go'},
        {id: 10, name: '产品'},
        {id: 11, name: '后端'},
        {id: 12, name: 'linux'},
        {id: 15, name: 'javascript'},
      ]
      let arr2 = [
        {id: 0, name: '推荐'},
        {id: 1, name: 'html'},
        {id: 2, name: '开发者咨询'},
        {id: 4, name: 'c++'},
        {id: 6, name: 'css'},
        {id: 7, name: '数据库'},
        {id: 8, name: '区块链'},
        {id: 9, name: 'go'},
        {id: 10, name: '产品'},
        {id: 11, name: '后端'},
        {id: 12, name: 'linux'},
        {id: 13, name: '人工智能'},
        {id: 15, name: 'javascript'},
        {id: 16, name: '架构'},
        {id: 17, name: '前端'},
        {id: 18, name: 'python'},
        {id: 19, name: 'java'},
        {id: 20, name: '算法'},
        {id: 21, name: '面试'},
        {id: 22, name: '科技动态'},
        {id: 23, name: 'js'},
        {id: 24, name: '设计'},
        {id: 25, name: '数码产品'},
        {id: 26, name: '软件测试'},
      ]
      console.log(arr2.length - arr1.length);
      return arr2.filter((item2 => !arr1.some(item1 => item1.name === item2.name)))


    }
  },
  beforeRouteLeave(from,to,next){
    sessionStorage.setItem('dis',document.documentElement.scrollTop)
    //console.log(11,document.documentElement.scrollTop);
    next()
  },
  deactivated() {
   // console.log(document.documentElement.scrollTop);
  },
  activated() {

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
