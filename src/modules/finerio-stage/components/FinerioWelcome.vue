<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import FinancialLoader from "../../registration/components/FinancialLoader.vue";
import FlowVisualization from "../../registration/components/FlowVisualization.vue";
import AnimationContainer from "../../financial/components/AnimationContainer.vue";

const router = useRouter();

const showLoader = ref(false);
const showAnimationContainer = ref(true);
const isAnimationOpen = ref(false);
const showFlowVisualization = ref(false);
const showContainerLoader = ref(false);
const showNextButton = ref(false);
const showProcessComplete = ref(false);

const handleContinue = () => {
  showLoader.value = true;

  // Mostrar header inmediatamente pero esperar un poco para abrir
  setTimeout(() => {
    isAnimationOpen.value = true;
    showContainerLoader.value = true;
    showFlowVisualization.value = true;

    // Mostrar botón después del primer ciclo (5 segundos)
    setTimeout(() => {
      showProcessComplete.value = true;
      showNextButton.value = true;
    }, 5000);
  }, 300);
};

const handleNextClick = () => {
  showLoader.value = false;
  isAnimationOpen.value = false;
  // Navegar a la nueva vista de procesamiento
<<<<<<< HEAD
  router.push("/finerio/process");
=======
  router.push("/financial/process");
>>>>>>> 5bcc17b (fix/Registerform-UI-adjusments)
};

const handleAnimationToggle = (isOpen: boolean) => {
  if (isOpen) {
    setTimeout(() => {
      showFlowVisualization.value = true;
    }, 300);
  } else {
    showFlowVisualization.value = false;
  }
};
</script>

<template>
  <div class="financial-welcome">
    <div class="header-section">
      <h1 class="title">Continúe con su verificación financiera</h1>
      <p class="subtitle">Proceda con la verificación de sus datos financieros</p>
    </div>
    <div class="blue-container">
      <div class="decoration-image"></div>
      <div class="welcome-text">
        <span class="welcome-bold"></span>
        <span class="welcome-normal">Bienvenido a la verificación financiera</span>
      </div>
      <div class="divider-line"></div>
      <div class="description-text">
        <span class="description-bold"></span> A partir de este momento
        puedes continuar tu solicitud en la plataforma y diligenciar la información
        correspondiente con la entidad que selecciones.
      </div>
      <div class="financial-image"></div>
    </div>
    <button class="continue-button" @click="handleContinue">Continuar</button>

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
          <FlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="2500"
            :processing-time="2500" />

          <!-- Process disclaimer -->
          <div v-if="showFlowVisualization" class="process-disclaimer">
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

    <FinancialLoader :show="showLoader" />
  </div>
</template>

<style scoped>
.financial-welcome {
  display: flex;
  flex-direction: column;
  width: 60vw;
  padding: 20px;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
}

.title {
  font-size: 32px;
  font-weight: normal;
  color: #26603a;
  margin: 0 0 10px 0;
  text-align: left;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
  text-align: left;
}

.blue-container {
  width: 100%;
  height: 1000px;
  background-color: #e7effa;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.decoration-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-image: url("/src/assets/confeti.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: top center;
  z-index: 1;
}

.welcome-text {
  position: absolute;
  top: 170px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #3b82f6;
  z-index: 2;
}

.welcome-bold {
  font-weight: bold;
}

.welcome-normal {
  font-weight: normal;
}

.divider-line {
  position: absolute;
  top: 210px;
  left: 50%;
  transform: translateX(-50%);
  width: 72%;
  height: 1px;
  background-color: #0000002d;
  z-index: 2;
}

.description-text {
  position: absolute;
  top: 230px;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  text-align: center;
  font-size: 16px;
  color: #4a5568;
  z-index: 2;
  line-height: 1.5;
}

.description-bold {
  font-weight: bold;
}

.financial-image {
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 600px;
  background-image: url("/src/assets/financial_image.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  z-index: 2;
}

.continue-button {
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

.continue-button:hover {
  opacity: 0.9;
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
