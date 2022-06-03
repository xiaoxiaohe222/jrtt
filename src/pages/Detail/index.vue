<template>
  <div>
    <van-nav-bar
        title="文章详情"
    >
      <template #left>
        <van-icon @click="$router.back()" name="arrow-left" size="20" color="#fff"/>
      </template>
    </van-nav-bar>
    <div class="detail-content">
      <h3>{{detailObj.aut_name}}</h3>
<!--      头像区域-->
      <div class="personal-resume">
        <div class="avatar">
          <img :src="detailObj.aut_photo" alt="">
          <div class="date">
            <div class="count">{{detailObj.comm_count}}</div>
            <div class="today">{{detailObj.pubdate}}</div>
          </div>
        </div>
        <div class="focus">
           <div class="btn">
            {{detailObj.is_followed ? '已关注' :'关注'}}
           </div>
        </div>
      </div>
<!--   分割线-->
      <van-divider />
<!--      内容区-->
      <div class="content" ref="content" v-html="detailObj.content">
      </div>
<!--      分割线-->
      <van-divider>end</van-divider>
<!--      评论组件-->
      <Comment @getHeight="getHeight"></Comment>
    </div>
  </div>
</template>

<script>
import  {reqArticleDetail} from "@/api";
import Comment from './Comment'
export default {
  name: "Detail",
  components:{Comment},
  data(){
    return {
     detailObj:{}
    }
  },
  mounted() {

  },
  created() {
    this.getList()
  },
  methods:{
    getHeight(){
      this.$nextTick(()=>{
        console.log(this.$refs.content.clientHeight);
       // window.scrollY(this.$refs.content.clientHeight)
        window.scrollTo(0,this.$refs.content.clientHeight)
      })
    },
    async getList(){
      const res = await reqArticleDetail(this.$route.params.id)
       this.detailObj = res.data
    }
  }
}
</script>

<style scoped lang="less">
.detail-content{
  padding: 20px;
  h3{
    font-size: 14px;
    font-weight: bold;
  }
  .personal-resume{
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .avatar{
      flex: 4;
      display: flex;
      align-items: center;
      img{
        margin-right: 7px;
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
      .date{
        .count{
          font-size: 14px;
          height: 20px;
        }
        .today{
          color: #cecece;
        }
      }
    }
    .focus{
      flex: 1;
      height: 30px;
      color: white;
      padding: 2px;
      text-align: center;
      .btn{
        height: 100%;
        line-height: 28px;
        width: 70%;
        background-color: #2e7ef6;

      }
    }
  }
}
</style>
<style>

</style>
