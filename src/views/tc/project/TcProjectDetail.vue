<template>
  <default-layout>
    <div id="project-content">
      <!-- 顶上的面包屑 -->
      <a-row type="flex" id="project-top"></a-row>
      <!-- 顶上的菜单 -->
      <a-row type="flex">
        <a-menu
          v-model="currentMenu"
          mode="horizontal"
          style="padding: 0 32px 0 32px;width: 100%;height: 50px;margin-bottom: 32px;"
        >
          <a-menu-item key="document">
            <a-icon type="mail" />Navigation One
          </a-menu-item>
          <a-menu-item key="app" disabled>
            <a-icon type="appstore" />Navigation Two
          </a-menu-item>
          <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper">
              <a-icon type="setting" />Navigation Three - Submenu
            </span>
            <a-menu-item-group title="Item 1">
              <a-menu-item key="setting:1">Option 1</a-menu-item>
              <a-menu-item key="setting:2">Option 2</a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="Item 2">
              <a-menu-item key="setting:3">Option 3</a-menu-item>
              <a-menu-item key="setting:4">Option 4</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-menu-item key="alipay">
            <a
              href="https://antdv.com"
              target="_blank"
              rel="noopener noreferrer"
            >Navigation Four - Link</a>
          </a-menu-item>
        </a-menu>
      </a-row>
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
      projectId: this.$route.query.pid
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
