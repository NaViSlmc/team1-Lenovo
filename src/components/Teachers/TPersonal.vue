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
      <el-tab-pane label="修改密码" name="second">
        <h1>修改密码</h1>
        <el-form ref="form" :model="formLabelAlign" label-width="380px">
          <el-form-item label="原始密码">
            <el-input v-model="formLabelAlign.name" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="formLabelAlign.type" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="formLabelAlign.type" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  @click="re">修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "TPersonal",
  data() {
    //当前组件用到的数据
    return {
      activeName: "second",
      userId: "",
      obj: {},
      id: "",
      password: "",
      newPassword: "",
      formLabelAlign: {
        name: "",
        type: ""
      }
    };
  },
  methods: {
    //当前组件用到的数据
    handleClick(tab) {
      console.log(tab.index);
      if (tab.index == "0") {
        var app = this;
        this.$http
          .post("/permit/user/detail/" + app.userId)
          .then(function(res) {
            // console.log(app.userId)
            // console.log(res.data);
            app.obj = res.data;
            console.log(app.obj);
          });
      } else {
        var app = this;
        this.$http
          .post("/permit/user/modifyPassword", {
            id: app.id, //用户的id，在localstorage中有
            password: app.formLabelAlign.name, //用户的旧密码
            newPassword: app.formLabelAlign.type //用户的新密码
          })
          .then(function(res) {
            console.log(res);
          });
      }
    },
    re() {
      this.$http.post("/permit/user/modifyPassword", {
          id: this.userId, //用户的id，在localstorage中有
          password: this.formLabelAlign.name, //用户的旧密码
          newPassword: this.formLabelAlign.type //用户的新密码
        }).then(function(res) {
          console.log(res.data)
        });
    }
  },
  created() {
    //组件加载完成后的生命周期回调，页面加载就展示以下数据

    // console.log(window.localStorage.getItem("userId"));
    this.userId = window.localStorage.getItem("userId");
    // console.log(this.userId);
  }
};
</script>

<style lang="">
tr td {
  border: 1px solid #ccc;
  padding: 20px;
}
</style>