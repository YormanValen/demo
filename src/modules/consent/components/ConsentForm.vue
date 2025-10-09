<script setup lang="ts">
import { ref, computed } from 'vue';
import pdfAsset from '@/assets/autorizacion_obligatoria_v14.pdf?url';

const captchaChecked = ref(false);

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  checked: boolean;
  hasDocument?: boolean;
  documentUrl?: string;
}

const benefits = ref<Benefit[]>([
  {
    id: 'creditAccess',
    title: 'Usar tus datos para darte acceso al crédito',
    description: 'Permite que tus datos se utilicen para evaluar y aprobar productos de crédito de manera más rápida y justa.',
    icon: 'mdi-credit-card-outline',
    checked: false
  },
  {
    id: 'customProducts',
    title: 'Ofrecerte productos y servicios hechos a tu medida',
    description: 'Usamos tu información para recomendarte opciones personalizadas que se ajusten a tu necesidad.',
    icon: 'mdi-target',
    checked: false
  },
  {
    id: 'dataSharing',
    title: 'Compartir tu información entre entidades de forma segura',
    description: 'Autoriza que tus datos se conecten entre entidades financieras y aliados para que tus trámites sean más ágiles.',
    icon: 'mdi-link-variant',
    checked: false
  },
  {
    id: 'riskProtection',
    title: 'Analizar tu perfil financiero para protegerte de riesgos',
    description: 'Con tu autorización podremos evaluar tu situación financiera y prevenir riesgos de sobreendeudamiento o fraude.',
    icon: 'mdi-shield-check-outline',
    checked: false
  },
  {
    id: 'dataProcessing',
    title: 'Autorizo el tratamiento de mis datos para fines de inclusión financiera y mayor acceso al crédito',
    description: 'Permite que procesemos tu información personal para evaluarte y ofrecerte mejores oportunidades de crédito.',
    icon: 'mdi-file-document-outline',
    checked: false,
    hasDocument: true,
    documentUrl: pdfAsset
  }
]);


const emit = defineEmits(['trigger-animation', 'view-document']);

// Computed para validar si se puede continuar
const canContinue = computed(() => {
  // Requiere que el captcha esté marcado Y que el checkbox de tratamiento de datos esté marcado
  const dataProcessingConsent = benefits.value.find(b => b.id === 'dataProcessing');
  return captchaChecked.value && dataProcessingConsent?.checked === true;
});

const handleNextClick = () => {
  if (!canContinue.value) return;

  // Emitir evento para que el RegistrationForm active su animación
  emit('trigger-animation');
};
</script>

<template>
  <div class="consent-form">
    <div class="form-header">
      <h2>INFORMACIÓN CONSENTIMIENTOS A SOLICITAR</h2>
    </div>

    <div class="benefits-container">
      <div class="selection-badge">
        <span class="badge-text">Puedes escoger una o varias opciones de consentimiento</span>
      </div>
      <div v-for="benefit in benefits" :key="benefit.id" class="benefit-item">
        <div class="benefit-icon">
          <v-icon :icon="benefit.icon" color="#982881" size="24"></v-icon>
        </div>
        <div class="benefit-content">
          <h3 class="benefit-title">
            {{ benefit.title }}
            <span v-if="benefit.id === 'dataProcessing'" class="required-indicator">*</span>
            <a
              v-if="benefit.hasDocument"
              href="#"
              class="document-link"
              @click.prevent="emit('view-document', benefit.documentUrl)"
            >
              Ver documento
            </a>
          </h3>
          <p class="benefit-description">{{ benefit.description }}</p>
        </div>
        <v-checkbox v-model="benefit.checked" color="#982881" hide-details :ripple="false" class="benefit-checkbox"
          density="compact"></v-checkbox>
      </div>

      <!-- Captcha -->
      <div class="captcha-container">
        <div class="captcha-box">
          <v-checkbox v-model="captchaChecked" color="#982881" hide-details density="compact">
            <template #label>
              <span class="captcha-text">No soy un robot</span>
            </template>
          </v-checkbox>
          <div class="recaptcha-logo">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjJDNi40NzcgMjIgMiAxNy41MjMgMiAxMlM2LjQ3NyAyIDEyIDJzMTAgNC40NzcgMTAgMTAtNC40NzcgMTAtMTAgMTB6bTAtMmE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNnoiIGZpbGw9IiMwMEMzRTYiLz48L3N2Zz4="
              alt="reCAPTCHA" class="recaptcha-icon" />
            <span class="recaptcha-text">reCAPTCHA</span>
            <span class="recaptcha-info">Privacidad - Términos</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensaje de consentimiento -->
    <div class="consent-message">
      <p>Tú decides qué autorizas. Siempre puedes cambiar o revocar tu consentimiento cuando lo necesites</p>
      <p class="required-message">* El tratamiento de datos para fines de inclusión financiera es obligatorio para continuar</p>
    </div>

    <!-- Botón Continuar -->
    <div class="button-container">
      <button @click="handleNextClick" class="continue-button" :disabled="!canContinue"
        :class="{ 'disabled': !canContinue }">
        Continuar
      </button>
    </div>
  </div>

</template>

<style scoped>
.consent-form {
  padding: 0;
  width: 60vw;
  margin-top: 10px;
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
  padding: 15px 0;
  margin-bottom: 20px;
}

.form-header h2 {
  font-size: 19px;
  margin: 0;
}

.benefits-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selection-badge {
  background: linear-gradient(21deg, rgba(97, 40, 120, 0.1), rgba(186, 45, 125, 0.1));
  border: 1px solid rgba(152, 40, 129, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
  text-align: center;
}

.badge-text {
  color: #982881;
  font-size: 13px;
  font-weight: 500;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-radius: 8px;
  background: #f8f9fa;
}

.benefit-icon {
  padding: 8px;
  border-radius: 50%;
  background: rgba(152, 40, 129, 0.1);
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 14px;
  color: #333;
  margin: 0 0 5px 0;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.document-link {
  color: #982881;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
}

.document-link:hover {
  color: #7a1f6a;
}

.required-indicator {
  color: #e53e3e;
  font-weight: bold;
  margin-left: 4px;
}

.captcha-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.captcha-box {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  padding: 6px;
  background: #f9f9f9;
  width: fit-content;
}

.captcha-text {
  color: #555;
  font-size: 14px;
  font-weight: 700;
  margin-left: 8px;
}

.recaptcha-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  border-left: 1px solid #d3d3d3;
  padding-left: 20px;
}

.recaptcha-icon {
  width: 30px;
  height: 30px;
}

.recaptcha-text {
  color: #555;
  font-size: 10px;
  font-weight: 500;
}

.recaptcha-info {
  color: #555;
  font-size: 8px;
  text-decoration: none;
}

.benefit-description {
  font-size: 12px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.consent-message {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.required-message {
  color: #e53e3e !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  margin-top: 8px !important;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 10px 40px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.continue-button:hover {
  opacity: 0.9;
}

.continue-button:disabled,
.continue-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.continue-button:disabled:hover,
.continue-button.disabled:hover {
  opacity: 0.5;
}

:deep(.v-checkbox) {
  margin: 0;
  padding: 0;
}

:deep(.v-checkbox .v-selection-control) {
  margin: 0;
  padding: 0;
}

:deep(.v-checkbox .v-label) {
  font-size: 14px;
  opacity: 1;
}

:deep(.v-checkbox .v-selection-control__input) {
  transform: scale(0.9);
}

:deep(.v-checkbox .v-selection-control) {
  min-height: unset;
}

:deep(.v-checkbox:hover .v-selection-control__wrapper) {
  background: none !important;
}

:deep(.v-checkbox .v-selection-control__wrapper) {
  cursor: pointer;
  padding: 0;
  margin: 0;
  width: 18px;
  height: 18px;
}

:deep(.v-checkbox .v-selection-control__input) {
  width: 18px;
  height: 18px;
}

:deep(.v-checkbox .v-selection-control__input::before) {
  display: none !important;
}

:deep(.v-checkbox .v-selection-control__input::after) {
  display: none !important;
}

:deep(.v-checkbox:hover .v-selection-control__input::before) {
  opacity: 0 !important;
}

:deep(.v-selection-control-group) {
  gap: 0;
}
</style>

<style>
/* Forzar responsive dentro del selector de dispositivo (no afecta escritorio/full) */
.is-tablet .consent-form,
.tablet .consent-form {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

.is-mobile .consent-form {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.is-tablet .form-header h2,
.tablet .form-header h2,
.is-mobile .form-header h2 {
  font-size: 16px;
}

.is-tablet .benefits-container,
.tablet .benefits-container,
.is-mobile .benefits-container {
  padding: 14px;
  gap: 14px;
}

.is-mobile .benefit-item {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.is-tablet .benefit-title,
.tablet .benefit-title,
.is-mobile .benefit-title {
  font-size: 13px;
}

.is-tablet .benefit-description,
.tablet .benefit-description,
.is-mobile .benefit-description {
  font-size: 12px;
}

.is-tablet .captcha-box,
.tablet .captcha-box,
.is-mobile .captcha-box {
  gap: 10px;
  padding: 8px;
}

.is-mobile .captcha-box {
  flex-wrap: wrap;
}

.is-tablet .recaptcha-logo,
.tablet .recaptcha-logo,
.is-mobile .recaptcha-logo {
  border-left: none;
  padding-left: 0;
}

.is-tablet .continue-button,
.tablet .continue-button,
.is-mobile .continue-button {
  padding: 8px 28px;
  font-size: 13px;
}

.is-tablet .badge-text,
.tablet .badge-text,
.is-mobile .badge-text {
  font-size: 12px;
}
</style>
