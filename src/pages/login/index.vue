<template>
  <div class="login-container">
    <van-nav-bar
        title="今日头条-登录"
    />
    <!--  登录表单 @submit="onSubmit"-->
    <van-form ref="loginRef" @submit.native.prevent="onSubmit">
      <van-field
          required
          name="mobile"
          v-model="user.mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '必填项,请填写11位手机号' },
          { pattern, message: '手机号输入不正确' }
          ]"
      />
      <van-field
          required
          v-model="user.code"
          type="password"
          name="code"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写6位验证码' }]"
      />
      <div style="margin: 16px;">
        <van-button
            :disabled="isLoading"
            :loading="isLoading"
            loading-text="登录中..."
            round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import throttle from "lodash/throttle"
import {Toast} from "vant";

export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '13888888888',
        code: '246810' //后台规定死的没有验证码接口就用密码246810
      },
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    }
  },
  computed:{
    ...mapState('user',['isLoading'])
  },
  methods: {
    onSubmit: throttle(async function () {

      try {
        await this.$refs.loginRef.validate()
        this.$store.commit('user/SAVE_LOADING',true)
        // 能进入这里表示全部验证通过可以发送登录请求
        await this.$store.dispatch('user/login_action', this.user)
        this.$store.commit('user/SAVE_LOADING',false)
        Toast.success('登录成功');
        this.$router.replace('/home')

      } catch (e) {
        console.log(e[0].message);

      }
    }, 2000),

  }
}
</script>
<style scoped lang="less">
.login-container {
  //.van-nav-bar{
  //  background-color: #3c8bf2;
  //  /deep/.van-nav-bar__title{
  //    color: white;
  //  }
  //}

}
</style>
