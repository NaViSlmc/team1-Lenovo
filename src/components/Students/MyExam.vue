<template>
  <div class="MyExam">
    <!-- 头部我的考试 -->
    <div class="MyExam_box">
      <div class="MyExam_wrap">
        <div class="MyExam_msg" style="margin-left: 110px;">
          <span style="margin-top: 40px; font-famliy: monospace">我的考试</span>
          <p style="color:#ffffff">
            记录我在联想班的考试成绩以及学校的考试成绩
            <br />各个方面的表现与进步积极向上 努力进取 养成习惯 成长为未来社会栋梁
          </p>
        </div>
        <div class="HeadMasterTitle_bg3"></div>
      </div>
    </div>

    <!-- 标题 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" name="1">每日一练</el-menu-item>
      <el-menu-item index="2">每周一测</el-menu-item>
      <el-menu-item index="3">每月一考</el-menu-item>
      <el-menu-item index="4">期末测试</el-menu-item>
    </el-menu>

    <div class="Exam_center">
      <p id="ExamTit">每日一练</p>
      <el-table ref="table" :data="tableData" stripe>
        <el-table-column label="考试名称" width="250">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="开考时间" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="考试时长" width="110" style="text-align:left">
          <template slot-scope="scope">
            <span>{{ scope.row.duration }}分钟</span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button
              style="width:100px"
              v-if="examPaperStatus(scope.row)=='缺考'"
              type="danger"
              @click="absent(scope.row)"
              size="small"
            >{{ examPaperStatus(scope.row) }}</el-button>
            <el-button
              style="width:100px"
              v-if="examPaperStatus(scope.row)=='开始考试'"
              type="primary"
              @click="startExam(scope.row)"
              size="small"
            >{{ examPaperStatus(scope.row) }}</el-button>
            <el-button
              style="width:100px"
              v-if="examPaperStatus(scope.row)=='暂未开考'"
              type="info"
              size="small"
            >{{ examPaperStatus(scope.row) }}</el-button>
            <el-button
              style="width:100px"
              v-if="examPaperStatus(scope.row)=='查看试卷'"
              type="primary"
              @click="handleClick(scope.row)"
              size="small"
            >{{ examPaperStatus(scope.row) }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        hide-on-single-page
        :current-page="+page"
        @current-change="currentChange"
        background
        layout="prev, pager, next"
        :page-size="+pageSize"
        :total="recordsTotal"
        style="margin-top:10px;"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyExam",
  data() {
    //组件用到的数据
    return {
      activeIndex: "1",
      page: "1",
      pageSize: "4",
      typeId: "1",
      tableData: null, // 表格值
      recordsTotal: 0 // 表格值的总条目数(后端返回)
    };
  },
  computed: {
    // 对试卷的当前状态进行处理
    examPaperStatus() {
      // 状态1、还未开考
      // 状态2、已经开考
      // 状态3、考试时间已过，缺考
      // 状态4、考试时间已过，查看试卷
      // isStart 为true表示考试已经开始，false表示考试未开始
      // isTimeout 为true表示还没进行考试
      return item => {
        if (new Date(item.endTime) >= new Date()) {
          // true：考试还没有结束/考试时间还未到
          return item.isStart ? "开始考试" : "考试时间未到";
        } else {
          return item.isTimeout ? "缺考" : "查看试卷";
        }
        // return item.isStart?  item.isTimeout? new Date(item.endTime)>=new Date()  ?'开始考试':'缺考':'开始考试':'考试未开始';
      };
    }
  },
  methods: {
    // 开始考试 跳转
    startExam(item) {
      console.log(item);
      this.$router.push({
        name: `StartTest`,
        params: {
          id: item.id,
          time: item.endTime
        }
      });
    },
    absent(item) {
      this.$router.push({
        name: `SeeExam`,
        params: {
          id: item.id
        },
        query: {
          userType: "s",
          isMiss: 1
        }
      });
    },
    // 分页效果 页数改变触发该方法
    currentChange(val) {
      this.getTableData(val, this.pageSize, this.typeId);
    },
    // 切换标签页
    handleSelect(key) {
      this.page = "1";
      var contentList = ["每日一练", "每周一测", "每月一考", "期末测试"];
      document.getElementById("ExamTit").innerHTML = contentList[key - 1];
      this.getTableData(this.page, this.pageSize, key);
    },
    handleClick(item) {
      this.$router.push({
        name: `SeeExam`,
        params: {
          id: item.id
        },
        query: {
          userType: "s"
        }
      });
    },
    // 请求表格内数据
    getTableData(page, pageSize, typeId) {
      this.$http
        .post("/business/examPlan/studentPage", {
          page: +page, // 页数
          pageSize: pageSize, // 每页显示条数
          params: {
            typeId: typeId // 考试类型id
          }
        })
        .then(res => {
          if (res.data.status != 500) {
            this.tableData = res.data.data;
            this.recordsTotal = res.data.recordsTotal;
            [...this.tableData].map(item => {
              // isTimeout 为true表示还没开始考试
              item.isTimeout =
                item.examResultList || item.examResultList == null
                  ? true
                  : false;
              // isStart 为true 表示考试已经开始，false表示考试未开始
              item.isStart =
                new Date(item.startTime) >= new Date() ? false : true;
            });
          } else {
            // 清空localStorage
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("userName");
            this.$message({
              message: "超时未操作,请重新登录",
              type: "warning"
            });
            this.$router.push("/");
          }
        });
    }
  },
  created() {
    this.getTableData(this.page, this.pageSize, this.typeId);
  }
};
</script>
<style>
.MyExam {
  min-height: 535px;
}
.MyExam .el-table td,
.el-table th.is-leaf {
  text-align: center;
}
.MyExam_box {
  height: 144px;
  background: linear-gradient(30deg, #014743, #d8dbdb);
}
.MyExam_box .MyExam_wrap {
  width: 1280px;
  margin: 0 auto;
}
.MyExam_box .MyExam_msg {
  float: left;
  margin-left: 147px;
}
.MyExam_box .MyExam_msg span {
  /* width: 110px; */
  height: 26px;
  color: #ffffff;
  font-size: 26px;
  font-weight: 400;
  line-height: 24px;
  display: block;
  margin-top: 50px;
}
.MyExam_box .HeadMasterTitle_msg p {
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
.MyExam .el-menu-demo {
  background: #f2f5f7;
}
.MyExam .el-menu-item {
  color: #999;
}
.MyExam .el-menu-item:nth-child(1) {
  margin-left: 250px;
}
.MyExam_box .HeadMasterTitle_bg3 {
  /* background: url(../../images/myExam.png) no-repeat center top; */
  float: right;
  width: 300px;
  height: 144px;
}
.Exam_center {
  width: 80%;
  margin-left: 210px;
  /* background: cadetblue; */
  margin-top: 30px;
}
.Exam_center p {
  border-left: 4px solid #014743;
  box-sizing: border-box;
  padding-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #606060;
}
</style>
