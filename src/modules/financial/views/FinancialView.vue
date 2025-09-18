<template>
  <div class="financial-view">
    <FinancialForm />
  </div>
</template>

<script setup lang="ts">
import FinancialForm from '../components/FinancialForm.vue'
</script>

<style scoped>
.financial-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}
</style>