<template>
  <default-layout>
    <div id="project-content">
      <!-- 顶上的面包屑 -->
      <a-row type="flex" id="project-top">
        <a-breadcrumb style="font-size:25px; margin:0 auto">
          <a-icon
            type="project"
            :style="{ fontSize: '25px', color: '#233142' ,marginRight:'10px'}"
          />
          <a-breadcrumb-item>
            <a href>团队名 or 用户名</a>
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <a href>项目名</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </a-row>
      <!-- 顶上的菜单 -->
      <a-row type="flex">
        <a-menu
          v-model="currentMenu"
          mode="horizontal"
          style="padding: 0 32px 0 32px;width: 100%;height: 50px;margin-bottom: 32px;"
        >
          <a-menu-item key="document">
            <router-link :to="`/tc/project/${this.projectId}`">
              <a-icon type="profile" />项目
            </router-link>
          </a-menu-item>
          <a-menu-item key="contributor">
            <router-link :to="`/tc/project/${this.projectId}/contributor`">
              <a-icon type="user" />贡献者
            </router-link>
          </a-menu-item>
          <a-menu-item key="pendingAcceptance">
            <router-link :to="`/tc/project/${this.projectId}/pending-acceptance`">
              <a-icon type="exception" />待验收
            </router-link>
          </a-menu-item>
        </a-menu>
      </a-row>

      <router-view></router-view>
    </div>
  </default-layout>
</template>


<script>
import TcProjectApi from "@/api/tc/TcProjectApi";

export default {
  name: "TcProjectDetail",
  data() {
    return {
      currentMenu: ["document"],
      projectId: this.$route.params.pid
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
#project-content {
  background-color: white;
}
#project-top {
  background-color: white;
  z-index: 11;
  position: relative;
  width: 100%;
  padding: 0 32px 0 32px;
  height: 32px;
  margin-bottom: 16px;
}
</style>
