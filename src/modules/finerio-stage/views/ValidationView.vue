<template>
  <div class="validation-view">
    <div class="validation-content">
      <div class="bank-logo">
        <div class="bank-logo-circle" :style="{ backgroundColor: bankColor }">
          <span class="bank-initials">{{ bankInitials }}</span>
        </div>
      </div>

      <div class="spinner"></div>

      <h1 class="main-title">Validando información</h1>
      
      <div class="validation-text">
        <p>Danos unos segundos mientras</p>
        <p>finalizamos la conexión.</p>
      </div>

      <div class="countdown">
        {{ countdown }}
      </div>
    </div>

    <FinerioAnimationContainer :is-visible="showAnimationContainer" :force-open="isAnimationOpen"
      :clickable-header="false" @toggle="handleAnimationToggle">
      <template #header>
        <span>Validando información...</span>
      </template>
      <div style="display: flex; justify-content: center; min-height: 120px; align-items: center;">
        <FinerioFlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="5000"
          :processing-time="5000" />
      </div>
    </FinerioAnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FinerioFlowVisualization from '../components/FinerioFlowVisualization.vue'
import FinerioAnimationContainer from '../components/FinerioAnimationContainer.vue'

const router = useRouter()
const route = useRoute()
const countdown = ref(10)

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})

const showAnimationContainer = ref(true)
const isAnimationOpen = ref(false)
const showFlowVisualization = ref(false)

onMounted(() => {
  // Mostrar la animación inmediatamente
  setTimeout(() => {
    isAnimationOpen.value = true
    showFlowVisualization.value = true
  }, 300)

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      // Replegar la animación y navegar
      isAnimationOpen.value = false
      setTimeout(() => {
        router.push({
          path: '/bankambient/dashboard',
          query: {
            bankName: route.query.bankName,
            bankInitials: route.query.bankInitials,
            bankColor: route.query.bankColor
          }
        })
      }, 500)
    }
  }, 1000)
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
.validation-view {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.validation-content {
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.bank-logo {
  margin: 0 auto 32px auto;
  display: flex;
  justify-content: center;
}

.bank-logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #001340;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 32px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 16px 0;
}

.validation-text {
  margin-bottom: 32px;
}

.validation-text p {
  font-size: 16px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.countdown {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin-top: 16px;
}
</style>