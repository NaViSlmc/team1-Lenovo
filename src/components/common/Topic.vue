<template>
  <div style="padding:20px" v-if="topic">
    <el-row>
      <el-col :offset="3" :span="15" style="font-size:22px;font-weight:bold">
        <el-tag type="success" v-if="topic.top">置顶</el-tag>
        <el-tag type="success" v-if="topic.good">精华</el-tag>
        <el-tag type="info" v-if="!topic.top && !topic.good">{{ tabsName(topic.tab) }}</el-tag>
        {{ topic.title }}
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="15" style="font-size: 12px;color: #838383;line-height:30px">
        <span>发布时间 {{ timeTransfrom(topic.create_at) }}</span>
        <span>作者 {{ topic.author.loginname }}</span>
        <span style="margin-left:10px"> {{ topic.visit_count }} 次浏览</span>
        <span> 来自 {{ tabsName(topic.tab) }}</span>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="14">
        <div v-html="topic.content"></div>
      </el-col>
      <el-col :span="5" :offset="2">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>作者</span>
          </div>
          <div class="text item" style="line-height:50px">
            <el-avatar shape="square" :size="50" :src="topic.author.avatar_url" :title="topic.author.loginname"></el-avatar>
            <span style="margin-left:20px;display:inline-block;height:20px;line-height:30px;">ID:{{ topic.author.loginname }}</span>
            <div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{topic.replies.length}}个回复</span>
          </div>
          <div v-for="(item,index) in topic.replies" :key="index" class="text item">
            <div style="overflow:hidden;clear:both;">
              <el-avatar style="float:left" shape="circle" size="large" :src="item.author.avatar_url" :title="topic.author.loginname"></el-avatar>
              <div style="float:left;margin-left:15px" v-html="item.content"></div>
              <div style="float:right"><i class="el-icon-star-off"></i>{{item.ups.length}}</div>
            </div>
            <el-divider></el-divider>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'topic',
  data () {
    return {
      topic: null
    }
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
    // 日期处理
    timeTransfrom (val) {
      var time = new Date(val);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hour = time.getHours() + ':';
      var minutes = time.getMinutes() + ':';
      var seconds = time.getSeconds();
      // console.log([year, month, date].join('/'));
      return `${year}/${month}/${date}  ${hour}${minutes}${seconds}`
    }
  },
  created () {
    this.$http.get(`/topic/${this.$route.params.id}`).then((response) => {
      // console.log(response.data)
      this.topic = response.data.data;
    })
  }
}
</script>
<style scope>
img {
  width: 100%;
}
</style>