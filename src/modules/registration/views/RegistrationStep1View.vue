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

/* Media queries for responsive design */
@media (max-width: 768px) {
  .registration-step1-view {
    padding: 0 20px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .registration-step1-view {
    padding: 0 15px;
    min-height: calc(100vh - 200px);
  }
}
</style>