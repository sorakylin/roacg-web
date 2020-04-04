<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">

      <!-- 头部 -->
      <ro-header />

      <!-- 内容 -->
      <a-layout-content style="padding: 0 50px">
        <router-view />
      </a-layout-content>

      <!-- 页面底部 -->
      <ro-footer />
    </a-layout>
  </div>
</template>


<script type='text/ecmascript-6'>
import RoHeader from "components/RoHeader";
import RoFooter from "components/RoFooter";

export default {
  components: {
    RoHeader,
    RoFooter
  }
};
</script>

<style lang="less">
</style>
