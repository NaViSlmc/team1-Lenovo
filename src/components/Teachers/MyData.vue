<template>
  <div class="myData">
    <!-- 标题 -->
    <div class="sprotitleBody">
      <div class="sprotitlebackground">
        <span class="sproinnerspan" style="margin-left: 83px;">个人中心</span>
      </div>
    </div>
    <!-- 标签页切换 -->
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-user"></i> 个人信息</span>
        <div class="basic_data" v-if="userData">
          <p class="basic_data_tit">基本资料</p>
          <div class="basic_data_msg">
            <!-- 第一行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  姓名
                </div>
                <div class="left_msg">
                  {{ userData.userName?userData.userName:'--' }}
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  学号
                </div>
                <div class="right_msg">
                  20172205128
                </div>
              </div>
            </div>

            <!-- 第二行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  专业
                </div>
                <div class="left_msg">
                  WEB前端开发
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  班级
                </div>
                <div class="right_msg">
                  1722051联想班
                </div>
              </div>
            </div>
            <!-- 第三行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  学校身份
                </div>
                <div class="left_msg">
                  {{ userData.roles?userData.roles:'--' }}
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  职场身份
                </div>
                <div class="right_msg">
                  --
                </div>
              </div>
            </div>
            <!-- 第四行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  学校
                </div>
                <div class="left_msg">
                  --
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  性别
                </div>
                <div class="right_msg">
                  男
                </div>
              </div>
            </div>
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  民族
                </div>
                <div class="left_msg">
                  {{ userData.sysUserDetail.national?userData.sysUserDetail.national:'--' }}族
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  出生日期
                </div>
                <div class="right_msg">
                  {{ userData.sysUserDetail.brithday?userData.sysUserDetail.brithday:'--' }}
                </div>
              </div>
            </div>
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  身份证号
                </div>
                <div class="left_msg">
                  {{ userData.sysUserDetail.idCard?userData.sysUserDetail.idCard:'--' }}
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  籍贯
                </div>
                <div class="right_msg">
                  {{ userData.sysUserDetail.province?userData.sysUserDetail.province:'--' }}
                </div>
              </div>
            </div>
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  邮箱
                </div>
                <div class="left_msg">
                  {{ userData.email?userData.email:'--' }}
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  家庭电话
                </div>
                <div class="right_msg">
                  --
                </div>
              </div>
            </div>
            <!-- 第八行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat">
                <div class="left_tit">
                  手机
                </div>
                <div class="left_msg">
                  {{ userData.mobile?userData.mobile:'--' }}
                </div>
              </div>
              <div class="item_right clearFloat">
                <div class="right_tit">
                  入学时间
                </div>
                <div class="right_msg">
                  2017/9/15
                </div>
              </div>
            </div>
            <!-- 最后一行 -->
            <div class="basic_data_item clearFloat">
              <div class="item_left clearFloat" style="width: 92.2%;">
                <div class="left_tit" style="width: 14.6%;">
                  家庭住址
                </div>
                <div class="left_msg">
                  {{ userData.sysUserDetail.addressDetail?userData.sysUserDetail.addressDetail:'--' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-setting"></i> 修改密码</span>
        <div class="changePwd">
          <p class="basic_data_tit">修改密码</p>
          <el-steps :active="1" :space="200" align-center>
            <el-step title="修改密码" icon="el-icon-edit"></el-step>
            <el-step title="完成" icon="el-icon-check"></el-step>
          </el-steps>
          <div class="pwd_box">
            <div style="display:flex;margin-top:50px;">
              <div class="pwd_item">请输入原密码：</div>
              <el-input placeholder="请输入原密码" show-password v-model="originPwd" clearable style="width:50%">
              </el-input>
            </div>
            <div style="display:flex;margin-top:20px;">
              <div class="pwd_item">请输入新密码：</div>
              <el-input placeholder="请输入新密码" show-password v-model="newPwd" clearable style="width:50%" @input="inputBlur">
              </el-input>
            </div>
            <div style="display:flex;margin-top:20px;">
              <div class="pwd_item">请再次输入新密码：</div>
              <el-input placeholder="请再次输入新密码：" show-password v-model="newPwd2" clearable style="width:50%" @input="inputBlur">
              </el-input>
            </div>
            <div style="display:flex">
              <div class="pwd_item"></div>
              <el-alert v-show="!isPwdSame" title="两次密码输入不一致" type="error" style="width:50%;padding:5px"></el-alert>
            </div>
            <div style="text-align:center;margin-top:20px">
              <el-button style="width:150px" type="primary" @click="changePwd" :disabled="isPwdDefault||!isPwdSame">确认修改
              </el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'MyData',
  data () {
    return {
      userId: '',
      originPwd: '',
      newPwd: '',
      newPwd2: '',
      isPwdSame: true,
      isPwdDefault:true,
      userData: null
    }
  },
  methods: {
    // 修改密码功能
    changePwd () {
      this.$http.post('/permit/user/modifyPassword',{
        id: this.userId,
        password: this.originPwd,
        newPassword: this.newPwd2
      }).then((res) => {
        if(res.data === ''){
          this.$message({
            message: '密码修改成功',
            type:'success'
          })
        }else {
          this.$message({
            message: res.data.msg,
            type:'warning'
          })
        }
      })
    },
    // 输入框2失去焦点时判断输入密码是否一致
    inputBlur () {
      if(this.newPwd2 === '') {
        return
      }
      this.isPwdSame = this.newPwd===this.newPwd2;
      this.isPwdDefault = false;
    }
  },
  created () {
    this.userId = window.localStorage.getItem('userId');
    this.$http.post(`/permit/user/detail/${this.userId}`).then((response) => {
      this.userData = response.data;
    })
  }
}
</script>
<style>
.pwd_item {
  width: 25%;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  padding-left: 10%;
  font-size: 14px;
  text-align: right;
}
.pwd_box {
  width: 600px;
  margin: 0 auto;
}
.el-step:nth-child(1) {
  position: relative;
  left: 50%;
  margin-left: -200px;
}
.el-step:nth-child(2) {
  position: relative;
  left: 50%;
}
.basic_data,
.changePwd {
  width: 1200px;
  margin: 0 auto;
}
.basic_data_item {
  height: 40px;
  margin-top: 10px;
}
.basic_data_item .item_left,
.basic_data_item .item_right {
  width: 45%;
  margin-left: 20px;
  line-height: 40px;
  text-align: center;
  float: left;
  border: 1px dashed #dedede;
  font-size: 14px;
}
.basic_data_item .item_left .left_tit,
.basic_data_item .item_right .right_tit {
  float: left;
  width: 30%;
  background: #f2f2f2;
  border-right: 1px dashed #dedede;
}
.basic_data_item .item_left .left_msg,
.basic_data_item .item_right .right_msg {
  float: left;
  width: 68%;
}
.basic_data_tit {
  border-left: 4px solid #4abfe0;
  box-sizing: border-box;
  padding-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #606060;
}
.myData .el-tabs__nav {
  margin-left: 210px;
}
.sprotitleBody {
  width: 100%;
  height: 90px;
  position: relative;
  background-position: center;
  background: #6094f7;
  background-image: linear-gradient(45deg, #6094f7 0%, #68beef 100%);
}
.sprotitlebackground {
  background-image: url(../../images/mydata.png);
  background-size: 100%;
  width: 100%;
  margin: auto;
  height: 90px;
  text-align: center;
}
.sprotitlebackground span.sproinnerspan {
  text-align: center;
  display: inline-block;
  font-size: 20px;
  color: white;
  line-height: 90px;
  margin: 0 auto;
}
</style>