<template>
  <div class="container" >
    <van-tree-select
        :items="items"
        :main-active-index.sync="active"
    >
      <template #content>
        <ul class="list">
          <li v-if="active === 0">1</li>
          <li v-if="active === 1">2</li>
          <li v-if="active === 2">3</li>
          <li v-if="active === 3">4</li>
          <li v-if="active === 4">5</li>
          <li v-if="active === 5">6</li>
          <li v-if="active === 6">7</li>
          <li v-if="active === 7">8</li>

        </ul>
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
  name: 'Test',
  data() {
    return {
      items: [{ text: '小吃' }, { text: '火锅' },{ text: '小吃1' }, { text: '火锅1' },
        { text: '小吃2' }, { text: '火锅2' },{ text: '小吃3' }, { text: '火锅3' }
      ],
      active: 0,
    };
  },
  methods:{
    onChang(){

    }
  }
}
</script>
<style  lang="less">
.van-sidebar-item{
  text-align: center;
}
.list li{
  height: 200px;
  background-color: #bfa;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
}
</style>
