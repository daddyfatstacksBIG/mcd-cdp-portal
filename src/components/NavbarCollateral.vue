<template>
  <div class="collateral" :class="{ active: active }" @click="$emit('change', collateral)">
    <div class="collateral-type">{{ collateral }}</div>
    <div class="collateral-ratio" :class="{ red: !active && ratio < 200, green: !active && ratio >= 200 }">{{ ratio }}%</div>
  </div>
</template>

<script>
export default {
  props: {
    collateral: String,
    ratio: String,
    active: Boolean
  }
};
</script>

<style scoped lang="scss">
@import '~styles/breakpoints.scss';

.collateral {
  width: 66px;
  height: 54px;
  margin: 0 auto;
  @include respond-to(m) {
    display: inline-block;
    margin: 13px 3px;
    float: left;
  }
  cursor: pointer;
  background: #383838;
  &.active {
    background: #30bd9f;
  }
  border-radius: 4px;
  line-height: 17px;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 10px;
  
  .collateral-type {
    font-weight: 700;
    padding-top: 10px;
    text-transform: uppercase;
  }
  .collateral-ratio {
    font-weight: 500;
    font-size: 1.15rem;
    color: #fff;
  }
  
  color: #f8f8f8;
  .green {
    color: #31bd9f;
  }
  .red {
    color: #f35833;
  }
  .white {
    color: #fff;
  }
}
</style>
