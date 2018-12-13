<template>
  <div id="app">
    <AddCollateralModal v-if="showAddCollateralModal" @close="showAddCollateralModal = false" />

    <div class="grid">
      <Navbar @clickAddCollateral="showAddCollateralModal = true" />
      <router-view id="view" />
      <Sidebar />
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import AddCollateralModal from "@/components/AddCollateralModal.vue";

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    AddCollateralModal
  },
  data() {
    return {
      showAddCollateralModal: false
    }
  }
}
</script>

<style lang="scss">
@import "styles/app.scss";
</style>
