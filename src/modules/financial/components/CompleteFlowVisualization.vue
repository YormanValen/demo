<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  totalDuration?: number;
}>();

const flowVisible = ref(false);
const currentStep = ref(3); // Los primeros 3 ya completados, listo para empezar paso 4
const stepCompleted = ref([true, true, true, false, false]); // Primeros 3 ya completados

const steps = [
  { title: 'Usuario', icon: 'mdi-account' },
  { title: 'Validación de Identidad y Otorgación de Consentimientos', icon: 'mdi-fingerprint' },
  { title: 'Almacenamiento', icon: 'mdi-database' },
  { title: 'Proveedor SMS', icon: 'mdi-message-text' },
  { title: 'OTP Celular', icon: 'mdi-cellphone' }
];

const stepDuration = computed(() => (props.totalDuration || 4000) / 2); // 2 pasos nuevos

const startAnimation = () => {
  flowVisible.value = true;
  
  // Los primeros 3 ya están completados, empezar inmediatamente con Proveedor SMS
  
  // Iniciar paso 4: Proveedor SMS inmediatamente
  setTimeout(() => {
    currentStep.value = 4;
  }, 100);

  // Completar Proveedor SMS y pasar a OTP Celular
  setTimeout(() => {
    stepCompleted.value[3] = true;
    currentStep.value = 5;
  }, stepDuration.value);

  // Completar OTP Celular
  setTimeout(() => {
    stepCompleted.value[4] = true;
  }, stepDuration.value * 2);
};

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      startAnimation();
    }, 100);
  } else {
    flowVisible.value = false;
    currentStep.value = 3;
    stepCompleted.value = [true, true, true, false, false];
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
            'current': currentStep === index + 1 && !stepCompleted[index],
            'previous-completed': stepCompleted[index] && index < 3
          }"
          :style="{
            '--fill-duration': stepDuration + 'ms'
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
      </template>
    </div>
  </div>
</template>

<style scoped>
.flow-container {
  width: 100%;
  max-width: 1200px;
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
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
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
  height: 140px;
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

.step-card.previous-completed {
  border-color: #4CAF50;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.02) 100%);
}

.step-card.active:not(.completed) {
  border-color: #982881;
  background: linear-gradient(135deg, rgba(152, 40, 129, 0.05) 0%, rgba(152, 40, 129, 0.02) 100%);
}

/* Todas las tarjetas tienen la misma altura, con anchos especiales para ciertas tarjetas */
.step-card:nth-child(1) {
  min-width: 180px; /* Usuario */
}

.step-card:nth-child(3) {
  min-width: 200px; /* Validación de Identidad y Otorgación de Consentimientos */
}

.step-card:nth-child(5) {
  min-width: 180px; /* Almacenamiento */
}

.step-card:nth-child(7) {
  min-width: 180px; /* Proveedor SMS */
}

.step-card:nth-child(5) {
  min-width: 160px; /* OTP Celular */
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

.step-card.completed .card-fill-background,
.step-card.previous-completed .card-fill-background {
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

.step-card.completed .icon-container,
.step-card.previous-completed .icon-container {
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

.step-card.completed .step-number,
.step-card.previous-completed .step-number {
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

/* Ajustar texto específicamente para la tarjeta más ancha */
.step-card:nth-child(3) .step-title {
  font-size: 13px;
  line-height: 1.1;
  padding: 0 5px;
}

.step-card.current .step-title {
  color: #982881;
}

.step-card.completed .step-title,
.step-card.previous-completed .step-title {
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


/* Responsive design */
@media (max-width: 1200px) {
  .steps-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  .step-card {
    min-width: 180px;
    max-width: 200px;
  }
}

@media (max-width: 768px) {
  .steps-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    padding: 15px;
  }
  
  .step-card {
    min-width: auto;
    max-width: none;
    height: 120px;
    padding: 10px;
  }
  
  .step-title {
    font-size: 11px;
    line-height: 1.1;
  }
  
  .step-card:nth-child(2) .step-title {
    font-size: 10px;
    line-height: 1.0;
  }
}

@media (max-width: 480px) {
  .flow-container {
    max-width: 100%;
  }
  
  .steps-container {
    padding: 10px;
    gap: 8px;
  }
  
  .step-card {
    padding: 8px;
    height: 110px;
  }
  
  .step-title {
    font-size: 10px;
    line-height: 1.0;
  }
  
  .step-card:nth-child(2) .step-title {
    font-size: 9px;
    line-height: 0.9;
  }
}
</style>