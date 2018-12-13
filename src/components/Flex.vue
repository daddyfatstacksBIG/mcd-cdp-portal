<template>
  <div class="flex-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  props: []
};
</script>

<style lang="scss">
.flex-wrapper {
  display: flex;
  flex-wrap: wrap;
  // Hide superfluous border
  margin: 0 -1px -1px 0;
}
</style>
