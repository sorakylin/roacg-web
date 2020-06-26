<template>
  <a-row type="flex" :gutter="[8,8]" style="min-height: 500px"></a-row>
</template>


<script>
// 组件
import TcTeamsApi from "@/api/tc/TcTeamsApi";

export default {
  name: "TcMy",
  data() {
    return {};
  },
  created() {
    TcTeamsApi.findMyTeams()
      .then(res => {
        //渲染我加入的项目组栏位
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
</style>
