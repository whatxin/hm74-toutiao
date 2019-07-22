<template>
    <el-container class="home-container">
        <el-aside class="aside" :width="togg?'64px':'200px'">
            <div class="logo" :class="{xlogo:togg}"></div>
        <el-menu
        style="border-right:none"
        router
            :default-active="$route.path"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse='togg'
            :collapse-transition='false'
            >
            <el-menu-item index="/">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/article">
                <i class="el-icon-document"></i>
                <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/image">
                <i class="el-icon-picture"></i>
                <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/publish">
                <i class="el-icon-s-promotion"></i>
                <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="el-icon-chat-dot-round"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
                <i class="el-icon-present"></i>
                <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/setting">
                <i class="el-icon-setting"></i>
                <span slot="title">个人设置</span>
            </el-menu-item>
        </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">
                <span class="el-icon-s-fold" @click="toggleMenu()"></span>
                <span class="text">江苏传智播客科技教育有限公司</span>
                <el-dropdown style="float:right">
                    <span class="el-dropdown-link">
                        <img style="vertical-align: middle;" width="30px" height="30px" :src="avatar" alt="">
                        <b style="vertical-align: middle;padding-left:5px">{{ name }}</b>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon='el-icon-setting' @click.native='setting()'>个人设置</el-dropdown-item>
                        <el-dropdown-item icon='el-icon-unlock' @click.native="logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <!-- 二级路由显示 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      togg: false,
      avatar: '',
      name: ''
    }
  },

  methods: {
    toggleMenu () {
      this.togg = !this.togg
    },
    setting () {
      this.$router.push('/setting')
    },

    logout () {
      window.sessionStorage.removeItem('hm-toutiao')
      this.$router.push('/login')
    }
  },

  created () {
    const user = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
    // console.log(user)
    if (user) {
      this.avatar = user.photo
      this.name = user.name
      eventBus.$on('upName', (name) => {
        this.name = name
      })
      eventBus.$on('uplphoto', (url) => {
        this.avatar = url
      })
    }
  }

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
      .logo{
          width: 100%;
          height: 60px;
          background: #024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
      }
      .xlogo{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto;
      }
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
