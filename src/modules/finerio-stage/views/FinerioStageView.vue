<template>
  <div class="finerio-stage-view">
    <FinerioWelcome />
  </div>
</template>

<script setup lang="ts">
import FinerioWelcome from '../components/FinerioWelcome.vue'
</script>

<style scoped>
.finerio-stage-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}
</style>