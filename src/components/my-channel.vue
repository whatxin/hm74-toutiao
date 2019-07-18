<template>
    <el-select :value='value' @change="fn">
        <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    // 频道数据
    async getChannelOptions () {
      const { data: { data } } = await this.axios.get('channels')
      // 获取数据
      this.options = data.channels
    }
  }
}
</script>

<style lang="less" scoped>

</style>
