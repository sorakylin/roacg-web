<template>
  <default-layout>
    <div id="tc-top-img" style="heign: 120px; border: 1px solid #e8e8e8;">
      <a-empty description="这里放张大头图" />
    </div>
    <div id="tc-home-warp"></div>
  </default-layout>
</template>


<script>
import TcHomeApi from "@/api/tc/TcHomeApi";

export default {};
</script>

<style lang="less" scoped>
//去掉最顶上的菜单阴影
.m-ro-header {
  box-shadow: none;
}

.ro-m-content {
  background-color: #fafafa;
}

#tc-home-warp {
  width: 1198px;
  margin: 0 auto;
  padding-top: 16px;

  @media screen and (max-width: 1438px) {
    width: 999px;
  }
}
</style>
