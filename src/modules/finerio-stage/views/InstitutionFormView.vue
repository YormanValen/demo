<template>
  <div class="institution-form">
    <div class="form-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="bank-logo">
        <div class="bank-logo-circle" :style="{ backgroundColor: bankColor }">
          <span class="bank-initials">{{ bankInitials }}</span>
        </div>
      </div>

      <h1 class="main-title">Ingresa tus credenciales</h1>
      <p class="subtitle">Conectarás tu cuenta con {{ bankName }}</p>

      <form @submit.prevent="handleSubmit" class="credentials-form">
        <div class="form-group">
          <label for="documentType" class="form-label">Tipo de documento</label>
          <div class="select-wrapper">
            <select 
              id="documentType"
              v-model="formData.documentType"
              class="form-select"
              required
            >
              <option value="">Selecciona tipo de documento</option>
              <option value="cedula">Cédula de ciudadanía</option>
              <option value="cedula_extranjeria">Cédula de extranjería</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="tarjeta_identidad">Tarjeta de identidad</option>
            </select>
            <svg class="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="form-group">
          <label for="username" class="form-label">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            v-model="formData.username"
            class="form-input"
            required
            autocomplete="username"
          />
        </div>

        <button 
          type="submit"
          class="continue-button"
          :disabled="!isFormValid || isLoading"
        >
          <div v-if="isLoading" class="button-spinner">
            <svg width="20" height="20" viewBox="0 0 20 20" class="spinner">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="white"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-dasharray="25.1"
                stroke-dashoffset="25.1"
              />
            </svg>
          </div>
          <span v-else>Continuar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface FormData {
  documentType: string
  username: string
}

const router = useRouter()
const route = useRoute()

const formData = ref<FormData>({
  documentType: '',
  username: ''
})

const isLoading = ref(false)

const bankName = computed(() => {
  return route.query.bankName as string || 'Banco Azul'
})

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})

const isFormValid = computed(() => {
  return formData.value.documentType && formData.value.username.trim()
})

const handleGoBack = () => {
  router.push('/finerio/connect-institutions')
}

const handleSubmit = () => {
  if (isFormValid.value && !isLoading.value) {
    isLoading.value = true
    
    setTimeout(() => {
      router.push({
        path: '/finerio/validation',
        query: {
          bankName: bankName.value,
          bankInitials: bankInitials.value,
          bankColor: bankColor.value
        }
      })
    }, 10000)
  }
}
</script>

<style scoped>
.institution-form {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.form-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  position: relative;
  text-align: center;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background: #f1f5f9;
}

.bank-logo {
  margin: 0 auto 24px auto;
  display: flex;
  justify-content: center;
}

.bank-logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0 0 32px 0;
}

.credentials-form {
  text-align: left;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  height: 48px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 0 40px 0 16px;
  font-size: 16px;
  color: #374151;
  background: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #001340;
}

.form-select:invalid {
  color: #9ca3af;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 48px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  color: #374151;
  background: white;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #001340;
}

.continue-button {
  width: 100%;
  height: 48px;
  background: #001340;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
}

.continue-button:hover:not(:disabled) {
  background: #002157;
}

.continue-button:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.button-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  animation: spin 1s linear infinite;
}

.spinner circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 50;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 25, 50;
    stroke-dashoffset: -12.5;
  }
  100% {
    stroke-dasharray: 25, 50;
    stroke-dashoffset: -37.5;
  }
}
</style>