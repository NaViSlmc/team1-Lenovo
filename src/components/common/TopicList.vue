<template>
  <div>

    <el-menu :default-active="activeName" class="el-menu-demo" mode="horizontal" @select="toggleTab">
      <el-menu-item v-for="(item,index) in menusList" :key="index" :index="item.name">{{ item.label }}</el-menu-item>
    </el-menu>

    <el-table :data="list" :show-header="false">
      <!-- 头像列 -->
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-avatar shape="square" size="medium" :src="scope.row.author.avatar_url" :title="scope.row.author.loginname"></el-avatar>
        </template>
      </el-table-column>
      <!-- 浏览数 评论数显示 -->
      <el-table-column width="90">
        <template slot-scope="scope">
          <span style="color:#9e78c0" title="回复数">{{ scope.row.reply_count}}</span><span>/</span><span title="点击数" style="font-size:10px;color: #b4b4b4;">{{ scope.row.visit_count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="" width="130">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.top">置顶</el-tag>
          <el-tag type="success" v-if="scope.row.good">精华</el-tag>
          <el-tag type="info" v-if="!scope.row.top && !scope.row.good">{{ tabsName(scope.row.tab) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="" width="1000">
        <template slot-scope="scope">
          <el-link @click="goTopic(scope.row.id)" :title="scope.row.title">{{scope.row.title}}</el-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  name: 'topliList',
  data () {
    return {
      menusList: [
        { label: '全部', name: 'all' },
        { label: '精华', name: 'good' },
        { label: '分享', name: 'share' },
        { label: '问答', name: 'ask' },
        { label: '招聘', name: 'job' }
      ],
      activeName: 'all',
      list: []
    }
  },
  computed: {

  },
  methods: {
    tabsName (val) {
      switch (val) {
        case 'ask':
          return '问答';
          break;
        case 'share':
          return '分享';
          break;
        case 'good':
          return '精华';
          break;
        case 'job':
          return '招聘';
          break;
      }
    },
    toggleTab (val) {
      // 切换标签时，发送请求
      // console.log(val)
      this.$http.get(`/topics?tab=${val}&mdrender=false`).then((response) => {
        this.list = response.data.data;
        // console.log(this.activeName)
        // console.log(response.data.data)
      })
    },
    goTopic(id) {
      // 进行路由跳转，并且携带文章id
      this.$router.push(`/topic/${id}`);
    }
  },
  created () {
    this.toggleTab(this.activeName)
  }
}
</script>