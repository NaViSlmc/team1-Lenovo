<template>
  <div id="navStuMenus">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../../images/lenovo.png" alt />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">我的专业</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的课程</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">我的成长</el-menu-item>
            <el-menu-item index="4">我的参与</el-menu-item>
            <el-menu-item index="5">我的考试</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <ul class="loginUser">
            <li>
              <span style="cursor:pointer;color:#A3A3A4; font-size:14px" @click="StuPersonal">student1</span>
              <span class="ask_title">在线提问</span>
              <span style="cursor:pointer;color:#A3A3A4; font-size:14px;margin-left:15px">退出</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "navStudentMenus",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/student/Major");
          break;
        case "2":
          this.$router.push("/student/Class");
          break;
        case "3":
          this.$router.push("/student/GrowUp");
          break;
        case "4":
          this.$router.push("/student/Join");
          break;
        case "5":
          this.$router.push("/student/Exam");
          break;
      };
    },
    StuPersonal () {
      this.$router.push("/student/StuPersonal");
    }
  }
};
</script>

<style lang="">
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
#navStuMenus .el-badge__content.is-fixed {
  top: 11px;
  line-height: 13px;
  padding: 0px 3px;
  height: 13px;
}
</style>