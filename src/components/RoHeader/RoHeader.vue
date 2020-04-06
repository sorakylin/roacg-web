<template>
  <div>
    <a-row class="m-ro-header">
      <a-col :span="8">
        <a-menu mode="horizontal" :selectable="false" class="m-ro-header-left-tab">
          <a-menu-item key="home">
            <router-link to="/">
              <a-icon type="home" />首页
            </router-link>
          </a-menu-item>
          <a-menu-item key="tc">
            <router-link to="/tc">翻译协同</router-link>
          </a-menu-item>
          <a-menu-item key="bbs" disabled>讨论</a-menu-item>
          <a-menu-item key="db" disabled>资料库</a-menu-item>
        </a-menu>
      </a-col>

      <a-col :span="10"></a-col>

      <!-- 右上角个人信息相关 -->
      <a-col :span="6">
        <a-menu mode="horizontal" :selectable="false" class="m-ro-header-right-tab">
          <!-- 头像 -->
          <a-dropdown v-if="false" overlayClassName="ro-my-info-tab" placement="topCenter">
            <a-avatar :size="32" icon="user" class="ro-my-info" />
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">
                  <a-icon type="user" />个人中心
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">
                  <a-icon type="logout" />退出
                </a>
              </a-menu-item>
            </a-menu>

            <a-menu-item key="message">消息</a-menu-item>
          </a-dropdown>

          <template v-else>
            <a-menu-item key="login">登陆</a-menu-item>
            <a-menu-item key="register">注册</a-menu-item>
          </template>
          
          <a-menu-item key="suggestions">建议·报错</a-menu-item>
        </a-menu>
      </a-col>
    </a-row>

    <!-- 首页上边放个大图片, 更显大气， 但是现在没有合适的素材 先隐藏掉 -->
    <div class="top-header-img" v-if="false"></div>
  </div>
</template>


<script>
export default {
  name: "RoHeader",
  data() {
    return {};
  },
  created() {}
};
</script>


<style lang="less" scoped>
//去掉几个 antd 的默认样式
.ant-menu-horizontal {
  .ant-menu-item:hover,
  .ant-menu-submenu:hover,
  .ant-menu-item-active,
  .ant-menu-submenu-active,
  .ant-menu-item-open,
  .ant-menu-submenu-open,
  .ant-menu-item-selected,
  .ant-menu-submenu-selected {
    color: #1890ff;
    border-bottom: 2px solid transparent;
  }

  border-bottom: none;
}

.m-ro-header {
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: white;
  box-sizing: border-box;
  padding: 10px 24px;
  line-height: 30px;
  position: relative;
  z-index: 10;
  margin: 0 auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;

  //导航栏靠右
  .m-ro-header-right-tab {
    text-align: right;
  }
}

.top-header-img {
  background-color: white;
  width: 100%;
  height: 106px;
  background: url(http://i0.hdslb.com/bfs/space/cf68a78f0e56cd53b3192b8df22b8496f73452a0.png@2200w_400h_1o.webp)
    no-repeat;
}

.ro-my-info-tab {
  width: 280px;

  & > ul > li {
    padding: 8px 23px;
  }
}

.ro-my-info {
  cursor: pointer;
  margin-right: 16px;
}
</style>
