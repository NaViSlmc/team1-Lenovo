<template>
  <div>
    <!-- 头部我的考试 -->
    <div class="MyJoin_box">
      <div class="MyJoin_wrap">
        <div class="MyJoin_msg" style="margin-left: 110px;">
          <span style="margin-top: 40px; font-famliy: monospace">我的参与</span>
          <p style="color:#ffffff">
            记录我在联想班学习的问答 反馈以及对相关系统功能等的评价
            <br />积极参与 主动贡献 养成习惯 成长为未来社会的栋梁
          </p>
        </div>
        <div class="HeadMasterTitle_bg3"></div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="MyJoin_main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="我的问答" name="ask">
          <p id="QA">我的问答</p>
          <el-table :data="tableData" style="width: 100%" stripe>
            <el-table-column align="center" prop="typeName" label="提问类型" width="180"></el-table-column>
            <el-table-column align="center" prop="proposeTime" label="发起时间" width="100"></el-table-column>
            <el-table-column align="center" prop="question" label="问题" width="500"></el-table-column>
            <el-table-column align="center" prop="subject" label="问题描述" width="180"></el-table-column>
            <el-table-column align="center" prop label="操作" width="200">
              <template slot-scope="scope">
                <el-link type="primary" :underline="false" @click="getQuestionDetail(scope.row)">
                  <i class="el-icon-tickets"></i>详情
                </el-link>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="+pageSize"
            :total="totalPages"
            @current-change="currentChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="我的反馈" name="feedback" v-if="isShow == true">
          <span id="FB">我的意见反馈</span>
          <el-button id="newfb" style="float: right;margin-right: 140px" @click="newFB">新建反馈</el-button>
          <el-table :data="dataTable" style="width: 100%" stripe>
            <el-table-column align="center" prop="subject" label="意见" width="180"></el-table-column>
            <el-table-column align="center" prop="typeName" label="反馈类型" width="120"></el-table-column>
            <el-table-column align="center" prop="content" label="问题说明" width="400"></el-table-column>
            <el-table-column align="center" prop="commitTime" label="发起时间" width="180"></el-table-column>
            <el-table-column label="状态" width="200" align="center">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.isHandle== 'Y'" class="el-icon-success">已回复</el-tag>
                <el-tag v-else type="warning" class="el-icon-warning">未回复</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="currentChange"
            :current-page="+page"
            :total="recordsTotal"
            :page-size="+pageSize"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="提交反馈" name="feedback" v-else>
          <span id="BF">意见反馈</span>
          <el-button style="float: right;margin-right: 140px" @click="newFB">我的意见</el-button>
          <el-form style="margin-top: 30px;width: 1050px" label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="问题分类">
              <el-select v-model="formLabelAlign.type">
                <el-option value="产品bug"></el-option>
                <el-option value="功能建议"></el-option>
                <el-option value="用户体验"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="意见">
              <el-input v-model="formLabelAlign.name" placeholder="请输入你的问题建议"></el-input>
            </el-form-item>
            <el-form-item label="问题说明">
              <el-input type="textarea" :rows="4" v-model="formLabelAlign.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog class="dialog" title="解答详情" :visible.sync="dialogVisible" width="60%">
      <el-tag>问题：{{ obj.question }}</el-tag>
      <br />
      <el-tag type="success">问题说明：{{ obj.subject }}</el-tag>
      <br />
      <el-tag type="info">提问人：{{ obj.question }} 提问时间：{{ obj.proposeTime }}</el-tag>
      <br />
      <el-tag type="warning">问题标签：{{ obj.typeName }}</el-tag>
      <br />
      <el-tag type="danger">答案详情：{{ obj.explanation }}</el-tag>
      <br />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyJoin",
  data() {
    //组件用到的数据
    return {
      activeName: "ask",
      tableData: [], //我的问答
      currentPage: 1, //初始页
      totalPages: 0, //总页数
      dialogVisible: false, //对话框
      dataTable: [], //我的反馈
      // 表单
      formLabelAlign: {
        name: "",
        desc: "",
        type: ""
      },
      obj: [],
      isShow: true,
      page: "1",
      pageSize: "7",
      recordsTotal: 0 // 总条目数
    };
  },
  methods: {
    //当前组件用到的函数
    handleClick(tab, event) {
      // console.log(tab.index);
      if (this.activeName == "feedback") {
        this.$http
          .post("/business/opinionsSuggestions/page", {
            page: +this.page, //获取数据的第几页  页数
            pageSize: this.pageSize, //每页的数据条数
            params: {} //默认先传空值
          })
          .then(res => {
            // console.log(res);
            console.log(this.obj);
            this.dataTable = res.data.data;
            this.recordsTotal = res.data.recordsTotal;
          });
      }
    },
    //分页效果事件
    currentChange(current) {
      this.page = current;
      this.handleClick();
    },
    //我的问答：点击详情事件
    getQuestionDetail(row) {
      // console.log(row.id);
      // if (row.hide = false){
      //   row.style.display == none;
      // }

      //获取当前点击详情的信息
      this.$http.get(`/business/studentQuestion/detail/` + row.id).then(res => {
        // console.log(res.data);
        this.obj = res.data;
        this.dialogVisible = true;
      });
    },
    //新建反馈
    newFB() {
      if (this.isShow == true) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    // 提交反馈
    onSubmit() {
      var app = this;
      this.$http
        .post("/business/opinionsSuggestions/submitComments", {
          content: this.formLabelAlign.desc, //反馈问题说明
          subject: this.formLabelAlign.name, //反馈意见
          typeName: this.formLabelAlign.type //问题分类
        })
        .then(res => {
          if (res.data == "") {
            this.$message({
              type: "success",
              message: "反馈提交成功"
            });
            app.isShow = true;
            this.formLabelAlign = { name: "", region: "", type: "" };
            this.handleClick();
          } else {
            this.$message({
              type: "warning",
              message: `res.data.msg`
            });
          }
        });
    }
  },
  // studentQuestion/detail/${id}
  created() {
    //组件加载完成后的生命周期回调,如果页面一加载就需要展示数据，那么数据在这获取
    this.$http.get("/business/studentQuestion/listAll").then(res => {
      // console.log(res);
      this.tableData = res.data;
      // for (var i = 0;i < this.tableData.length; i++) {
      //   console.log(i)
      //   this.tableData[i].hide = false;
      //   console.log(this.tableData[i].hide);
      //   var hide = this.tableData[i].hide;
      // }
      this.totalPages = this.tableData.length;
      // console.log(this.totalPages);
    });
  }
};
</script>

<style lang="">
.MyJoin {
  min-height: 535px;
}
.MyJoin .el-table td,
.el-table th.is-leaf {
  text-align: center;
}
.MyJoin_box {
  height: 144px;
  background: linear-gradient(30deg, #014743, #d8dbdb);
}
.MyJoin_box .MyJoin_wrap {
  width: 1280px;
  margin: 0 auto;
}
.MyJoin_box .MyJoin_msg {
  float: left;
  margin-left: 147px;
}
.MyJoin_box .MyJoin_msg span {
  /* width: 110px; */
  height: 26px;
  color: #ffffff;
  font-size: 26px;
  font-weight: 400;
  line-height: 24px;
  display: block;
  margin-top: 50px;
}
.MyJoin_box .HeadMasterTitle_msg p {
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
.MyJoin .el-menu-demo {
  background: #f2f5f7;
}
.MyJoin .el-menu-item {
  color: #999;
}
.MyJoin .el-menu-item:nth-child(1) {
  margin-left: 250px;
}
.MyJoin_box .HeadMasterTitle_bg3 {
  /* background: url(../../images/myExam.png) no-repeat center top; */
  float: right;
  width: 300px;
  height: 144px;
}
.MyJoin_main {
  width: 80%;
  margin-left: 210px;
  /* background: cadetblue; */
  margin-top: 30px;
}
#QA {
  border-left: 4px solid #014743;
  box-sizing: border-box;
  padding-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #606060;
}
#FB {
  border-left: 4px solid #014743;
  box-sizing: border-box;
  padding-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #606060;
}
#BF {
  border-left: 4px solid #014743;
  box-sizing: border-box;
  padding-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  color: #606060;
}
</style>