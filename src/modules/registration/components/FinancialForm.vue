<template>
  <div class="financial-container">
    <div class="financial-form">
      <div class="form-header">
        <h2>INFORMACIÓN FINANCIERA</h2>
      </div>

      <form class="form-body" @submit.prevent="handleSubmit">
        <div class="form-row">
          <div class="form-field">
            <input v-model="form.gastosMensuales" type="text" placeholder="Gastos mensuales" required
              @input="formatCurrency($event, 'gastosMensuales')" />
          </div>

          <div class="form-field">
            <input v-model="form.antiguedadMeses" type="number" placeholder="Antigüedad (meses)" required min="0" />
          </div>

          <div class="form-field">
            <input v-model="form.ingresosMensualesPromedio" type="text" placeholder="Ingresos mensuales promedio"
              required @input="formatCurrency($event, 'ingresosMensualesPromedio')" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <input v-model="form.otrosIngresos" type="text" placeholder="Otros ingresos"
              @input="formatCurrency($event, 'otrosIngresos')" />
          </div>

          <div class="form-field">
            <input v-model="form.montoSolicitado" type="text" placeholder="Monto solicitado" required
              @input="formatCurrency($event, 'montoSolicitado')" />
          </div>

          <div class="form-field-empty"></div>
        </div>

        <button type="submit" class="form-submit" :disabled="!isFormValid">
          Continuar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FinancialFormData } from '../types/financial.types'

const router = useRouter()

const form = reactive<FinancialFormData>({
  gastosMensuales: '',
  antiguedadMeses: '',
  ingresosMensualesPromedio: '',
  otrosIngresos: '',
  montoSolicitado: ''
})

const isFormValid = computed(() => {
  return (
    !!form.gastosMensuales.trim() &&
    !!form.antiguedadMeses.trim() &&
    !!form.ingresosMensualesPromedio.trim() &&
    !!form.montoSolicitado.trim()
  )
})

const formatCurrency = (event: Event, field: keyof FinancialFormData) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/[^\d]/g, '')

  if (value) {
    const numericValue = parseInt(value)
    const formattedValue = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numericValue)

    form[field] = formattedValue
  } else {
    form[field] = ''
  }
}

const handleSubmit = () => {
  if (!isFormValid.value) {
    return
  }
}
</script>

<style scoped>
.financial-container {
  width: 1200px;
  max-width: none;
  margin: 0;
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.financial-form {
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-field {
  position: relative;
}

.form-field-empty {
  /* Empty space for grid alignment */
}

.form-field input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-field input:focus {
  outline: none;
  border-color: #2981fd;
  box-shadow: 0 0 0 2px rgba(41, 129, 253, 0.1);
}

.form-field input::placeholder {
  color: #9ca3af;
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
  max-width: 200px;
}

.form-submit:hover:not(:disabled) {
  opacity: 0.9;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-body {
    padding: 20px;
  }

  .form-header {
    padding: 15px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>