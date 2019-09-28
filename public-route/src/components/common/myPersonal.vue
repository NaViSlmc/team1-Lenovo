<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: "myPersonal",
  data() {
    //当前组件用到的数据
    return {
       activeName: 'second',
      userId: ""
    };
  },
  methods: {
    //当前组件用到的数据
      handleClick(tab) {
        switch (key) {
        case "1":
          this.$router.push("/student/MyMajor");
          break;
        case "3":
          this.$router.push("/student/MyExam");
          break;
        case "4":
          this.$router.push("/student/Stu");
          break;
        case "5":
          this.$router.push("/student/SetCourse");
          break;
        case "6":
          this.$router.push("/student/MyCon")
      };
      }
    
  },
  created() {
    //组件加载完成后的生命周期回调，页面加载就展示以下数据

    // console.log(window.localStorage.getItem("userId"));      
  }
};
</script>

<style lang="">
</style>