<template>
  <aside class="sidebar-left">
    <img class="logo" src="/maker-logo.svg" />
    <NavbarCollateral collateral="eth" ratio="201.29" :active="activeCollateral === 'eth'" @change="navigateToCollateral" />
    <NavbarCollateral collateral="omg" ratio="160.90" :active="activeCollateral === 'omg'" @change="navigateToCollateral" />
    <NavbarCollateral collateral="dgx" ratio="324.90" :active="activeCollateral === 'dgx'" @change="navigateToCollateral" />
    <img class="add-collateral" src="/add-collateral.svg" />
    <div class="expand-collateral">
      <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 0.999986L7 5.99999L0.999995 0.999986" stroke="#9AA3AD" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import NavbarCollateral from "@/components/NavbarCollateral.vue";

export default {
  components: {
    NavbarCollateral
  },
  computed: {
    ...mapGetters([
      'activeCollateral'
    ])
  },
  methods: {
    navigateToCollateral(collateral) {
      console.log('navigateToCollateral:', collateral)
      this.$store.dispatch('navigateToCollateral', collateral)
    }
  }
};
</script>

<style lang="scss">
@import '~styles/breakpoints.scss';
aside.sidebar-left {
  .add-collateral {
    margin: 10px auto 0;
    display: block;
    cursor: pointer;
    padding: 10px;
    @include respond-to(m) {
      display: none;
    }
  }
  .expand-collateral {
    display: none;
    cursor: pointer;
    @include respond-to(m) {
      display: inline-block;
      margin: 36px 10px;
    }
  }
  .logo {
    margin: 23px auto 40px;
    display: block;
    @include respond-to(m) {
      float: left;
      margin: 29px;
    }
  }
}
</style>
