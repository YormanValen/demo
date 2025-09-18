<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  validationTime?: number; // Tiempo para la primera animación (Usuario -> API)
  processingTime?: number; // Tiempo para la segunda animación (API -> DB)
}>();

const flowVisible = ref(false);
const firstStepDuration = computed(() => (props.validationTime || 5000) / 1000);
const secondStepDuration = computed(() => (props.processingTime || 3000) / 1000);

watch(() => props.isVisible, (newValue) => {
  flowVisible.value = newValue;
});
</script>

<template>
  <div class="flow-container" :class="{ 'flow-visible': flowVisible }">
    <div class="flow-content">
      <div class="flow-step user">
        <v-icon size="32" color="#982881">mdi-account</v-icon>
        <span>Usuario</span>
      </div>
      
      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line 
            x1="0" 
            y1="10" 
            x2="100%" 
            y2="10" 
            stroke="#982881" 
            stroke-width="2"
            class="connecting-line"
          />
          <circle 
            v-if="flowVisible"
            class="moving-dot dot-1" 
            :style="{ '--animation-duration': firstStepDuration + 's' }"
            cx="0" 
            cy="10" 
            r="6" 
            fill="#982881"
          />
        </svg>
      </div>

      <div class="flow-step api">
        <v-icon size="32" color="#982881">mdi-api</v-icon>
        <span>API</span>
      </div>
      
      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line 
            x1="0" 
            y1="10" 
            x2="100%" 
            y2="10" 
            stroke="#982881" 
            stroke-width="2"
            class="connecting-line"
          />
          <circle 
            v-if="flowVisible"
            class="moving-dot dot-2" 
            :style="{ '--animation-duration': secondStepDuration + 's', '--animation-delay': firstStepDuration + 's' }"
            cx="0" 
            cy="10" 
            r="6" 
            fill="#982881"
          />
        </svg>
      </div>

      <div class="flow-step database">
        <v-icon size="32" color="#982881">mdi-database</v-icon>
        <span>Base de Datos</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-container {
  width: 70vw;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  background: white;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.flow-visible {
  max-height: 200px;
}

.flow-content {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: translateY(20px);
  z-index: 1;
}

.flow-visible .flow-step {
  animation: fadeInUp 0.5s forwards;
}

.flow-visible .flow-step:nth-child(3) {
  animation-delay: 0.8s;
}

.flow-visible .flow-step:nth-child(5) {
  animation-delay: 1.6s;
}

.flow-line {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 100px;
}

.flow-svg {
  width: 100%;
  position: relative;
}

.connecting-line {
  opacity: 0;
}

.flow-visible .connecting-line {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.moving-dot {
  opacity: 0;
}

.flow-visible .dot-1 {
  animation: moveDot var(--animation-duration) ease-in-out forwards;
}

.flow-visible .dot-2 {
  animation: moveDot var(--animation-duration) ease-in-out forwards;
  animation-delay: var(--animation-delay);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes moveDot {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 1;
    transform: translateX(0);
  }
  90% {
    opacity: 1;
    transform: translateX(calc(100% - 12px));
  }
  100% {
    opacity: 0;
    transform: translateX(calc(100% - 12px));
  }
}
</style>