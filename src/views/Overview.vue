<template>
  <div>
    <Heading>Overview</Heading>
    <Grid>
      <GridItem flex class="item-your-funds">
        <div class="heading">Your Funds</div>
        <GridItemBox>
          <p4>Dai Generated</p4>
          <h2>{{ totalDaiGenerated | groupThousands(2) }}</h2>
          <div class="box-footer">
            <p6 class="float-left" style="color: #979797; padding-left: 15px;">Dai Available to Generate</p6>
            <p6 class="float-right" style="color: rgba(72, 73, 95, 0.8); padding-right: 15px;">{{ totalDaiAvailableToGenerate | groupThousands(0) }} DAI</p6>
          </div>
        </GridItemBox>
      </GridItem>
      <GridItem flex class="item-your-funds-2">
        <GridItemBox>
          <p4>Collateral Locked</p4>
          <h2>${{ totalCollateralLockedInUsd | groupThousands(2) }}<p4 inline padLeft="1rem">USD</p4></h2>
        </GridItemBox>
      </GridItem>
      <GridItem flex class="item-your-risk">
        <div class="heading">Your Risk</div>
        <GridItemBox noMargin>
          <div style="overflow: hidden;">
          <Flex v-if="!this.$store.state.showPlaceholders">
            <div class="flex-item your-risk-table">
              <table class="maker-table">
                <thead>
                  <tr>
                    <th>TYPE</th>
                    <th>RISK</th>
                    <th class="text-right">LIQUIDATION&nbsp;%</th>
                    <th class="text-right">LIQUIDATION&nbsp;$</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cdp, idx) in cdps" :key="idx" :class="{ 'selected': cdpSelectedIndex === idx, 'hovered': cdpHoveredIndex === idx }">
                    <td class="asset" style="min-width: 60px;">
                      {{ cdp.symbol }}
                    </td>
                    <td>
                      <div class="c-ratio" :class="{ 'over-9999': cdp.collateralizationRatio > 9999, safe: cdp.collateralizationRatio >= 250, warning: cdp.collateralizationRatio > 200 && cdp.collateralizationRatio < 250, danger: cdp.collateralizationRatio <= 200 }"><span>&gt;</span>{{ (cdp.collateralizationRatio < 10000 ? cdp.collateralizationRatio : 9999) }}%</div>
                    </td>
                    <td class="text-right">{{ cdp.liquidationRatio }}%</td>
                    <td class="text-right" v-html="$options.filters.formatCurrency(cdp.liquidationPrice, 2)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex-item chart">
              <apexchart class="apexchart" type="donut" :options="chartOptions" :series="cdpCollateralValuesInUsd" />
              <div class="stacked-bar-chart">
                <div v-for="(cdp, idx) in cdps" :key="idx" class="item" :class="[cdp.riskState, `type-${cdp.type}`]" :style="{ flex: Math.round(cdp.depositedValueInUsd) + ' 1 105px' }"><i /><div class="cdp-value">{{ cdp.depositedValueInUsd | formatCurrency(2) }}</div></div>
              </div>
            </div>
            <div class="flex-item"></div>
            <div class="flex-item"></div>
          </Flex>
          </div>
        </GridItemBox>
      </GridItem>
    </Grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Heading from "components/Heading.vue";
import Grid from "components/Grid.vue";
import GridItem from "components/GridItem.vue";
import GridItemBox from "components/GridItemBox.vue";
import Flex from "components/Flex.vue";
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    Heading, Grid, GridItem, GridItemBox, Flex, apexchart: VueApexCharts
  },
  data() {
    return {
      cdpSelectedIndex: null,
      cdpHoveredIndex: null
    }
  },
  computed: {
    ...mapGetters([
      'cdps',
      'totalDaiGenerated',
      'totalCollateralLockedInUsd',
      'totalDaiAvailableToGenerate'
    ]),
    cdpTypes() {
      return this.cdps.map((_, i, arr) => _.symbol);
    },
    cdpCollateralValuesInUsd() {
      return this.cdps.map((_, i, arr) => _.depositedValueInUsd);
    },
    cdpColors() {
      const colors = {
        safe: '#1aab9b',
        warning: '#fdc134',
        danger: '#c0392b'
      };
      return this.cdps.map((_, i, arr) => colors[_.riskState]);
    },
    chartOptions() {
      return {
        plotOptions: {
          pie: {
            donut: {
              size: '87%',
              background: 'transparent'
            }
          }
        },
        states: {
          normal: {
            filter: {
              type: 'none',
              value: 0,
            }
          },
          hover: {
            filter: {
              type: 'lighten',
              value: 0.01,
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: 'darken',
              value: 0.9,
            }
          },
        },
        stroke: {
          show: false,
        },
        labels: this.cdpTypes,
        fill: {
          type: 'solid',
          colors: this.cdpColors,
        },
        tooltip: {
          enabled: false
        },
        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(`Donut chart dataPointSelection for item: ${config.dataPointIndex}`);
              // eslint-disable-next-line
              this.cdpSelectedIndex = config.dataPointIndex;
              this.$forceUpdate();
            },
            dataPointMouseEnter: (event, chartContext, config) => {
              console.log(`Donut chart dataPointMouseEnter for item: ${config.dataPointIndex}`);
              if (this.cdpHoveredIndex !== config.dataPointIndex) {
                // eslint-disable-next-line
                this.cdpHoveredIndex = config.dataPointIndex;
                this.$forceUpdate();
              }
            },
            dataPointMouseLeave: (event, chartContext, config) => {
              console.log(`Donut chart dataPointMouseLeave for item: ${config.dataPointIndex}`);
              if (this.cdpHoveredIndex !== null) {
                // eslint-disable-next-line
                this.cdpHoveredIndex = null;
                this.$forceUpdate();
              }
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '~styles/breakpoints.scss';
.box-footer {
  margin-left: -15px;
  margin-right: -15px;
  border-top: 1px solid #D9D9D9;
  line-height: 36px;
  > * {
    font-size: 12px;
    line-height: 36px;
  }
}
span.last-active-date {
  font-size: 1.4rem;
  color: #9aa3ad;
  padding-left: 20px;
  letter-spacing: normal;
  font-weight: 400;
}

.grid-wrapper {
  width: 100%;
  grid-gap: 2.2rem;

  grid-template-columns: auto;
  @include respond-to(s) {
    grid-template-columns: 1fr;
  }

  .item-your-risk {
    grid-column: 2;
    grid-row: 1 / 3;
    @include respond-to('l+') {
      grid-column: 1 / 3;
      grid-row: 2;
    }
    @include respond-to(s) {
      grid-column: 1;
      grid-row: auto;
    }
  }
  .item-your-funds-2 {
    @include respond-to('l+') {
      padding-top: 4.7rem;
    }
    @include respond-to(s) {
      padding-top: 0;
    }
  }
  .item-transaction-history {
    grid-column: 1 / 3;
    grid-row: 4;
  }
}

.heading {
  color: #231536;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 1.4rem;
}

h2 {
  margin: 1.4rem 0;
}
.p4 {
  color: #979797;
}

.c-ratio {
  border-radius: 20px;
  width: 60px;
  height: 28px;
  text-align: center;
  line-height: 29px;
  font-size: 1.4rem;
  font-weight: 500;
  span {
    display: none;
  }
  &.over-9999 {
    font-size: 1.3rem;
    span {
      display: inline;
      position: relative;
      font-size: 0.8rem;
      top: -2px;
    }
  }
  &.safe {
    background: #D3F8F0;
    color: #1AAB9B;
  }
  &.warning {
    background: #FFF2D8;
    color: #C17400;
  }
  &.danger {
    background: #FFE3DB;
    color: #F77249;
  }
}
.flex-item {
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  &:empty {
    height: 0;
    border: none;
  };
}
.your-risk-table {
  padding: 15px;
  tr.selected td {
    color: #000;
  }
  flex-grow: 1;
  flex-basis: calc(100% - 250px);
}
.chart {
  position: relative;
  // Push down donut chart
  top: 20px;
  @include respond-to(m) { top: 0; }
  flex-grow: 1;
  flex-basis: 250px;
  @include respond-to(s) {
    order: -1;
    width: 100%;
    flex-basis: 100%;
  }
}

.apexchart {
  display: block;
  @include respond-to(m) {
    display: none;
  }
}

.stacked-bar-chart {
  display: none;
  @include respond-to(m) {
    display: flex;
  }
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  margin: 15px;
  @include respond-to(s) {
    font-size: 1.1rem;
    letter-spacing: 0;
  }
  color: #fff;
  height: 35px;
  line-height: 35px;
  .item {
    cursor: pointer;
    &:first-child {
      border-radius: 8px 0 0 8px;
    }
    &:last-child {
      border-radius: 0 8px 8px 0;
    }
    background: #eee;
    margin: 0 1px;
    padding: 0 15px;
    &.safe { background: #30bd9f; }
    &.warning { background: #fdc134; }
    &.danger { background: #c0392b; }
    .cdp-value {
      float: right;
    }
    i {
      display: block;
      float: left;
      content: ' ';
      background-repeat: no-repeat;
      height: 100%;
      width: 18px;
      padding-left: 18px;
      background-position: center;
    }
    &.type-eth i {
      background-size: 11px;
      background-image: url(/stacked-chart-eth.svg);
    }
    &.type-omg i {
      background-size: 14px;
      background-image: url(/stacked-chart-omg.svg);
    }
    &.type-dgx i { background-image: url(/stacked-chart-dgx.svg); }
  }
}
</style>
