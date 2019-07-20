<template>
  <div class='image-container'>
    <!-- 图片按钮 -->
    <div class="image-btn" @click="openDialog">
        <img :src="value || dafaultImage" alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="素材库" name="image">
                <!-- 单选框 -->
                <div style="margin-bottom:10px">
                    <el-radio-group @change="search()" v-model="fromdata.collect" size="small">
                        <el-radio-button :label="false">全部</el-radio-button>
                        <el-radio-button :label="true">收藏</el-radio-button>
                    </el-radio-group>
                </div>
                <!-- 列表图片 -->
                <div class="img-item"  v-for="item in images" :key="item.id" :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)">
                    <img :src="item.url" alt />
                </div>
                <!-- 分页 -->
                <el-pagination
                v-if="total>fromdata.per_page"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="fromdata.per_page"
                :current-page="fromdata.page"
                @current-change='pager'>
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="upload">
                <el-upload
                class="avatar-uploader"
                action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                :show-file-list="false"
                :headers="headers"
                name="image"
                :on-success="handleSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dataImage()">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  data () {
    return {
      // 对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表传参
      fromdata: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片预览地址
      imageUrl: null,
      // 素材李彪数据
      images: [],
      // 总条数
      total: 0,
      // 选中图片的地址
      selectedImageUrl: null,
      // 请求头部信息
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      },
      // 选中的图片
      // value: dafaultImage
      dafaultImage

    }
  },
  props: ['value'],
  methods: {
    // 确认图片按钮
    dataImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.imageUrl) return this.$message.warning('请上传图片')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      // 清楚上一次的数据
      this.selectedImageUrl = null
      this.imageUrl = null
      this.getimages()
    },
    async getimages () {
      const { data: { data } } = await this.axios.get('user/images', { params: this.fromdata })
      this.images = data.results
      this.total = data.total_count
    },
    search () {
      this.fromdata.page = 1
      this.getimages()
    },
    pager (newpage) {
      this.fromdata.page = newpage
      this.getimages()
    }
  }
}
</script>

<style scoped lang='less'>
.image-container{
  display: inline-block;
  margin-right: 20px;
}
.img-item{
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 10px;
    position: relative;
    &.selected{
      &::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
      }
    }
    img{
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
    }
}
.image-btn{
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
