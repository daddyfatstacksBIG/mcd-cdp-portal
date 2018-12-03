import Vue from "vue";
import Vuex from "vuex";
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    assets: [
      { name: 'dai', balance: '512,534.12', unlocked: false },
      { name: 'mkr', balance: '20.902', unlocked: false },
      { name: 'eth', balance: '890.301', unlocked: false },
      { name: 'omg', balance: '19,302.002', unlocked: true },
      { name: 'dgx', balance: '400.323', unlocked: false }
    ],
    feeds: [
      { pair: 'eth_usd', name: 'ETH/USD', price: '784.01', priceCurrency: 'USD' },
      { pair: 'dai_usd', name: 'DAI/USD', price: '1.00', priceCurrency: 'USD' },
      { pair: 'mkr_usd', name: 'MKR/USD', price: '1,045.07', priceCurrency: 'USD' }
    ],
    network: {
      name: 'mainnet'
    },
    system: {
      globalCollateralizationRatio: '756.76',
      totalDaiSupply: '68,430,234.02',
      debtCeiling: '100,000,000',
      activeCDPs: '4,102'
    },
    activeCollateral: 'eth',
  },
  getters: {
    networkName: state => state.network.name,
    networkDisplayName: state => {
      const networks = {
        mainnet: 'Ethereum Mainnet',
        kovan: 'Kovan Test Network'
      };
      return networks[state.network.name];
    },
    assets: state => state.assets,
    assetColor: (state) => (asset) => {
      const colors = {
        dai: '#fdc134',
        mkr: '#1aab9b',
        eth: '#6680e3',
        omg: '#2458e7',
        dgx: '#bb9f62',
      };
      return colors[asset];
    },
    feeds: state => state.feeds,
    system: state => state.system,
    activeCollateral: state => state.activeCollateral,
  },
  mutations: {},
  actions: {
    // addCollateral: (context, payload) => {
    //   // context.commit("ADD_COLLATERAL", payload)
    // },
    setActiveCollateral(context, collateral) {
      console.log('setActiveCollateral collateral', collateral)
      this.state.activeCollateral = collateral;
    },
    navigateToCollateral(context, collateral) {
      this.state.activeCollateral = collateral;
      router.push(`/collateral/${collateral}`);
    }
  }
});
