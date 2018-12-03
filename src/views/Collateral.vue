<template>
  <div class="collateral">
    <div class="heading">Dashboard: {{ activeCollateral }}</div>
    <div class="subheading">Last active 12 Nov 2018</div>

    <div class="grid-wrapper">
      <div class="grid">
        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading tooltip-underline">Liquidation price</div><span class="heading-sm">({{ activeCollateral }}/USD)</span>
            </div>
            <div class="col strong">165.50 USD</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Current price information</div><span class="heading-sm">({{ activeCollateral }}/USD)</span>
            </div>
            <div class="col">249.06 USD</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Liquidation penalty</div>
            </div>
            <div class="col">15.00 %</div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading tooltip-underline">Collateralization ratio</div>
            </div>
            <div class="col strong">826.80 %</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Minimum ratio</div>
            </div>
            <div class="col">150.00 %</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Stability Fee</div>
            </div>
            <div class="col">2.50 %</div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading">{{ activeCollateral }} collateral</div>
            </div>
            <div class="col strong">
              5.5 ETH<span class="separator">&nbsp;|&nbsp;</span>4,312.06 USD
            </div>
          </div>
          <div class="flexbox button-section section-1">
            <div class="col">
              <div class="heading">Locked</div>
            </div>
            <div class="col section-values">
              <div>3.00 {{ activeCollateral }}</div>
              <div>2,352.03 USD</div>
            </div>
            <div class="col section-btn">
              <button>Deposit</button>
            </div>
          </div>

          <div class="flexbox button-section section-2">
            <div class="col">
              <div class="heading max-avail-to-withdraw">Max. available to withdraw</div>
            </div>
            <div class="col section-values">
              <div>2.50 {{ activeCollateral }}</div>
              <div>1,960.03 USD</div>
            </div>
            <div class="col section-btn">
              <button>Withdraw</button>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading">DAI position</div>
            </div>
            <div class="col">&nbsp;</div>
          </div>
          <div class="flexbox button-section section-1">
            <div class="col">
              <div class="heading">Dai generated</div>
            </div>
            <div class="col section-values">
              <div>310.00 DAI</div>
              <div>310.00 USD</div>
            </div>
            <div class="col section-btn">
              <button>Payback</button>
            </div>
          </div>

          <div class="flexbox button-section section-2">
            <div class="col">
              <div class="heading max-avail-to-withdraw">Max. available to generate</div>
            </div>
            <div class="col section-values">
              <div>4,002.01 DAI</div>
              <div>4,002.00 USD</div>
            </div>
            <div class="col section-btn">
              <button>Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collateral",
  computed: {
    activeCollateral() {
      return this.$store.getters.activeCollateral.toUpperCase();
    }

  },
  mounted() {
    console.log('Loaded Collateral view with:', this.$route.params.collateral);
    this.$store.dispatch('setActiveCollateral', this.$route.params.collateral);
  }
};
</script>

<style scoped lang="scss">
@import '~styles/breakpoints.scss';
.collateral {
  & > .heading {
    display: inline-block;
    padding-right: 20px;
    margin: 0;
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 20px;
    letter-spacing: -1pt;
    color: #231536;
  }
  & > .subheading {
    display: inline-block;
    font-size: 14px;
    color: #9aa3ad;
  }
  .grid-wrapper {
    background: #d9d9d9;
    // max-width: 982px;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .grid {
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 1fr 1fr;
    @include respond-to(m) {
      grid-template-columns: 1fr;
    }
  }
  .grid-item {
    background: #fff;
    padding: 30px 30px 20px 30px;
  }
  .flexbox {
    display: flex;
    flex-flow: row wrap;
    font-size: 10px;
    // @media screen and (max-width: 1300px) { font-size: 8px; }
    // @include respond-to(m) { font-size: 10px; }
    // // font-size: calc(5px + ((100vw - 295px) / 240));
    @include respond-to(l) {
      margin-bottom: 28px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    .col {
      color: #9aa3ad;
      font-size: 1.5rem;
      font-weight: 400;
      
      &.strong {
        color: #231536;
        font-size: 1.7rem;
        font-weight: 600;
      }
      &.strong:first-child {
        margin-bottom: 15px;
      }

      margin-bottom: 10px;
      &:first-child {
        flex-grow: 1;
        @include respond-to(l) {
          flex: 100%;
          margin-bottom: 18px !important;
        }
      }

      .heading {
        display: inline-block;
      }
      .heading-sm {
        font-size: 1.4rem;
        font-weight: 400;
        padding-left: 5px;
      }
    }
  }
  
  .section-values {
    margin-right: 15px;
    text-align: right;
    div {
      line-height: 20px;
    }
    div:nth-child(1) {
      color: #231536;
      font-size: 1.7rem;
    }
    div:nth-child(2) {
      color: #9aa3ad;
      font-size: 1.4rem;
    }
  }

  .max-avail-to-withdraw {
    max-width: 125px;
    line-height: 2rem;
    @include respond-to(l) {
      max-width: unset;
    }
    @include respond-to(m) {
      max-width: unset;
    }
  }

  .flexbox.button-section {
    &.section-1 {
      margin-top: 10px;
    }
    &.section-2 {
      margin-top: 20px;
    }
    @include respond-to(l) {
      .col.section-values {
        text-align: left;
      }
    }
    @include respond-to(m) {
      .col:first-child {
        flex: 100%;
      }
      .col.section-values {
        text-align: left;
        flex-basis: auto;
        // min-width: 115px;
      }
      .col.section-btn {
        text-align: left;
      }
    }
  }

  .separator {
    padding: 0 5px;
  }
  button {
    color: #231536;
    font-weight: 500;
    font-size: 1.6rem;
    background: #e2e9ec;
    border-radius: 4px; 

    
    border: none;
    cursor: pointer;
    user-select: none;
    &:focus { outline: none; }
    &:hover { background: #d7e2e6; }
    &:active { background: #1abc9c; }

    width: 120px;
    height: 40px;
    line-height: 38px;
  }
}
</style>
