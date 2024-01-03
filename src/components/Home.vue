<template>
  <v-container class="fill-height flex-column" fluid>
    <v-row class="full-width align-center">
      <v-col>
        <span class="text-h6"> Filter </span>
      </v-col>
      <v-col>
        <v-text-field
          variant="outlined"
          label="Name"
          v-model.name="search.name"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          variant="outlined"
          label="Symbol"
          v-model.name="search.symbol"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="full-width">
      <v-col cols="12">
        <data-handler :data="filteredCoins" :loading="loading">
          <template #default>
            <v-table
              theme=""
              class="rounded-lg"
              fixed-header
              hover
              height="calc(100vh - 180px)"
            >
              <thead>
                <tr class="text-h6">
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
                <tr v-for="(coin, i) in filteredCoins" :key="coin.id">
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
                  <td :class="getPriceChangeClass(coin.price_change_24h)">
                    <v-icon>
                      {{ coin.price_change_24h < 0 ? "mdi-menu-down" : "mdi-menu-up" }}
                    </v-icon>
                    <span>
                      {{ formatPriceChange(coin.price_change_24h, 3) }}
                    </span>
                  </td>
                  <td :class="getPriceChangeClass(coin.price_change_24h)">
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
import {
  numberWithCommas,
  formatPriceChange,
  getPriceChangeClass,
} from "@/helpers/index";
import { apis } from "@/endPoints/apis";
import { ref, reactive, onMounted, watch } from "vue";
import router from "@/router";

onMounted(async () => {
  await getCoinsList();
});

const loading = ref(false);

const coins = ref(null);
const filteredCoins = ref(null);

async function getCoinsList({ vs_currency = "usd" } = {}) {
  loading.value = true;
  // TODO: uncomment for production
  // coins.value = await apis.getCoinsList(vs_currency);
  coins.value = coinsList;
  filteredCoins.value = coins.value;
  loading.value = false;
}

const search = reactive({ name: null, symbol: null });

watch(search, async () => await getCoinsListByNameOrSymbol());

async function getCoinsListByNameOrSymbol({
  vs_currency = "usd",
  order = "market_cap_desc",
  per_page = 100,
  page = 1,
  sparkline = false,
} = {}) {
  let byName = [],
    bySymbol = [];
  loading.value = true;
  // Search with name
  if (search.name) {
    byName = coins.value.filter((c) => {
      return c.name.toLowerCase().includes(search.name.toLowerCase());
    });
  }
  // Search with symbol
  if (search.symbol) {
    bySymbol = coins.value.filter((c) => {
      return c.symbol.toLowerCase().includes(search.symbol.toLowerCase());
    });
  }
  // combining the search result
  filteredCoins.value = [...byName, ...bySymbol];
  // removing duplicate items
  filteredCoins.value = [...new Set(filteredCoins.value)];
  loading.value = false;
}
</script>

<style>
.pointer-click {
  cursor: pointer;
}
.full-width {
  width: 100%;
}
</style>
