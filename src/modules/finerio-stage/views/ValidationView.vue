<template>
  <div class="validation-view">
    <div class="validation-content">
      <div class="bank-logo">
        <div class="bank-logo-circle">
          <img v-if="bankName === 'Neodigi Bank'" src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank"
            class="bank-logo-image" />
          <img v-else-if="bankName === 'TekCredit'" src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit"
            class="bank-logo-image" />
          <img v-else-if="bankName === 'Flexfinia'" src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia"
            class="bank-logo-image" />
          <span v-else class="bank-initials" :style="{ backgroundColor: bankColor }">{{ bankInitials }}</span>
        </div>
      </div>

      <div class="spinner"></div>

      <h1 class="main-title">Validando información</h1>

      <div v-if="isMultipleFlow" class="multiple-flow-info">
        <p class="progress-text">Banco {{ currentBankNumber }} de {{ totalBanks }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <div class="validation-text">
        <p>Danos unos segundos mientras</p>
        <p>finalizamos la conexión{{ isMultipleFlow ? ' con ' + bankName : '' }}.</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBankQueueStore } from '../../financial/stores/bank-queue.store'

const router = useRouter()
const bankQueueStore = useBankQueueStore()

const currentBank = bankQueueStore.getCurrentBank()

const bankName = computed(() => {
  return currentBank?.name || 'Bank'
})

const bankInitials = computed(() => {
  return currentBank?.initials || 'BA'
})

const bankColor = computed(() => {
  return currentBank?.color || '#2563eb'
})

const isMultipleFlow = computed(() => {
  return bankQueueStore.isMultipleFlow()
})

const currentBankNumber = computed(() => {
  return bankQueueStore.getCurrentBankNumber()
})

const totalBanks = computed(() => {
  return bankQueueStore.getTotalBanks()
})

const progressPercentage = computed(() => {
  return bankQueueStore.getProgressPercentage()
})


onMounted(async () => {
  console.log('ValidationView - onMounted called')
  
  // Inicializar el store si está vacío
  initializeStoreFromLocalStorage()
  
  console.log('ValidationView - After initialization, store has:', bankQueueStore.getTotalBanks(), 'banks')
  console.log('ValidationView - Current bank:', bankQueueStore.getCurrentBank())
  
  // Simular un pequeño delay para mostrar la animación
  setTimeout(() => {
    console.log('ValidationView - About to call handleNavigation')
    handleNavigation()
  }, 1500)
})

const initializeStoreFromLocalStorage = () => {
  console.log('ValidationView - initializeStoreFromLocalStorage called')
  console.log('ValidationView - Store total banks before:', bankQueueStore.getTotalBanks())
  
  // Si el store ya tiene bancos, no hacer nada
  if (bankQueueStore.getTotalBanks() > 0) {
    console.log('ValidationView - Store already has banks, skipping initialization')
    return
  }
  
  // Intentar cargar desde localStorage (fallback al sistema anterior)
  const queueStr = localStorage.getItem('bankLoginQueue')
  const indexStr = localStorage.getItem('currentBankIndex')
  
  console.log('ValidationView - localStorage bankLoginQueue:', queueStr)
  console.log('ValidationView - localStorage currentBankIndex:', indexStr)
  
  if (queueStr && indexStr) {
    const queue = JSON.parse(queueStr)
    const currentIndex = parseInt(indexStr)
    
    console.log('ValidationView - Parsed queue:', queue)
    console.log('ValidationView - Current index:', currentIndex)
    
    // Configurar el store
    bankQueueStore.setSelectedBanks(queue)
    
    // Ajustar el índice actual si es necesario
    for (let i = 0; i < currentIndex; i++) {
      bankQueueStore.moveToNextBank()
    }
    
    console.log('ValidationView - Store configured with', bankQueueStore.getTotalBanks(), 'banks')
  } else {
    console.log('ValidationView - No data in localStorage to initialize store')
  }
}


const handleNavigation = async () => {
  console.log('ValidationView - handleNavigation called')
  const currentBankData = bankQueueStore.getCurrentBank()
  console.log('ValidationView - currentBankData in handleNavigation:', currentBankData)
  
  if (!currentBankData) {
    console.log('ValidationView - No current bank data, going back')
    // No hay bancos en la cola, volver atrás
    router.back()
    return
  }

  // Determinar el dashboard específico según el banco (que tiene el login)
  let dashboardPath = '/bankambient/dashboard'
  
  if (currentBankData.name === 'Neodigi Bank') {
    dashboardPath = '/bankambient/dashboard/blue'
  } else if (currentBankData.name === 'TekCredit') {
    dashboardPath = '/bankambient/dashboard/red'
  } else if (currentBankData.name === 'Flexfinia') {
    dashboardPath = '/bankambient/dashboard/green'
  }
  
  console.log('ValidationView - About to navigate to dashboard login for:', currentBankData.name)
  
  try {
    // Ir al dashboard del banco actual (que tiene el login)
    await router.push({
      path: dashboardPath,
      query: {
        bankName: currentBankData.name,
        bankInitials: currentBankData.initials,
        bankColor: currentBankData.color
      }
    })
    console.log('ValidationView - Navigation to dashboard login completed')
  } catch (error) {
    console.error('ValidationView - Navigation error:', error)
  }
}

</script>

<style scoped>
.validation-view {
  min-height: 100vh;
  width: 100vw;
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

.bank-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.bank-initials {
  color: white;
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
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

.multiple-flow-info {
  margin-bottom: 24px;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: rgb(97, 40, 120);
  margin: 0 0 8px 0;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
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