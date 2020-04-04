<template>
  <a-layout-header>
    <a-menu
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
  </a-layout-header>
</template>


<script>
export default {
  name: 'RoHeader',
  created(){
    console.log('header init')
  }
};
</script>

<style lang="less">
</style>
