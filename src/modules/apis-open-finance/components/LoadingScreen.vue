<template>
  <div class="loading-screen" :class="{ 'fade-out': fadeOut }">
    <div class="loading-container">
      <!-- Modern loading animation -->
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      
      <!-- Loading text -->
      <div class="loading-text">
        <h2 class="loading-title">API Management</h2>
        <p class="loading-subtitle">Preparando tu dashboard...</p>
      </div>
      
      <!-- Progress dots -->
      <div class="progress-dots">
        <div class="dot" :class="{ active: step >= 1 }"></div>
        <div class="dot" :class="{ active: step >= 2 }"></div>
        <div class="dot" :class="{ active: step >= 3 }"></div>
      </div>
    </div>
    
    <!-- Floating particles -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  fadeOut?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fadeOut: false
})

const emit = defineEmits<{
  complete: []
}>()

const step = ref(0)

// Progress simulation
const simulateProgress = () => {
  setTimeout(() => {
    step.value = 1
    setTimeout(() => {
      step.value = 2
      setTimeout(() => {
        step.value = 3
        setTimeout(() => {
          emit('complete')
        }, 1000)
      }, 800)
    }, 800)
  }, 1200)
}

// Particle animation
const getParticleStyle = (index: number) => {
  const delay = Math.random() * 2
  const duration = 3 + Math.random() * 2
  const translateX = Math.random() * 100
  const translateY = Math.random() * 100
  
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    transform: `translate(${translateX}px, ${translateY}px)`
  }
}

onMounted(() => {
  simulateProgress()
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 10;
}

/* Modern Spinner Animation */
.loading-spinner {
  position: relative;
  width: 120px;
  height: 120px;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
}

.spinner-ring:nth-child(1) {
  border-top-color: #3b82f6;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(2) {
  border-right-color: #60a5fa;
  animation: spin 2s linear infinite reverse;
  transform: scale(0.8);
}

.spinner-ring:nth-child(3) {
  border-bottom-color: #93c5fd;
  animation: spin 2.5s linear infinite;
  transform: scale(0.6);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Loading Text */
.loading-text {
  text-align: center;
  max-width: 400px;
}

.loading-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0 0 12px 0;
  letter-spacing: 2px;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 0.5s forwards;
}

.loading-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 1.5s forwards;
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

/* Progress Dots */
.progress-dots {
  display: flex;
  gap: 12px;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 2s forwards;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.dot.active {
  background: #3b82f6;
  transform: scale(1.2);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.dot.active::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.2);
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

/* Floating Particles */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #3b82f6, #60a5fa);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 4s ease-in-out infinite;
}

.particle:nth-child(odd) {
  background: linear-gradient(45deg, #60a5fa, #93c5fd);
}

.particle:nth-child(3n) {
  width: 4px;
  height: 4px;
  background: #dbeafe;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.8;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .loading-spinner {
    width: 80px;
    height: 80px;
  }
  
  .loading-title {
    font-size: 2rem;
  }
  
  .loading-subtitle {
    font-size: 1rem;
  }
  
  .loading-container {
    gap: 30px;
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .loading-spinner {
    width: 60px;
    height: 60px;
  }
  
  .loading-title {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }
  
  .loading-subtitle {
    font-size: 0.9rem;
  }
}
</style>