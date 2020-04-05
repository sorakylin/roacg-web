<template>
  <div>
    <a-row class="m-ro-header">
      <a-col :span="8">
        <a-menu mode="horizontal" :selectable="false">
          <a-menu-item key="home">
            <a-icon type="home" />首页
          </a-menu-item>
        </a-menu>
      </a-col>

      <a-col :span="12"></a-col>
      <a-col :span="4"></a-col>
    </a-row>

    <!-- 首页上边放个大图片, 更显大气， 但是现在没有合适的素材 先隐藏掉 -->
    <div class="top-header-img" v-if="false"></div>
  </div>
</template>


<script>
export default {
  name: "RoHeader",
  data() {},
  created() {}
};
</script>


<style lang="less" scope>
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
}

.top-header-img {
  background-color: white;
  width: 100%;
  height: 106px;
  background: url(http://i0.hdslb.com/bfs/space/cf68a78f0e56cd53b3192b8df22b8496f73452a0.png@2200w_400h_1o.webp)
    no-repeat;
}
</style>
