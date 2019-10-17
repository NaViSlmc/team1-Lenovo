<template>
  <div class="SeeExam" v-if="examData&&examList">
    <el-container>
      <el-header class="top" style="width:100%">
        <!-- 基本资料 -->
        <div class="top1">
          <!-- 头部左边 -->
          <div class="top1-left">
            <div class="top1-left-1" v-if="userType=='s'">
              <i class="el-icon-user-solid"></i>
              姓名
            </div>
            <div class="top1-left-2">试卷名称：{{examData.name}}</div>
          </div>
          <!-- 头部中间 -->
          <div class="top1-center" v-if="userType=='t'">创建时间：{{examData.createTime}}</div>
          <!-- 头部右边 -->
          <!-- <div class="top1-right">已完成23/23</div> -->
        </div>
        <!-- 分数 -->
        <div class="top2">
          <b>总分:{{ examPaperTotalScore }}</b>
        </div>
        <!-- 退出 -->
        <div class="top3">
          <el-button @click="goTopPaper">x</el-button>
        </div>
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
              单选题 -->
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
                    <span style="font-size:20px">{{ examListIndex(index) }}</span>/{{ examListCount(examList.length) }}
                  </span>
                </div>
                <div class="dx_l_r">
                  <div class="r_top">{{ item.stem }}</div>
                  <div class="r_bottom" v-if="userType=='s'">已选
                    <span class='xuanxiangStyle'>A</span>
                    选项</div>
                </div>
              </div>
              <div class="dx_r">
                <i v-if="userType=='t'">该题分值: {{item.score}}分</i>
                <i v-else>得分 : 加2分</i>
              </div>
            </div>
            <div class="ti2">
              <el-row v-for="(itemSel,index) in examSelect(item)" :key="index">
                <el-radio :value="item.answer" :label="itemSel.label">{{ itemSel.content }}</el-radio>
              </el-row>

            </div>
            <!-- 正确答案 -->
            <div class="ti3">
              <span class="ti3-1">
                正确答案：
                <span>{{ item.answer }}</span>
              </span>
            </div>
          </div>

        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "SeeExam",
  data () {
    return {
      userType: this.$route.query.userType, // 当前的用户类型 s为学生 t为教师
      examData: null, // 请求到的试卷属性
      examList: [], // 试卷题目
    };
  },
  computed: {
    // 该试卷总分计算
    examPaperTotalScore() {
      var num = 0;
      this.examList.map((item) => {
        num += item.score;
      })
      return num
    },
    // 对题目选项进行处理
    examSelect () {
      return (obj) => {
        // 返回一个arr
        var arr = [];
        ['optionA', 'optionB', 'optionC', 'optionD', 'optionE', 'optionF'].map((item) => {
          if (obj[item] !== 'string' && obj[item] !== '') {
            arr.push({
              label: item.slice(-1),
              content: obj[item]
            })
          }
        });
        return arr
      }
    },
    // 总题号
    examListCount () {
      return (len) => {
        return len < 10 ? `0${len}` : `${len}`
      }
    },
    // 试卷序列号
    examListIndex () {
      return (val) => {
        return val + 1 < 10 ? `0${val + 1}` : `${val + 1}`;
      }
    }
  },
  methods: {
    // 返回上一页
    goTopPaper () {
      this.$router.go(-1);
    }
  },
  created () {
    // 请求试卷详细内容
    this.$http.post(`/business/examQuestionMark/pageDetail?id=${this.$route.params.id}`).then((res) => {
      this.examData = res.data.examPage;
      // 对试题进行排序(根据题号)
      function examListSort (val) {
        return (a,b)=> {
          return a[val] - b[val]
        }
      }
      this.examList = res.data.list.sort(examListSort('sort'));
    })
  }
};
</script>
<style>
.basic_data_tit {
  border-left: 4px solid #4abfe0;
  box-sizing: border-box;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  color: #606060;
}
.el-radio__label {
  display:inline-block;
  white-space: pre-line;
  box-sizing:border-box;
  width: 780px;
}
.SeeExam .el-header {
  text-align: left;
  line-height: 32px;
}
.xuanxiangStyle {
  color: #4ac1e1;
  text-align: center;
  line-height: 15px;
  margin-bottom: -3px;
  padding-left: 0px;
  width: 73px;
  display: inline-block;
  border-bottom: 1px solid black;
}
.ti2 {
  margin-left: 10%;
  margin-top: 10px;
}
.ti2 .el-radio {
  margin-top: 10px;
}
.ti3 {
  width: 100%;
  color: #4ac1e1;
  background: #ebf9fc;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
}
.SeeExam .dx_r i {
  font-style: normal;
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: #ff7245;
}
.SeeExam .dx_item {
  top: 10px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
  background: #f5f5f5;
  padding: 5px;
  box-sizing: border-box;
}
.SeeExam .dx_r {
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
.SeeExam .dx_l {
  overflow: hidden;
  width: 85%;
  float: left;
}
.SeeExam .dx_l_r {
  float: left;
  width: 90%;
  box-sizing: border-box;
  line-height: 28px;
}
.SeeExam .dx_l_l {
  float: left;
  width: 10%;
}
.SeeExam .top {
  background: black;
  height: 80px !important;
}
.SeeExam .top1 {
  width: 55%;
  height: 100%;
  margin-left: 250px;
  float: left;
}
.SeeExam .top1-left {
  height: 80px;
  width: 35%;
  font-size: 16px;
  float: left;
  color: #989898;
}
.SeeExam .top1-left .top1-left-1 {
  margin-top: 10px;
}
.SeeExam .top1-left .top1-left-2:only-child {
  /* line-height: 80px; */
  /* vertical-align: middle; */
  position: relative;
  top:50%;
  margin-top: -16px;
}
.SeeExam .top1-center {
  height: 100%;
  width: 30%;
  float: left;
  line-height: 80px;
  text-align: center;
  color: #989898;
}
.SeeExam .top1-right {
  height: 100%;
  width: 29%;
  float: right;
  line-height: 80px;
  text-align: right;
  color: #989898;
  margin-right: 2px;
}

.SeeExam .top2 {
  height: 100%;
  width: 10%;
  background: red;
  float: left;
  color: white;
  font-size: 22px;
  line-height: 80px;
  text-align: center;
}
.SeeExam .top3 {
  height: 100%;
  width: 10%;
  float: left;
  margin: 0 0 auto;
  line-height: 80px;
}
.SeeExam .top3 .el-button {
  background: black;
  color: white;
  border: black;
  font-size: 30px;
}
.SeeExam .main {
  width: 60%;
  margin-left: 20%;
}
.SeeExam .danxuan .h-cubiud {
  width: 4px;
  height: 20px;
  margin: 0 7px -4px 3px;
  padding-top: 8px;
  display: inline-block;
  background-color: #4ac0e0;
}
.SeeExam .danxuan .danxuan1 {
  font-size: 16px;
}
.SeeExam .danxuan1 i {
  font-size: 10px;
}
</style>