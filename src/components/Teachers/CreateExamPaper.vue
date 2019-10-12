<template>
  <div class="CreateExamPaper">
    <div class="HeadMasterTitle_box" style="background-color: rgb(238, 82, 108); background-image: linear-gradient(45deg, rgb(238, 82, 108) 0%, rgb(238, 82, 108) 1%, rgb(243, 106, 128) 100%);">
      <div class="HeadMasterTitle_wrap">
        <div class="HeadMasterTitle_msg" style="margin-left: 110px;"><span style="margin-top: 40px;">创建试卷</span>
          <p>在测验中分析 在测验中总结 在测验中成长</p>
        </div>
        <div class="HeadMasterTitle_bg3"></div>
      </div>
    </div>
    <div class="basic_data">
      <p class="basic_data_tit">创建试卷</p>
      <!-- 第一行 -->
      <el-row>
        <el-col :span="2">试卷名称</el-col>
        <el-col :span="4">
          <el-input v-model="examPaperTit" placeholder="请输入试卷名称"></el-input>
        </el-col>
        <el-col :span="4" :offset="14" style="text-align:right">
          <el-button @click="pushExamPaper" type="primary">保存试卷</el-button>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <el-col :span="2">试卷类型</el-col>
        <el-col :span="4">
          <el-select v-model="optionsDefault" placeholder="请选择">
            <el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row>
        <el-col :span="3">
          <el-tag>选择题目的类型：</el-tag>
        </el-col>
        <el-col :span="1">
          <el-radio v-model="radioType" label="1">单选</el-radio>
        </el-col>
        <el-col :span="1" :offset="2">
          <el-tag type="success">分值</el-tag>
        </el-col>
        <el-col :span="1">
          <el-input-number size="mini" style="height:32px" :min="1" controls-position="right" v-model="minute"></el-input-number>
        </el-col>
        <el-col :span="2" :offset="4">
          <el-tag>是否为面试题</el-tag>
        </el-col>
        <el-col :span="1">
          <el-radio v-model="isInterview" label="1">是</el-radio>
        </el-col>
        <el-col :span="1">
          <el-radio v-model="isInterview" label="2">否</el-radio>
        </el-col>
        <el-col :span="4" :offset="4" style="text-align:right">
          <el-button type="success" @click="pushProblem">下一题</el-button>
        </el-col>
      </el-row>
      <!-- 文本域 -->
      <el-row>
        <el-col>
          <el-input :autosize="{minRows:3}" type="textarea" clearable placeholder="请输入题目" v-model="titContent"></el-input>
        </el-col>
      </el-row>
      <!-- 选择题内容输入区 -->
      <el-row v-for="(item,index) in radioList" :key="index">
        <el-col :span="2">
          <el-radio v-model="radioCorrect" :label="item.tit">
            <el-tag type="primary" effect="plain">{{item.tit}}</el-tag>
          </el-radio>
        </el-col>
        <el-col :span="20">
          <el-input v-model="item.cont" :placeholder="'请输入'+item.tit+'选项的内容'"></el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CreateExamPaper',
  data () {
    return {
      optionsList: [ // 选择框数据
        { label: '大前端', value: '1' },
        { label: '移动互联', value: '2' },
        { label: '软件开发', value: '3' },
      ],
      radioList: [ // 单选框数据
        { tit: 'A', cont: '' },
        { tit: 'B', cont: '' },
        { tit: 'C', cont: '' },
        { tit: 'D', cont: '' }
      ],
      examPaperTit: '', // 试卷名称
      radioCorrect: '', // 正确答案
      titContent: '', // 题目内容
      minute: '1', // 题目分值
      optionsDefault: '1', // 选择框默认选中
      radioType: '1', // 题目类型
      isInterview: '1', // 是否为面试题 1为面试题 2不为面试题
      sort: 1, // 试题编号，默认为1
      examPaperList: [] // 存储题目
    }
  },
  methods: {
    // 添加试卷
    pushExamPaper () {
      if (this.examPaperTit === '') {
        this.$message({
          message: '请输入试卷名称',
          type: 'warning'
        });
        return
      } else if (this.examPaperList.length === 0) {
        this.$message({
          message: '请添加题目后再保存试卷',
          type: 'warning'
        });
        return
      }
      this.$http.post('business/examQuestionMark/savePaper', {
        examPage: {
          name: this.examPaperTit,
          remark: "（每道题目只有一个正确选项）",
          typeId: this.optionsDefault
        },
        list: this.examPaperList
      }).then((response) => {
        console.log(response)
        if (response.status === 200 && typeof response.data === 'string') {
          this.$message({
            message: '试卷保存成功',
            type: 'success'
          });
          this.examPaperTit = '';
          // console.log(response)
          this.$router.push('MyExamination');
        } else {
          this.$message.error('请检查网络，试卷添加失败');
        }
      })
    },

    // 添加试题到本地
    pushProblem () {
      // 进行内容检查，为空不能添加
      switch ('') {
        case this.radioCorrect:
          this.$message({
            message: '未选择该题正确答案',
            type: 'warning'
          })
          return
          break;
        case this.titContent:
          this.$message({
            message: '未填写题目',
            type: 'warning'
          })
          return
          break;
        case this.radioList[0].cont &&
          this.radioList[1].cont &&
          this.radioList[2].cont &&
          this.radioList[3].cont:
          this.$message({
            message: '未填入选项内容',
            type: 'warning'
          })
          return
          break;
      }
      // 试题内容
      var examPaperItem = {
        answer: this.radioCorrect,
        examQuestionMark: this.isInterview === '1' ? { mark: "面试题" } : { mark: "非面试题" },
        optionA: this.radioList[0].cont,
        optionB: this.radioList[1].cont,
        optionC: this.radioList[2].cont,
        optionD: this.radioList[3].cont,
        optionE: 'string',
        optionF: 'string',
        questionTypeId: this.radioType,
        score: this.minute,
        sort: this.sort,
        stem: this.titContent
      };
      this.examPaperList.push(examPaperItem);
      this.$message({
        message: `第 ${this.sort} 题添加成功`,
        type: 'success'
      })
      this.sort++;
      // 题目添加成功后，清空用户输入的值
      [
        this.radioCorrect,
        this.isInterview,
        this.radioList[0].cont,
        this.radioList[1].cont,
        this.radioList[2].cont,
        this.radioList[3].cont,
        this.minute,
        this.titContent
      ] = ['','1','','','','','1',''];
    }
  },
  created () {

  }
}
</script>
<style>
.CreateExamPaper .el-col {
  line-height: 40px;
  text-align: left;
  margin-top: 10px;
}
.basic_data {
  width: 1200px;
  margin: 0 auto;
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
.HeadMasterTitle_box {
  height: 144px;
}
.HeadMasterTitle_box .HeadMasterTitle_wrap {
  width: 1280px;
  margin: 0 auto;
}
.HeadMasterTitle_box .HeadMasterTitle_msg {
  float: left;
  margin-left: 147px;
}
.HeadMasterTitle_box .HeadMasterTitle_msg span {
  /* width: 110px; */
  height: 26px;
  color: #ffffff;
  font-size: 26px;
  font-weight: 400;
  line-height: 24px;
  display: block;
  margin-top: 50px;
}
.HeadMasterTitle_box .HeadMasterTitle_msg p {
  width: 465px;
  height: 18px;
  opacity: 0.79;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  margin-top: 8px;
  white-space: pre-wrap;
}
.HeadMasterTitle_box .HeadMasterTitle_bg3 {
  background: url(../../images/my_participate.png) no-repeat center top;
  float: right;
  width: 455px;
  height: 144px;
  background-size: 485px 144px;
}
</style>