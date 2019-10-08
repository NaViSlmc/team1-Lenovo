<template>
  <div>
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-header>
          <h3>{{ obj.title }}</h3>作者：
          <el-link>{{ obj.author.loginname }}</el-link>
          <span>{{ obj.visit_count }}次浏览</span>
          来自
          <el-link>{{ obj.tab }}</el-link>
        </el-header>
        <el-main v-html="obj.content">{{ obj.content }}</el-main>
        <el-main>
          {{ obj.reply_count }}回复
          <div v-for="item in obj.replies" :key="item.id">
            <img :src="item.author.avatar_url" alt width="25px" />
            <el-link>{{ item.author.loginname }}</el-link>
            <div v-html="item.content"></div>
            <div v-html="obj.replies.content">{{ obj.replies.content }}</div>
            <hr>
          </div>
        </el-main>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "aa",
  data: function() {
    return {
      id: "",
      obj: {
        author: {}
      }
    };
  },
  methods: {},
  created() {
    // console.log(this.$route.params.id)
    var app = this;
    this.id = this.$route.params.id;// 接收指定的路由参数
    this.$http.get("/topic/" + this.id).then(function(res) {
      console.log(res.data.data);
      app.obj = res.data.data;
    });
  }
};
</script>

<style lang="">
</style>