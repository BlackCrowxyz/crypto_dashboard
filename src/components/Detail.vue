<template>
  <v-container v-if="chartOptions?.series" fluid>
    <v-row v-if="coinDetail">
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-btn icon="mdi-arrow-left" to="Home" class="mr-3"></v-btn>
          <img :src="coinDetail.image.thumb" class="pr-2" />
          <span class="font-weight-bold text-subtitle-1">
            {{ coinDetail.name }} Price chart ({{ coinDetail.symbol }})
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle v-model="options.mode" variant="outlined" divided>
          <v-btn value="prices">Price</v-btn>
          <v-btn value="market_caps">Market Caps</v-btn>
          <v-btn value="total_volumes">Volumes</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <highcharts class="rounded-lg" :options="chartOptions"></highcharts>

        <div class="mt-4" v-if="coinDetail">
          <v-table class="text-center rounded-lg">
            <tr class="bg-blue-darken-3">
              <th>Range</th>
              <th class="pa-2">1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>14d</th>
              <th>30d</th>
              <th>1y</th>
            </tr>
            <tr class="bg-blue-darken-5">
              <td class="pa-2">Change</td>
              <td
                v-for="timePeriod in ['1h', '24h', '7d', '14d', '30d', '1y']"
                :key="timePeriod"
                :class="
                  getPriceChangeClass(
                    coinDetail.market_data[
                      `price_change_percentage_${timePeriod}_in_currency`
                    ].usd
                  )
                "
              >
                {{
                  formatPriceChange(
                    coinDetail.market_data[
                      `price_change_percentage_${timePeriod}_in_currency`
                    ].usd
                  )
                }}%
              </td>
            </tr>
          </v-table>
        </div>
      </v-col>
      <v-col cols="12" md="4" v-if="coinDetail">
        <v-card color="#212121" rounded="lg">
          <v-card-title> {{ coinDetail.name }} Price Statistics </v-card-title>
          <v-card-text>
            <statistic-row>
              <span> Market Cap Rank </span>
              <span> #{{ coinDetail.market_cap_rank }} </span>
            </statistic-row>
            <statistic-row>
              <span> {{ coinDetail.name }} Current price </span>
              <span> ${{ coinDetail.market_data.current_price.usd }} </span>
            </statistic-row>
            <statistic-row>
              <span> 24h Low / 24h High </span>
              <span>
                ${{ coinDetail.market_data.low_24h.usd }} / ${{
                  coinDetail.market_data.high_24h.usd
                }}
              </span>
            </statistic-row>
            <statistic-row>
              <span> Market Cap </span>
              <span>
                ${{ numberWithCommas(coinDetail.market_data.market_cap.usd) }}
              </span>
            </statistic-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import bitcoinCharts from "@/fakeData/bitcoinCharts";
import mantle from "@/fakeData/mantle";
import StatisticRow from "@/components/DetailPage/StatisticRow.vue";
import {
  numberWithCommas,
  formatPriceChange,
  getPriceChangeClass,
} from "@/helpers/index";
import { getChartOptions } from "@/helpers/highchartOptions";

import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/useAxios";
import { apis } from "@/endPoints/apis";
const { get } = useAxios();

const route = useRoute();
const coin_id = ref("");

// TODO: User can select day and chart mode
const options = reactive({
  mode: "prices",
  days: 1,
});

onMounted(async () => {
  loading.value = true;
  coin_id.value = route.params.coin_id;
  getChart(coin_id.value);
  getCoinDetail(coin_id.value);
  loading.value = false;
});

const loading = ref(false);
const detail = ref(null);
const chartOptions = ref(null);

async function getChart(coin_id: string, { vs_currency = "usd" } = {}) {
  // TODO: uncomment this for production
  detail.value = await apis.getChart({ coin_id, days: options.days, vs_currency });
  // detail.value = bitcoinCharts;
  console.log(detail.value);
  chartOptions.value = getChartOptions(detail.value, options.mode);
}

const coinDetail = ref(null);
async function getCoinDetail(coin_id: string, { vs_currency = "usd" } = {}) {
  // TODO: uncomment this for production
  // coinDetail.value = await get(`coins/${coin_id}`);

  coinDetail.value = await apis.getCoinDetail(coin_id);
  // coinDetail.value = mantle;
}

watch(options, (newValue, oldValue) => {
  chartOptions.value = getChartOptions(detail.value, newValue.mode);
});
</script>
