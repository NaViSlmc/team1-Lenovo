<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="header-1">
        <div class="header-2" style="margin-left:30px">
          <p>我的考试</p>
          <span>记录我在联想班的考试成绩以及学校的考试成绩各个方面的表现与进步积极向上 努力进取 养成习惯 成长为未来社会栋梁</span>
        </div>
        <img src="../../images/01.png" alt class="img1" />
      </div>
    </div>

    <!-- 中间 -->
    <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) in examTypeList" :key="index" :label="item.name">
          <el-table style="width: 100%" :data="data1">
            <el-table-column label="班级名称" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.className }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考试名称" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开考时间" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="考试时长" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.duration }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <el-button size="mini" @click="startExam(scope.row)">开始考试</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyExam",
  data() {
    //组件用到的数据
    return {
      activeName: "first",
      data1: [],
      page: 1,
      pageSize: 5,
      typeId: 1,
      examTypeList: [] //考试类型
    };
  },
  methods: {
    //当前组件用到的函数
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.index);
      var app = this;
      var str = parseInt(tab.index);
      str += 1; //将当前点击的下标+1（为了赋值给考试类型id）
      // console.log(str);
      this.typeId = str;
      this.$http
        .post("/business/examPlan/studentPage", {
          page: this.page,
          pageSize: this.pageSize,
          params: {
            typeId: this.typeId
          }
        })
        .then(function(res) {
          // console.log(res.data.params.typeId);//已经将typeId与导航的序号相对应
          app.data1 = res.data.data;
          console.log(app.data1);
        });
    },
    startExam(scope) {
      console.log(scope);
      this.$router.push({
        name: "StartTest",
        params: {
          testid: this.typeId
        }
      });
    }
  },
  created() {
    //组件加载完成后的生命周期回调,如果页面一加载就需要展示数据，那么数据在这获取

    // 获取考试类型
    this.$http.get("/business/examType/listAll").then(res => {
      this.examTypeList = res.data;
      // console.log(this.examTypeList);
    });
  }
};
</script>

<style lang="">
.header {
  width: 100%;
  height: 144px;
  background-size: 38%;
  background: linear-gradient(60deg, #6cc4ce, #65f1ce);
}
.header-1 {
  width: 1280px;
  /* margin: 0 auto; */
  margin-left: 200px;
  overflow: hidden;
}
.header-2 {
  width: 548px;
  float: left;
}
.header-2 p {
  font-size: 26px;
  color: #ffffff;
  font-weight: 400;
}
.header-2 span {
  display: inline-block;
  width: 500px;
  color: #ffffff;
  opacity: 0.9;
  font-weight: 300;
  font-size: 16px;
  line-height: 18px;
  margin-top: 3px;
}
.img1 {
  float: right;
}
</style>