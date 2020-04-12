<template>
  <!-- 背景色变灰色 -->
  <default-layout>
    <div id="tc-content">
      <top-header-img></top-header-img>
      <div id="tc-home-warp">
        <a-row id="tc-menu">
          <a-menu
            mode="horizontal"
            :defaultSelectedKeys="['square']"
            style="width:600px; margin: 0 auto"
          >
            <a-menu-item key="square" class="tc-menu-item">
              <router-link to="/tc">广场</router-link>
            </a-menu-item>
            <a-menu-item key="item-list" class="tc-menu-item">
              <router-link to="/tc/item-list">项目中心</router-link>
            </a-menu-item>
            <a-menu-item key="teams" class="tc-menu-item">
              <router-link to="/tc/teams">组织</router-link>
            </a-menu-item>
            <a-menu-item key="mytc" class="tc-menu-item" :disabled="!this.$store.getters.loginStatus()">
              <router-link to="/tc/mytc">我的</router-link>
            </a-menu-item>
            <a-menu-item key="tcinfo" class="tc-menu-item">
              <router-link to="/tc/tcinfo">关于</router-link>
            </a-menu-item>
          </a-menu>
        </a-row>
        <router-view></router-view>
        <!-- <a-row type="flex" :gutter="[8,8]">
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
        </a-row>-->
      </div>
    </div>
  </default-layout>
</template>


<script>
import TcTeamsApi from "@/api/tc/TcTeamsApi";

import TopHeaderImg from "@/components/ImgTemplate/TopHeaderImg";

export default {
  name: "TcHome",
  components: { TopHeaderImg }
};
</script>

<style lang="less" scoped>
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

    .tc-menu-item {
      text-align: center;
      width: 15%;
    }
  }
}
</style>
