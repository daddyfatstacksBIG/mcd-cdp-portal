<template>
  <div class="grid-wrapper" :style="{ 'grid-gap': gridGap, 'grid-template-columns': gridTemplateColumns, 'width': width }">
    <slot />
  </div>
</template>

<script>
export default {
  props: ['grid-gap', 'grid-template-columns', 'width']
};
</script>

<style lang="scss">
.grid-wrapper {
  display: grid;
}
</style>
