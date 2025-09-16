<template>
  <div class="registration-step2-view">
    <FinancialForm />
  </div>
</template>

<script setup lang="ts">
import FinancialForm from '../components/FinancialForm.vue'
</script>

<style scoped>
.registration-step2-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}
</style>