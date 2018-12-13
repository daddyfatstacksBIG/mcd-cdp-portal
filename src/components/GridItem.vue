<template>
  <div :class="{ flex: flex }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    flex: Boolean
  }
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
