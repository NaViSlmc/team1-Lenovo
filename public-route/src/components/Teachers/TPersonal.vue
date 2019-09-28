<template>
  <div>
      <my-personal></my-personal>
  </div>
</template>

<script>
import myPersonal from "@/components/common/myPersonal.vue"   //引入个人资料与修改密码页面
export default {
  name: "TPersonal",
  daat() {  //当前组件用到的数据
    return {};
  },
  components: {
      myPersonal
  },
  methods: {    //当前组件用到的数据
    // this.$http.post()
  },
  created() {   //组件加载完成后的生命周期回调，页面加载就展示以下数据

  }
};
</script>

<style lang="">
</style>