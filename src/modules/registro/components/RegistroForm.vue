<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRegistroStore } from '../stores/registro.store'
import type { RegistroFormData } from '../types/registro.types'

const store = useRegistroStore()
const { tipoOptions, isLoadingTipos, isSubmitting, feedbackMessage } = store

const form = reactive<RegistroFormData>({
  nombres: '',
  primerApellido: '',
  segundoApellido: '',
  tipoDocumento: '',
  numeroIdentificacion: '',
  fechaExpedicionDocumento: '',
  departamentoExpedicion: '',
  ciudadExpedicion: '',
  celular: '',
  correo: '',
  esPEP: false,
  autorizaTratamientoDatos: false,
  autorizaFinesComerciales: false
})

onMounted(() => {
  store.loadTiposDocumento()
})

const isFormValid = computed(() => {
  return (
    !!form.nombres.trim() &&
    !!form.primerApellido.trim() &&
    !!form.correo.trim() &&
    !!form.tipoDocumento &&
    !!form.numeroIdentificacion.trim() &&
    !!form.celular.trim() &&
    form.autorizaTratamientoDatos
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) {
    return
  }

  await store.submit({
    nombres: form.nombres,
    primerApellido: form.primerApellido,
    segundoApellido: form.segundoApellido,
    tipoDocumento: form.tipoDocumento,
    numeroIdentificacion: form.numeroIdentificacion,
    fechaExpedicionDocumento: form.fechaExpedicionDocumento,
    departamentoExpedicion: form.departamentoExpedicion,
    ciudadExpedicion: form.ciudadExpedicion,
    celular: form.celular,
    correo: form.correo,
    esPEP: form.esPEP,
    autorizaTratamientoDatos: form.autorizaTratamientoDatos,
    autorizaFinesComerciales: form.autorizaFinesComerciales
  })
}
</script>

<template>
  <div class="registro-container">
    <div class="registro-form">
      <div class="form-header">
        <h2>INFORMACIÓN BÁSICA</h2>
      </div>

      <form class="form-body" @submit.prevent="handleSubmit">
        <div class="form-row form-names">
          <div class="form-field form-field-with-icon">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
            </svg>
            <input v-model="form.nombres" type="text" placeholder="Nombres" required />
          </div>
          <div class="form-field">
            <input v-model="form.primerApellido" type="text" placeholder="Primer apellido" required />
          </div>
          <div class="form-field">
            <input v-model="form.segundoApellido" type="text" placeholder="Segundo apellido" />
          </div>
        </div>

        <div class="form-row form-document">
          <div class="form-field form-field-select form-field-with-icon">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75-3.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
            </svg>
            <select v-model="form.tipoDocumento" :disabled="isLoadingTipos" required>
              <option disabled value="">Tipo de documento</option>
              <option v-for="option in tipoOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <input v-model="form.numeroIdentificacion" type="text" placeholder="Número de identificación" required />
          </div>
          <div class="form-field form-field-date">
            <input v-model="form.fechaExpedicionDocumento" type="date" placeholder="Fecha de expedición documento" />
          </div>
        </div>

        <div class="form-row form-location">
          <div class="form-field form-field-select">
            <select v-model="form.departamentoExpedicion">
              <option disabled value="">Departamento de expedición documento</option>
              <option value="bogota">Bogotá D.C.</option>
              <option value="antioquia">Antioquia</option>
              <option value="valle">Valle del Cauca</option>
            </select>
          </div>
          <div class="form-field form-field-select">
            <select v-model="form.ciudadExpedicion">
              <option disabled value="">Ciudad de expedición documento</option>
              <option value="bogota">Bogotá</option>
              <option value="medellin">Medellín</option>
              <option value="cali">Cali</option>
            </select>
          </div>
        </div>

        <p class="sms-message">Te enviaremos un código de verificación vía SMS a tu número móvil.</p>

        <div class="form-field form-field-phone form-field-with-icon">
          <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
            <path fill-rule="evenodd"
              d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3h6.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
              clip-rule="evenodd" />
          </svg>
          <input v-model="form.celular" type="tel" placeholder="Celular" required />
        </div>

        <p class="email-message">Indícanos a que correo enviamos la información de tu solicitud</p>

        <div class="form-field form-field-email form-field-with-icon">
          <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path
              d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
          <input v-model="form.correo" type="email" placeholder="Correo electrónico" required />
        </div>

        <label class="form-checkbox">
          <input v-model="form.esPEP" type="checkbox" />
          <span>Soy una persona expuesta públicamente (PEP)</span>
        </label>

        <label class="form-checkbox">
          <input v-model="form.autorizaTratamientoDatos" type="checkbox" required />
          <span>
            Autorizo el tratamiento de mis datos para fines de inclusión financiera y mayor acceso al crédito
            <a href="#" class="checkbox-link">Ver documento</a>
          </span>
        </label>

        <label class="form-checkbox">
          <input v-model="form.autorizaFinesComerciales" type="checkbox" />
          <span>Autorización para fines comerciales</span>
        </label>

        <button type="submit" class="form-submit" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? 'Enviando...' : 'Continuar' }}
        </button>
      </form>
    </div>

    <p v-if="feedbackMessage" class="registro-form__feedback">{{ feedbackMessage }}</p>
  </div>
</template>

<style scoped>
.registro-container {
  width: 1200px;
  max-width: none;
  margin: 0;
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.registro-subtitle {
  text-align: center;
  color: white;
  font-size: 16px;
  margin-bottom: 40px;
  font-style: italic;
}

.registro-form {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-header {
  background: linear-gradient(135deg, #2981fd 0%, #3b82f6 50%, #1e40af 100%);
  padding: 20px 40px;
  text-align: center;
}

.form-header h2 {
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

.form-body {
  padding: 40px;
}

.form-row {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.form-names {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-document {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-location {
  grid-template-columns: 1fr 1fr;
}

.form-field {
  position: relative;
}

.form-field-with-icon {
  display: flex;
  align-items: center;
  gap: 12px;
}

.field-icon {
  width: 28px;
  height: 28px;
  color: #6b7280;
  fill: #6b7280;
  flex-shrink: 0;
}

.form-field input,
.form-field select {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: #8e44ad;
  box-shadow: 0 0 0 2px rgba(142, 68, 173, 0.1);
}

.form-field input::placeholder {
  color: #9ca3af;
}

.form-field-date input {
  color: #9ca3af;
}

.form-field-date input:focus,
.form-field-date input:valid {
  color: #374151;
}

.form-field-select select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 16px;
  padding-right: 40px;
}

.sms-message,
.email-message {
  color: #6b7280;
  font-size: 14px;
  margin: 20px 0 10px 0;
  line-height: 1.4;
}

.form-field-phone,
.form-field-email {
  max-width: 300px;
  margin-bottom: 20px;
}

.form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 20px 0;
  font-size: 14px;
  line-height: 1.4;
}

.form-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 2px 0 0 0;
  flex-shrink: 0;
  accent-color: #8e44ad;
}

.form-checkbox span {
  color: #374151;
}

.checkbox-link {
  color: #3b82f6;
  text-decoration: underline;
  margin-left: 4px;
}

.checkbox-link:hover {
  text-decoration: none;
}

.form-submit {
  background: linear-gradient(135deg, #2981fd 0%, #3b82f6 50%, #1e40af 100%);
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin: 30px auto 0;
  display: block;
  min-width: 140px;
}

.form-submit:hover:not(:disabled) {
  opacity: 0.9;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.registro-form__feedback {
  margin: 20px 0 0 0;
  padding: 12px;
  border-radius: 4px;
  background: rgba(142, 68, 173, 0.1);
  color: #8e44ad;
  font-size: 14px;
}

@media (max-width: 768px) {

  .form-names,
  .form-document,
  .form-location {
    grid-template-columns: 1fr;
  }

  .form-body {
    padding: 20px;
  }

  .form-header {
    padding: 15px 20px;
  }
}
</style>
