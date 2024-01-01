<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="data && data.length > 0">
    <slot :items="data"></slot>
  </div>
  <div v-else>
    <slot name="noData"> No data available </slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  loading: Boolean,
  data: [Array, null],
});
</script>
