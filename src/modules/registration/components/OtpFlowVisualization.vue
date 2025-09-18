<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps<{
  isVisible: boolean;
  totalDuration?: number;
}>();

const flowVisible = ref(false);
const totalTime = computed(() => (props.totalDuration || 7000) / 1000);
const firstStepDuration = computed(() => totalTime.value * 0.4); // 40% para API
const secondStepDuration = computed(() => totalTime.value * 0.6); // 60% para OTP

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
        <v-icon size="32" color="#982881">mdi-account</v-icon>
        <span>Usuario</span>
      </div>

      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line x1="0" y1="10" x2="100%" y2="10" stroke="#982881" stroke-width="2" class="connecting-line" />
          <circle v-if="flowVisible" class="moving-dot dot-1"
            :style="{ '--animation-duration': firstStepDuration + 's' }" cx="0" cy="10" r="6" fill="#982881" />
        </svg>
      </div>

      <div class="flow-step api">
        <div class="api-animation">
          <v-icon size="32" color="#982881">mdi-cloud-sync</v-icon>
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <span>API Procesando</span>
      </div>

      <div class="flow-line">
        <svg class="flow-svg" width="100%" height="20">
          <line x1="0" y1="10" x2="100%" y2="10" stroke="#982881" stroke-width="2" class="connecting-line" />
          <circle v-if="flowVisible" class="moving-dot dot-2"
            :style="{ '--animation-duration': secondStepDuration + 's', '--animation-delay': firstStepDuration + 's' }"
            cx="0" cy="10" r="6" fill="#982881" />
        </svg>
      </div>

      <div class="flow-step otp">
        <div class="otp-animation">
          <v-icon size="32" color="#982881">mdi-cellphone</v-icon>
          <div class="phone-waves">
            <div class="wave wave-1"></div>
            <div class="wave wave-2"></div>
            <div class="wave wave-3"></div>
          </div>
        </div>
        <span>Enviando OTP</span>
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
  position: relative;
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

/* API Animation */
.api-animation {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-dots {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.loading-dots span {
  width: 6px;
  height: 6px;
  background: #982881;
  border-radius: 50%;
  animation: loadingDots 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

/* OTP Animation */
.otp-animation {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phone-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  pointer-events: none;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border: 2px solid #982881;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: phoneWave 2s infinite;
}

.wave-1 { animation-delay: 0s; }
.wave-2 { animation-delay: 0.5s; }
.wave-3 { animation-delay: 1s; }

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

@keyframes loadingDots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes phoneWave {
  0% {
    width: 20px;
    height: 20px;
    opacity: 1;
  }
  100% {
    width: 60px;
    height: 60px;
    opacity: 0;
  }
}

/* Animation triggers for specific steps */
.flow-visible .api-animation .loading-dots span {
  animation-play-state: running;
}

.flow-visible .otp-animation .wave {
  animation-play-state: running;
}
</style>