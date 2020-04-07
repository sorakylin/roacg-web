<template>
  <div class="pt-header-img" :style="boxStyle">
    <a-empty v-if="!url" description />
    <img v-else :url="url" />
  </div>
</template>


<script>
export default {
  props: {
    url: String,
    height: String
  },
  data() {
    return {
      boxStyle: {
        height: this.height ? this.height : "120px"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.pt-header-img {
  background-color: white;
  z-index: 11;
  position: relative;
}
</style>