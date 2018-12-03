<template>
  <div class="container">
    <h1>Price Feeds</h1>
    <table>
      <tr v-for="feed in feeds" :key="feed.pair">
        <td class="pair">{{ feed.name }}</td>
        <td class="price">{{ feed.price }} {{ feed.priceCurrency }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'feeds'
    ])
  }
};
</script>

<style scoped lang="scss">
.container {
  margin: 2.5rem 0;
}
h1 {
  color: #231536;
  font-weight: 600;
  font-size: 1.8rem;
  letter-spacing: -0.1rem;
}
table {
  width: 100%;
  border-spacing: 0;
  tr:not(:last-child) td {
    border-bottom: 1px solid #E5E5E5;
  }
  td {
    padding: 1.2rem 0 1rem;
    &.pair {
      color: #4F445E;
      font-weight: 700;
      font-size: 1.3rem;
    }
    &.price {
      color: #231536;
      font-weight: 400;
      font-size: 1.4rem;
      text-align: right;
    }
  }
}
</style>
