<template>
  <div class="h-content">
    <p class="warningBox">
      建议使用
      <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome</a>

      浏览器
    </p>
    <div class="h-setting">
      <div class="h-tnav">
        <div class="h-logo">
          <div class="h-beij"></div>
          <p>培养能力&nbsp;&nbsp;塑造人才</p>
        </div>
      </div>
      <div class="h-section">
        <div class="h-login">
          <p class="h-numbe">账号登录</p>
          <div class="h-point" id="h-clear">
            <span class="h-prompt h-clear">* 用户名密码错误</span>
          </div>
          <div id="h-form" for="user">
            <div class="h-user">
              <span class="h-colour">
                <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#333333" d="M592.896 589.141333c96.938667-34.816 166.570667-131.072 166.570667-244.053333 0-142.677333-110.933333-258.048-247.466667-258.048-136.533333 0-247.466667 115.712-247.466667 258.048 0 112.981333 69.632 208.896 166.570667 244.053333-162.816 40.96-284.672 202.069333-284.672 383.658667L877.226667 972.8C877.226667 791.210667 755.712 630.101333 592.896 589.141333L592.896 589.141333zM592.896 589.141333"></path>
                </svg>
              </span>
              <input type="text" for="loginname" id="loginname" autocomplete="off" placeholder="邮箱" v-model="uname">
            </div>
            <div class="h-user2">
              <span class="h-colour">
                <svg class="icon" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#333333" d="M592.896 589.141333c96.938667-34.816 166.570667-131.072 166.570667-244.053333 0-142.677333-110.933333-258.048-247.466667-258.048-136.533333 0-247.466667 115.712-247.466667 258.048 0 112.981333 69.632 208.896 166.570667 244.053333-162.816 40.96-284.672 202.069333-284.672 383.658667L877.226667 972.8C877.226667 791.210667 755.712 630.101333 592.896 589.141333L592.896 589.141333zM592.896 589.141333"></path>
                </svg>
              </span>
              <input type="password" for="password" id="password" autocomplete="off" placeholder="密码" v-model="upwd">
            </div>
            <!-- <div class="h-user1">
              <div class="h-test h-clear" id="h-clear1">
                <input class="h-yanz" for="foryanz" autocomplete="off" placeholder="点击图片替换验证码">
                <img
                  src="http://edusys.lenovo.com/lls-web/Luser/code.html"
                  id="codeImage"
                  alt="验证码"
                >
              </div>
            </div>-->
            <button class="h-entry button commonButton" id="h-entry" @click="login">马上登录</button>
          </div>
          <div class="h-retrieve">
            <p class="fl">
              <input type="checkbox" class="h-checkbox" value="on">
              <span class="h-jizhu">记住密码</span>
            </p>
            <p class="fr h-retrieves">
              <!-- react-text: 34 -->
              忘记密码?&nbsp;
              <!-- /react-text -->
              <a href="http://edusys.lenovo.com/lls-web/Luser/reving">立即找回</a>
            </p>
          </div>
        </div>
      </div>
      <div class="h-foot">
        <p class="h-inter">
          <a href="" target="_blank">联系我们</a>
          <a href="./teacherStyle/teacherStyle.html" target="_blank">名师风采</a>
        </p>
        <p>Copyright 2017 联想有限公司(北京) 京ICP备11035381 | 京公网安备110108007970号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      uname: '',
      upwd: ''
    };
  },
  methods: {
    login () {
      this.$http.post('/permit/login', {
        loginName: this.uname,
        password: this.upwd,
        validCode: "123456"
      }).then((response) => {
        // 如果返回success
        // console.log(response)
        if (response.data == 'success') {
          this.$http.get('/permit/user/currentUser').then((response)=>{
            // 将获取到id和username保存到localStorage中
            window.localStorage.setItem('userId',response.data.id);
            window.localStorage.setItem('userName',response.data.userName);
            // 再次请求 根据返回data判断是教师端还是学生端
            this.$http.get('/permit/user/currentUserRoleFlag').then((response)=>{
              if(response.data[0] === 'S'){
                // 跳转学生端页面
                this.$router.push('/student');
              }else {
                // 跳转教师端页面
                this.$router.push('/teacher');
              }
            })
          })
        }else {
          this.$message.error('密码错误')
        }

      }).catch((err) => {
        console.log(err)
        console.log('网络错误')
      })
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", "Hiragino Sans GB",
    tahoma, Arial, sans-serif !important;
}
input {
  outline: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.h-content {
  position: relative;
}
.h-content,
.h-setting {
  min-height: 600px;
  min-width: 960px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
p.warningBox {
  position: absolute;
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  background-color: rgba(150, 164, 224, 0.17);
  color: #eaedf9;
  padding: 0 11px;
  top: 20px;
  left: 20px;
  z-index: 100;
}
p.warningBox a {
  color: #6bd3fe;
}

.h-content .h-setting {
  background: url(../../images/06denglu.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.h-content,
.h-setting {
  min-height: 600px;
  min-width: 960px;
  height: 100%;
  overflow: hidden;
}
.h-tnav {
  width: 100%;
  padding-top: 70px;
}
.h-tnav .h-logo {
  width: 240px;
  margin: 0 auto;
}
.h-tnav .h-logo .h-beij {
  width: 240px;
  height: 70px;
  background: url("../../images/lenovo-learning.png") no-repeat center -42px;
  background-size: 90%;
  margin-top: 10px;
}
.h-tnav .h-logo p {
  font-family: "\5FAE\8F6F\96C5\9ED1", "Hiragino Sans GB";
  color: #ffffff;
  text-align: center;
  margin-top: -32px;
  font-size: 16px;
  opacity: 0.8;
  /* font-weight: 100; */
}
.h-section {
  width: 100%;
  padding-top: 24px;
  overflow: hidden;
}
.h-section .h-login {
  width: 388px;
  height: 320px;
  background-color: #f2f7fa;
  margin: 0 auto;
  padding-top: 31px;
}
.h-section .h-login .h-numbe {
  text-align: center;
  color: #606060;
  font-weight: 500;
  font-size: 17px;
}
.h-section .h-login .h-point {
  width: 100%;
  font-size: 12px;
  color: #e2231b;
  height: 8px;
  line-height: 12px;
  text-indent: 56px;
  padding-top: 24px;
}
.h-clear {
  display: none !important;
}

.h-section .h-login .h-user {
  width: 320px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  border-bottom: 1px solid #e1e6e9;
  overflow: hidden;
}
.h-login .h-user .h-colour {
  color: #acafb1;
}

.h-section .h-login .h-user span {
  color: #919598;
  font-size: 22px;
  margin-top: -8px;
}
.h-section .h-login .h-user input {
  width: 288px;
  border: none;
  height: 27px;
  line-height: 27px;
  background-color: #f2f7fa;
  color: #919598;
  text-indent: 5px;
  margin-top: -7px;
}
.h-section .h-login .h-user2 {
  width: 320px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 10px;
  border-bottom: 1px solid #e1e6e9;
  overflow: hidden;
}
.h-section .h-login .h-user2 .h-colour {
  color: #acafb1;
}
.h-section .h-login input[placeholder] {
  color: #444444;
}

.h-section .h-login .h-user2 span {
  color: #919598;
  font-size: 22px;
  margin-top: -8px;
}
.h-section .h-login .h-user2 input {
  width: 288px;
  border: none;
  height: 30px;
  background-color: #f2f7fa;
  /* background-color: #ff806f; */
  color: #919598;
  /* padding-bottom: 3px; */
  margin-top: -2px;
  /* font-weight: 100; */
  text-indent: 5px;
  margin-top: -10px;
  /* background-color: #f2f7fa; */
}
.h-section .h-login .h-user1 {
  width: 320px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: 10px;
}
.h-section .h-login .h-user1 .h-test {
  /* display: none; */
  width: 100%;
  height: 100%;
  /* border-bottom: 1px solid #e0e5e9; */
}

.h-section .h-login .h-test {
  border-bottom: 1px solid #e1e6e9;
}
.h-section .h-login .h-user1 .h-test input {
  font-size: 12px;
  /* margin-right: 106px; */
  text-indent: 5px;
  /* color: #919598; */
  border: none;
  width: 140px;
  margin-top: -2px;
  letter-spacing: 1px;
  padding-bottom: 0px;
}
.h-section .h-login input[placeholder] {
  color: #444444;
}

.h-section .h-login .h-test input {
  font-size: 14px;
  border: none;
  /* background-color: #f2f7fa; */
  color: #919598;
  padding-bottom: 5px;
  /* font-weight: 100; */
  color: #000;
  background-color: #f2f7fa;
  -webkit-box-shadow: 0 0 0 400px #f2f7fa inset;
}
.h-user1 .h-test .h-yanz {
  float: left;
}
.h-section .h-login .h-user1 img {
  border: none;
}

.h-user1 .h-test img {
  float: right;
}
.h-section .h-login .h-entry {
  width: 320px;
  height: 36px;
  line-height: 30px;
  text-align: center;
  background-color: #49c0e0;
  border-radius: 5px;
  margin: 0 auto;
  display: block;
  margin-top: 16px;
  border: 1px solid #49c0e0;
  color: #feffff;
  letter-spacing: 1px;
  /* font-family: Microsoft YaHei; */
}
.commonButton.button {
  padding: 2px 20px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.commonButton {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  overflow: hidden;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  background: #49c0e0;
  color: #fff;
}

.h-section .h-login .h-retrieve {
  text-indent: 37px;
  font-size: 12px;
  color: #909090;
  line-height: 20px;
}
.h-section .h-login .h-retrieve p {
  display: inline-block;
}

.h-jizhu {
  margin-left: 2px;
  position: relative;
  top: 1px;
}
.h-section .h-login .h-retrieve p {
  display: inline-block;
}
.h-section .h-login .h-retrieves {
  margin-right: 40px;
}

.h-section .h-login .h-retrieve a {
  color: #1380f9;
}

.h-foot {
  height: 72px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.14);
  position: absolute;
  bottom: 10px;
  padding-top: 15px;
}
.h-foot p {
  text-align: center;
  line-height: 1.2;
  color: #9196b3;
  font-size: 12px;
  font-family: "iconfont";
}
.h-foot p a {
  margin: 0 43px;
  color: #bebfd1;
  font-size: 13px;
}
</style>