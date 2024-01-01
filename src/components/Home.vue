<template>
  <v-container class="fill-height flex-column" fluid>
    <v-row class="width-100">
      <v-col> filter </v-col>
      <v-col>
        <v-text-field
          variant="outlined"
          label="Name"
          v-model.name="search.name"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          variant="outlined"
          label="Symbol"
          v-model.name="search.symbol"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="getCoinsListByNameOrSymbol">filter</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <data-handler :data="coins.data" :loading="coins.loading">
          <template #default>
            <v-table theme="dark">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Coin</th>
                  <th class="text-left">Price</th>
                  <th class="text-left">24H</th>
                  <th class="text-left">24H %</th>
                  <th class="text-left">Volume</th>
                  <th class="text-left">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(coin, i) in coins.data" :key="coin.id">
                  <td>{{ i + 1 }}</td>
                  <td
                    class="d-flex align-center text-body-1 pointer-click"
                    @click="
                      router.push({ name: 'coin-detail', params: { coin_id: coin.id } })
                    "
                  >
                    <img :src="coin.image" :alt="coin.name" height="24" width="24" />
                    <span class="ml-3 mr-1 font-weight-bold">
                      {{ coin.name }}
                    </span>
                    <small class="text-uppercase text-grey pt-1">
                      {{ coin.symbol }}
                    </small>
                  </td>
                  <td>${{ numberWithCommas(coin.current_price) }}</td>
                  <td
                    :class="{
                      'text-red': coin.price_change_24h < 0,
                      'text-green': coin.price_change_24h > 0,
                    }"
                  >
                    <v-icon>
                      {{ coin.price_change_24h < 0 ? "mdi-menu-down" : "mdi-menu-up" }}
                    </v-icon>
                    <span>
                      {{ formatPriceChange(coin.price_change_24h, 3) }}
                    </span>
                  </td>
                  <td
                    :class="{
                      'text-red': coin.price_change_24h < 0,
                      'text-green': coin.price_change_24h > 0,
                    }"
                  >
                    %{{ formatPriceChange(coin.price_change_percentage_24h, 2) }}
                  </td>
                  <td>{{ numberWithCommas(coin.total_volume) }}</td>
                  <td>${{ numberWithCommas(coin.market_cap) }}</td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </data-handler>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import coinsList from "@/fakeData/coinsList";
import DataHandler from "@/components/Main/DataHandler.vue";
import { numberWithCommas, formatPriceChange } from "@/helpers/index";
// import { apis } from "@/endPoints/apis";
import { ref, reactive, onMounted } from "vue";
import router from "@/router";
import useAxios from "@/composables/useAxios";
const { get, post } = useAxios();

onMounted(async () => {
  await getCoinsList();
});

const coins = ref({ data: null, loading: false });

async function getCoinsList({ vs_currency = "usd" } = {}) {
  coins.value.loading = true;
  // TODO: uncomment for production
  // coins.value = await get(`coins/markets?vs_currency=${vs_currency}`);
  coins.value.data = coinsList;
  coins.value.loading = false;
}

const search = reactive({ name: null, symbol: null });

async function getCoinsListByNameOrSymbol({
  vs_currency = "usd",
  order = "market_cap_desc",
  per_page = 100,
  page = 1,
  sparkline = false,
}) {
  // Filter with name by api
  if (search.name) {
    // const idsJoined = search.name.join("%2C");
    const queryString = `vs_currency=${vs_currency}&ids=${search.name}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}&locale=en`;
    coins.value = await get(`coins/markets?${queryString}`);
  } else if (search.symbol) {
    const queryString = `vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}&locale=en`;
    coins.value = await get(`coins/markets?${queryString}`);
    // TODO: Filter by javascript filter (symbol)
  }
}
</script>

<style>
.pointer-click {
  cursor: pointer;
}
</style>
