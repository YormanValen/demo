<template>
  <div class="connection-loading">
    <div class="loading-content">
      <div class="spinner"></div>
      
      <h1 class="main-title">Conectando su institución</h1>
      
      <div class="loading-text">
        <p>Danos unos segundos mientras finalizamos la</p>
        <p>conexión.</p>
      </div>
    </div>

    <FinerioAnimationContainer :is-visible="showAnimationContainer" :force-open="isAnimationOpen"
      :clickable-header="false" @toggle="handleAnimationToggle">
      <template #header>
        <span>Conectando institución...</span>
      </template>
      <div style="display: flex; justify-content: center; min-height: 120px; align-items: center;">
        <FinerioFlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="2350"
          :processing-time="2350" />
      </div>
    </FinerioAnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FinerioFlowVisualization from '../../finerio-stage/components/FinerioFlowVisualization.vue'
import FinerioAnimationContainer from '../../finerio-stage/components/FinerioAnimationContainer.vue'

const router = useRouter()
const route = useRoute()

const showAnimationContainer = ref(true)
const isAnimationOpen = ref(false)
const showFlowVisualization = ref(false)

onMounted(() => {
  // Mostrar la animación inmediatamente
  setTimeout(() => {
    isAnimationOpen.value = true
    showFlowVisualization.value = true
  }, 300)

  // Después de 5 segundos, completar la conexión y navegar al éxito
  setTimeout(() => {
    isAnimationOpen.value = false
    setTimeout(() => {
      router.push({
        path: '/bankambient/connection-success',
        query: {
          bankName: route.query.bankName,
          bankInitials: route.query.bankInitials,
          bankColor: route.query.bankColor,
          selectedAccounts: route.query.selectedAccounts
        }
      })
    }, 500)
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
.connection-loading {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.loading-content {
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
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

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.loading-text {
  color: #64748b;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
}

.loading-text p {
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