<template>
    <el-header class="my-header">
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" src="../../assets/images/avatar.jpg" alt="">
            <b style="vertical-align:middle;padding-left:5px">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
</template>

<script>
export default {

}
</script>

<style>

</style>
