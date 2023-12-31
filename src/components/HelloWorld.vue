<template>
  <v-container class="fill-height">
    <v-list>
      <v-list-item-group v-if="items">
        <v-list-item v-for="item in items" :key="item.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }} ({{ item.symbol }}) - {{ item.current_price }}$
            </v-list-item-title>
            <v-list-item-subtitle> </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>No items to display</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
import { apis } from "@/endPoints/apis";
const { fetchData: getCoinsList, data: items, loading, error } = apis.getCoinsList("usd");

getCoinsList();
</script>
