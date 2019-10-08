<template>
  <!-- template中只能放一个div标签 -->
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="all">all</el-menu-item>
      <el-menu-item index="good">good</el-menu-item>
      <el-menu-item index="share">share</el-menu-item>
      <el-menu-item index="ask">ask</el-menu-item>
      <el-menu-item index="job">job</el-menu-item>
    </el-menu>
    <!-- <div>
      <p v-for="item in arr" :key="item.id">{{ item.title }}</p>
    </div>-->
    <el-table :data="arr">
      <el-table-column>
        <template slot-scope="scope">
          <img :src="scope.row.author.avatar_url" alt width="25px" />
          &nbsp;&nbsp;
          {{ scope.row.reply_count }}
          &nbsp;&nbsp;
          <el-button @click="article(scope.row.id)">{{ scope.row.title }}</el-button>
          <p style="float: right">{{ scope.row.last_reply_at }}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "topicList",
  data: function() {
    //用到的数据
    return {
      activeIndex: "all",
      arr: [], //向页面展示的数据
      activeNames: ["1"]
    };
  },
  methods: {
    //定义的方法，函数
    handleSelect(key, keyPath) {
      var app = this;
      console.log(key);
      this.$http.get("/topics?tab=" + key + "&limit=20").then(function(res) {
        console.log(res.data.data);
        app.arr = res.data.data;
      });
    },
    article(id) {
      this.$router.push(`/topicDetails/${id}`);
    }
  },
  created() {
    //生命周期函数，组件页面加载完毕后立即执行
    this.handleSelect(this.activeIndex); //直接调用handleSelect方法，参数写当前选中项
  }
};
</script>

<style>
</style>