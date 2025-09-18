<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRegistrationStore } from "../stores/registration.store";
import type { RegistrationFormData } from "../types/registration.types";
import ValidationLoader from "./ValidationLoader.vue";
import FinancialLoader from "./FinancialLoader.vue";
import FlowVisualization from "./FlowVisualization.vue";
import AnimationContainer from "./AnimationContainer.vue";
const router = useRouter();
const store = useRegistrationStore();
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

const VALIDATION_TIME = 5000; // 5 segundos para la validación
const PROCESSING_TIME = 3000; // 3 segundos para el procesamiento

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
  autorizaTratamientoDatos: false,
  autorizaFinesComerciales: false,
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
  autorizaTratamientoDatos: "",
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
    case "autorizaTratamientoDatos":
      fieldErrors.autorizaTratamientoDatos = !form.autorizaTratamientoDatos
        ? "Debe autorizar el tratamiento de datos"
        : "";
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
    !!form.celular.trim() &&
    form.autorizaTratamientoDatos
  );
});

const handleSubmit = async () => {
  Object.keys(fieldErrors).forEach((key) => {
    validateField(key as keyof typeof fieldErrors);
  });

  if (!isFormValid.value || isSubmitting.value) {
    return;
  }

  setPhoneNumber(form.celular);
  
  openAnimationContainer();
  showValidationLoader.value = true;

  setTimeout(() => {
    showValidationLoader.value = false;
    isAnimationOpen.value = false;
    showFlow.value = false;
    showFinancialLoader.value = true;
    
    setTimeout(() => {
      showFinancialLoader.value = false;
      router.push("/registration/financial-information");
    }, PROCESSING_TIME);
  }, VALIDATION_TIME);
};


const openAnimationContainer = () => {
  // Programmatically open the container through reactive state
  isAnimationOpen.value = true;
  setTimeout(() => {
    showFlow.value = true;
    console.log('showFlow activated:', showFlow.value);
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
</script>

<template>
  <div class="registration-container">
    <div class="registration-form">
      <div class="form-header">
        <h2>INFORMACIÓN BÁSICA</h2>
      </div>

      <form class="form-body" @submit.prevent="handleSubmit">
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
            <v-text-field variant="underlined" v-model="form.numeroIdentificacion" label="Número de identificación"
              class="form-field" required @blur="validateField('numeroIdentificacion')" />
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
            <v-dialog v-model="showDatePicker" width="auto">
              <v-date-picker show-adjacent-months v-model="form.fechaExpedicionDocumento" @update:model-value="
                showDatePicker = false;
              validateField('fechaExpedicionDocumento');
              " color="#982881" />
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

        <v-row>
          <v-col cols="12" class="switch-container">
            <v-switch v-model="form.esPEP" color="#982881" density="compact" hide-details inline />
            <span class="switch-text">Soy una persona expuesta públicamente (PEP)</span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="checkbox-container">
            <v-checkbox v-model="form.autorizaTratamientoDatos" color="#982881" density="compact" hide-details
              @change="validateField('autorizaTratamientoDatos')" />
            <span class="checkbox-text">
              Autorizo el tratamiento de mis datos para fines de inclusión
              financiera y mayor acceso al crédito
              <a href="#" class="document-link">Ver documento</a>
            </span>
          </v-col>
          <v-col v-if="fieldErrors.autorizaTratamientoDatos" cols="12">
            <transition name="slide-down">
              <div class="error-message">
                {{ fieldErrors.autorizaTratamientoDatos }}
              </div>
            </transition>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="checkbox-container">
            <v-checkbox v-model="form.autorizaFinesComerciales" color="#982881" density="compact" hide-details />
            <span class="checkbox-text">
              Autorización para fines comerciales
            </span>
          </v-col>
        </v-row>

        <button type="submit" class="form-submit" :disabled="!isFormValid || isSubmitting">
          {{ isSubmitting ? "Enviando..." : "Continuar" }}
        </button>
      </form>
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
      <div style="display: flex; justify-content: center; min-height: 120px; align-items: center;">
        <div v-if="!showFlow" class="flow-spinner">
          <v-progress-circular :size="50" :width="4" color="#982881" indeterminate />
          <p style="margin-top: 12px; color: #666; font-size: 14px;">Cargando flujo de proceso...</p>
        </div>
        <FlowVisualization v-else :is-visible="true" :validation-time="3000" :processing-time="2000" />
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

.v-date-picker .v-btn:hover .v-btn__overlay {
  background-color: transparent;
  border: 1px solid #982881;
}

.v-date-picker .v-btn:hover .v-btn__content {
  color: black;
}

.v-label {
  background-color: white;
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
  position: absolute;
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
</style>
