<template>
  <div class="chat-container"
       style="background-color:#eee;min-height: 100vh;

       padding:46px 0 44px 0 "
  >
    <!--    头部-->
    <van-nav-bar class="chat-header" title="小思同学">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()"/>
      </template>
    </van-nav-bar>
    <!--    聊天主题区域-->
    <div class="chat-list">
      <div v-for="(item,index) in list" :key="index">
        <!--      机器人说的话-->
        <div v-if="item.name !== 'me'" class="chat-item left">
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
          <div class="content">{{ item.msg }}</div>
        </div>
        <!--      我说的话-->
        <div v-else class="chat-item right">
          <div class="content">{{ item.msg }}</div>
          <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
        </div>
      </div>
    </div>


    <!--    底部输入文字发送区域-->
    <van-field @keyup.native.enter="sendFn" v-model="word" placeholder="说点什么....">
      <template #button>
        <span style="color: #635f5f" @click="sendFn">提交</span>
      </template>
    </van-field>
  </div>
</template>
<script>
import { io } from 'socket.io-client'

export default {
  name: 'Chat',
  data() {
    return {
      socket: null, //websocket对象
      word: '',
      list: [
        {name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},{name: 'xs', msg: 'hi 你好！我是小思'},
        {name: 'me', msg: '22'},

      ]
    }
  },
  methods:{
    sendFn () {
      // 判断内容是否为空
      if (!this.word) return

      // 添加聊天消息到 list 列表中
      this.list.push({
        name: 'me',
        msg: this.word
      })

      // 把消息发送给 websocket 服务器
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()
      })

      // 清空文本框的内容
      this.word = ''
    }
  },
  created() {
// 创建客户端 websocket 的实例
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: localStorage.getItem('token')
      },
      transports: ['websocket']
    })

    // 建立连接的事件
    this.socket.on('connect', () => {
      console.log('与服务器建立了连接')
    })

    // 接收到消息的事件
    this.socket.on('message', data => {
      // 把服务器发送过来的消息，存储到 list 数组中
      this.list.push({
        name: 'xs',
        msg: data.msg
      })
      this.$nextTick(()=>{
        let Div = document.querySelector(".chat-list>div:last-child");
        Div.scrollIntoView({

        })
      })

    })


  },
  // 组件被销毁之前，清空 sock 对象
  beforeDestroy() {
    // 关闭连接
    this.socket.close()

    // 销毁 websocket 实例对象
    this.socket = null
  },
}
</script>
<style scoped lang="less">
.chat-list {
  padding: 0 15px;

  .chat-item {
    padding: 20px 0;
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .content {
      padding: 10px 15px;
      margin: 0 20px;
      position: relative;
      background-color: #e3effa;
      font-size: 14px;

      &::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 50%;
        margin-top: -5px;
        transform: rotate(-45deg);
        z-index: -1;
        width: 10px;
        height: 10px;
        background-color: #e3effa;
      }
    }
  }

  .chat-item.right {
    justify-content: flex-end;

    .content {
      &::before {
        // background-color: red;
        left: auto;
        right: -5px;
      }
    }

  }
}


</style>

<style>
.chat-header{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.van-nav-bar .van-icon {
  color: white;
  font-size: 18px;
}

.van-field {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
