<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        current mode: {{ mode }}
        <v-btn @click="mode = 'prices'">price</v-btn>
        <v-btn @click="mode = 'market_caps'">market_caps</v-btn>
        <v-btn @click="mode = 'total_volumes'">total_volumes</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <highcharts v-if="chartOptions?.series" :options="chartOptions"></highcharts>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import bitcoinCharts from "@/fakeData/bitcoinCharts";
import { getChartOptions } from "@/helpers/highchartOptions";
import HighchartsVue from "highcharts-vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/useAxios";
import { watch } from "vue";
const { get } = useAxios();

const route = useRoute();
const coin_id = ref("");
// TODO: User can select it
const days = ref(1);
const data = ref(null);
const mode = ref("prices");

onMounted(async () => {
  coin_id.value = route.params.coin_id;
  getChart(coin_id.value);
});

const chartOptions = ref(null);
async function getChart(coin_id: string, { vs_currency = "usd" } = {}) {
  // TODO: uncomment this for production
  //   data.value = await get(
  //     `coins/${coin_id}/market_chart?vs_currency=${vs_currency}&days=${days.value}`
  //   );
  data.value = bitcoinCharts;
  chartOptions.value = getChartOptions(data.value, mode.value);
  //   console.log(chartOptions.value);
}

watch(mode, (newValue, oldValue) => {
  //   console.log(`Count changed from ${oldValue} to ${newValue}`);
  chartOptions.value = getChartOptions(data.value, newValue);
});

// let series =
// chartOptions.value.series = series

// const fakeChart = [
//   [1703880027321, 42123.828241872456],
//   [1703883642392, 41996.76777422195],
//   [1703887217277, 41884.08854790864],
//   [1703890819578, 41733.467508522044],
//   [1703894433127, 42074.70715618848],
//   [1703898009200, 42155.999549793596],
//   [1703901657885, 42172.344126842174],
//   [1703905281960, 41896.359137804946],
//   [1703908848413, 41946.10425449801],
//   [1703912409700, 41985.3951649841],
//   [1703916049945, 42122.75466489284],
//   [1703919629491, 42056.01405444255],
//   [1703923256665, 41952.03721210986],
//   [1703926826525, 41697.04214062938],
//   [1703930466971, 41691.87079880443],
//   [1703934011751, 41774.82267692628],
//   [1703937645523, 41907.45215905091],
//   [1703941234204, 41991.04226539656],
//   [1703944800932, 41962.64938065163],
//   [1703948433135, 42204.449118601646],
//   [1703952069927, 42401.66240460074],
//   [1703955634712, 42408.18839492703],
//   [1703959221886, 42504.38150233752],
//   [1703962820962, 42409.83274947286],
//   [1703966442031, 42357.23770525579],
//   [1703970055478, 42282.884465118535],
//   [1703973672640, 42282.63393164895],
//   [1703977229897, 42164.157880557104],
//   [1703980862031, 42196.98163538902],
//   [1703984463921, 42335.55744660517],
//   [1703988046620, 42165.86057289227],
//   [1703991694822, 42073.015211800965],
//   [1703995244228, 42163.76070503298],
//   [1703998812735, 42218.6616018917],
//   [1704002456097, 42234.648463328645],
//   [1704006026189, 42242.48481370832],
//   [1704009668644, 42552.579839506994],
//   [1704013278430, 42452.298969414194],
//   [1704016868879, 42739.195243823546],
//   [1704020412974, 42650.897813156684],
//   [1704024019660, 42500.5471636701],
//   [1704027619196, 42522.84318280696],
//   [1704031210502, 42483.49936488477],
//   [1704034821398, 42492.79311721145],
//   [1704038412559, 42465.67583900729],
//   [1704042020024, 42589.5372906383],
//   [1704045624437, 42593.6434744054],
//   [1704049272855, 42637.78555540509],
//   [1704050203000, 42626.44150571783],
// ];
</script>
