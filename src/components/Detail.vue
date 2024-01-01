<template>
  <v-container v-if="chartOptions?.series" fluid>
    <v-row v-if="coinDetail?.data">
      <v-col cols="12">
        <div class="d-flex align-center">
          <img :src="coinDetail.data.image.thumb" class="pr-2" />
          <span class="font-weight-bold text-subtitle-1">
            {{ coinDetail.data.name }} Price chart ({{ coinDetail.data.symbol }})
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

        <div class="mt-4">
          <v-table class="text-center rounded-lg">
            <tr class="bg-blue-lighten-3">
              <th>Range</th>
              <th class="pa-2">1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>14d</th>
              <th>30d</th>
              <th>1y</th>
            </tr>
            <tr class="bg-blue-lighten-5">
              <td class="pa-2">Change</td>
              <td
                v-for="timePeriod in ['1h', '24h', '7d', '14d', '30d', '1y']"
                :key="timePeriod"
                :class="
                  getPriceChangeClass(
                    coinDetail.data.market_data[
                      `price_change_percentage_${timePeriod}_in_currency`
                    ].usd
                  )
                "
              >
                {{
                  formatPriceChange(
                    coinDetail.data.market_data[
                      `price_change_percentage_${timePeriod}_in_currency`
                    ].usd
                  )
                }}%
              </td>
              <!-- <td
              :class="{
                      'text-red': coinDetail.data.market_data.price_change_percentage_1h_in_currency.usd < 0,
                      'text-green': coinDetail.data.market_data.price_change_percentage_1h_in_currency.usd > 0,
                    }"
              >{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_1h_in_currency.usd)}}%</td>
              <td
              :class="{
                      'text-red': coinDetail.data.market_data.price_change_percentage_24h_in_currency.usd < 0,
                      'text-green': coinDetail.data.market_data.price_change_percentage_24h_in_currency.usd > 0,
                    }"
              >{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_24h_in_currency.usd)}}%</td>
              <td>{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_7d_in_currency.usd)}}%</td>
              <td>{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_14d_in_currency.usd)}}%</td>
              <td>{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_30d_in_currency.usd)}}%</td>
              <td>{{formatPriceChange(coinDetail.data.market_data.price_change_percentage_1y_in_currency.usd)}}%</td> -->
            </tr>
          </v-table>
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="primary" variant="outlined">
          <v-card-title> {{ coinDetail.data.name }} Price Statistics </v-card-title>
          <v-card-text>
            <statistic-row>
              <span> Market Cap Rank </span>
              <span> #{{ coinDetail.data.market_cap_rank }} </span>
            </statistic-row>
            <statistic-row>
              <span> {{ coinDetail.data.name }} Current price </span>
              <span>
                ${{ coinDetail.data.market_data.current_price.usd }}
              </span>
            </statistic-row>
            <statistic-row>
              <span> 24h Low / 24h High </span>
              <span>
                ${{ coinDetail.data.market_data.low_24h.usd }} /
                ${{ coinDetail.data.market_data.high_24h.usd }}
              </span>
            </statistic-row>
            <statistic-row>
              <span> Market Cap </span>
              <span>
                ${{ numberWithCommas(coinDetail.data.market_data.market_cap.usd) }}
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
import { numberWithCommas, formatPriceChange } from "@/helpers/index";
import { getChartOptions } from "@/helpers/highchartOptions";

import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/useAxios";
const { get } = useAxios();

const route = useRoute();
const coin_id = ref("");

// TODO: User can select day and chart mode
const options = reactive({
  mode: "prices",
  days: 1,
});

onMounted(async () => {
  coin_id.value = route.params.coin_id;
  getChart(coin_id.value);
  getCoinDetail(coin_id.value);
});

const detail = ref({
  data: null,
  loading: false,
});
const chartOptions = ref(null);

async function getChart(coin_id: string, { vs_currency = "usd" } = {}) {
  detail.value.loading = true;
  // TODO: uncomment this for production
  // detail.value = await get(
  //   `coins/${coin_id}/market_chart?vs_currency=${vs_currency}&days=${options.days}`
  // );
  detail.value.data = bitcoinCharts;
  chartOptions.value = getChartOptions(detail.value.data, options.mode);
  detail.value.loading = false;
}

const coinDetail = ref({
  data: null,
  loading: false,
});
async function getCoinDetail(coin_id: string, { vs_currency = "usd" } = {}) {
  coinDetail.value.loading = true;
  // TODO: uncomment this for production
  // coinDetail.value = await get(`coins/${coin_id}`);
  coinDetail.value.data = mantle;
  coinDetail.value.loading = false;
}

watch(options, (newValue, oldValue) => {
  chartOptions.value = getChartOptions(detail.value.data, newValue.mode);
});

///////////////////////////

const getPriceChangeClass = (priceChange) => ({
  "text-red": priceChange < 0,
  "text-green": priceChange > 0,
});
</script>
