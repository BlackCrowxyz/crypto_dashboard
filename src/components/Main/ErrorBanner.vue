<template>
  <div v-if="errorState.error" class="global-error">
    {{ errorState.error }}
  </div>
</template>

<script setup>
import { errorState } from '@/composables/errorState';

defineExpose({
  errorState,
});
</script>

<style>
.global-error {
  /* Styles for your error message */
}
</style>
