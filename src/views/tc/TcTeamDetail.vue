<template>
  <default-layout>
    <a-row type="flex" :gutter="[13,13]" style="min-height: 500px;"></a-row>
  </default-layout>
</template>


<script>
import TcTempApi from "../../api/tc/TcTempApi";

export default {
  name: "TcTeamDetail",
  data() {
    return {
      teamId: this.$route.params.teamId
    };
  },
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      TcTempApi.findTeamDetail(this.teamId)
        .then(res => {
          if (!res.data.success) {
            //报错了 or 不存在此团队? TODO 跳转到404
            return;
          }
          let detail = res.data.data;
          console.log(detail);
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
</style>
