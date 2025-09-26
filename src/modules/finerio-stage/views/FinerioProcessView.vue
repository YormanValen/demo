<template>
  <div class="financial-process">
    <div class="process-content">
      <div class="spinner"></div>
      <p class="loading-text">Validando permisos</p>
    </div>

    <FinancialAnimationContainer :is-visible="showAnimationContainer" :force-open="isAnimationOpen"
      :clickable-header="false" @toggle="handleAnimationToggle">
      <template #header>
        <span>Validando...</span>
      </template>
      <div style="display: flex; flex-direction: column; min-height: 300px;">

        <!-- Flow visualization -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <FinerioExtendedFlowVisualization v-if="showFlowVisualization" :is-visible="true" :validation-time="2500"
            :processing-time="2500" />

          <!-- Process disclaimer -->
          <div v-if="showFlowVisualization" class="process-disclaimer">
            <p>Este proceso se realiza en milisegundos, pero te mostramos la animación para que visualices el recorrido
              de tus
              datos.</p>
          </div>
        </div>

        <!-- Next button at the bottom -->
        <transition name="fade-slide-up">
          <div v-if="showNextButton" style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
            <!-- Next instruction disclaimer -->
            <div class="next-disclaimer">
              <p>Haz click en "Siguiente" para continuar al siguiente paso</p>
            </div>
            <button @click="handleNextClick" class="next-button">
              Siguiente
            </button>
          </div>
        </transition>
      </div>
    </FinancialAnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useInstitutionsStore } from '../../financial/stores/institutions.store'
import FinerioExtendedFlowVisualization from '../components/FinerioExtendedFlowVisualization.vue'
import FinancialAnimationContainer from '../components/FinerioAnimationContainer.vue'

const router = useRouter()
const institutionsStore = useInstitutionsStore()

const showAnimationContainer = ref(true)
const isAnimationOpen = ref(false)
const showFlowVisualization = ref(false)
const showContainerLoader = ref(false)
const showNextButton = ref(false)
const showProcessComplete = ref(false)

onMounted(() => {
  // Mostrar la animación inmediatamente
  setTimeout(() => {
    isAnimationOpen.value = true
    showContainerLoader.value = true
    showFlowVisualization.value = true

    // Mostrar botón después del primer ciclo (5 segundos)
    setTimeout(() => {
      showProcessComplete.value = true
      showNextButton.value = true
    }, 5000)
  }, 300)
})

const handleNextClick = () => {
  isAnimationOpen.value = false
  // Check if there are connected institutions to determine next route
  if (institutionsStore.hasConnectedInstitutions()) {
    router.push('/financial/connected-accounts')
  } else {
    router.push('/financial/connect-stage1')
  }
}

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
.financial-process {
  height: 100vh;
  width: 100vw;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.process-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
  z-index: 10;
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