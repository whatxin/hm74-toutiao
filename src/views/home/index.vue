<template>
    <el-container class="home-container">
        <el-aside class="aside" width="200px">Aside</el-aside>
        <el-container>
            <el-header class="header">
                <span class="el-icon-s-fold"></span>
                <span class="text">江苏传智播客科技教育有限公司</span>
                <el-dropdown style="float:right">
                    <span class="el-dropdown-link">
                        <img style="vertical-align: middle;" width="30px" height="30px" src="../../assets/images/avatar.jpg" alt="">
                        <b style="vertical-align: middle;padding-left:5px">黑马小哥</b>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon='el-icon-setting'>个人设置</el-dropdown-item>
                        <el-dropdown-item icon='el-icon-unlock'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home-container{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .aside{
      background: #002033;
  }
  .header{
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold{
        font-size: 26px;
        vertical-align: middle;
    }
    .text {
        vertical-align: middle;
        padding-left: 10px;
    }
  }
}
</style>
