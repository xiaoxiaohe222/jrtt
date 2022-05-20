<template>
  <div class="list-container">
    <van-cell-group>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            offset="50"
        >
          <ArticleItem
              v-for="article in articleList"
              :key="article.art_id"
              :articleItem="article"
          />
        </van-list>
      </van-pull-refresh>
    </van-cell-group>
  </div>
</template>

<script>
import ArticleItem from '../ArticleItem'
import {reqArticleList} from "@/api";
import dayjs from "dayjs";
import { Toast } from 'vant';
export default {
  name: "ArticleList",
  components: {ArticleItem},
  data() {
    return {
      articleList: [],
      pre_timestamp: '',
      loading: false,//上啦加载
      finished: false,
      isLoading: false,//下啦刷新
    }
  },
  props: {
    channel_id: {
      type: Number,
      required: true
    }
  },
  watch: {
    articleList() {
      this.$nextTick(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.getArticleList()

  },
  methods: {
    async onRefresh() {
      await this.getArticleList()
      Toast('刷新成功');
      this.isLoading = false
    },
    async onLoad() {
      const res = await reqArticleList({channel_id: this.channel_id, timestamp: this.pre_timestamp})

      this.pre_timestamp = res.data.pre_timestamp
      this.articleList = [...this.articleList, ...res.data.results]
      this.loading = false

      if (res.data.pre_timestamp === null) {
        this.finished = true //表示没有下一页数据了 此时我们不再进行上啦加载的动作一切方法都停止了
      }
    },
    async getArticleList(timestamp = Date.now()) {
      const res = await reqArticleList({channel_id: this.channel_id, timestamp})
      //console.log(res.data.results);
      if (res.message === 'OK') {
        this.articleList = res.data.results.map((item) => {
          item.time = dayjs(item.pubdate).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
        this.pre_timestamp = res.data.pre_timestamp
      }
    },
  }


}
</script>

<style scoped lang="less">

</style>
