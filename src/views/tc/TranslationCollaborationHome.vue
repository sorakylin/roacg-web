<template>
  <!-- 背景色变灰色 -->
  <default-layout>
    <div id="tc-content">
      <div
        id="tc-top-img"
        style="height: 120px; border: 1px solid #e8e8e8;background-color: white;z-index: 11;position: relative;"
      >
        <a-empty description />
      </div>
      <div id="tc-home-warp">
        <a-row id="tc-menu">
          <a-menu
            mode="horizontal"
            :defaultSelectedKeys="['square']"
            style="width:600px; margin: 0 auto"
          >
            <a-menu-item key="square" class="tc-menu-item">广场</a-menu-item>
            <a-menu-item key="item-list" class="tc-menu-item">项目集</a-menu-item>
            <a-menu-item key="my" class="tc-menu-item" :disabled="true">我的</a-menu-item>
            <a-menu-item key="info" class="tc-menu-item">关于</a-menu-item>
          </a-menu>
        </a-row>
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
      </div>
    </div>
  </default-layout>
</template>


<script>
import TcHomeApi from "@/api/tc/TcHomeApi";

export default {};
</script>

<style lang="less" scoped>
#tc-menu {
  .tc-menu-item {
    text-align: center;
    width: 15%;
  }
}

#tc-home-warp {
  background-color: white;
  width: 1198px;
  margin: 0 auto;
  padding-top: 16px;

  @media screen and (max-width: 1438px) {
    width: 999px;
  }

  #tc-menu {
    margin-top: 25px;
    margin-bottom: 25px;
  }
}
</style>
