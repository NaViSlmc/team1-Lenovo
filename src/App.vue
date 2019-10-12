<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#myStuMajor .el-collapse-item .el-collapse-item__header {
  background: skyblue;
  padding-left: 50px;
  color: white;
  font-size: 23px;
}

#myStuMajor a {
  color: #6c6868;
  font-size: 16px;
}

#myStuMajor a:hover {
  color: skyblue;
}

#myStuMajor .el-main {
  text-align: left;
  /*line-height: 30px;*/
}
#myStuMajor .el-collapse {
  width: 1100px;
  margin: auto;
}
#myStuMajor .el-collapse-item__content {
  padding-left: 50px;
  padding-top: 20px;
}
#myStuMajor .mahorTitle {
  width: 100%;
  height: 144px;
  background: #89db96;
}

#masterSetting .el-dialog {
  margin-top: 0 !important;
}
#editor {
  width: 100% !important;
  height: 200px !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
  min-width: 1280px;
  height: 100%;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* 消息中心-阅读详情 */
.shortDesc p {
  margin-left: 3px;
  width: 350px;
  height: 100px;
  background: #f6f6f6;
  border-radius: 4px;
}
.shortDesc .timeShow div span:first-child {
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
  margin-right: 5px;
  width: 90px;
  text-align: right;
}

/*  消息中心-阅读 */
.shortDesc .readShow div span {
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
  text-align: right;
}
.shortDesc div span:last-child {
  margin-right: 0px;
}
.shortDesc .readP p {
  width: auto;
  text-indent: 2em;
  margin-top: 10px;
}

#myNews .el-badge__content {
  left: -15px;
  top: 5px;
}

#onStulineAsk .el-badge__content,
#onlineAnswer .el-badge__content {
  background: #409eff;
}

#masterSetting .el-dialog__header,
.el-dialog__header {
  border-bottom: 1px solid #f2f2f2;
}
#masterSetting .el-dialog__footer {
  border: 1px solid #f2f2f2;
}

#masterSetting .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#masterSetting .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#masterSetting .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 140px;
  line-height: 140px;
  text-align: center;
}
#masterSetting .avatar {
  width: 140px;
  height: 140px;
  display: block;
}

#myGrowup .el-table td,
#myGrowup .el-table th {
  padding: 0;
}
#myGrowup .el-card__body {
  padding: 0 20px;
}
#myGrowup .el-timeline-item__timestamp {
  font-size: 16px;
  font-weight: 700;
}
#myGrowup .el-timeline-item__timestamp.is-top {
  padding-top: 2px;
}

#students .el-dialog__header {
  border: 1px solid #f2f2f2;
}
</style>
