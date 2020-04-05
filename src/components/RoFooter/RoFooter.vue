<template>
  <a-layout-footer class="ro-footer">
    <div class="link-box">这里是一个有爱的社区哒~</div>
  </a-layout-footer>
</template>


<script>
export default {
  name: "RoFooter"
};
</script>

<style lang="less">
.ro-footer {
  text-align: center;
  align-content: center;

  .link-box {
    min-height: 180px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
