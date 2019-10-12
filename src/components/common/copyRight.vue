<template>
  <div id="copyRight" class="footer">
    <div class="z-footerWrap">
      <div class="z-footer1">
        <span class="z-uplogo">
          <img src="../../images/logo.png">
        </span>
        <span>|</span>
        &nbsp;
        培养能力 塑造人才
      </div>
      <div class="z-footer2">
        <a href="#">联系我们</a>
        <a>意见反馈</a>
        <a href="#">名师风采</a>
      </div>
      <div class="z-jp">
        Copyright 2017 联想（北京）有限公司 京ICP备11035381 | 京公网安备110108007970号
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'copyRight',
  data () {
    return {

    }
  }
}
</script>
<style>
.footer {
  width: 100%;
  background: url(../../images/ditu.jpg) no-repeat;
  background-size: 100%;
  padding-top: 30px;
  margin-top: 30px;
  bottom: 0;
}

.z-footerWrap {
  width: 600px;
  margin: 0 auto;
}

.z-footer1 {
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: #afb0b2;
  margin-bottom: 8px;
  font-size: 16px;
}

.z-footer1 span {
  color: #6c7177;
  font-weight: 100;
  margin-left: 10px;
}

.z-footer2 {
  width: 100%;
  height: 25px;
  text-align: center;
  margin-top: 10px;
}

.z-footer2 a {
  display: block;
  font-size: 14px;
  width: 120px;
  text-align: center;
  color: #afb0b2;
  float: left;
}

.z-footer2 a:nth-of-type(1) {
  margin-left: 130px;
}

.z-footer2 a:hover {
  color: #fff;
}

.z-footer2 span:hover {
  color: #fff;
}

.z-jp {
  height: 30px;
  width: 600px;
  line-height: 30px;
  color: #6f7376;
  text-align: center;
  font-size: 12px;
}

.z-upLogo span {
  display: inline-block;
}
</style>