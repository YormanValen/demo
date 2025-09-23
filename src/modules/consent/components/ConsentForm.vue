<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingScreen from '../../../shared/components/LoadingScreen.vue'

const showContent = ref(false)

const router = useRouter();

const openContent = () => {
  showContent.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, 5000);
  });
};

const benefits = ref([
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
    description: 'Autoriza que tus datos se conecten entre bancos y aliados para que tus trámites sean más ágiles.',
    icon: 'mdi-link-variant',
    checked: false
  },
  {
    id: 'riskProtection',
    title: 'Analizar tu perfil financiero para protegerte de riesgos',
    description: 'Con tu autorización podremos evaluar tu situación financiera y prevenir riesgos de sobreendeudamiento o fraude.',
    icon: 'mdi-shield-check-outline',
    checked: false
  }
]);


const handleNextClick = async () => {
  // Primero activamos el loader
  await openContent();
  // Después de que termine el loader, navegamos a la siguiente ruta
  router.push("/registration/financial-information");
};
</script>

<template>
  <div class="consent-form">
    <div class="form-header">
      <h2>INFORMACIÓN CONSENTIMIENTOS A SOLICITAR</h2>
    </div>

    <div class="benefits-container">
      <div v-for="benefit in benefits" :key="benefit.id" class="benefit-item">
        <div class="benefit-icon">
          <v-icon :icon="benefit.icon" color="#982881" size="24"></v-icon>
        </div>
        <div class="benefit-content">
          <h3 class="benefit-title">{{ benefit.title }}</h3>
          <p class="benefit-description">{{ benefit.description }}</p>
        </div>
        <v-checkbox
          v-model="benefit.checked"
          color="#982881"
          hide-details
          :ripple="false"
          class="benefit-checkbox"
          density="compact"
        ></v-checkbox>
      </div>
    </div>

    <!-- Mensaje de consentimiento -->
    <div class="consent-message">
      <p>Tú decides qué autorizas. Siempre puedes cambiar o revocar tu consentimiento cuando lo necesites</p>
    </div>

    <!-- Botón Continuar -->
    <div class="button-container">
      <button @click="handleNextClick" class="continue-button">
        Continuar
      </button>
    </div>
  </div>

  <LoadingScreen :show="showContent" />

</template>

<style scoped>
.consent-form {
  padding: 0;
  width: 60vw;
  margin-top: 10px;
}

.form-header {
  background: linear-gradient(
      21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%
    )
    0% 0% no-repeat padding-box padding-box transparent;
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
