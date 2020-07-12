<template>
  <a-row type="flex" :gutter="[25,25]" style="width: 1200px; margin: 0 auto">
    <!-- 文档文件树 -->
    <a-col :span="20">
      <a-card title="Default size card" style="min-height: 130px">
        <a slot="extra" href="#">more</a>
      </a-card>
    </a-col>
    <!-- 侧边栏 -->
    <a-col :span="4">
      <a-row type="flex" :gutter="[8,8]">
        <a-col :span="24">
          <h3>简介</h3>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>


<script>
import TcProjectApi from "@/api/tc/TcProjectApi";

export default {
  name: "TcProjectDetailInfo",
  data() {
    return {
      projectId: this.$route.params.pid
    };
  },
  created() {
    this.projectInfoInit();
  },
  methods: {
    projectInfoInit() {}
  }
};
</script>

<style lang="less" scoped>
</style>
