<template>
  <a-row type="flex" :gutter="[8,8]">
    <a-col :span="17">
      <a-card :bordered="true" style="width: 90%;margin-left: 20px">
        <h3>平台数据</h3>
        <a-card :loading="true" :bordered="false">aa</a-card>
      </a-card>
    </a-col>
    <a-col :span="7">
      <a-card :bordered="false" style="width: 100%">
        <div style="min-height: 240px">
          <h3>活跃组织</h3>
          <a-empty description="暂无" />
        </div>
        <a-divider />

        <div style="min-height: 300px">
          <h3>最新组织</h3>
          <a-empty description="暂无" />
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>


<script>
import TcTeamsApi from "@/api/tc/TcTeamsApi";

export default {
  name: "TcSquare",
  data() {
    return {};
  },
  created() {
    TcTeamsApi.findNewlyCreatedTeams()
      .then(res => {
        //TODO do...
      })
      .catch(err => {
        console.log(err);
      });
    TcTeamsApi.findMostActiveTeams()
      .then(res => {
        //TODO do...
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
</style>
