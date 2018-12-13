import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./globalComponents";
import { groupThousands } from './utils/helpers';

Vue.config.productionTip = false;

Vue.filter('formatCurrency', (value, decimalPlaces = false) => {
  if (value == null) return '&infin;';
  return '$' + (decimalPlaces !== false ? groupThousands(Number(value).toFixed(decimalPlaces)) : groupThousands(value));
});

Vue.filter('groupThousands', (value, decimalPlaces = false) => {
  return decimalPlaces !== false ? groupThousands(Number(value).toFixed(decimalPlaces)) : groupThousands(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
