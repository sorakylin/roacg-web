
<template>
  <a-layout class="layout">
    <!-- 头部 -->
    <ro-header />

    <!-- 内容 -->
    <a-layout-content
      :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
    >
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
  components: { RoHeader, RoFooter },
  data() {
    return {
    }
  }
};
</script>

<style lang="less">
</style>

