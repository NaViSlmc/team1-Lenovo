<template>
  <div style="height: 556px">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="基本资料" name="first" style="text-align: center">
       <h1>基本资料</h1>
        <table style="margin: 0 auto; border: 1px solid #ccc">
          <tr>
            <td>邮箱</td>
            <td>{{ obj.email }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{{ obj.id }}</td>
          </tr>
          <tr>
            <td>手机号</td>
            <td>{{ obj.mobile }}</td>
          </tr>
          <tr>
            <td>学校身份</td>
            <td>{{ obj.roles }}</td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "StuPersonal",
  data() {
    //当前组件用到的数据
    return {
      activeName: "first",
      userId: "",
      obj:{}
    };
  },
  methods: {
    //当前组件用到的数据
    handleClick(tab) {
      var app = this;
      this.$http.post("/permit/user/detail/" + app.userId).then(function (res) {
        console.log(res.data);
        app.obj = res.data;
      })
    }
  },
  created() {
    //组件加载完成后的生命周期回调，页面加载就展示以下数据

    // console.log(window.localStorage.getItem("userId"));
    this.userId = window.localStorage.getItem("userId");

  }
};
</script>

<style lang="">
tr td{
    border: 1px solid #ccc;
    padding: 20px;
  }
</style>