<script setup lang="ts">
import { ref } from 'vue'
import FinancialLoader from '../../registration/components/FinancialLoader.vue'
import FlowVisualization from '../../registration/components/FlowVisualization.vue'
import AnimationContainer from '../../financial/components/AnimationContainer.vue'

const showLoader = ref(false)
const showAnimationContainer = ref(true)
const isAnimationOpen = ref(false)
const showFlowVisualization = ref(false)

const handleContinue = () => {
  showLoader.value = true
  
  // Mostrar header inmediatamente pero esperar un poco para abrir
  setTimeout(() => {
    isAnimationOpen.value = true
    showFlowVisualization.value = true
  }, 300)
  
  // Duración total de 5 segundos
  setTimeout(() => {
    showLoader.value = false
    isAnimationOpen.value = false
  }, 5000)
}

const handleAnimationToggle = (isOpen: boolean) => {
  if (isOpen) {
    setTimeout(() => {
      showFlowVisualization.value = true
    }, 300)
  } else {
    showFlowVisualization.value = false
  }
}
</script>

<template>
  <div class="finerio-welcome">
    <div class="header-section">
      <h1 class="title">Continúe con su solicitud en finerio</h1>
      <p class="subtitle">Continua solicitud en finerio por favor</p>
    </div>
    <div class="blue-container">
      <div class="decoration-image"></div>
      <div class="welcome-text">
        <span class="welcome-bold">¡Finerio</span> <span class="welcome-normal">bienvenido a finerio</span>
      </div>
      <div class="divider-line"></div>
      <div class="description-text">
        <span class="description-bold">Finerio!</span> A partir de este momento pudes continuar tu solicitud en finerio
        y diligenciar la información correspondiente con la entidad que selecciones.
      </div>
      <div class="finerio-image"></div>
    </div>
    <button class="continue-button" @click="handleContinue">
      Continuar
    </button>
    
    <AnimationContainer 
      :is-visible="showAnimationContainer" 
      :force-open="isAnimationOpen" 
      :clickable-header="false"
      @toggle="handleAnimationToggle"
    >
      <template #header>
        <span>Flujo de Proceso</span>
      </template>
      <div style="display: flex; justify-content: center; min-height: 120px; align-items: center;">
        <FlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="2500" :processing-time="2500" />
      </div>
    </AnimationContainer>
    
    <FinancialLoader :show="showLoader" />
  </div>
</template>

<style scoped>
.finerio-welcome {
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
  background-image: url('/src/assets/confeti.png');
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

.finerio-image {
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 600px;
  background-image: url('/src/assets/finerio_image.png');
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
</style>