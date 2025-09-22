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

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const countdown = ref(10)

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})


onMounted(() => {
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      handleNavigation()
    }
  }, 1000)
})


const handleNavigation = () => {
  const bankName = route.query.bankName as string
  let dashboardPath = '/bankambient/dashboard'
  
  // Determine specific dashboard based on bank name
  if (bankName === 'Banco Azul') {
    dashboardPath = '/bankambient/dashboard/blue'
  } else if (bankName === 'Banco Rojo') {
    dashboardPath = '/bankambient/dashboard/red'
  } else if (bankName === 'Banco Verde') {
    dashboardPath = '/bankambient/dashboard/green'
  }
  
  router.push({
    path: dashboardPath,
    query: {
      bankName: route.query.bankName,
      bankInitials: route.query.bankInitials,
      bankColor: route.query.bankColor
    }
  })
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

/* Container loader */
.container-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Next button */
.next-button {
  width: 160px;
  height: 36px;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.next-button:hover {
  opacity: 0.9;
}

/* Animación para el botón "Siguiente" */
.fade-slide-up-enter-active {
  transition: all 0.6s ease-out;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Animación spinner a check */
.spinner-to-check-enter-active,
.spinner-to-check-leave-active {
  transition: all 0.4s ease-in-out;
}

.spinner-to-check-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.spinner-to-check-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.spinner-to-check-enter-to,
.spinner-to-check-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Animación del texto */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}

.text-fade-enter-to,
.text-fade-leave-from {
  opacity: 1;
}

/* Estilo del check icon */
.check-icon {
  animation: checkPulse 0.6s ease-out;
}

@keyframes checkPulse {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Disclaimers */
.process-disclaimer {
  margin-top: 20px;
  padding: 18px 30px;
  background-color: rgba(152, 40, 129, 0.1);
  border-radius: 10px;
  border-left: 5px solid #982881;
  max-width: 600px;
  text-align: center;
}

.process-disclaimer p {
  margin: 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  font-style: italic;
  font-weight: 500;
}

.next-disclaimer {
  margin-bottom: 20px;
  padding: 16px 24px;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: 8px;
  border: 2px solid rgba(76, 175, 80, 0.3);
}

.next-disclaimer p {
  margin: 0;
  font-size: 15px;
  color: #4CAF50;
  text-align: center;
  font-weight: 600;
}
</style>