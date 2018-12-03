<template>
  <div class="sidebar-dashboard">
    <section class="header">
      <img src="/placeholder-wallet.png" height="50" />
      </section>
    <section class="network">
      <span class="dot" :class="`network-${networkName}`"></span>{{ networkDisplayName }}
    </section>
    <section class="wallet">
      <SidebarWallet />
    </section>
    <section class="feeds">
      <SidebarFeeds />
    </section>
    <section class="system">
      <SidebarSystem />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarWallet from "@/components/SidebarWallet.vue";
import SidebarFeeds from "@/components/SidebarFeeds.vue";
import SidebarSystem from "@/components/SidebarSystem.vue";

export default {
  // name: 'SidebarDashboard',
  components: {
    SidebarWallet,
    SidebarFeeds,
    SidebarSystem
  },
  computed: {
    ...mapGetters([
      'networkName',
      'networkDisplayName',
    ])
  }
};
</script>

<style scoped lang="scss">
.sidebar-dashboard {
  section {
    padding: 0 20px;
    border-bottom: 1px solid #E0E0E0;
    // height: 100px;
    box-sizing: content-box;
    
    &.header {
      height: 50px;
      margin-top: 1px;
    }
    &.network {
      height: 30px;
      line-height: 30px;
      color: #48495F;
      font-size: 12px;
    }
    &.wallet {
      padding: 0 7px;
    }
    &.system {
      border-bottom: none;
    }
  }
}
.dot {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin: 0 1rem 0 0.2rem;
  &.network-mainnet {
    background: #1abc9c;
  }
  &.network-kovan {
    background: #690496;
  }
}
</style>
