<template>
  <div class="submenu-container">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">360°</div>
      <div class="floating-element number">AI</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Header -->
    <div class="header-container" :class="{ 'visible': showHeader }">
      <h1 class="main-title">Transactional Insights</h1>
      <p class="subtitle">Gracias a la categorización de transacciones, ahora podemos ofrecerte estos productos avanzados de análisis financiero</p>
    </div>

    <!-- Menu Options -->
    <div class="menu-container" :class="{ 'visible': showMenu }">
      <div class="menu-option" :class="{ 'visible': visibleOptions.has(0) }" @click="navigateToOption('categorizacion')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 3h2a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="8" cy="8" r="1" fill="currentColor"/>
            <circle cx="16" cy="8" r="1" fill="currentColor"/>
            <circle cx="8" cy="16" r="1" fill="currentColor"/>
            <circle cx="16" cy="16" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Categorización de Transacciones</h3>
          <p class="option-description">Clasificación automática de transacciones financieras por categorías de negocio.</p>
        </div>
        <div class="option-status">
          <div class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(1) }" @click="navigateToOption('agregados')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="2" />
            <path d="M3 9h18M9 3v18" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Agregados de Categorización</h3>
          <p class="option-description">Variables agregadas de gastos e ingresos por categoría.</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('agregados')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(2) }" @click="navigateToOption('affordability')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M18 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="2" r="1" fill="currentColor"/>
            <circle cx="18" cy="8" r="1" fill="currentColor"/>
            <circle cx="6" cy="12" r="1" fill="currentColor"/>
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Affordability</h3>
          <p class="option-description">Evaluación histórica de la capacidad de pago y estilo de vida de los clientes
          </p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('affordability')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(3) }" @click="navigateToOption('alertas')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" />
            <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Alertas y Tendencias</h3>
          <p class="option-description">Detección de tendencias de gastos e ingresos y comportamientos del cliente.</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('alertas')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(4) }" @click="navigateToOption('income')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Income Insights</h3>
          <p class="option-description">Visión holística de la frecuencia, riesgo y consumo de los ingresos.</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('income')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(5) }" @click="navigateToOption('proyectados')">
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" />
            <path d="M18 9l-5 5-4-4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <circle cx="18" cy="9" r="2" stroke="currentColor" stroke-width="2" fill="currentColor" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Insights Proyectados</h3>
          <p class="option-description">Proyección de ingresos, gastos y flujos de caja del cliente para cada uno de los
            siguientes 24 meses.</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('proyectados')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(6) }" @click="navigateToOption('perfil')">
        <div class="poc-chip">PoC</div>
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" />
            <path d="M12 14v7" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Perfil Transaccional</h3>
          <p class="option-description">Conocimiento de los estilos de vida y preferencias del cliente para una mejor
            segmentación.</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('perfil')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>

      <div class="menu-option" :class="{ 'visible': visibleOptions.has(7) }" @click="navigateToOption('score')">
        <div class="poc-chip">PoC</div>
        <div class="option-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M3 10h18" stroke="currentColor" stroke-width="2" />
            <path d="M8 14h8" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="14" r="2" stroke="currentColor" stroke-width="2" fill="currentColor" />
          </svg>
        </div>
        <div class="option-content">
          <h3 class="option-title">Score Transaccional</h3>
          <p class="option-description">Potencie el scoring crediticio de sus clientes fusionando datos tradicionales de
            buró con datos transaccionales</p>
        </div>
        <div class="option-status">
          <div v-if="visitedProductsStore.isProductVisited('score')" class="check-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="currentColor" />
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div v-else class="option-arrow">→</div>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="back-button-container" :class="{ 'visible': showBackButton }">
      <button class="back-button" @click="goBack">
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'
import { useVisitedProductsStore } from '../stores/visited-products.store'
import { useAnalyticsStore } from '../../../stores/analytics'

const router = useRouter()
const visitedProductsStore = useVisitedProductsStore()
const analyticsStore = useAnalyticsStore()

// Animation states
const showHeader = ref(false)
const showMenu = ref(false)
const showBackButton = ref(false)
const visibleOptions = ref<Set<number>>(new Set())

// (Removed unused products array; options are rendered explicitly in template)

// Start animations
const startAnimations = async () => {
  return new Promise<void>((resolve) => {
    // Show header first
    showHeader.value = true

    setTimeout(() => {
      // Show menu container
      showMenu.value = true

      setTimeout(() => {
        // Animate menu options sequentially
        animateOptionsSequentially()

        setTimeout(() => {
          showBackButton.value = true
          resolve()
        }, 1800)
      }, 400)
    }, 600)
  })
}

// Sequential option animation
const animateOptionsSequentially = () => {
  const animateNextOption = (index: number) => {
    if (index >= 8) return

    visibleOptions.value.add(index)

    setTimeout(() => {
      animateNextOption(index + 1)
    }, 200)
  }

  animateNextOption(0)
}

// Navigation functions
const navigateToOption = (option: string) => {
  console.log(`Navigating to: ${option}`)
  
  // Track analytics for transactional insight visit
  analyticsStore.trackTransactionalInsightVisit(option as any)
  
  // Mark product as visited (except categorizacion which is always checked)
  if (option !== 'categorizacion') {
    visitedProductsStore.markProductAsVisited(option)
  }
  
  // Add navigation logic based on option
  switch (option) {
    case 'categorizacion':
      router.push({ name: 'entity-transactional-insights-history-transaction' })
      break
    case 'agregados':
      router.push({ name: 'entity-transactional-insights-agregados-categorizacion' })
      break
    case 'affordability':
      router.push({ name: 'entity-transactional-insights-affordability' })
      break
    case 'alertas':
      router.push({ name: 'entity-transactional-insights-alertas-y-tendencias' })
      break
    case 'income':
      router.push({ name: 'entity-transactional-insights-income-insights' })
      break
    case 'proyectados':
      router.push({ name: 'entity-transactional-insights-insights-proyectados' })
      break
    case 'perfil':
      router.push({ name: 'entity-transactional-insights-transactional-profile' })
      break
    case 'score':
      router.push({ name: 'entity-transactional-insights-score-transaccional' })
      break
  }
}

const goBack = () => {
  router.push({ name: 'entity-transactional-insights-farewell' })
}

onMounted(async () => {
  // Load visited products from localStorage
  visitedProductsStore.loadFromLocalStorage()
  
  await nextTick()
  setTimeout(() => {
    startAnimations()
  }, 300)
})
</script>

<style scoped>
.submenu-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 40px 20px;
  opacity: 0;
  transform: scale(1.02);
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Background elements */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  opacity: 0.15;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 25s ease-in-out infinite;
  user-select: none;
}

.number {
  font-size: 1.5rem;
  font-weight: 700;
}

.number:nth-child(1) {
  top: 20%;
  right: 15%;
  animation-delay: -2s;
}

.number:nth-child(2) {
  bottom: 25%;
  left: 10%;
  animation-delay: -8s;
}

.data-point {
  font-size: 1.2rem;
}

.data-point:nth-child(3) {
  top: 60%;
  right: 20%;
  animation-delay: -5s;
}

.data-point:nth-child(4) {
  top: 40%;
  left: 20%;
  animation-delay: -12s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.15;
  }

  50% {
    transform: translateY(-15px) rotate(1deg);
    opacity: 0.25;
  }
}

/* Header */
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 50px;
  position: relative;
  z-index: 10;
}

.header-container.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fusion-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.fusion-initials {
  font-weight: 800;
  font-size: 1.5rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
  text-align: center;
}

/* Menu */
.menu-container {
  width: 100%;
  max-width: 800px;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.menu-container.visible {
  opacity: 1;
  transform: scale(1);
}

.menu-option {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-50px);
  position: relative;
}

.menu-option.visible {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: rgb(186, 45, 125);
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 12px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  flex-shrink: 0;
}

.option-content {
  flex: 1;
}

.option-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.option-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.option-status {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-arrow {
  font-size: 1.5rem;
  font-weight: 600;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.check-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10b981;
  transition: all 0.3s ease;
}

.check-mark svg {
  transition: all 0.3s ease;
}

.menu-option:hover .option-arrow {
  color: rgb(186, 45, 125);
  transform: translateX(5px);
}

.menu-option:hover .check-mark {
  transform: scale(1.1);
}

/* Back Button */
.back-button-container {
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.back-button-container.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.3);
}

.back-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(97, 40, 120, 0.4);
}

/* PoC chip */
.poc-chip {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(186, 45, 125, 0.08);
  color: rgb(186, 45, 125);
  border: 1px solid rgba(186, 45, 125, 0.25);
  border-radius: 9999px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  pointer-events: none; /* no interfiere con el click de la tarjeta */
}

/* Responsive Design */
@media (max-width: 768px) {
  .submenu-container {
    padding: 30px 15px;
  }

  .main-title {
    font-size: 2rem;
  }

  .menu-option {
    padding: 20px;
  }

  .option-icon {
    width: 60px;
    height: 60px;
  }

  .option-icon svg {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }

  .menu-option {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .option-arrow,
  .check-mark {
    display: none;
  }
}
</style>
