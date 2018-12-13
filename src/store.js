import Vue from "vue";
import Vuex from "vuex";
import router from './router';
import { groupThousands } from './utils/helpers';

Vue.use(Vuex);

const filterCdp = (state, cdp) => {
  const collateralizationRatio = ((cdp.deposited * state.feeds[cdp.type].price) / cdp.generated) * 100;
  let daiAvailableToGenerate = (cdp.deposited * state.feeds[cdp.type].price) * (1 / state.collateralTypes[cdp.type].liquidationRatio) - cdp.generated;
  if (daiAvailableToGenerate < 0) daiAvailableToGenerate = 0;
  let collateralAvailableToWithdraw = (((state.collateralTypes[cdp.type].liquidationRatio * cdp.generated) - (cdp.deposited * state.feeds[cdp.type].price)) / state.feeds[cdp.type].price);
  collateralAvailableToWithdraw = collateralAvailableToWithdraw >= 0 ? 0 : Math.abs(collateralAvailableToWithdraw);
  return {
    type: cdp.type,
    symbol: cdp.type.toUpperCase(),
    identifier: cdp.urnIdentifier,
    deposited: cdp.deposited,
    depositedValueInUsd: cdp.deposited * state.feeds[cdp.type].price,
    generated: cdp.generated,
    daiAvailableToGenerate: daiAvailableToGenerate,
    collateralAvailableToWithdraw: collateralAvailableToWithdraw,
    collateralAvailableToWithdrawInUsd: collateralAvailableToWithdraw * state.feeds[cdp.type].price,
    collateralPrice: state.feeds[cdp.type].price,
    collateralizationRatio: Math.round(collateralizationRatio),
    liquidationRatio: (state.collateralTypes[cdp.type].liquidationRatio * 100).toFixed(2),
    liquidationPrice: cdp.generated === 0 || cdp.deposited === 0 ? null : ((state.collateralTypes[cdp.type].liquidationRatio * cdp.generated) / cdp.deposited).toFixed(2),
    liquidationPenalty: (state.collateralTypes[cdp.type].liquidationPenalty * 100).toFixed(2),
    stabilityFee: (state.collateralTypes[cdp.type].stabilityFee * 100).toFixed(2),
    color: state.collateralTypes[cdp.type].color,
    riskState: (collateralizationRatio >= 250 ? 'safe' : (collateralizationRatio > 200 ? 'warning' : 'danger')), // TODO: Use an enum here
    dateLastActive: cdp.dateLastActive
  }
}

export default new Vuex.Store({
  state: {
    showPlaceholders: false,
    walletTokens: [
      { type: 'dai', symbol: 'DAI', address: '0x0000000000000000000000000000000000000001', balance: 51534.12, unlocked: false },
      { type: 'eth', symbol: 'ETH', address: '0x0000000000000000000000000000000000000002', balance: 890.301, unlocked: false },
      { type: 'mkr', symbol: 'MKR', address: '0x0000000000000000000000000000000000000003', balance: 20.902, unlocked: true },
      { type: 'omg', symbol: 'OMG', address: '0x0000000000000000000000000000000000000004', balance: 19302.002, unlocked: true },
      { type: 'dgx', symbol: 'DGX', address: '0x0000000000000000000000000000000000000005', balance: 400.323, unlocked: false }
    ],
    cdps: [
      { type: 'eth', urnIdentifier: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC1', deposited: 10.15, generated: 3400, dateLastActive: '23 Nov 2018' },
      { type: 'omg', urnIdentifier: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC2', deposited: 3000, generated: 1870, dateLastActive: '4 Dec 2018' },
      { type: 'dgx', urnIdentifier: '0xCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC3', deposited: 125, generated: 4000, dateLastActive: '12 Nov 2018' }
    ],
    feeds: {
      dai: { name: 'DAI/USD', price: 1.00, priceCurrency: 'USD' },
      eth: { name: 'ETH/USD', price: 1045.07, priceCurrency: 'USD' },
      mkr: { name: 'MKR/USD', price: 784.01, priceCurrency: 'USD' },
      omg: { name: 'OMG/USD', price: 1.28, priceCurrency: 'USD' },
      dgx: { name: 'DGX/USD', price: 40.81, priceCurrency: 'USD' }
    },
    collateralTypes: {
      dai: { color: '#fdc134', liquidationRatio: 1.5, stabilityFee: 0.025, liquidationPenalty: 0.15 },
      mkr: { color: '#1aab9b', liquidationRatio: 1.5, stabilityFee: 0.025, liquidationPenalty: 0.15 },
      eth: { color: '#6680e3', liquidationRatio: 1.5, stabilityFee: 0.025, liquidationPenalty: 0.15 },
      omg: { color: '#2458e7', liquidationRatio: 1.5, stabilityFee: 0.025, liquidationPenalty: 0.15 },
      dgx: { color: '#bb9f62', liquidationRatio: 1.5, stabilityFee: 0.025, liquidationPenalty: 0.15 }
    },
    network: {
      name: 'mainnet'
    },
    system: {
      globalCollateralizationRatio: 756.76,
      totalDaiSupply: 68430234.02,
      debtCeiling: 100000000,
      numberOfActiveCDPs: 4102
    }
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
    walletTokens: state => {
      return state.walletTokens.map(token => {
        return {
          symbol: token.symbol,
          balance: groupThousands(token.balance),
          balanceInUsd: groupThousands(token.balance * state.feeds[token.type].price),
          unlocked: token.unlocked,
          color: state.collateralTypes[token.type].color
        }
      });
    },
    totalDaiGenerated: state => {
      return state.cdps.reduce((acc, cdp) => {
        return acc + cdp.generated;
      }, 0);
    },
    totalDaiAvailableToGenerate: state => {
      return state.cdps.reduce((acc, cdp) => {
        return acc + (cdp.deposited * state.feeds[cdp.type].price) * (1 / state.collateralTypes[cdp.type].liquidationRatio) - cdp.generated;
      }, 0);
    },
    totalCollateralLockedInUsd: state => {
      return state.cdps.reduce((acc, cdp) => {
        return acc + (cdp.deposited * state.feeds[cdp.type].price);
      }, 0);
    },
    cdps: state => {
      return state.cdps.map(cdp => filterCdp(state, cdp))
    },
    feeds: state => {
      return Object.keys(state.feeds).map(key => {
        return {
          type: state.feeds[key].type,
          pair: state.feeds[key].pair,
          name: state.feeds[key].name,
          price: groupThousands(state.feeds[key].price.toFixed(2)),
          priceCurrency: state.feeds[key].priceCurrency
        }
      });
    },
    system: state => {
      return {
        globalCollateralizationRatio: groupThousands(state.system.globalCollateralizationRatio),
        totalDaiSupply: groupThousands(state.system.totalDaiSupply),
        debtCeiling: groupThousands(state.system.debtCeiling),
        numberOfActiveCDPs: groupThousands(state.system.numberOfActiveCDPs)
      };
    },
    getCdp: (state, getters) => (type) => {
      const cdp = state.cdps.find(cdp => cdp.type === type);
      return filterCdp(state, cdp);
    }
  },
  mutations: {},
  actions: {}
});
