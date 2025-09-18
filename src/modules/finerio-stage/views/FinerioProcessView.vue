<template>
  <div class="finerio-process">
    <div class="process-content">
      <div class="spinner"></div>
      <p class="loading-text">Validando permisos</p>
    </div>

    <FinerioAnimationContainer :is-visible="showAnimationContainer" :force-open="isAnimationOpen"
      :clickable-header="false" @toggle="handleAnimationToggle">
      <template #header>
        <span>Validando...</span>
      </template>
      <div style="display: flex; justify-content: center; min-height: 120px; align-items: center;">
        <FinerioFlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="2500"
          :processing-time="2500" />
      </div>
    </FinerioAnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FinerioFlowVisualization from '../components/FinerioFlowVisualization.vue'
import FinerioAnimationContainer from '../components/FinerioAnimationContainer.vue'

const router = useRouter()

const showAnimationContainer = ref(true)
const isAnimationOpen = ref(false)
const showFlowVisualization = ref(false)

onMounted(() => {
  // Mostrar la animación inmediatamente
  setTimeout(() => {
    isAnimationOpen.value = true
    showFlowVisualization.value = true
  }, 300)

  // Después de 5 segundos, navegar a la siguiente etapa
  setTimeout(() => {
    isAnimationOpen.value = false
    router.push('/finerio/connect-stage1')
  }, 5000)
})

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

<style scoped>
.finerio-process {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.process-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 110px;
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #001340;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #001340;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>