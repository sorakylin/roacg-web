
<template>
  <a-layout class="layout">
    <!-- 头部 -->
    <ro-header />

    <!-- 内容 -->
    <a-layout-content class="ro-m-content">
      <slot></slot>
    </a-layout-content>

    <!-- 页面底部 -->
    <ro-footer />
  </a-layout>
</template>


<script>
import RoHeader from "@/components/RoHeader/RoHeader";
import RoFooter from "@/components/RoFooter/RoFooter";

export default {
  name: "DefaultLayout",
  components: { RoHeader, RoFooter }
};
</script>

<style lang="less" scoped>
.ro-m-content {
  min-height: 980px;
}
</style>

