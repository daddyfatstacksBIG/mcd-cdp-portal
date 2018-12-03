<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  name: "home",
  components: {
  },
  mounted() {
    this.$router.push('/collateral/eth');
  }
};
</script>
