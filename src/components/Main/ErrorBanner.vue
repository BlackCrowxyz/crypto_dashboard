<template>
  <v-fade-transition>
    <div class="banner" v-if="errorState.error">
      <div class="d-flex justify-space-between w-100">
        <span>
          {{ errorState.error }}
        </span>
      </div>
    </div>
  </v-fade-transition>
</template>

<script setup>
import { errorState } from "@/states/errorState";

defineExpose({
  errorState,
});
</script>

<style>
.banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: purple;
  z-index: 3000;
  padding: 1rem 1.5rem;
  color: white;
}
</style>