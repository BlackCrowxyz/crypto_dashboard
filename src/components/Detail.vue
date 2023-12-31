<template>
  <v-container v-if="chartOptions?.series">
    <v-row>
      <v-col cols="12">
        current mode: {{ options.mode }}
        <v-btn @click="options.mode = 'prices'">price</v-btn>
        <v-btn @click="options.mode = 'market_caps'">market_caps</v-btn>
        <v-btn @click="options.mode = 'total_volumes'">total_volumes</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <highcharts :options="chartOptions"></highcharts>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import bitcoinCharts from "@/fakeData/bitcoinCharts";
import { getChartOptions } from "@/helpers/highchartOptions";

import { ref, onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/useAxios";
const { get } = useAxios();

const route = useRoute();
const coin_id = ref("");

const data = ref(null);

// TODO: User can select day and chart mode
const options = reactive({
  mode: "prices",
  days: 1,
});

onMounted(async () => {
  coin_id.value = route.params.coin_id;
  getChart(coin_id.value);
});

const chartOptions = ref(null);
async function getChart(coin_id: string, { vs_currency = "usd" } = {}) {
  // TODO: uncomment this for production
  //   data.value = await get(
  //     `coins/${coin_id}/market_chart?vs_currency=${vs_currency}&days=${options.days}`
  //   );
  data.value = bitcoinCharts;
  chartOptions.value = getChartOptions(data.value, options.mode);
}

watch(options, (newValue, oldValue) => {
  chartOptions.value = getChartOptions(data.value, newValue.mode);
});
</script>
