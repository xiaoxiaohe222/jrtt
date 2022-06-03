<template>
  <div class="search-container">
    <!--    搜索-->

    <van-row class="search-header">
      <van-col
          @click="$router.back()"
          style="font-size: 18px;
         height: 100%;line-height: 46px;text-align: right" span="2">
        <van-icon name="arrow-left"/>
      </van-col>
      <van-col style="height: 100%" span="22">
        <van-search
            v-focus
            @input="searchHandler"
            @clear="clearHandler"
            shape="round" class='search' v-model="searchValue" placeholder="请输入搜索关键词"/>
      </van-col>
    </van-row>
    <!--      搜索联想列表-->
    <div class="suggest-list">
      <div v-for="item in highList" :key="item" class="suggest-item" v-html="item"></div>
    </div>
    <!--    文字-->
    <van-row style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc">
      <van-col style="font-size: 14px;padding-left: 6px" span="4">搜索历史</van-col>
      <van-col offset="18" span="2">
        <van-icon style="font-size: 14px;font-weight: bold;" name="delete-o"/>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {reqSuggest} from "@/api";
import debounce from "lodash/debounce"

export default {
  name: "Search",
  data() {
    return {
      searchValue: '',
      suggestList: []
    }
  },
  computed: {
    highList() {
      if (this.suggestList.length === 0)return  []
      return this.suggestList.map((item) => {
        return item.split(this.searchValue).join("<span style='color:red;'>" + this.searchValue + "</span>")
      })
    }
  },
  methods: {
    searchHandler: debounce(async function () {
      if (!this.searchValue.trim()) return this.suggestList = []
      const res = await reqSuggest(this.searchValue)
      if (res.message === 'OK') {
        this.suggestList = res.data.options
      }
    }, 400),
    clearHandler() {
      this.suggestList = []
    },
    highFn(originStr, target) { //处理高亮文字
      console.log(originStr);
      let reg = new RegExp(target, "ig")
      return originStr.replace(reg, (match) => {
        return `<span style='color:red;'>${match}</span>`
      })
    }
  },

}
</script>

<style scoped lang="less">
.search-container {
  .search-header {
    width: 100vw;
    display: flex;
    align-items: center;
    height: 46px;
    background-color: #2e7ef6;
    color: white;

    .search {
      height: 100%;
      background-color: #2e7ef6;

      /deep/ .van-search__content {
        width: 100%;
      }
    }
  }

  .suggest-list {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 46px;
    width: 100%;
    background-color: #fff;
    //height: calc(100vh - 46px);

    .suggest-item {
      padding-left: 5px;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
    }

  }
}
</style>
