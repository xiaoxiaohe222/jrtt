<template>
  <div class="editor-container">
    <van-nav-bar title="编辑资料">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()"/>
      </template>
    </van-nav-bar>
    <!--    每个栏目-->
    <van-cell-group>
      <van-cell class="cell1" title="头像" is-link>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <!--          <img :src="userInfo.photo" alt="" style="width: 50px;height: 50px;border-radius: 50%">-->
          <van-uploader :after-read="afterRead">
            <img :src="userInfo.photo" alt="" style="width: 50px;height: 50px;border-radius: 50%">
          </van-uploader>
          <van-icon name="arrow" class="search-icon"/>
        </template>
      </van-cell>
      <van-cell @click="editName" title="名称" is-link :value="userInfo.name"/>
      <van-cell @click="showBirth=true" title="生日" is-link :value="userInfo.birthday"/>
    </van-cell-group>

    <!--    修改姓名的弹出框-->
    <van-dialog @cancel="cancelEditName" @confirm="confirmEditName" v-model="show" title="标题" show-cancel-button>
      <input v-focus type="text"
             style="border: none;width: 100%;height:70px; text-align: center"
             v-model="userName"/>
    </van-dialog>

<!--    修改生日的底部遮罩层-->
    <van-action-sheet class="birth"  v-model="showBirth"  :closeable="false">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"

      />
    </van-action-sheet>
  </div>
</template>
<script>
import {reqProfile, reqEditPhoto,reqEditProfile1} from "@/api";
export default {
  name: 'UserEditor',
  data() {
    return {
      userInfo: {},
      imgName: '',
      show: false,
      userName:'',
      showBirth:false, //是否展示生日弹出框
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    }
  },
  mounted() {
    this.getProfile()

  },
  methods: {

    cancelEditName(){
      this.userName = this.userInfo.name
    },
   async confirmEditName(){//姓名的编辑确认按钮
    await reqEditProfile1({name:this.userName})
    this.userInfo.name = this.userName
    },
    editName() {//修改姓名
      this.show = true
    },
    async afterRead(data) {
      console.log(data.file);
      if (this.imgName === data.file.name) return
      this.imgName = data.file.name
      const res = await reqEditPhoto(data.file)
      console.log(res);
      this.userInfo.photo = res.data.photo
    },
    async getProfile() {
      const res = await reqProfile()
      this.userInfo = res.data
      this.userName = res.data.name
    }
  }
}
</script>
<style scoped lang="less">

</style>
<style lang="less">
.van-icon-arrow-left {
  color: white;
  font-size: 18px;
}

.cell1 {
  line-height: 70px;
}

.cell1 img {
  margin-top: 10px;
}

.cell1 .search-icon {
  line-height: 70px;
}

</style>
