<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="header-1">
        <div class="header-2" style="margin-left:30px">
          <p>考试管理</p>
          <span>贴合知识点 自动判卷 多维度统计</span>
        </div>
        <img src="../../images/01.png" alt class="img1" />
      </div>
    </div>
    <!-- 中间 -->

    <!-- 按钮 -->
    <div class="main" style="top:5px">
      <el-row style="top:10px;left:5px;">
        <el-button type="success" @click="routerPush('CreateExam')">发布考试</el-button>
        <el-button type="primary" @click="routerPush('CreateExamPaper')">创建试卷</el-button>
      </el-row>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="margin-top:20px;"
        type="border-card"
      >
        <el-tab-pane label="大前端" name="first">
          <el-tag type="success" style="margin-bottom:10px;margin-left:5px;">大前端</el-tag>

          <el-table style="width: 100%" :data="data1" ref="table">
            <el-table-column label="名称" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column label="试卷类型" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">查看试卷</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="handleDelete(scope.$index, scope.row,data1,'page1')"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            hide-on-single-page
            :key="1"
            :current-page="+page1"
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :page-size="+pageSize"
            :total="recordsTotal"
            style="margin-top:10px;"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="移动互联" name="second">
          <el-tag type="success" style="margin-bottom:10px;margin-left:5px;">移动互联</el-tag>

          <el-table style="width: 100%" :data="data2" ref="table">
            <el-table-column label="名称" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column label="试卷类型" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">查看试卷</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="handleDelete(scope.$index, scope.row,data2,'page2')"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            hide-on-single-page
            :key="2"
            :current-page="+page2"
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :page-size="+pageSize"
            :total="recordsTotal"
            style="margin-top:10px;"
          ></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="软件开发" name="third">
          <el-tag type="success" style="margin-bottom:10px;margin-left:5px;">软件开发</el-tag>

          <el-table style="width: 100%" :data="data3" ref="table">
            <el-table-column label="名称" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" width="250">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column label="试卷类型" width="250">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.typeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">查看试卷</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.native.prevent="handleDelete(scope.$index, scope.row,data3,'page3')"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            hide-on-single-page
            :key="3"
            :current-page="+page3"
            @current-change="currentChange"
            background
            layout="prev, pager, next"
            :page-size="+pageSize"
            :total="recordsTotal"
            style="margin-top:10px;"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyExamination",
  data() {
    return {
      activeName: "first",
      typeId: "1",
      page1: "1",
      page2: "1",
      page3: "1",
      pageSize: "4",
      data1: null,
      data2: null,
      data3: null,
      recordsTotal: 0, // 总条目数
      index: 1
    };
  },
  watch: {},
  methods: {
    // 查看试卷详情
    handleEdit(item) {
      this.$router.push({
        path: `/SeeExam/${item.id}`,
        query: {
          userType: 't'
        }
      })
    },
    // 删除试卷功能  巨麻烦的功能。。。
    handleDelete(index, item, tableData, page) {
      // index为当前组件在当前页的下标  // item为该组件内容
      // 查看试卷是否被关联
      this.$http.get(`/business/examPlan/paperStatus/` + item.id).then(res => {
        if (typeof res.data === "boolean") {
          if (res.data) {
            this.$http.post(`/exam/examPage/delete?id=${item.id}`).then(res => {
              if (res.data === "") {
                // 删除后，如果当前tableData.length==0,则重新跳转上一个页面，并且重新发送请求，请求上一个页面的内容
                this.recordsTotal--;
                tableData.splice(index, 1); // 删除当前列表条目
                if (tableData.length == 0) {
                  this.$http
                    .post("/exam/examPage/page", {
                      pageSize: this.pageSize,
                      page: this[page] - 1, // 此处需要减1
                      params: {
                        typeId: this.index
                      }
                    })
                    .then(res => {
                      this[`data${this.index}`] = res.data.data;
                    });
                }
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
            });
          } else {
            this.$message({
              type: "warning",
              message: "当前试卷已被考试关联，无法删除"
            });
          }
        } else {
          this.$message.error("网络错误");
        }
      });
    },
    // 按钮路由跳转功能
    routerPush(route) {
      this.$router.push(route);
    },
    // 切换页码功能
    currentChange(val) {
      // console.log(val)
      var app = this;
      this[`page${app.index}`] = val;
      this.$http
        .post("/exam/examPage/page", {
          pageSize: this.pageSize,
          page: val,
          params: {
            typeId: this.index
          }
        })
        .then(function(res) {
          app[`data${app.index}`] = res.data.data;
        });
    },
    handleClick(tab, event, row, index) {
      var index = Number(tab.index) + 1;
      this.index = index;
      if (index == 1) {
        var app = this;
        this.$http
          .post("/exam/examPage/page", {
            page: this.page1, //当前第几页
            pageSize: this.pageSize, //每页显示的条数
            params: {
              typeId: index //试卷类型 typeId  1为大前端  2是移动互联 3是软件开发
            }
          })
          .then(function(res) {
            app.recordsTotal = res.data.recordsTotal;
            app.data1 = res.data.data;
          });
      } else if (index == 2) {
        var app = this;
        this.$http
          .post("/exam/examPage/page", {
            page: this.page2, //当前第几页
            pageSize: this.pageSize, //每页显示的条数
            params: {
              typeId: index //试卷类型 typeId  1为大前端  2是移动互联 3是软件开发
            }
          })
          .then(function(res) {
            app.recordsTotal = res.data.recordsTotal;
            app.data2 = res.data.data;
          });
      } else if (index == 3) {
        var app = this;
        this.$http
          .post("/exam/examPage/page", {
            page: this.page3, //当前第几页
            pageSize: this.pageSize, //每页显示的条数
            params: {
              typeId: index //试卷类型 typeId  1为大前端  2是移动互联 3是软件开发
            }
          })
          .then(function(res) {
            app.recordsTotal = res.data.recordsTotal;
            app.data3 = res.data.data;
          });
      }
    }
  },

  created() {
    var app = this;
    this.$http
      .post("/exam/examPage/page", {
        page: this.page1, //当前第几页
        pageSize: this.pageSize, //每页显示的条数
        params: {
          typeId: this.typeId //试卷类型 typeId  1为大前端  2是移动互联 3是软件开发
        }
      })
      .then(function(res) {
        app.recordsTotal = res.data.recordsTotal;
        app.data1 = res.data.data;
      });
  }
};
</script>
<style>
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
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
.main {
  margin: 0 auto;
  /* background: bisque; */
  /* width:100%; */
  height: 500px;
  width: 90%;
  margin-top: 10px;
}
.cell {
  font-size: 13px;
}
</style>