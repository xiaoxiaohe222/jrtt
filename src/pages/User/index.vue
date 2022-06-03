<template>
  <div class="user-container">
    <div class="user-card">
      <!--       头像-->
      <div class="avatar">
        <img :src="userInfo.photo" alt="avatar">
        <div class="info">
          <div class="name">{{ userInfo.name }}</div>
          <van-tag size="medium" plain type="primary">申请认证</van-tag>
        </div>
      </div>
      <!--       头像下面的三个-->
      <div class="counts">
        <div class="count-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="title">动态</span>
        </div>
        <div class="count-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="title">关注</span>
        </div>
        <div class="count-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="title">粉丝</span>
        </div>
      </div>
    </div>
    <!--    下面的每项目-->
    <van-cell-group>
      <van-cell @click="toEditor" icon="edit" title="编辑资料" is-link/>
      <van-cell @click="$router.push('/chat')" icon="chat-o" title="小思同学" is-link/>
      <van-cell icon="info-o" @click="logout" title="退出登录" is-link/>
    </van-cell-group>
  </div>
</template>
<script>
import {reqUserInfo} from "@/api";
import {Dialog} from 'vant';

export default {
  name: 'User',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    toEditor(){ //编辑用户页面
      //sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
      this.$router.push('/userEditor')
    },
    logout() { //退出登录
      Dialog.confirm({
        title: '标题',
        message: '这就走了?不爱我了吗？',
      }).then(
          () => {this.$store.commit('user/LOGOUT')
                 this.$router.replace('/login') },
         ()=>{}
      )


    },
    async getUserInfo() {
      const res = await reqUserInfo()
      this.userInfo = res.data
    }
  },

}
</script>
<style scoped lang="less">
.user-container {
  .user-card {
    padding: 20px 10px 0;
    background-color: #3284f7;

    .avatar {
      height: 80px;
      display: flex;
      align-items: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .info {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        height: 60px;
        margin-left: 10px;

        .name {
          font-size: 16px;
          color: white;
          height: 20px;
          margin-bottom: 3px;
        }

        /deep/ .van-tag {
          text-align: center;
          padding-left: 10px;
        }
      }
    }

    .counts {
      display: flex;
      height: 80px;
      justify-content: center;

      .count-item {
        flex: 1;
        height: 70px;
        line-height: 80px;
        text-align: center;
        color: white;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .count {
          height: 30%;
        }
      }
    }
  }
}
</style>
