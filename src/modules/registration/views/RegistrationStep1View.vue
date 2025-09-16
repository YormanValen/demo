<template>
  <div class="registration-step1-view">
    <RegistrationForm />
  </div>
</template>

<script setup lang="ts">
import RegistrationForm from '../components/RegistrationForm.vue'
</script>

<style scoped>
.registration-step1-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}
</style>