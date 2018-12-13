<template>
  <aside class="sidebar-right">
    <SidebarDashboard />
  </aside>
</template>

<script>
import SidebarDashboard from "@/components/SidebarDashboard.vue";

export default {
  components: {
    SidebarDashboard
  }
};
</script>

<style scoped lang="scss">
@import '~styles/breakpoints.scss';

aside.sidebar-right {
  min-height: 1000px;
  @include respond-to(m) {
    display: none;
  }
  background: #fff;
  box-shadow: -1px 0px 3px rgba(159, 159, 159, 0.25);
}
</style>
