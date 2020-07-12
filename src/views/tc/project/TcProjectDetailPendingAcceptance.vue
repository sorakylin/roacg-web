<template>
  <div>pending-acceptance</div>
</template>


<script>
import TcProjectApi from "@/api/tc/TcProjectApi";

export default {
  name: "TcProjectDetailPendingAcceptance",
  data() {
    return {
      projectId: this.$route.params.pid
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
