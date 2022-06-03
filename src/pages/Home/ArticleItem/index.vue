<template>

    <van-cell >
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
       <div class="box1">
<!--         一张图-->
         <div class="title-box" style="display: flex">
           <p style="flex: 3">{{articleItem.title}}</p>
           <img v-if="articleItem.cover.type === 1" style="flex: 1;width: 100%;height: 70px"
                :src="articleItem.cover.images[0]" alt="">
         </div>
<!--         三张图-->
         <div v-if="articleItem.cover.type === 3" class="imgs" style="display: flex;">
           <img style="flex: 1;width: 100%;height: 60px;"
                :class="{on:index===1}"
                v-for="(item,index) in articleItem.cover.images"
                :key="index"
                :src="item" alt="">
         </div>
       </div>
      </template>
<!--      label区域-->
      <template #label>
        <div class="label-box" style="display: flex;justify-content: space-between;padding-right: 20px">
          <div>
            <span>{{articleItem.aut_name}}</span>
            <span style="margin: 0 10px;">{{articleItem.comm_count}}评论</span>
            <span>{{articleItem.time}}</span>
          </div>
<!--          关闭按钮-->
          <i class="iconfont iconclose1" @click="$BUS.$emit('closeBtn',articleItem)"></i>
        </div>
      </template>
    </van-cell>

</template>

<script>

export default {
  name: "ArticleItem",
  props: ['articleItem',],
  data() {
    return {

    }
  },
  methods:{

  }

}
</script>

<style scoped  lang="less">
/*.title-box{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.label-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-box span{
  margin: 0 3px;
  &:first-child{
    margin-left: 0;
  }
}*/

</style>
<style>
.box1{
  width: 100vw;
}
.van-cell{
  width: 100vw;
  padding-right: 25px;
}
.van-cell__label{
  margin-top: 10px;
  padding-right: 10px;
}
.imgs .on{
  margin: 0 10px;
}
</style>
