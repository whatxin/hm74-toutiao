<template>
  <div class='publish-container'>
    <el-card>
        <div slot="header">
            <my-bread>{{articleID?'编辑':'发布'}}文章</my-bread>
        </div>
        <el-form :model="articleform" label-width="100px">
            <el-form-item label="标题：">
                <el-input v-model="articleform.title" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="内容：">
                <quill-editor v-model="articleform.content" :options='editorOption'></quill-editor>
            </el-form-item>
            <el-form-item label="封面：">
                <el-radio-group v-model="articleform.cover.type" @change="changetype()">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <div v-if="articleform.cover.type === 1">
                  <my-image v-model="articleform.cover.images[0]"></my-image>
                </div>
                <div v-if="articleform.cover.type === 3">
                  <my-image v-model="articleform.cover.images[0]"></my-image>
                  <my-image v-model="articleform.cover.images[1]"></my-image>
                  <my-image v-model="articleform.cover.images[2]"></my-image>
                </div>

            </el-form-item>
            <el-form-item label="频道：">
                <my-channel v-model="articleform.channel_id"></my-channel>
            </el-form-item>
            <el-form-item v-if="!articleID">
                <el-button type="primary" @click="publish(false)">发表</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button type="primary" @click="edit(false)">修改</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 富文本选项
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }]
          ]
        }
      },
      // 提交给后代的数据
      articleform: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 修改文章ID
      articleID: null
    }
  },
  methods: {
    // 获取文章数据
    async getarticle () {
      const { data: { data } } = await this.axios.get('articles/' + this.articleID)
      this.articleform = data
    },
    changetype () {
      // 重新选择图片类型
      this.articleform.cover.images = []
    },
    // 发表和存入草稿
    async publish (draft) {
      await this.axios.post(`articles?draft=${draft}`, this.articleform)
      this.$message.success(!draft ? '发表成功' : '存入草稿成功')
      this.$router.push('/article')
    },
    // 修改和存入草稿
    async edit (draft) {
      await this.axios.put(`articles/${this.articleID}?draft=${draft}`, this.articleform)
      this.$message.success(!draft ? '修改成功' : '修改草稿成功')
      this.$router.push('/article')
    }
  },
  created () {
    this.articleID = this.$route.query.id
    if (this.articleID) {
      this.getarticle()
    }
  },
  watch: {
    $route () {
      this.articleID = null
      this.articleform = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
