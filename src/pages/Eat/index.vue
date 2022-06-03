<template>
  <div class="eat-container">
<!--    头部-->
    <div class="header">
      我是头部
    </div>
<!--    外卖点击区域-->
    <van-tree-select height="55vw" :items="items" :main-active-index.sync="active">
      <template #content>
<!--        <van-image
            v-if="active === 0"
            src="https://img01.yzcdn.cn/vant/apple-1.jpg"
        />
        <van-image
            v-if="active === 1"
            src="https://img01.yzcdn.cn/vant/apple-2.jpg"
        />-->
      </template>
    </van-tree-select>
  </div>
</template>
<script>
export default {
  name: 'Eat',
  data(){
    return {
      active:0,
      items:[
        { text: '优惠' },
        { text: '折扣' },
        { text: '甜粥' },
        { text: '薄冰' },
        { text: '套餐' },
        { text: '果汁' },
        { text: '小吃' },
        { text: '生食' },
      ]
    }
  }
}
</script>
<style scoped lang="less">
.eat-container{
  .header{
    height: 200px;
    background-color: #ccc;
    color: hotpink;
    font-size: 22px;
    text-align: center;
    line-height: 200px;
  }
}
</style>
