<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  validationTime?: number;
  processingTime?: number;
}>();

const flowVisible = ref(false);
const currentStep = ref(0);
const stepCompleted = ref([false, false]);

const steps = [
  { title: 'Sistema', icon: 'mdi-cog' },
  { title: 'Directorio de Participantes', icon: 'mdi-account-group' }
];

const firstStepDuration = computed(() => (props.validationTime || 2500));
const secondStepDuration = computed(() => (props.processingTime || 2500));

const startAnimation = () => {
  flowVisible.value = true;
  currentStep.value = 0;
  stepCompleted.value = [false, false];

  // Iniciar paso 1: Sistema
  setTimeout(() => {
    currentStep.value = 1;
  }, 100);

  // Completar paso 1 y pasar al paso 2
  setTimeout(() => {
    stepCompleted.value[0] = true;
    currentStep.value = 2;
  }, firstStepDuration.value);

  // Completar paso 2
  setTimeout(() => {
    stepCompleted.value[1] = true;
  }, firstStepDuration.value + secondStepDuration.value);
};

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      startAnimation();
    }, 100);
  } else {
    flowVisible.value = false;
    currentStep.value = 0;
    stepCompleted.value = [false, false];
  }
});

onMounted(() => {
  if (props.isVisible) {
    setTimeout(() => {
      startAnimation();
    }, 100);
  }
});
</script>

<template>
  <div class="flow-container" :class="{ 'flow-visible': flowVisible }">
    <div class="steps-container">
      <template v-for="(step, index) in steps" :key="index">
        <div 
          class="step-card"
          :class="{
            'active': currentStep > index,
            'completed': stepCompleted[index],
            'current': currentStep === index + 1 && !stepCompleted[index]
          }"
          :style="{
            '--fill-duration': index === 0 ? firstStepDuration + 'ms' : secondStepDuration + 'ms'
          }"
        >
          <!-- Fondo de llenado animado -->
          <div class="card-fill-background"></div>
          
          <div class="card-header">
            <div class="icon-container">
              <v-icon 
                size="24" 
                :color="stepCompleted[index] ? '#4CAF50' : currentStep >= index ? '#982881' : '#ccc'"
              >
                {{ step.icon }}
              </v-icon>
            </div>
            <div class="step-number">{{ index + 1 }}</div>
          </div>
          
          <div class="card-content">
            <h3 class="step-title">{{ step.title }}</h3>
          </div>
          
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :class="{ 
                'filling': currentStep === index + 1 && !stepCompleted[index],
                'completed': stepCompleted[index] 
              }"
            ></div>
          </div>
        </div>

        <!-- Puente/Conector entre pasos -->
        <div 
          v-if="index < steps.length - 1" 
          class="step-connector"
          :class="{
            'connector-active': currentStep > index + 1,
            'connector-filling': currentStep === index + 2 && !stepCompleted[index + 1]
          }"
        >
          <div class="connector-line">
            <div class="connector-progress"></div>
          </div>
          <v-icon class="connector-arrow" size="16" color="#982881">mdi-chevron-right</v-icon>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.flow-container {
  width: 100%;
  max-width: 700px;
  margin: 20px auto 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-in-out;
}

.flow-visible {
  opacity: 1;
  transform: translateY(0);
}

.steps-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 25px;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.step-card.current {
  border-color: #982881;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(152, 40, 129, 0.2);
}

.step-card.completed {
  border-color: #4CAF50;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%);
}

.step-card.active:not(.completed) {
  border-color: #982881;
  background: linear-gradient(135deg, rgba(152, 40, 129, 0.05) 0%, rgba(152, 40, 129, 0.02) 100%);
}

/* Hacer la tarjeta del paso 2 (Directorio de Participantes) más alta */
.step-card:nth-child(3) {
  height: 130px;
}

/* Fondo de llenado animado */
.card-fill-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(135deg, rgba(152, 40, 129, 0.15) 0%, rgba(152, 40, 129, 0.08) 100%);
  border-radius: 10px;
  transition: width 0.3s ease;
  z-index: 1;
}

.step-card.current .card-fill-background {
  animation: fillCard var(--fill-duration, 2s) ease-out forwards;
}

.step-card.completed .card-fill-background {
  width: 100%;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.08) 100%);
}

@keyframes fillCard {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(152, 40, 129, 0.1);
  transition: all 0.3s ease;
}

.step-card.completed .icon-container {
  background: rgba(76, 175, 80, 0.2);
}

.step-number {
  background: #e0e0e0;
  color: #666;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step-card.current .step-number {
  background: #982881;
  color: white;
}

.step-card.completed .step-number {
  background: #4CAF50;
  color: white;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px 0;
  position: relative;
  z-index: 2;
}

/* Mejor organización para la tarjeta del paso 2 */
.step-card:nth-child(3) .card-content {
  justify-content: flex-start;
  padding-top: 8px;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  line-height: 1.2;
  transition: color 0.3s ease;
  word-wrap: break-word;
  hyphens: auto;
}

/* Ajustar texto específicamente para la tarjeta más alta */
.step-card:nth-child(3) .step-title {
  font-size: 13px;
  line-height: 1.1;
  padding: 0 5px;
}

.step-card.current .step-title {
  color: #982881;
}

.step-card.completed .step-title {
  color: #4CAF50;
}

.progress-bar {
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.progress-fill {
  height: 100%;
  background: #982881;
  border-radius: 2px;
  width: 0;
  transition: width 0.3s ease;
}

.progress-fill.filling {
  animation: fillProgress 2s ease-in-out forwards;
}

.progress-fill.completed {
  width: 100%;
  background: #4CAF50;
}

@keyframes fillProgress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Estilos para los conectores */
.step-connector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.step-connector.connector-active {
  opacity: 1;
}

.step-connector.connector-filling {
  opacity: 1;
}

.connector-line {
  width: 50px;
  height: 3px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.connector-progress {
  height: 100%;
  background: #982881;
  width: 0;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.step-connector.connector-active .connector-progress {
  width: 100%;
  background: #4CAF50;
}

.step-connector.connector-filling .connector-progress {
  animation: fillConnector 1s ease-in-out forwards;
}

.connector-arrow {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.step-connector.connector-active .connector-arrow {
  opacity: 1;
  color: #4CAF50 !important;
}

.step-connector.connector-filling .connector-arrow {
  opacity: 0.8;
  color: #982881 !important;
}

@keyframes fillConnector {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .steps-container {
    grid-template-columns: 1fr auto 1fr;
    gap: 15px;
    padding: 20px;
  }
  
  .connector-line {
    width: 40px;
  }
  
  .step-card {
    padding: 15px;
    height: 100px;
  }
  
  .step-card:nth-child(3) {
    height: 120px;
  }
  
  .step-title {
    font-size: 13px;
    line-height: 1.2;
  }
  
  .step-card:nth-child(3) .step-title {
    font-size: 12px;
    line-height: 1.1;
  }
}

@media (max-width: 768px) {
  .steps-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .step-card {
    min-width: auto;
    max-width: none;
    width: 100%;
    height: 90px;
    padding: 15px;
  }
  
  .step-card:nth-child(3) {
    height: 110px;
  }
  
  .step-title {
    font-size: 14px;
  }
  
  .step-connector {
    transform: rotate(90deg);
    padding: 10px 0;
  }
  
  .connector-line {
    width: 30px;
    height: 2px;
  }
  
  .connector-arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 480px) {
  .flow-container {
    max-width: 100%;
  }
  
  .steps-container {
    padding: 10px;
  }
  
  .step-card {
    padding: 12px;
    height: 85px;
  }
  
  .step-card:nth-child(3) {
    height: 105px;
  }
  
  .step-title {
    font-size: 12px;
    line-height: 1.2;
  }
  
  .step-card:nth-child(3) .step-title {
    font-size: 11px;
    line-height: 1.1;
  }
}
</style>