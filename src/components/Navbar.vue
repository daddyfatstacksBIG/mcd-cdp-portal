<template>
  <aside class="navbar">

    <router-link to="/"><img class="logo" src="/maker-logo.svg" /></router-link>
    <NavbarItem to="/overview" type="overview" id="overview" label="Overview" />
    <NavbarItem v-for="(cdp, idx) in cdps" :key="idx" :to="`/cdp/${cdp.type}`" type="cdp" :id="cdp.type" :label="cdp.symbol" />

    <div class="add-collateral" @click="$emit('clickAddCollateral')">
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.4">
          <rect x="9.75" width="2" height="21" rx="1" fill="white"/>
          <rect x="21" y="9.75006" width="2" height="21" rx="1" transform="rotate(90 21 9.75006)" fill="white"/>
        </g>
      </svg>
    </div>

    <svg class="expand-collateral" width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0.999986L7 5.99999L0.999995 0.999986" stroke="#9AA3AD" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

 </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import NavbarItem from "@/components/NavbarItem.vue";

export default {
  components: {
    NavbarItem
  },
  computed: {
    ...mapGetters([
      'cdps'
    ])
  }
};
</script>

<style lang="scss">
@import '~styles/breakpoints.scss';

aside.navbar {
  grid-area: navbar;
  background: #222;
  .add-collateral {
    cursor: pointer;
    margin: 10px auto 0;
    padding: 10px 0;
    width: 40px;
    @include respond-to(m) {
      display: none;
    }
    svg {
      display: block;
      margin: 0 auto;
    }
    &:hover svg g {
      opacity: 0.85;
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
