<template>
  <table>
    <thead>
      <tr>
        <th>Asset</th>
        <th>Balance</th>
        <th>Send</th>
        <th width="1">Unlock</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="token in walletTokens" :key="token.address">
        <td class="asset">
          <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="2" y2="13" :stroke="token.color" stroke-width="4" stroke-linecap="round" />
          </svg>
          {{ token.symbol }}
        </td>
        <td class="balance">{{ token.balance }}</td>
        <td><button>SEND</button></td>
        <td class="unlock"><ToggleSwitch :on=token.unlocked /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';
import ToggleSwitch from "@/components/ToggleSwitch.vue";

export default {
  components: {
    ToggleSwitch
  },
  computed: {
    ...mapGetters([
      'walletTokens',
      'cdps',
      'collateralColor'
    ])
  }
};
</script>

<style scoped lang="scss">
button {
  color: #231536;
  font-weight: 500;
  font-size: 1rem;
  background: #e2e9ec;
  border-radius: 4px;
  width: 4.8rem;
  height: 2.4rem;
  line-height: 2.3rem;
  border: none;
  cursor: pointer;
  user-select: none;
  &:focus { outline: none; }
  &:hover { background: #d7e2e6; }
  &:active { background: #1abc9c; }
}
table {
  width: 100%;
  border-spacing: 0;
  padding: 1rem 1.4rem;
  thead {
    color: #48495f;
    text-align: left;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.01rem;
    th { padding: 0.6rem 0; }
  }
  tbody td {
    font-size: 1.3rem;
    font-weight: 700;
    color: #48495f;
    padding: 1.2rem 0 1rem;
    &.asset {
      white-space: nowrap;
    }
    &.balance {
      text-overflow: ellipsis;
      font-weight: 400;
      font-size: 1.4rem;
    }
    &.unlock {
      text-align: center;
    }
    svg {
      vertical-align: sub;
      margin-right: 5px;
    }
  }
}
</style>
