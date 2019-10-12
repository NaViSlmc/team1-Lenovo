<template>
  <div class="CreateExam">
    <div class="HeadMasterTitle_box" style="background-color: rgb(238, 82, 108); background-image: linear-gradient(45deg, rgb(238, 82, 108) 0%, rgb(238, 82, 108) 1%, rgb(243, 106, 128) 100%);">
      <div class="HeadMasterTitle_wrap">
        <div class="HeadMasterTitle_msg" style="margin-left: 110px;">
          <span style="margin-top: 40px;">发布考试</span>
          <p>在测验中分析 在测验中总结 在测验中成长</p>
        </div>
        <div class="HeadMasterTitle_bg3"></div>
      </div>
    </div>
    <div class="basic_data">
      <p class="basic_data_tit">发布考试</p>
      <!-- 第一行 -->
      <el-row>
        <el-col :span="2">考试名称</el-col>
        <el-col :span="4">
          <el-input placeholder="请输入考试名称" v-model="examName"></el-input>
        </el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row>
        <!-- 选择班级 -->
        <el-col :span="2">选择班级</el-col>
        <el-col :span="4">
          <el-select v-model="optionsDataDefault" placeholder="请选择考试班级">
            <el-option v-for="item in optionsData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row>
        <!-- 考试时长 -->
        <el-col :span="2">考试时长</el-col>
        <el-col :span="3">
          <el-input-number controls-position="right" size="mini" v-model="examTime" :min="1"></el-input-number>
        </el-col>
        <el-col :span="1" style="margin-left:5px;">
          <el-tag type="success">分钟</el-tag>
        </el-col>
      </el-row>

      <!-- 第四行 -->
      <el-row>
        <!-- 开始时间 -->
        <el-col :span="2">
          <span class="demonstration">开始时间</span>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="dateValue" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-col>
      </el-row>

      <!-- 第五行 -->
      <el-row>
        <!-- 考试类型 -->
        <el-col :span="2">考试类型</el-col>
        <el-col :span="10">
          <el-radio v-for="(item,index) in examTypeList" :key="index" v-model="examType" :label="item.id">{{ item.name }}</el-radio>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-button type="primary">请选择您要关联的试卷</el-button>
        </el-col>
      </el-row>

      <el-table ref="multipleTable" @current-change="handleCurrentChange" highlight-current-row tooltip-effect="dark" style="width: 100%" :data="data1" v-if="data1">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="试卷" width="300" prop="name"></el-table-column>
        <el-table-column prop="typeName" label="专业分类" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注信息" width="425"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="300"></el-table-column>
      </el-table>
      <el-row>
        <el-col>
          <el-pagination background layout="prev, pager, next" @current-change="currentChange" :page-size="+pageSize" :total="recordsTotal">
          </el-pagination>
        </el-col>
        <el-col>
          <el-button type="primary" plain @click="createdExam">创建考试</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateExam",
  data () {
    return {
      // 时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick (picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      selectedExamId:'', // 选中的要关联试卷id
      examName: '', // 考试名称
      examTime: '1', // 考试时长
      examType: 1, // 考试类型
      examTypeList: [], // 考试类型列表
      dateValue: "", // 开考时间
      page: '1',//页数
      pageSize: '4', //每页显示数量
      data1: null, //表格内容
      userId: '', // 老师Id
      optionsData: null, // 所有所教班级
      optionsDataDefault: '', // 选中的班级id
      recordsTotal: 0 // 表格条目数
    };
  },
  methods: {
    // 创建考试
    createdExam(){
      switch ('') {
        case this.examName:
          this.$message({
            message: '请输入考试名称',
            type: 'warning'
          });
          return 
          break;
        case this.optionsDataDefault:
          this.$message({
            message: '请选择要考试的班级',
            type: 'warning'
          });
          return 
          break;
        case this.dateValue:
          this.$message({
            message: '请选择开考时间',
            type: 'warning'
          });
          return 
          break;
        case this.selectedExamId:
          this.$message({
            message: '请选择要考试的试卷',
            type: 'warning'
          });
          return 
          break;
      }
      // 时间格式处理
      var startTime = new Date(this.dateValue).getTime();
      this.$http.post('/business/examPlan/save',{
        classId: this.optionsDataDefault,
        duration: this.examTime+'',
        examPageId: this.selectedExamId,
        isMultipleSubmission: 'N',
        name: this.examName,
        startTime,
        typeId: this.examType
      }).then((res) => {
        if(res.data === '') {
          this.$message({
            message: '创建考试成功',
            type: 'success'
          });
          this.$router.push('MyExamination');
        }else {
          this.$message({
            message: '创建考试失败',
            type: 'warning'
          })
        }
      })
    },
    // 表格单选
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selectedExamId = currentRow?currentRow.id:oldCurrentRow.id;
      // console.log(currentRow)
      // console.log(oldCurrentRow)
    },
    // 切换页码功能
    currentChange (val) {
      this.$http.post('/exam/examPage/page', {
        page: val, //  当前页
        pageSize: this.pageSize, //每一页显示条数
        params: {
          typeId: null //typeId 试卷类型id 默认传nulll 获取所有的
        }
      }).then((res) => {
        this.data1 = res.data.data;
      })
    }
  },
  created () {
    this.userId = window.localStorage.getItem('userId')
    var app = this;
    // 获取试卷集合
    this.$http
      .post("/exam/examPage/page", {
        page: this.page, //  当前页
        pageSize: this.pageSize, //每一页显示条数
        params: {
          typeId: null //typeId 试卷类型id 默认传nulll 获取所有的
        }
      })
      .then(function (res) {
        app.data1 = res.data.data;
        app.recordsTotal = res.data.recordsTotal;
      });



    // 获取考试类型
    this.$http.get('/business/examType/listAll').then((res) => {
      this.examTypeList = res.data;
    });
    // 获取老师带过的班级
    this.$http.get('/business/organClassUser/currentClassListByTeacherId/' + this.userId).then((res) => {
      this.optionsData = res.data;
    });
  }
};
</script>
<style>
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
.CreateExam .el-col {
  line-height: 40px;
  text-align: left;
  margin-top: 10px;
}
</style>