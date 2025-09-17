<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRegistrationStore } from "../stores/registration.store";
import type { RegistrationFormData } from "../types/registration.types";
import OtpModal from "./OtpModal.vue";
import ValidationLoader from "./ValidationLoader.vue";
import FinancialLoader from "./FinancialLoader.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const router = useRouter();
const store = useRegistrationStore();
const {
  tipoOptions,
  isLoadingTipos,
  isSubmitting,
  feedbackMessage,
  departamentoOptions,
  ciudadOptions,
} = store;

const showOtpModal = ref(false);
const showValidationLoader = ref(false);
const showFinancialLoader = ref(false);
const showDatePicker = ref(false);

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

const formattedDate = computed(() => {
  if (!form.fechaExpedicionDocumento) return "";
  const date = new Date(form.fechaExpedicionDocumento);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const isFormValid = computed(() => {
  return (
    !!form.nombres.trim() &&
    !!form.primerApellido.trim() &&
    !!form.correo.trim() &&
    !!form.tipoDocumento &&
    !!form.numeroIdentificacion.trim() &&
    !!form.celular.trim() &&
    form.autorizaTratamientoDatos
  );
});

const handleSubmit = async () => {
  if (!isFormValid.value || isSubmitting.value) {
    return;
  }

  showValidationLoader.value = true;

  setTimeout(() => {
    showValidationLoader.value = false;
    showOtpModal.value = true;
  }, 5000);
};

const handleOtpVerified = async () => {
  showOtpModal.value = false;
  showFinancialLoader.value = true;

  setTimeout(() => {
    showFinancialLoader.value = false;
    router.push("/registration/financial-information");
  }, 3000);
};

const handleOtpClose = () => {
  showOtpModal.value = false;
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
          <v-col class="form-ctn" cols="12" md="4">
            <v-icon class="form-icon">mdi-account</v-icon>
            <v-text-field
              variant="underlined"
              v-model="form.nombres"
              label="Nombres"
              class="form-field"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.primerApellido"
              label="Primer apellido"
              class="form-field"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.segundoApellido"
              label="Segundo apellido"
              class="form-field"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              variant="outlined"
              v-model="form.tipoDocumento"
              :items="tipoOptions"
              label="Tipo de documento"
              item-title="label"
              item-value="value"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="underlined"
              v-model="form.numeroIdentificacion"
              label="Número de identificación"
              class="form-field"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              variant="outlined"
              :model-value="formattedDate"
              label="Fecha de expedición de documento"
              readonly
              append-inner-icon="mdi-calendar"
              @click="showDatePicker = true"
              required
            />
            <v-dialog v-model="showDatePicker" width="auto">
              <v-date-picker
                show-adjacent-months
                v-model="form.fechaExpedicionDocumento"
                @update:model-value="showDatePicker = false"
                color="#982881"
              />
            </v-dialog>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              variant="outlined"
              v-model="form.departamentoExpedicion"
              :items="departamentoOptions"
              label="Departamento de expedición"
              item-title="label"
              item-value="value"
              required
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              variant="outlined"
              v-model="form.ciudadExpedicion"
              :items="ciudadOptions"
              label="Ciudad de expedición"
              item-title="label"
              item-value="value"
              required
            />
          </v-col>
        </v-row>

        <button
          type="submit"
          class="form-submit"
          :disabled="!isFormValid || isSubmitting"
        >
          {{ isSubmitting ? "Enviando..." : "Continuar" }}
        </button>
      </form>
    </div>

    <p v-if="feedbackMessage" class="registration-form__feedback">
      {{ feedbackMessage }}
    </p>

    <ValidationLoader :show="showValidationLoader" />
    <FinancialLoader :show="showFinancialLoader" />

    <OtpModal
      :show="showOtpModal"
      :phone-number="form.celular"
      @close="handleOtpClose"
      @verified="handleOtpVerified"
    />
  </div>
</template>

<style scoped>
.registration-container {
  padding: 1vw 0;
}

.form-header {
  background: linear-gradient(
      21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%
    )
    0% 0% no-repeat padding-box padding-box transparent;

  width: 70vw;
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
}

.form-body .form-icon {
  color: #707070;
}
</style>

<style>
.v-field__input {
  padding-bottom: 1vw;
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
</style>
