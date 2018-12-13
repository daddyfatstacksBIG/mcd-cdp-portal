<template>
  <div class="cdp">
    <div class="view-heading">{{ cdp.symbol }} CDP<span class="last-active-date">Last active {{ cdp.dateLastActive }}</span></div>
    <div class="grid-wrapper">
      <div class="grid">
        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading tooltip-underline">Liquidation price</div><span class="heading-sm">({{ cdp.symbol }}/USD)</span>
            </div>
            <div class="col strong">{{ cdp.liquidationPrice | groupThousands(2) }} USD</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Current price information</div><span class="heading-sm">({{ cdp.symbol }}/USD)</span>
            </div>
            <div class="col">{{ cdp.collateralPrice | groupThousands(2) }} USD</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Liquidation penalty</div>
            </div>
            <div class="col">{{ cdp.liquidationPenalty }} %</div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading tooltip-underline">Collateralization ratio</div>
            </div>
            <div class="col strong">{{ cdp.collateralizationRatio | groupThousands(2) }} %</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Minimum ratio</div>
            </div>
            <div class="col">{{ cdp.liquidationRatio }} %</div>
          </div>
          <div class="flexbox">
            <div class="col">
              <div class="heading tooltip-underline">Stability Fee</div>
            </div>
            <div class="col">{{ cdp.stabilityFee }} %</div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading">{{ cdp.symbol }} collateral</div>
            </div>
          </div>
          <div class="flexbox button-section section-1">
            <div class="col">
              <div class="heading">Locked</div>
            </div>
            <div class="col section-values">
              <div>{{ cdp.deposited | groupThousands(2) }} {{ cdp.symbol }}</div>
              <div>{{ cdp.depositedValueInUsd | groupThousands(2) }} USD</div>
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
              <div>{{ cdp.collateralAvailableToWithdraw | groupThousands(2) }} {{ cdp.symbol }}</div>
              <div>{{ cdp.collateralAvailableToWithdrawInUsd | groupThousands(2) }} USD</div>
            </div>
            <div class="col section-btn">
              <button :disabled="cdp.collateralAvailableToWithdraw === 0">Withdraw</button>
            </div>
          </div>
        </div>

        <div class="grid-item">
          <div class="flexbox">
            <div class="col strong">
              <div class="heading">DAI position</div>
            </div>
          </div>
          <div class="flexbox button-section section-1">
            <div class="col">
              <div class="heading">Dai generated</div>
            </div>
            <div class="col section-values">
              <div>{{ cdp.generated | groupThousands(2) }} DAI</div>
              <div>{{ cdp.generated | groupThousands(2) }} USD</div>
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
              <div>{{ cdp.daiAvailableToGenerate | groupThousands(2) }} DAI</div>
              <div>{{ cdp.daiAvailableToGenerate | groupThousands(2) }} USD</div>
            </div>
            <div class="col section-btn">
              <button :disabled="cdp.daiAvailableToGenerate === 0">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cdp",
  computed: {
    cdp() {
      return this.$store.getters.getCdp(this.$route.params.cdp)
    },
  }
};
</script>

<style scoped lang="scss">
@import '~styles/breakpoints.scss';
.cdp {
  span.last-active-date {
    font-size: 1.4rem;
    color: #9aa3ad;
    padding-left: 20px;
    letter-spacing: normal;
    font-weight: 400;
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
    @include respond-to(l) {
      grid-template-columns: 1fr;
    }
    @include respond-to(m) {
      grid-template-columns: 1fr 1fr;
    }
    @include respond-to(s) {
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
    @include respond-to(m) {
      margin-bottom: 28px;
    }
    &:last-child {
      margin-bottom: 0;
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
        // @include respond-to('l+') {
        //   flex: 100%;
        //   margin-bottom: 18px !important;
        // }
        // @include respond-to(l) {
        //   flex: 100%;
        //   margin-bottom: 18px !important;
        // }
        @include respond-to(m) {
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
    // max-width: 125px;
    max-width: 100px;
    line-height: 2rem;
    @include respond-to(l) {
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
    @include respond-to(m) {
      .col.section-values {
        text-align: left;
      }
      .col.section-btn {
        text-align: right;
        flex: 1;
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
        text-align: right;
        flex: 1;
      }
    }
  }

  .separator {
    padding: 0 5px;
  }
  button {
    font-weight: 500;
    font-size: 1.6rem;
    color: #231536;
    background: #e2e9ec;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    user-select: none;
    &:focus { outline: none; }
    &:hover { background: #d7e2e6; }
    &:active { background: #1abc9c; }
    &:disabled {
      background: #e2e9ec;
      opacity: 0.5;
      cursor: not-allowed;
    }
    width: 120px;
    height: 40px;
    line-height: 38px;
  }
}
</style>
