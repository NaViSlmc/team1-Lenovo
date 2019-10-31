<template>
  <div class="StartTest" v-if="examData && examList">
    <el-container>
      <el-header class="top" style="width:100%">
        <!-- 基本资料 -->
        <div class="top1">
          <!-- 头部左边 -->
          <div class="top1-left">
            <!-- <div class="top1-left-1" v-if="userType=='s'">
              <i class="el-icon-user-solid"></i>
              姓名
            </div>-->
            <div class="top1-left-1">学生姓名：{{userName}}</div>

            <div class="top1-left-2">试卷名称：{{examData.name}}</div>
          </div>

          <!-- 头部右边 -->
          <!-- <div class="top1-right">已完成23/23</div> -->
        </div>
        <!-- 倒计时 -->
        <div class="daojishi">
          <span id="spanTime">{{minutes}} : {{seconds}}</span>
        </div>
        <!-- 提交按钮 -->
        <div class="T-button">
          <el-button type="primary" @click="pushExam" class="e-button">提交</el-button>
          <div class="top3">
            <el-button @click="mygoTopPaper" title="返回上一页">x</el-button>
          </div>
        </div>
        <!-- 返回按钮 -->
      </el-header>
      <el-main>
        <div class="main">
          <div class="danxuan">
            <!-- <span class="h-cubiud"></span> -->
            <p class="basic_data_tit">
              <b>一、</b>
              单选题
            </p>
            <!-- <span class="danxuan1">
              <b>一、</b>
            单选题-->
            <!-- <i>(20分，每题2分)</i> -->
            <!-- </span> -->
          </div>

          <!-- 题 -->
          <div v-for="(item,index) in examList" :key="index">
            <div class="dx_item">
              <div class="dx_l">
                <div class="dx_l_l">
                  <!-- <i class="el-icon-check" style="color:#4ac0e0;font-weight:bold;font-size:20px;"></i> -->
                  <span style="font-weight:bold;">
                    <span style="font-size:20px">{{ examListIndex(index) }}</span>
                    /{{ examListCount(examList.length) }}
                  </span>
                </div>
                <div class="dx_l_r">
                  <div class="r_top">{{ item.stem }}</div>
                  <div class="r_bottom">
                    已选
                    <span class="xuanxiangStyle">{{ item.answer }}</span>
                    选项
                  </div>
                </div>
              </div>
              <div class="dx_r">
                <i>该题分值: {{item.score}}分</i>
              </div>
            </div>
            <div class="ti2">
              <el-row v-for="(itemSel,index) in examSelect(item)" :key="index">
                <el-radio v-model="item.answer" :label="itemSel.label">{{ itemSel.content }}</el-radio>
              </el-row>
            </div>
            <!-- 正确答案 -->
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "StartTest",
  data() {
    return {
      userName: "", // 用户名
      examId: "", // 试卷id
      intervalTime: "", //考试结束时间
      examData: null, // 请求到的试卷属性
      examList: [], // 试卷题目
      timer: 0, // 定时器id
      minutes: "00", // 倒计时分
      seconds: "00" // 倒计时秒
    };
  },
  computed: {
    // 对题目选项进行处理
    examSelect() {
      return obj => {
        // 返回一个arr
        var arr = [];
        ["optionA", "optionB", "optionC", "optionD", "optionE", "optionF"].map(
          item => {
            if (obj[item] !== "string" && obj[item] !== "") {
              arr.push({
                label: item.slice(-1),
                content: obj[item]
              });
            }
          }
        );
        return arr;
      };
    },
    // 总题号
    examListCount() {
      return len => {
        return len < 10 ? `0${len}` : `${len}`;
      };
    },
    // 题目序列号
    examListIndex() {
      return val => {
        return val + 1 < 10 ? `0${val + 1}` : `${val + 1}`;
      };
    }
  },
  methods: {
    // 返回上一页
    mygoTopPaper() {
      this.$router.go(-1);
    },
    // 提交
    pushExam() {
      //提交试卷时按内容处理
      var app = this;
      this.pushExamList = [];
      this.examList.map((item) => {
        this.pushExamList.push({
          answer: item.answer,
          questionId: item.id
        })
      })
      this.$http.post("business/examResult/submit", {
        examResult: {
          planId: this.examId
        },
        List: this.pushExamList
      }).then(function(res) {
        // console.log(res);
        // if(res.data == "") {
        //   this.$message({
        //     type: "success",
        //     message: "提交成功"
        //   })
        // }
        app.$http.get(`/business/examPlan/paperDetailAfterCrrect?id=` + app.examId).then (res => {
          console.log(res);
        })
      });
    },
    // 倒计时
    showTimer() {
      var t1 = (new Date(this.intervalTime) - new Date()) / 1000 / 60 / 60 / 24;
      var t2 = Math.floor(t1); //天
      var x1 = (t1 - t2) * 24;
      var x2 = Math.floor(x1); //小时
      var f1 = (x1 - x2) * 60;
      var f2 = Math.floor(f1); //分
      this.minutes =
        f2 + x2 * 60 < 10
          ? `0${Math.floor(f2 + x2 * 60)}`
          : `${Math.floor(f2 + x2 * 60)}`;
      var m1 = (f1 - f2) * 60;
      this.seconds =
        Math.floor(m1) < 10 ? `0${Math.floor(m1)}` : `${Math.floor(m1)}`; //秒
      // 时间到处理
      if (this.seconds == 0 && this.minutes == 0) {
        window.clearInterval(this.timer);
        // 调用提交试卷方法
      } else if (this.seconds == 0 && this.minutes == 2) {
        this.$message({
          type: "warning",
          message: "考试时间还剩2分，请注意"
        });
      }
    }
  },
  created() {
    // 对试卷id进行缓存
    // 刷新后获取不到route  从本地获取
    var sessionExamId = window.sessionStorage.getItem("examId");
    if (sessionExamId) {
      this.examId = window.sessionStorage.getItem("examId");
      this.intervalTime = window.sessionStorage.getItem("examTime");
    } else {
      window.sessionStorage.setItem("examId", this.$route.params.id);
      window.sessionStorage.setItem("examTime", this.$route.params.time);
      this.intervalTime = this.$route.params.time;
      this.examId = this.$route.params.id;
    }
    // 请求试卷详细内容
    this.$http
      .get(`/business/examPlan/examStart?id=${this.examId}`)
      .then(res => {
        this.examData = res.data.examPage;
        // 对试题进行排序(根据题号)
        function examListSort(val) {
          return (a, b) => {
            return a[val] - b[val];
          };
        }
        this.examList = res.data.list.sort(examListSort("sort"));
        //开启定时器
        this.timer = setInterval(this.showTimer, 1000);
      });
    //获取id
    this.userName = window.localStorage.getItem("userName");
    // 清空examId
    // window.sessionStorage.removeItem('examId');
  },
  beforeRouteLeave(to, form, next) {
    window.clearInterval(this.timer);
    window.sessionStorage.removeItem("examId");
    window.sessionStorage.removeItem("examTime");
    next();
  }
};
</script>

<style>
.StartTest .basic_data_tit {
  border-left: 4px solid #4abfe0;
  box-sizing: border-box;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  color: #606060;
}
.StartTest .el-radio__label {
  display: inline-block;
  white-space: pre-line;
  box-sizing: border-box;
  width: 780px;
}
.StartTest .el-header {
  text-align: left;
  line-height: 32px;
}
.StartTest .xuanxiangStyle {
  color: #4ac1e1;
  text-align: center;
  line-height: 15px;
  margin-bottom: -3px;
  padding-left: 0px;
  width: 73px;
  display: inline-block;
  border-bottom: 1px solid black;
}
.StartTest .ti2 {
  margin-left: 10%;
  margin-top: 10px;
}
.StartTest .ti2 .el-radio {
  margin-top: 10px;
}
.StartTest .ti3 {
  width: 100%;
  color: #4ac1e1;
  background: #ebf9fc;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
}
.StartTest .dx_r i {
  font-style: normal;
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: #ff7245;
}
.StartTest .dx_item {
  top: 10px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
  background: #f5f5f5;
  padding: 5px;
  box-sizing: border-box;
}
.StartTest .dx_r {
  width: 15%;
  height: 100%;
  float: left;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  vertical-align: middle;
  background: #fcd6cb;
}
.StartTest .dx_l {
  overflow: hidden;
  width: 85%;
  float: left;
}
.StartTest .dx_l_r {
  float: left;
  width: 90%;
  box-sizing: border-box;
  line-height: 28px;
}
.StartTest .dx_l_l {
  float: left;
  width: 10%;
}
.StartTest .top {
  background: black;
  height: 80px !important;
}
.StartTest .top1 {
  width: 55%;
  height: 100%;
  margin-left: 50px;
  float: left;
}
.StartTest .top1-left {
  height: 80px;
  width: 100%;
  font-size: 16px;
  float: left;
  color: #989898;
}
.StartTest .top1-left .top1-left-1 {
  width: 50%;
  float: left;
  text-align: center;
  line-height: 80px;
}
.StartTest .top1-left .top1-left-2:only-child {
  /* line-height: 80px; */
  /* vertical-align: middle; */
  position: relative;
  top: 50%;
  margin-top: -16px;
}
.StartTest .top1-left-2 {
  width: 50%;
  float: left;
  line-height: 40px;
}
.StartTest .top1-center {
  height: 100%;
  width: 30%;
  float: left;
  line-height: 80px;
  text-align: center;
  color: #989898;
  margin-left: 100px;
}
.StartTest .top1-right {
  height: 100%;
  width: 29%;
  float: right;
  line-height: 80px;
  text-align: right;
  color: #989898;
  margin-right: 2px;
}
.StartTest .top2 {
  height: 100%;
  width: 10%;
  background: red;
  float: left;
  color: white;
  font-size: 22px;
  line-height: 80px;
  text-align: center;
}
.StartTest .top3 {
  height: 100%;
  width: 10%;
  float: left;
  margin: 0 0 auto;
  line-height: 80px;
  margin-left: 30px;
}
.StartTest .top3 .el-button {
  background: black;
  color: white;
  border: black;
  font-size: 30px;
}
.StartTest .main {
  width: 60%;
  margin-left: 20%;
}
.StartTest .danxuan .h-cubiud {
  width: 4px;
  height: 20px;
  margin: 0 7px -4px 3px;
  padding-top: 8px;
  display: inline-block;
  background-color: #4ac0e0;
}
.StartTest .danxuan .danxuan1 {
  font-size: 16px;
}
.StartTest .danxuan1 i {
  font-size: 10px;
}
.StartTest .daojishi {
  float: left;
  width: 10%;
  height: 100%;
  /* background: red; */
  float: left;
  font-size: 22px;
  line-height: 80px;
  text-align: center;
  overflow: hidden;
}
.StartTest #spanTime {
  width: 50px;
  height: 50px;
  /* background-color:#4ac0e0; */
  color: #4ac0e0;
}
.StartTest .T-button {
  float: left;
  width: 30%;
}
.StartTest .e-button {
  margin-top: 20px;
  float: left;
}
</style>