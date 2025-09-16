<script setup lang="ts">
import RegistroForm from '../components/RegistroForm.vue'
</script>

<template>
  <section class="registro-view">
    <div class="container registro-view__content">
      <div class="registro-view__copy">
        <h1>Regístrate y gestiona tus trámites en minutos</h1>
        <p class="text-muted">
          Una experiencia guiada paso a paso que te permitirá completar el proceso sin
          complicaciones.
        </p>
      </div>
      <RegistroForm />
    </div>
  </section>
</template>

<style scoped>
.registro-view {
  width: 100%;
  display: flex;
  justify-content: center;
}

.registro-view__content {
  display: grid;
  gap: var(--space-8);
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.registro-view__copy h1 {
  margin: 0 0 var(--space-4);
  font-size: clamp(2rem, 3vw, 2.5rem);
}

.registro-view__copy p {
  margin: 0;
  max-width: 38ch;
}
</style>
