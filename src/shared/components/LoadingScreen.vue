<template>
  <Transition name="fade">
    <div v-if="show" class="loading-screen">
      <div class="loading-content">
        <img src="/src/assets/logo.png" alt="Open Finance Demo" class="logo" />
        <div class="spinner"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
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

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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