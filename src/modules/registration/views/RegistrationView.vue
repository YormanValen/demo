<script setup lang="ts">
import RegistroForm from '../components/RegistrationForm.vue'
</script>

<template>
  <section class="registro-view">
    <RegistroForm />
  </section>
</template>

<style scoped>
.registro-view {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  padding-top: 40px;
}
</style>
