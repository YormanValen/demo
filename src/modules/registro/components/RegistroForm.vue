<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import BaseCard from '../../../shared/components/BaseCard.vue'
import { useRegistroStore } from '../stores/registro.store'
import type { RegistroFormData } from '../types/registro.types'

const store = useRegistroStore()
const { tipoOptions, isLoadingTipos, tiposError, isSubmitting, feedbackMessage } = store

const form = reactive<RegistroFormData>({
  nombres: '',
  apellidos: '',
  correo: '',
  tipoDocumento: '',
  numeroDocumento: '',
  aceptaTerminos: false
})

onMounted(() => {
  store.loadTiposDocumento()
})

const isFormValid = computed(() => {
  return (
    !!form.nombres.trim() &&
    !!form.apellidos.trim() &&
    !!form.correo.trim() &&
    !!form.tipoDocumento &&
    !!form.numeroDocumento.trim() &&
    form.aceptaTerminos
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) {
    return
  }

  await store.submit({
    nombres: form.nombres,
    apellidos: form.apellidos,
    correo: form.correo,
    tipoDocumento: form.tipoDocumento,
    numeroDocumento: form.numeroDocumento,
    aceptaTerminos: form.aceptaTerminos
  })
}
</script>

<template>
  <BaseCard class="registro-form">
    <header class="registro-form__header">
      <h2>Crear cuenta</h2>
      <p class="text-muted">Completa los datos básicos para iniciar tu registro.</p>
    </header>

    <form class="registro-form__body" @submit.prevent="handleSubmit">
      <div class="form-grid">
        <label class="form-field">
          <span>Nombres</span>
          <input v-model="form.nombres" type="text" required placeholder="Tu nombre" />
        </label>

        <label class="form-field">
          <span>Apellidos</span>
          <input v-model="form.apellidos" type="text" required placeholder="Tus apellidos" />
        </label>

        <label class="form-field">
          <span>Correo electrónico</span>
          <input v-model="form.correo" type="email" required placeholder="nombre@correo.com" />
        </label>

        <label class="form-field">
          <span>Tipo de documento</span>
          <select v-model="form.tipoDocumento" :disabled="isLoadingTipos">
            <option disabled value="">Selecciona una opción</option>
            <option v-for="option in tipoOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <small v-if="isLoadingTipos" class="text-muted">Cargando opciones...</small>
          <small v-else-if="tiposError" class="form-field__error">{{ tiposError }}</small>
        </label>

        <label class="form-field">
          <span>Número de documento</span>
          <input
            v-model="form.numeroDocumento"
            type="text"
            required
            placeholder="Ingresa tu documento"
          />
        </label>
      </div>

      <label class="form-checkbox">
        <input v-model="form.aceptaTerminos" type="checkbox" />
        <span>Acepto los términos y condiciones.</span>
      </label>

      <button class="button-primary" type="submit" :disabled="!isFormValid || isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Continuar' }}
      </button>
    </form>

    <p v-if="feedbackMessage" class="registro-form__feedback">{{ feedbackMessage }}</p>
  </BaseCard>
</template>

<style scoped>
.registro-form {
  width: min(720px, 100%);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.registro-form__header h2 {
  margin: 0 0 var(--space-2);
  font-size: 1.875rem;
}

.registro-form__header p {
  margin: 0;
}

.registro-form__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}

.form-field span {
  font-weight: var(--font-weight-medium);
  color: var(--text-muted);
}

.form-field input,
.form-field select {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  font-size: var(--font-size-md);
}

.form-field input:focus,
.form-field select:focus {
  outline: 2px solid var(--color-brand-500);
}

.form-field__error {
  color: #b91c1c;
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
}

.form-checkbox input {
  width: 16px;
  height: 16px;
}

.registro-form__feedback {
  margin: 0;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: rgba(63, 81, 181, 0.1);
  color: var(--color-brand-600);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
