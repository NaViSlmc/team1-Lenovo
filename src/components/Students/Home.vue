<template>
  <div id="thome">
    <el-container>

      <!--头部-->
      <el-header>
        <nav-studentMenus></nav-studentMenus>
      </el-header>

      <!--中间部分-->
      <el-main>
        <router-view />
      </el-main>

      <!-- 尾部-->
      <el-footer>
        <copyRight></copyRight>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import navStudentMenus from "../common/navStudentMenus";
import copyRight from "../common/copyRight";

export default {
  name: "shome",
  data () {
    return {
      
    }
  },
  components: {
    navStudentMenus,
    copyRight
  }
}
</script>

<style lang="">
a {
  text-decoration: none;
}

.el-header,
.el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: center;
  padding: 0;
}

.el-header {
  width: 1100px;
  margin: auto;
  line-height: 45px;
  height: 46px !important;
  padding-left: 10px !important;
}

#thome ul.el-menu-demo > li {
  height: 45px !important;
  line-height: 45px !important;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 45px !important;
  line-height: 45px !important;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  padding: 0;
  color: #333;
  /*text-align: center;
      line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
