<template>
  <div class="registration-container">
    <div class="registration-form">
      <div class="form-header">
        <h2>INFORMACIÓN BÁSICA SOLICITUD DE CREDITO</h2>
      </div>

      <form class="form-body" @submit.prevent="handleSubmit">
        <v-row class="form_row">
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.gastosMensuales" label="Gastos mensuales"
              class="form-field" required @input="formatCurrency($event, 'gastosMensuales')"
              @blur="validateField('gastosMensuales')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.gastosMensuales" class="error-message">{{ fieldErrors.gastosMensuales }}</div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.antiguedadMeses" label="Antigüedad (meses)"
              class="form-field" type="number" min="0" required @blur="validateField('antiguedadMeses')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.antiguedadMeses" class="error-message">{{ fieldErrors.antiguedadMeses }}</div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.ingresosMensualesPromedio"
              label="Ingresos mensuales promedio" class="form-field" required
              @input="formatCurrency($event, 'ingresosMensualesPromedio')"
              @blur="validateField('ingresosMensualesPromedio')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.ingresosMensualesPromedio" class="error-message">{{
                fieldErrors.ingresosMensualesPromedio }}</div>
            </transition>
          </v-col>
        </v-row>

        <v-row class="form_row">
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.otrosIngresos" label="Otros ingresos" class="form-field"
              @input="formatCurrency($event, 'otrosIngresos')" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.montoSolicitado" label="Monto solicitado"
              class="form-field" required @input="formatCurrency($event, 'montoSolicitado')"
              @blur="validateField('montoSolicitado')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.montoSolicitado" class="error-message">{{ fieldErrors.montoSolicitado }}</div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
          </v-col>
        </v-row>

        <button type="submit" class="form-submit" :disabled="!isFormValid">
          Continuar
        </button>
      </form>
    </div>

    <ValidationLoader :show="showValidationLoader" />

    <OtpModal :show="showOtpModal" :phone-number="userPhoneNumber" @close="handleOtpClose"
      @verified="handleOtpVerified" />

    <AnimationContainer :is-visible="showAnimationContainer" :force-open="isAnimationOpen" :clickable-header="false"
      @toggle="handleAnimationToggle">
      <template #header>
        <span>Flujo de Proceso</span>
      </template>
      <div style="display: flex; flex-direction: column; min-height: 300px;">
        <!-- Loading animation at the top -->
        <div v-if="showContainerLoader"
          style="display: flex; justify-content: center; align-items: center; padding: 20px 0;">
          <div class="container-loader">
            <div style="display: flex; justify-content: center; align-items: center;">
            </div>
          </div>
        </div>

        <!-- Flow visualization -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <CompleteFlowVisualization v-if="showCompleteFlow" :is-visible="true" :total-duration="10000" />

          <!-- Process disclaimer -->
          <div v-if="showCompleteFlow" class="process-disclaimer">
            <p>Este proceso se realiza en milisegundos, pero te mostramos la animación para que visualices el recorrido
              de tus
              datos.</p>
          </div>
        </div>

        <!-- Next button at the bottom -->
        <transition name="fade-slide-up">
          <div v-if="showNextButton" style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
            <!-- Next instruction disclaimer -->
            <div class="next-disclaimer">
              <p>Haz click en "Siguiente" para continuar al siguiente paso</p>
            </div>
            <button @click="handleNextClick" class="next-button">
              Siguiente
            </button>
          </div>
        </transition>
      </div>
    </AnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FinancialFormData } from '../types/financial.types'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../../registration/stores/registration.store'
import OtpModal from '../../registration/components/OtpModal.vue'
import ValidationLoader from './ValidationLoader.vue'
import AnimationContainer from './AnimationContainer.vue'
import CompleteFlowVisualization from './CompleteFlowVisualization.vue'

const router = useRouter();
const store = useRegistrationStore();
const { userPhoneNumber } = store;
const showOtpModal = ref(false);
const showValidationLoader = ref(false);
const showAnimationContainer = ref(true);
const isAnimationOpen = ref(false);
const showCompleteFlow = ref(false);
const showContainerLoader = ref(false);
const showNextButton = ref(false);
const showProcessComplete = ref(false);

const COMPLETE_ANIMATION_TIME = 10000; // 10 segundos para la animación completa de 5 pasos
const form = reactive<FinancialFormData>({
  gastosMensuales: '',
  antiguedadMeses: '',
  ingresosMensualesPromedio: '',
  otrosIngresos: '',
  montoSolicitado: ''
})

const fieldErrors = reactive({
  gastosMensuales: '',
  antiguedadMeses: '',
  ingresosMensualesPromedio: '',
  montoSolicitado: ''
});

const validateField = (fieldName: keyof typeof fieldErrors) => {
  switch (fieldName) {
    case 'gastosMensuales':
      fieldErrors.gastosMensuales = !form.gastosMensuales.trim() ? 'Los gastos mensuales son obligatorios' : '';
      break;
    case 'antiguedadMeses':
      fieldErrors.antiguedadMeses = !form.antiguedadMeses.trim() ? 'La antigüedad es obligatoria' : '';
      break;
    case 'ingresosMensualesPromedio':
      fieldErrors.ingresosMensualesPromedio = !form.ingresosMensualesPromedio.trim() ? 'Los ingresos mensuales promedio son obligatorios' : '';
      break;
    case 'montoSolicitado':
      fieldErrors.montoSolicitado = !form.montoSolicitado.trim() ? 'El monto solicitado es obligatorio' : '';
      break;
  }
};

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
  Object.keys(fieldErrors).forEach(key => {
    validateField(key as keyof typeof fieldErrors);
  });

  if (!isFormValid.value) {
    return
  }

  openAnimationContainer();
  showContainerLoader.value = true;
  showCompleteFlow.value = true;

  // Mostrar botón después del primer ciclo (10 segundos)
  setTimeout(() => {
    showProcessComplete.value = true;
    showNextButton.value = true;
  }, COMPLETE_ANIMATION_TIME);
}

const handleNextClick = () => {
  isAnimationOpen.value = false;
  showOtpModal.value = true;
}

const handleOtpVerified = async () => {
  showOtpModal.value = false;
  router.push("/registration/finerio-information");
}

const handleOtpClose = () => {
  showOtpModal.value = false;
}

const openAnimationContainer = () => {
  isAnimationOpen.value = true;
}

const handleAnimationToggle = (isOpen: boolean) => {
  if (isOpen) {
    setTimeout(() => {
      showCompleteFlow.value = true;
    }, 300);
  } else {
    showCompleteFlow.value = false;
  }
}
</script>

<style scoped>
.registration-container {
  padding: 0;
  width: 60vw;
  /* margin-top: -50vh; */
  position: relative;
}

.form-header {
  background: linear-gradient(21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
}

.form-header h2 {
  font-size: 19px;
}

.form-body .form-ctn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  position: relative;
}

.form-body .form-icon {
  height: 19px !important;
  width: 19px !important;
  color: #707070;
  font-size: 22px;
}

.form-submit {
  width: 160px;
  height: 36px;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: block;
  margin: 20px auto 0;
}

.form-submit:hover {
  opacity: 0.9;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.flow-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Container loader */
.container-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Next button */
.next-button {
  width: 160px;
  height: 36px;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.next-button:hover {
  opacity: 0.9;
}

/* Animación para el botón "Siguiente" */
.fade-slide-up-enter-active {
  transition: all 0.6s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Animación spinner a check */
.spinner-to-check-enter-active,
.spinner-to-check-leave-active {
  transition: all 0.4s ease-in-out;
}

.spinner-to-check-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.spinner-to-check-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.spinner-to-check-enter-to,
.spinner-to-check-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Animación del texto */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}

.text-fade-enter-to,
.text-fade-leave-from {
  opacity: 1;
}

/* Estilo del check icon */
.check-icon {
  animation: checkPulse 0.6s ease-out;
}

@keyframes checkPulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Disclaimers */
.process-disclaimer {
  margin-top: 20px;
  padding: 18px 30px;
  background-color: rgba(152, 40, 129, 0.1);
  border-radius: 10px;
  border-left: 5px solid #982881;
  max-width: 600px;
  text-align: center;
}

.process-disclaimer p {
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  font-style: italic;
  font-weight: 500;
}

.next-disclaimer {
  margin-bottom: 20px;
  padding: 16px 24px;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.next-disclaimer p {
  margin: 0;
  font-size: 15px;
  color: #4CAF50;
  text-align: center;
  font-weight: 600;
}
</style>

<style>
.v-field__input {
  padding-bottom: 1vw;
  padding-top: 30px;
  font-size: 16px;
}

.v-field--variant-underlined,
.v-field--variant-underlined *,
.v-field--variant-underlined::before,
.v-field--variant-underlined::after,
.v-text-field--underlined,
.v-text-field--underlined *,
.v-text-field--underlined::before,
.v-text-field--underlined::after {
  border: none !important;
  border-width: 0 !important;
  border-style: none !important;
  outline: none !important;
  box-shadow: none !important;
  background-image: none !important;
  border-bottom: none !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}

.v-field--variant-underlined.v-field--focused,
.v-field--variant-underlined.v-field--active,
.v-field--variant-underlined.v-field--error,
.v-text-field--underlined.v-field--focused,
.v-text-field--underlined.v-field--active,
.v-text-field--underlined.v-field--error {
  border: none !important;
  border-width: 0 !important;
  outline: none !important;
  box-shadow: none !important;
}

.v-label {
  background-color: white;
}

.error-message {
  color: #e53e3e;
  font-size: 12px;
  margin-top: -15px;
  margin-left: 0;
  position: absolute;
  z-index: 10;
}

.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s ease-in;
}

.slide-down-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>