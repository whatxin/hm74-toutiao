<template>
    <div class="image-container" v-loading='loading'>
        <el-card>
          <div slot="header">
            <my-bread>素材管理</my-bread>
          </div>
            <div style="margin-bottom:20px">
                <el-radio-group @change="search()" v-model="fromdata.collect" size="small">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button @click="dialogVisible = true" type="success" size="small" style="float:right">添加素材</el-button>
            </div>
            <ul class="img-list">
                <li v-for="item in images" :key="item.id">
                    <img :src="item.url" alt="">
                    <div class="annui" v-if="!fromdata.collect">
                        <span @click="toggleFaw(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                        <span class="el-icon-delete" @click="del(item.id)"></span>
                    </div>
                </li>
            </ul>
            <el-pagination v-if="total>fromdata.per_page" background layout="prev, pager, next" :total="total" :page-size="fromdata.per_page" :current-page="fromdata.page" @current-change='pager'></el-pagination>
        </el-card>
        <!-- 对话框 -->
        <el-dialog
          title="添加素材"
          :visible.sync="dialogVisible"
          width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleSuccess"
            name="image">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      fromdata: {
        // 是否收藏
        collect: false,
        // 请求的页数
        page: 1,
        // 每页数量
        per_page: 10
      },
      // 请求来的图片数据
      images: [],
      // 加载数据
      loading: false,
      // 总条数
      total: 0,
      // 上传素材按钮
      dialogVisible: false,
      // 上传图片路劲
      imageUrl: null,
      // 请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 删除图片
    del (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
    // 收藏按钮
    async toggleFaw (item) {
      const { data: { data } } = await this.axios.put('user/images/' + item.id, { collect: !item.is_collected }
      )
      this.$message.success('造作成功')
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setInterval(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 2000)
    },
    // 分页
    pager (newPage) {
      this.fromdata.page = newPage
      this.getImages()
    },
    search () {
      this.fromdata.page = 1
      this.getImages()
    },
    async getImages () {
      // 执行加载
      this.loading = true
      const { data: { data } } = await this.axios.get('user/images', { params: this.fromdata })
      this.images = data.results
      // 总条数
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.img-list{
    overflow: hidden;
    margin: 0;
    padding: 0;
 li{
    width: 200px;
    height: 200px;
    list-style: none;
    float: left;
    border: 1px dashed #ddd;
    margin-right: 120px;
    margin-bottom: 40px;
    position: relative;
     img{
         width: 100%;
         height: 100%;
         display: block;
        }
        .annui{
         position: absolute;
         left: 0;
         bottom: 0;
         width: 100%;
         height: 30px;
         line-height: 30px;
         text-align: center;
         background: rgba(0, 0, 0, 0.5);
            span{
             margin: 0 20px;
             color: #ffffff;
             &.red{
               color: red;
             }
            }
        }
    }
}
</style>
