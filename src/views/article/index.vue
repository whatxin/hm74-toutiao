<template>
    <div class="article-container">
        <el-card>

            <div slot="header">
                <my-bread>内容管理</my-bread>
            </div>

            <el-form :model="formdata" size="small" label-width="80px">

                <el-form-item label="状态：">
                    <el-radio-group v-model="formdata.radio">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="频道：">
                  <my-channel v-model="formdata.options_id"></my-channel>
                </el-form-item>

                <el-form-item label="日期：">
                        <el-date-picker
                        value-format='yyyy-MM-dd'
                        @change="changeTime"
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search()">筛选</el-button>
                </el-form-item>
            </el-form>

        </el-card>

        <el-card>
            <div slot="header">
                根据筛选条件共查询到 <b>{{total}}</b> 条结果
            </div>

        <el-table :data="aritcles">
            <el-table-column label="封面">
                <template slot-scope='scope'>
                    <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">
                        <div slot="error">
                            <img src="../../assets/images/error.gif" alt="" width="100px" height="75px">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="状态" >
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
                    <el-tag v-if="scope.row.status === 1">待审核</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                    <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
                    <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" prop="pubdate"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="deit(scope.row.id)" icon="el-icon-edit" type="primary" circle></el-button>
                    <el-button @click="del(scope.row.id)" icon="el-icon-delete" type="danger" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="paging">
            <el-pagination background layout="prev, pager, next" @current-change='paging' :total="total" :current-page="formdata.page" :page-size="formdata.per_page"></el-pagination>
        </div>

        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        // 状态
        radio: null,
        // 频道
        options_id: null,
        // 开始日期
        begin_pubdate: null,
        // 结束日期
        end_pubdate: null,
        // 当前页码
        page: 1,
        // 显示的条数
        per_page: 20
      },
      // 开始和结束日期
      time: [],
      // 文章列表数据
      aritcles: [],
      // 总条数
      total: 0

    }
  },
  created () {
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 选择时间
    changeTime (values) {
      // 开始时间
      this.formdata.begin_pubdate = values[0]
      // 结束时间
      this.formdata.end_pubdate = values[1]
    },
    // 搜索按钮
    search () {
      this.getArticles()
    },
    // 获取列表数据
    async getArticles () {
      // 发送请求
      const { data: { data } } = await this.axios.get('articles', { params: this.formdata })
      // 获取文章数据
      this.aritcles = data.results
      // console.log(data)
      // 获取总条数
      this.total = data.total_count
    },
    // 分页
    paging (newPage) {
      // 获取行的页码
      this.formdata.page = newPage
      // 调用获取文章函数
      this.getArticles()
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文档, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      })
        .catch(() => {})
    },
    // 编辑页面
    deit (id) {
      this.$router.push(`/publish?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-bottom: 30px;
}
.paging{
    text-align: center;
    margin-top: 20px;
}
</style>
