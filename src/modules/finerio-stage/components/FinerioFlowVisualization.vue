<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  validationTime?: number;
  processingTime?: number;
}>();

const flowVisible = ref(false);
const totalTime = computed(() => ((props.validationTime || 5000) + (props.processingTime || 5000)) / 1000);

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      flowVisible.value = true;
    }, 100);
  } else {
    flowVisible.value = false;
  }
});

onMounted(() => {
  if (props.isVisible) {
    setTimeout(() => {
      flowVisible.value = true;
    }, 100);
  }
});
</script>

<template>
  <div class="flow-container" :class="{ 'flow-visible': flowVisible }">
    <div class="flow-content">
      <div class="flow-step user">
        <v-icon size="32" color="#001340">mdi-account</v-icon>
        <span>Usuario</span>
      </div>

      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line x1="0" y1="10" x2="100%" y2="10" stroke="#001340" stroke-width="2" class="connecting-line" />
          <circle v-if="flowVisible" class="moving-dot dot-1"
            :style="{ '--total-duration': totalTime + 's' }" cx="0" cy="10" r="6" fill="#001340" />
        </svg>
      </div>

      <div class="flow-step api">
        <v-icon size="32" color="#001340">mdi-api</v-icon>
        <span>API</span>
      </div>

      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line x1="0" y1="10" x2="100%" y2="10" stroke="#001340" stroke-width="2" class="connecting-line" />
          <circle v-if="flowVisible" class="moving-dot dot-2"
            :style="{ '--total-duration': totalTime + 's' }"
            cx="0" cy="10" r="6" fill="#001340" />
        </svg>
      </div>

      <div class="flow-step database">
        <v-icon size="32" color="#001340">mdi-database</v-icon>
        <span>Base de Datos</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-container {
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 10px;
  transform: translateX(20px) !important;
  margin: 20px auto 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-in-out;
}

.flow-visible {
  opacity: 1;
  transform: translateY(0);
}

.flow-content {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
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
  min-width: 120px;
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
<<<<<<< HEAD
  animation: moveFinerioFlowDot1 var(--total-duration, 10s) ease-in-out infinite;
}

.flow-visible .dot-2 {
  animation: moveFinerioFlowDot2 var(--total-duration, 10s) ease-in-out infinite;
=======
  animation: moveFinancialFlowDot1 var(--total-duration, 10s) ease-in-out infinite;
}

.flow-visible .dot-2 {
  animation: moveFinancialFlowDot2 var(--total-duration, 10s) ease-in-out infinite;
>>>>>>> 5bcc17b (fix/Registerform-UI-adjusments)
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

<<<<<<< HEAD
@keyframes moveFinerioFlowDot1 {
=======
@keyframes moveFinancialFlowDot1 {
>>>>>>> 5bcc17b (fix/Registerform-UI-adjusments)
  /* Dot 1: Usuario → API (0% - 45% del ciclo total) */
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  5% {
    opacity: 1;
    transform: translateX(0);
  }
  40% {
    opacity: 1;
    transform: translateX(calc(100% - 12px));
  }
  45% {
    opacity: 0;
    transform: translateX(calc(100% - 12px));
  }
  /* Esperar el resto del ciclo */
  45.1% {
    opacity: 0;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}

<<<<<<< HEAD
@keyframes moveFinerioFlowDot2 {
=======
@keyframes moveFinancialFlowDot2 {
>>>>>>> 5bcc17b (fix/Registerform-UI-adjusments)
  /* Dot 2: API → Base de Datos (45% - 90% del ciclo total) */
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  45% {
    opacity: 0;
    transform: translateX(0);
  }
  50% {
    opacity: 1;
    transform: translateX(0);
  }
  85% {
    opacity: 1;
    transform: translateX(calc(100% - 12px));
  }
  90% {
    opacity: 0;
    transform: translateX(calc(100% - 12px));
  }
  /* Pausa antes del próximo ciclo */
  90.1% {
    opacity: 0;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}
</style>