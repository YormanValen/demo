<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRegistrationStore } from "../stores/registration.store";
import type { RegistrationFormData } from "../types/registration.types";
import ValidationLoader from "../../financial/components/ValidationLoader.vue";
import FinancialLoader from "./FinancialLoader.vue";
import FlowVisualization from "./FlowVisualization.vue";
import AnimationContainer from "../../financial/components/AnimationContainer.vue";
import ConsentForm from "../../consent/components/ConsentForm.vue";
import { useAnalyticsStore } from "../../../stores/analytics";
const router = useRouter();
const emit = defineEmits(["view-document"] as const);
const store = useRegistrationStore();
const analyticsStore = useAnalyticsStore();
const {
  tipoOptions,
  isSubmitting,
  feedbackMessage,
  departamentoOptions,
  ciudadOptions,
  updateCiudadesByDepartamento,
  setPhoneNumber,
} = store;

const showValidationLoader = ref(false);
const showFinancialLoader = ref(false);
const showDatePicker = ref(false);
const showFlow = ref(false);
const showAnimationContainer = ref(true);
const isAnimationOpen = ref(false);
const showContainerLoader = ref(false);
const showNextButton = ref(false);
const showProcessComplete = ref(false);

const form = reactive<RegistrationFormData>({
  nombres: "",
  primerApellido: "",
  segundoApellido: "",
  tipoDocumento: "",
  numeroIdentificacion: "",
  fechaExpedicionDocumento: "",
  departamentoExpedicion: "",
  ciudadExpedicion: "",
  celular: "",
  correo: "",
  esPEP: false,
});

onMounted(() => {
  store.loadTiposDocumento();
});

watch(
  () => form.departamentoExpedicion,
  (newDepartamento) => {
    if (newDepartamento) {
      updateCiudadesByDepartamento(newDepartamento);
      form.ciudadExpedicion = "";
    }
  }
);

// Sincroniza los datos relevantes al store del PDF (si Pinia está activa)
async function syncPdfStoreFromForm() {
  try {
    const piniaMod: any = await import('pinia')
    if (piniaMod?.getActivePinia && piniaMod.getActivePinia()) {
      const mod: any = await import('@/stores/formData')
      const store = mod?.useFormDataStore ? mod.useFormDataStore() : null
      if (!store) return
      const primerNombre = (form.nombres || '').trim().split(/\s+/)[0] || ''
      // Formatea fecha a DD/MM/YYYY si viene como string de fecha o Date
      let fechaStr: string | undefined = undefined
      if (form.fechaExpedicionDocumento) {
        const d = new Date(form.fechaExpedicionDocumento as any)
        if (!isNaN(d.getTime())) {
          const dd = String(d.getDate()).padStart(2, '0')
          const mm = String(d.getMonth() + 1).padStart(2, '0')
          const yyyy = String(d.getFullYear())
          fechaStr = `${dd}/${mm}/${yyyy}`
        } else {
          fechaStr = String(form.fechaExpedicionDocumento)
        }
      }
      store.setFromRegistrationStep1({
        tipoDocumento: form.tipoDocumento,
        numeroIdentificacion: form.numeroIdentificacion,
        primerNombre,
        primerApellido: form.primerApellido,
        fechaExpedicion: fechaStr,
        celular: form.celular,
        correo: form.correo,
      })
    }
  } catch { }
}

watch(
  () => ({
    nombres: form.nombres,
    primerApellido: form.primerApellido,
    tipoDocumento: form.tipoDocumento,
    numeroIdentificacion: form.numeroIdentificacion,
    fechaExpedicionDocumento: form.fechaExpedicionDocumento,
    celular: form.celular,
    correo: form.correo,
  }),
  () => { syncPdfStoreFromForm() },
  { deep: true }
)

const formattedDate = computed(() => {
  if (!form.fechaExpedicionDocumento) return "";
  const date = new Date(form.fechaExpedicionDocumento);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const fieldErrors = reactive({
  nombres: "",
  primerApellido: "",
  tipoDocumento: "",
  numeroIdentificacion: "",
  fechaExpedicionDocumento: "",
  departamentoExpedicion: "",
  ciudadExpedicion: "",
  celular: "",
  correo: "",
});

const validateField = (fieldName: keyof typeof fieldErrors) => {
  switch (fieldName) {
    case "nombres":
      fieldErrors.nombres = !form.nombres.trim()
        ? "Los nombres son obligatorios"
        : "";
      break;
    case "primerApellido":
      fieldErrors.primerApellido = !form.primerApellido.trim()
        ? "El primer apellido es obligatorio"
        : "";
      break;
    case "tipoDocumento":
      fieldErrors.tipoDocumento = !form.tipoDocumento
        ? "El tipo de documento es obligatorio"
        : "";
      break;
    case "numeroIdentificacion":
      fieldErrors.numeroIdentificacion = !form.numeroIdentificacion.trim()
        ? "El número de identificación es obligatorio"
        : "";
      break;
    case "fechaExpedicionDocumento":
      fieldErrors.fechaExpedicionDocumento = !form.fechaExpedicionDocumento
        ? "La fecha de expedición es obligatoria"
        : "";
      break;
    case "departamentoExpedicion":
      fieldErrors.departamentoExpedicion = !form.departamentoExpedicion
        ? "El departamento de expedición es obligatorio"
        : "";
      break;
    case "ciudadExpedicion":
      fieldErrors.ciudadExpedicion = !form.ciudadExpedicion
        ? "La ciudad de expedición es obligatoria"
        : "";
      break;
    case "celular":
      fieldErrors.celular = !form.celular.trim()
        ? "El número de celular es obligatorio"
        : "";
      break;
    case "correo":
      if (!form.correo.trim()) {
        fieldErrors.correo = "El correo electrónico es obligatorio";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
        fieldErrors.correo = "El correo electrónico no es válido";
      } else {
        fieldErrors.correo = "";
      }
      break;
  }
};

const isFormValid = computed(() => {
  return (
    !!form.nombres.trim() &&
    !!form.primerApellido.trim() &&
    !!form.correo.trim() &&
    !!form.tipoDocumento &&
    !!form.numeroIdentificacion.trim() &&
    !!form.fechaExpedicionDocumento &&
    !!form.departamentoExpedicion &&
    !!form.ciudadExpedicion &&
    !!form.celular.trim()
  );
});

const handleSubmit = async () => {
  Object.keys(fieldErrors).forEach((key) => {
    validateField(key as keyof typeof fieldErrors);
  });

  if (!isFormValid.value || isSubmitting.value) {
    return;
  }

  // Track analytics for form completion
  analyticsStore.trackFormCompletion('basic-information', form);

  setPhoneNumber(form.celular);

  openAnimationContainer();
};


const openAnimationContainer = () => {
  // Programmatically open the container through reactive state
  isAnimationOpen.value = true;
  showContainerLoader.value = true;

  setTimeout(() => {
    showFlow.value = true;
    console.log('showFlow activated:', showFlow.value);

    // Show button after flow animation completes + extra delay (1000 + 3000 + 2000 + 1500 = 7500ms)
    setTimeout(() => {
      showProcessComplete.value = true;
      showNextButton.value = true;
    }, 7500);
  }, 300);
};

const handleAnimationToggle = (isOpen: boolean) => {
  if (isOpen) {
    setTimeout(() => {
      showFlow.value = true;
      console.log('showFlow activated:', showFlow.value);
    }, 300);
  } else {
    showFlow.value = false;
    console.log('showFlow deactivated:', showFlow.value);
  }
};

const handleNextClick = () => {
  router.push("/registration/financial-information");
};

const handleConsentAnimation = () => {
  // Activar la animación cuando ConsentForm emite el evento
  openAnimationContainer();
};
</script>

<template>
  <div class="registration-container">
    <div class="registration-form">
      <div class="form-header">
        <h2>INFORMACIÓN BÁSICA</h2>
      </div>

      <form class="form-body" @submit.prevent="handleSubmit" novalidate>
        <v-row class="form_row">
          <v-col cols="12" md="4">
            <div class="form-ctn">
              <v-icon class="form-icon">mdi-account</v-icon>
              <v-text-field variant="underlined" v-model="form.nombres" label="Nombres" class="form-field" required
                @blur="validateField('nombres')" />
            </div>
            <transition name="slide-down">
              <div v-if="fieldErrors.nombres" class="error-message">
                {{ fieldErrors.nombres }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.primerApellido" label="Primer apellido" class="form-field"
              required @blur="validateField('primerApellido')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.primerApellido" class="error-message">
                {{ fieldErrors.primerApellido }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" v-model="form.segundoApellido" label="Segundo apellido"
              class="form-field" required />
          </v-col>
          <v-col cols="12" md="4">
            <div class="form-ctn">
              <v-icon class="form-icon">mdi-card-account-details</v-icon>
              <v-tooltip activator="parent" location="bottom" class="custom-tooltip" transition="fade-transition"
                :open-delay="200" :offset="0">
                <span>Selecciona el tipo de documento de identidad (CC, CE, Pasaporte, etc.)</span>
              </v-tooltip>
              <v-select variant="outlined" v-model="form.tipoDocumento" :items="tipoOptions" label="Tipo de documento"
                item-title="label" item-value="value" required @blur="validateField('tipoDocumento')" />
            </div>
            <transition name="slide-down">
              <div v-if="fieldErrors.tipoDocumento" class="error-message">
                {{ fieldErrors.tipoDocumento }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-tooltip location="bottom" class="custom-tooltip" transition="fade-transition" :open-delay="200"
              :offset="0">
              <template v-slot:activator="{ props }">
                <v-text-field v-bind="props" variant="underlined" v-model="form.numeroIdentificacion"
                  label="Número de identificación" class="form-field" required
                  @blur="validateField('numeroIdentificacion')" />
              </template>
              <span>Ingresa el número de tu documento de identidad sin puntos ni espacios</span>
            </v-tooltip>
            <transition name="slide-down">
              <div v-if="fieldErrors.numeroIdentificacion" class="error-message">
                {{ fieldErrors.numeroIdentificacion }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field variant="underlined" :model-value="formattedDate" label="Fecha de expedición de documento"
              readonly append-inner-icon="mdi-calendar" @click="showDatePicker = true" required class="form-field"
              @blur="validateField('fechaExpedicionDocumento')" />
            <v-dialog v-model="showDatePicker" width="auto" :scrim="false">
              <v-card>
                <v-date-picker show-adjacent-months v-model="form.fechaExpedicionDocumento" @update:model-value="
                  showDatePicker = false;
                validateField('fechaExpedicionDocumento');
                " color="#982881" />
              </v-card>
            </v-dialog>
            <transition name="slide-down">
              <div v-if="fieldErrors.fechaExpedicionDocumento" class="error-message">
                {{ fieldErrors.fechaExpedicionDocumento }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <div class="form-ctn">
              <div class="form-icon-spacer"></div>
              <v-select variant="outlined" v-model="form.departamentoExpedicion" :items="departamentoOptions"
                label="Departamento de expedición" item-title="label" item-value="value" required
                @blur="validateField('departamentoExpedicion')" />
            </div>
            <transition name="slide-down">
              <div v-if="fieldErrors.departamentoExpedicion" class="error-message">
                {{ fieldErrors.departamentoExpedicion }}
              </div>
            </transition>
          </v-col>
          <v-col cols="12" md="4">
            <v-select variant="outlined" v-model="form.ciudadExpedicion" :items="ciudadOptions"
              label="Ciudad de expedición" item-title="label" item-value="value" required
              @blur="validateField('ciudadExpedicion')" />
            <transition name="slide-down">
              <div v-if="fieldErrors.ciudadExpedicion" class="error-message">
                {{ fieldErrors.ciudadExpedicion }}
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" class="sms-container">
            <p class="sms-text">
              Te enviaremos un código de verificación vía SMS a tu número móvil.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="form-ctn">
              <v-icon class="form-icon">mdi-phone</v-icon>
              <v-tooltip activator="parent" location="bottom" class="custom-tooltip" transition="fade-transition"
                :open-delay="200" :offset="0">
                <span>Ingresa tu número de celular para recibir el código de verificación vía SMS</span>
              </v-tooltip>
              <v-text-field variant="underlined" v-model="form.celular" label="Celular" class="form-field" required
                @blur="validateField('celular')" />
            </div>
            <transition name="slide-down">
              <div v-if="fieldErrors.celular" class="error-message">
                {{ fieldErrors.celular }}
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" class="sms-container">
            <p class="sms-text">
              Indícanos a que correo enviamos la información de tu solicitud
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="form-ctn">
              <v-icon class="form-icon">mdi-email</v-icon>
              <v-tooltip activator="parent" location="bottom" class="custom-tooltip" transition="fade-transition"
                :open-delay="200" :offset="0">
                <span>Ingresa tu correo electrónico para recibir información sobre tu solicitud</span>
              </v-tooltip>
              <v-text-field variant="underlined" v-model="form.correo" label="Correo" class="form-field" required
                @blur="validateField('correo')" />
            </div>
            <transition name="slide-down">
              <div v-if="fieldErrors.correo" class="error-message">
                {{ fieldErrors.correo }}
              </div>
            </transition>
          </v-col>
        </v-row>

        <!-- PEP Switch before consent form -->
        <v-row class="pep-section">
          <v-col cols="12" class="switch-container">
            <v-switch v-model="form.esPEP" color="#982881" density="compact" hide-details inline />
            <v-tooltip location="bottom" class="custom-tooltip" transition="fade-transition" :open-delay="200"
              :offset="0">
              <template v-slot:activator="{ props }">
                <span v-bind="props" class="switch-text">Soy una persona expuesta públicamente (PEP)</span>
              </template>
              <span>Las PEP son personas que ejercen funciones públicas prominentes or han estado relacionadas con
                ellas</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </form>

      <!-- Consent Form Section -->
      <div class="consent-section">
        <ConsentForm @trigger-animation="handleConsentAnimation"
          @view-document="(url: string) => emit('view-document', url)" />
      </div>
    </div>

    <p v-if="feedbackMessage" class="registration-form__feedback">
      {{ feedbackMessage }}
    </p>

    <ValidationLoader :show="showValidationLoader" />
    <FinancialLoader :show="showFinancialLoader" />

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
          <div v-if="!showFlow && !showContainerLoader" class="flow-spinner">
            <v-progress-circular :size="50" :width="4" color="#982881" indeterminate />
            <p style="margin-top: 12px; color: #666; font-size: 14px;">Cargando flujo de proceso...</p>
          </div>
          <FlowVisualization v-else-if="showFlow" :is-visible="true" :validation-time="3000" :processing-time="2000" />

          <!-- Process disclaimer -->
          <div v-if="showFlow" class="process-disclaimer">
            <p>Este proceso se realiza en milisegundos, pero te mostramos la animación para que visualices el recorrido
              de
              tus datos.</p>
          </div>
        </div>

        <!-- Next button at the bottom -->
        <transition name="fade-slide-up">
          <div v-if="showNextButton" style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
            <!-- Next instruction disclaimer -->
            <div class="next-disclaimer">
              <p>Haz click en "Siguiente" para continuar.</p>
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

<style scoped>
.registration-container {
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

.form-icon-spacer {
  width: 19px;
  height: 19px;
}

.sms-container {
  margin-left: calc(19px + 1vw);
}

.sms-text {
  color: #707070;
  font-size: 14px;
  margin: 0;
  white-space: nowrap;
}

.switch-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;
  margin-left: calc(19px + 1vw);
  white-space: nowrap;
  overflow: visible;
}

.switch-text {
  color: #707070;
  font-size: 14px;
  white-space: nowrap;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: calc(19px + 1vw);
}

.checkbox-text {
  color: #707070;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
}

.document-link {
  color: #982881;
  text-decoration: underline;
  cursor: pointer;
}

.document-link:hover {
  color: #7a1f6a;
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

.container-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

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

.loader-logo {
  width: 120px;
  height: auto;
  object-fit: contain;
  background: none !important;
  background-color: transparent !important;
  filter: brightness(1.2) contrast(1.1);
  mix-blend-mode: darken;
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
/* Forzar responsive dentro del selector de dispositivo (no afecta escritorio/full) */
.is-tablet .registration-container,
.tablet .registration-container {
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
}

.is-mobile .registration-container {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.is-tablet .form-header h2,
.tablet .form-header h2,
.is-mobile .form-header h2 {
  font-size: 16px;
}

.is-mobile .sms-text,
.is-mobile .switch-text,
.is-mobile .checkbox-text {
  font-size: 12px;
  white-space: normal;
}

.is-mobile .error-message {
  font-size: 11px;
  margin-left: 0;
  position: static;
}

.is-tablet .next-button,
.tablet .next-button,
.is-mobile .next-button,
.is-tablet .form-submit,
.tablet .form-submit,
.is-mobile .form-submit {
  width: 150px;
  height: 34px;
  font-size: 13px;
}
</style>

<style>
.v-field__input {
  padding-bottom: 1vw;
  padding-top: 30px;
  font-size: 16px;
  background-color: transparent;
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

.v-date-picker .v-btn:hover .v-btn__overlay {
  background-color: transparent;
  border: 1px solid #982881;
}

.v-date-picker .v-btn:hover .v-btn__content {
  color: black;
}

/* Estilos para elementos seleccionados en el date picker */
.v-date-picker .v-btn--active {
  background-color: #982881 !important;
  color: white !important;
}

.v-date-picker .v-btn--active .v-btn__content {
  color: white !important;
}

/* Estilos más específicos para el header del date picker */
.v-date-picker .v-date-picker-header .v-btn--active {
  background-color: #982881 !important;
  color: white !important;
}

.v-date-picker .v-date-picker-header .v-btn--active .v-btn__content {
  color: white !important;
}

/* Estilos para días seleccionados en el calendario */
.v-date-picker .v-date-picker-month .v-btn--active {
  background-color: #982881 !important;
  color: white !important;
}

.v-date-picker .v-date-picker-month .v-btn--active .v-btn__content {
  color: white !important;
}

/* Estilos para selectores de año */
.v-date-picker .v-date-picker-years .v-btn--active {
  background-color: #982881 !important;
  color: white !important;
}

.v-date-picker .v-date-picker-years .v-btn--active .v-btn__content {
  color: white !important;
}

/* Estilos globales para cualquier botón activo en date picker */
.v-date-picker .v-btn.v-btn--active {
  background-color: #982881 !important;
}

.v-date-picker .v-btn.v-btn--active .v-btn__content {
  color: white !important;
}



.v-select__content .v-list-item:hover {
  background-color: rgba(152, 40, 129, 0.06) !important;
  transition: background-color 0.2s ease !important;
}

.v-select__content .v-list-item {
  transition: background-color 0.2s ease !important;
}

/* Evitar que el texto de las opciones expanda los selectores */
.v-select .v-select__selection-text {
  max-width: 220px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  padding: 0 !important;
}

/* Padding para el contenido del select */
.v-select .v-field__input {
  padding: 16px 12px !important;
}

/* Padding específico para el texto seleccionado */
.v-select .v-select__selection {
  padding: 0 4px !important;
}

.v-overlay__content .v-list-item {
  transition: background-color 0.2s ease !important;
}

.v-overlay__content .v-list-item:hover {
  background-color: rgba(152, 40, 129, 0.06) !important;
  transition: background-color 0.2s ease !important;
}

/* Aclarar overlay por defecto para evitar oscurecer el texto */
.v-overlay__content .v-list-item .v-list-item__overlay {
  background-color: transparent !important;
}

.v-overlay__content .v-list-item:hover .v-list-item__overlay {
  background-color: rgba(152, 40, 129, 0.06) !important;
}

/* Estado activo/seleccionado más sutil y legible */
.v-overlay__content .v-list-item.v-list-item--active .v-list-item__overlay {
  background-color: rgba(152, 40, 129, 0.12) !important;
}

/* Mensajes de error */
.error-message {
  color: #e53e3e;
  font-size: 12px;
  margin-top: -15px;
  margin-left: calc(19px + 1vw);
  position: relative;
  z-index: 10;
}

/* Animación slide-down */
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

/* Custom tooltip styles */
.custom-tooltip .v-overlay__content {
  background-color: #767676 !important;
  border-radius: 6px !important;
  padding: 8px 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  max-width: 250px !important;
  min-width: 200px !important;
  font-size: 12px !important;
  line-height: 1.3 !important;
  color: white !important;
  text-align: center !important;
  white-space: normal !important;
  word-wrap: break-word !important;
}

.custom-tooltip .v-overlay__content::before {
  display: none !important;
}

/* Fade transition for tooltips */
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.4s ease !important;
}

.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0 !important;
}

.fade-transition-enter-to,
.fade-transition-leave-from {
  opacity: 1 !important;
}

/* Open Finance Message - keeping for potential future use */
.open-finance-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  margin: 20px 0;
  background: linear-gradient(135deg,
      rgba(97, 40, 120, 0.08) 0%,
      rgba(186, 45, 125, 0.08) 100%);
  border-radius: 12px;
  border-left: 4px solid #612878;
  position: relative;
  overflow: hidden;
}

.open-finance-message::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 100%;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(97, 40, 120, 0.05) 100%);
  pointer-events: none;
}

.finance-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #612878 0%, #ba2d7d 100%);
  border-radius: 50%;
  color: white;
  flex-shrink: 0;
}

.open-finance-message p {
  margin: 0;
  font-size: 15px;
  color: #444;
  line-height: 1.4;
  font-weight: 500;
}

.open-finance-message strong {
  color: #612878;
  font-weight: 700;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .registration-container {
    width: 90vw;
    padding: 0 10px;
  }

  .form-header h2 {
    font-size: 16px;
  }

  .sms-container {
    max-width: calc(100vw - 80px);
  }

  .sms-text {
    font-size: 12px;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.4;
    overflow-wrap: break-word;
  }

  .switch-text {
    font-size: 12px;
    white-space: normal;
  }

  .checkbox-text {
    font-size: 12px;
    white-space: normal;
  }

  .form-body .form-ctn {
    gap: 2vw;
  }

  .sms-container {
    margin-left: calc(19px + 2vw);
  }

  .switch-container {
    margin-left: calc(19px + 2vw);
    white-space: normal;
  }

  .checkbox-container {
    margin-left: calc(19px + 2vw);
  }

  .error-message {
    margin-left: calc(19px + 2vw);
    font-size: 11px;
  }

  .process-disclaimer p {
    font-size: 14px;
  }

  .next-disclaimer p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .registration-container {
    width: 95vw;
    padding: 0 5px;
  }

  .form-header h2 {
    font-size: 14px;
    padding: 10px;
  }


  .switch-text {
    font-size: 11px;
  }

  .checkbox-text {
    font-size: 11px;
  }

  .form-body .form-ctn {
    gap: 3vw;
  }

  .sms-container {
    margin-left: calc(19px + 3vw);
    max-width: calc(100vw - 60px);
  }

  .sms-text {
    font-size: 11px;
    word-wrap: break-word;
    line-height: 1.3;
    overflow-wrap: break-word;
  }

  .switch-container {
    margin-left: calc(19px + 3vw);
    flex-wrap: wrap;
  }

  .checkbox-container {
    margin-left: calc(19px + 3vw);
  }

  .error-message {
    margin-left: calc(19px + 3vw);
    font-size: 10px;
  }

  .process-disclaimer {
    padding: 12px 20px;
  }

  .process-disclaimer p {
    font-size: 12px;
  }

  .next-disclaimer {
    padding: 12px 16px;
  }

  .next-disclaimer p {
    font-size: 12px;
  }

  .next-button {
    width: 140px;
    height: 32px;
    font-size: 12px;
  }

  .custom-tooltip .v-overlay__content {
    max-width: 200px !important;
    min-width: 150px !important;
    font-size: 10px !important;
  }
}

/* Consent section spacing */
.consent-section {
  margin-top: 30px;
  clear: both;
}
</style>

<style>
/* Estilos globales para el date picker - sin scoped para mayor especificidad */
.v-date-picker .v-btn--active {
  background-color: transparent !important;
  border: 1px solid #982881 !important;
  color: black !important;
}

.v-date-picker .v-btn--active .v-btn__content {
  color: black !important;
}

.v-date-picker .v-btn--active .v-btn__overlay {
  background-color: transparent !important;
}

.v-date-picker .v-btn--variant-text.v-btn--active {
  background-color: transparent !important;
  border: 1px solid #982881 !important;
  color: black !important;
}

.v-date-picker .v-btn--variant-text.v-btn--active .v-btn__content {
  color: black !important;
}

/* Para el selector de mes y año */
.v-date-picker-header .v-btn--active {
  background-color: transparent !important;
  border: 1px solid #982881 !important;
  color: black !important;
}

.v-date-picker-header .v-btn--active .v-btn__content {
  color: black !important;
}

/* Para los días del calendario */
.v-date-picker-month .v-btn--active {
  background-color: transparent !important;
  border: 1px solid #982881 !important;
  color: black !important;
}

.v-date-picker-month .v-btn--active .v-btn__content {
  color: black !important;
}

/* Para el selector de años */
.v-date-picker-years .v-btn--active {
  background-color: transparent !important;
  border: 1px solid #982881 !important;
  color: black !important;
}

.v-date-picker-years .v-btn--active .v-btn__content {
  color: black !important;
}
</style>
// Mantener el store del PDF sincronizado con los campos relevantes
watch(
() => ({
nombres: form.nombres,
primerApellido: form.primerApellido,
tipoDocumento: form.tipoDocumento,
numeroIdentificacion: form.numeroIdentificacion,
fechaExpedicionDocumento: form.fechaExpedicionDocumento,
celular: form.celular,
correo: form.correo,
}),
() => {
const primerNombre = (form.nombres || '').trim().split(/\s+/)[0] || ''
pdfFormStore.setFromRegistrationStep1({
tipoDocumento: form.tipoDocumento,
numeroIdentificacion: form.numeroIdentificacion,
primerNombre,
primerApellido: form.primerApellido,
fechaExpedicion: form.fechaExpedicionDocumento as unknown as string,
celular: form.celular,
correo: form.correo,
})
},
{ deep: true }
)
