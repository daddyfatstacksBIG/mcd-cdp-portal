<template>
  <aside class="sidebar-right">
    <!-- <img v-if="this.$store.state.show_sidebar_placeholder" src="/placeholder-sidebar2.png" width="315" /> -->
    <!-- <img v-if="this.$store.state.show_sidebar_placeholder" src="/placeholder-system.png" width="315" /> -->
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
}
</style>
