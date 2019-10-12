<template>
  <div id="navMenus">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../images/lenovo.png" alt="">
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="MyMajorStudent">我的专业</el-menu-item>
            <el-submenu index="MyClass">
              <template slot="title">我的课程</template>
              <el-menu-item index="MyClass">选项1</el-menu-item>
              <el-menu-item index="MyClass">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="MyGrow">我的成长</el-menu-item>
            <el-menu-item index="MyJoin">我的参与</el-menu-item>
            <el-menu-item index="MyExam">我的考试</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <ul class="loginUser">
            <li><span style="cursor:pointer;color:#A3A3A4;font-size:14px" @click="toggUserData">
                {{ userName }}
              </span>
              <span class="ask_title">
                在线提问
              </span>
              <span style="cursor:pointer;color:#A3A3A4;font-size:14px;margin-left:15px" @click="userOut">退出</span>
            </li>
          </ul>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'navMenus',
  data () {
    return {
      activeIndex: 'MyMajorStudent',
      userName: '' // 用户名
    }
  },
  methods: {
    // 用户详情页跳转
    toggUserData () {
      if ('/student/MyDataStudent' !== this.$router.history.current.fullPath) {
        this.activeIndex = '';
        this.$router.push('/student/MyDataStudent');
      }
    },
    // 标签页切换
    handleSelect (key) {
      this.activeIndex = key;
      // 当前要跳转的path不能等于当前path，否则会路由报错
      if (`/student/${key}` !== this.$router.history.current.fullPath) {
        this.$router.push(`/student/${key}`);
      }
    },
    // 用户退出
    userOut () {
      try {
        this.$http.get('/permit/logout').then((response) => {
          if (response.data === '') {
            this.$message({
              message: `${this.userName} 退出成功`,
              type: 'success'
            });
            // 清空localStorage
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userName');
            this.$router.push('/');
          } else if (response.data.code === 403) {
            this.$message({
              message: '超时未操作,请重新登录',
              type: 'warning'
            });
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('userName');
            this.$router.push('/');
          } else {
            this.$message.error('退出失败')
          }
        })
      } catch (err) {
        this.$message.error('请检查您的网络')
      }
    }
  },
  created () {
    this.userName = window.localStorage.getItem('userName'); // 从本地仓库拿到用户名
  }
}
</script>
<style>
a {
  color: #6c6868;
  font-size: 12px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  padding-left: 0 !important;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.grid-content img {
  height: 46px;
  display: block;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.loginUser {
  overflow: hidden;
}
.loginUser li {
  float: left;
  margin-left: 20px;
}
.logoutSvg {
  opacity: 0.1;
}
.ask_title {
  background: #49c0e0;
  font-size: 14px;
  color: white;
  padding: 15px 5px;
}
.ask_title:hover {
  cursor: pointer;
}
#navMenus .el-badge__content.is-fixed {
  top: 11px;
  line-height: 13px;
  padding: 0px 3px;
  height: 13px;
}
</style>