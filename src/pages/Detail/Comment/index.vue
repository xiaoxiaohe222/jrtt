<template>
  <div>
<!--  未点击评论的状态-->
    <div v-if="showBig" class="comment-container">
    <van-icon class="arr-l" name="arrow-left" />
    <input @focus="showBig = false" type="text" placeholder="发表评论">
    <div class="icons">
      <van-icon name="comment-o" @click="$emit('getHeight')"/>
      <van-icon name="star-o" />
      <van-icon name="share-o" />
    </div>
  </div>
<!--        点击评论之后显示的内容状态-->
    <van-row v-else class="comment">
      <van-col span="20">
        <van-field
            @blur="showBig = true"
            class="message"
            v-model="message"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="友善评论理性发言"
        />
      </van-col>
      <van-col span="4" style="text-align: center">发布</van-col>
    </van-row>
    <textarea ></textarea>
  </div>
</template>
<script>
  export default {
    name:'Comment',
    data(){
      return {
        showBig:true,
        message:''
      }
    }

  }
</script>
<style scoped lang="less" >
.comment-container{
  background-color: #fff;
  padding: 0 5px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  .arr-l{
    font-size: 18px;
  }
  input{
    padding-left: 10px;
    width: 60%;
    height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #f8f8f8;
    margin: 0 10px;
    &::-webkit-input-placeholder{
      color:black;
    }
  }
  .icons{
    flex: 1;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
.comment{
  height: 70px;
  line-height: 70px;
  background-color: pink;
  .message{
    background-color: #f8f8f8;
    height: 70%;
  }
}
</style>
