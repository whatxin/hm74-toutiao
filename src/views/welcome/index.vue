<template>
    <div class="welcome-container">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  created () {
    this.axios.get('/articles').then(res => { console.log(res) })
  }
}
</script>

<style lang="less" scoped>
.welcome-container{
    text-align: center;
}
</style>
