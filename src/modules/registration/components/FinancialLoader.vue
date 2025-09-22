<template>
  <Transition name="fade">
    <div v-if="show" class="financial-overlay">
      <div class="financial-content">
        <img src="/src/assets/logo.png" alt="Experiencia Open Finance" class="logo" />
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <p class="financial-text">Procesando información...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

defineProps<Props>()
</script>

<style scoped>
.financial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10002;
}

.financial-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo {
  width: 200px;
  height: auto;
  object-fit: contain;
  background: none !important;
  background-color: transparent !important;
  filter: brightness(1.2) contrast(1.1);
  mix-blend-mode: darken;
}

.progress-bar {
  width: 300px;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: rgb(97, 40, 120) !important;
  background-image: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
  border-radius: 3px;
  animation: progress 2s infinite;
}

.financial-text {
  color: #374151;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-align: center;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
    background-image: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  }
  50% {
    transform: translateX(0%);
    background-image: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  }
  100% {
    transform: translateX(100%);
    background-image: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>