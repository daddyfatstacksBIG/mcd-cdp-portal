<template>
  <div class="container">
    <h1>System Information</h1>

    <div class="param">GLOBAL COLLATERALIZATION</div>
    <div class="value">{{ system.globalCollateralizationRatio }} %</div>

    <div class="param">TOTAL DAI SUPPLY</div>
    <div class="value">{{ system.totalDaiSupply }} DAI</div>

    <div class="param">DAI DEBT CEILING</div>
    <div class="value">{{ system.debtCeiling }} DAI</div>

    <div class="param">ACTIVE CDPS</div>
    <div class="value">{{ system.numberOfActiveCDPs }} CDPs</div>

    <a href="#">Go to System Overview</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'system'
    ])
  }
};
</script>

<style scoped lang="scss">
.container {
  margin: 2.5rem 0;
  margin: 1.9rem 0;
}
h1 {
  color: #231536;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: -0.03rem;
}
h1 + .param {
  margin-top: 2.5rem;
}
.param {
  color: #4f445e;
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1rem 0;
}
.value {
  color: #231536;
  font-weight: 400;
  font-size: 1.4rem;
  margin: 1rem 0 3.5rem;
}
a {
  color: #2d9cdb;
  font-weight: 700;
  font-size: 1.3rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
