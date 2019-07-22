<template>
  <div class='setting-container'>
      <el-card>
        <div slot="header">
            <my-bread>个人设置</my-bread>
        </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            :http-request="myphoto"
            :show-file-list="false"
            action=""
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px;">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token

      },
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      }
    }
  },
  created () {
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    // 用户头像
    myphoto (data) {
      const formDate = new FormData()
      formDate.append('photo', data.file)
      this.axios.patch('user/photo', formDate).then(res => {
        const url = res.data.data.photo
        this.$message.success('修改头像成功')
        this.userForm.photo = url
        eventBus.$emit('uplphoto', url)
        const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
        userInfo.photo = url
        window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
      })
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.axios.get('user/profile')
      this.userForm = data
    },
    // 修改用户信息
    async updateUserInfo () {
      const { data: { data } } = await this.axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      eventBus.$emit('upName', data.name)
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
      userInfo.name = data.name
      window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
    }
  }
}
</script>

<style scoped lang='less'>
.setting-container .avatar-uploader {
  display: block;
  text-align: center;
}

</style>
