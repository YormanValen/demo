<template>
  <div class="financial-stage-view">
    <FinancialWelcome />
  </div>
</template>

<script setup lang="ts">
import FinancialWelcome from '../components/FinerioWelcome.vue'
</script>

<style scoped>
.financial-stage-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}
</style>