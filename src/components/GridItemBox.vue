<template>
  <div class="box">
    <div :class="{ 'box-content': noMargin === false }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noMargin: Boolean
  }
};
</script>
<style scoped lang="scss">
.box {
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  flex-grow: 1; // For use with flexbox
}
.box-content {
  // margin: 15px 15px 25px 15px;
  margin: 15px 15px 15px 15px;
}
</style>
