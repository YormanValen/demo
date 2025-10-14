<template>
  <div class="agregados-categorizacion-container">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">129</div>
      <div class="floating-element number">107</div>
      <div class="floating-element number">22</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Agregados de Categorización</h1>
      <p class="subtitle">Variables agregadas del comportamiento de las categorías identificadas</p>
      <div class="description-container">
        <div class="description-card">
          <ul class="description-list">
            <li class="description-text">Calculados para todas las categorías y meses detectados en el historial
              transaccional del cliente.</li>
            <li class="description-text">Muchas más variables disponibles</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Category -->
    <div class="icons-container" :class="{ 'visible': showIcons }">
      <!-- Dynamic category icon -->
      <div class="category-item" :class="{ 'visible': showCategory }">
        <div class="category-icon" :style="{ color: currentDataset.category.color }">
          <!-- Food icon for EXP-ENT-001 -->
          <svg v-if="currentDataset.category.code === 'EXP-ENT-001'" width="72" height="72"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="foodGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(21)">
                <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
              </linearGradient>
            </defs>
            <title>food</title>
            <path
              d="M18.06 23H19.72C20.56 23 21.25 22.35 21.35 21.53L23 5.05H18V1H16.03V5.05H11.06L11.36 7.39C13.07 7.86 14.67 8.71 15.63 9.65C17.07 11.07 18.06 12.54 18.06 14.94V23M1 22V21H16.03V22C16.03 22.54 15.58 23 15 23H2C1.45 23 1 22.54 1 22M16.03 15C16.03 7 1 7 1 15H16.03M1 17H16V19H1V17Z"
              fill="url(#foodGradient)" />
          </svg>
          <!-- Salary icon for INC-LAB-001 -->
          <svg v-else-if="currentDataset.category.code === 'INC-LAB-001'" width="72" height="72"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="salarygradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(21)">
                <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
              </linearGradient>
            </defs>
            <title>cash-multiple</title>
            <path
              d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z"
              fill="url(#salarygradient)" />
          </svg>
          <!-- Transport icon for EXP-TRA-002 -->
          <svg v-else-if="currentDataset.category.code === 'EXP-TRA-002'" width="72" height="72"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="transportgradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(21)">
                <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
              </linearGradient>
            </defs>
            <title>train-car</title>
            <path
              d="M12,4H5A3,3 0 0,0 2,7V15A3,3 0 0,0 5,18L4,19V20H5L7,17.97L9,18V13H4V6H13V8H15V7A3,3 0 0,0 12,4M5,14A1,1 0 0,1 6,15A1,1 0 0,1 5,16A1,1 0 0,1 4,15A1,1 0 0,1 5,14M20.57,9.66C20.43,9.26 20.05,9 19.6,9H12.41C11.95,9 11.58,9.26 11.43,9.66L10,13.77V19.28C10,19.66 10.32,20 10.7,20H11.32C11.7,20 12,19.62 12,19.24V18H20V19.24C20,19.62 20.31,20 20.69,20H21.3C21.68,20 22,19.66 22,19.28V17.91L22,13.77L20.57,9.66M12.41,10H19.6L20.63,13H11.38L12.41,10M12,16A1,1 0 0,1 11,15A1,1 0 0,1 12,14A1,1 0 0,1 13,15A1,1 0 0,1 12,16M20,16A1,1 0 0,1 19,15A1,1 0 0,1 20,14A1,1 0 0,1 21,15A1,1 0 0,1 20,16Z"
              fill="url(#transportgradient)" />
          </svg>
          <!-- Entertainment icon for EXP-REC-003 -->
          <svg v-else width=" 72" height="72" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="entertainmentgradient" x1="0%" y1="0%" x2="100%" y2="100%"
                gradientTransform="rotate(21)">
                <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
              </linearGradient>
            </defs>
            <title>movie-open</title>
            <path
              d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z"
              fill="url(#entertainmentgradient)" />
          </svg>
        </div>
        <div class="category-text">
          <p class="category-code">{{ currentDataset.category.code }}</p>
          <p class="category-name">{{ currentDataset.category.name }}</p>
        </div>
      </div>
    </div>

    <!-- Data Cards -->
    <div class="data-cards-container" :class="{ 'visible': showCards }">
      <!-- Transacciones Column -->
      <div class="cards-column">
        <h3 class="column-title">Transacciones</h3>
        <div class="card" :class="{ 'visible': visibleCards.has(0) }">
          <div class="card-title"># Transacciones este mes</div>
          <div class="card-value">{{ animatedValues.transactions0 }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(1) }">
          <div class="card-title"># Transacciones hace 1 mes</div>
          <div class="card-value">{{ animatedValues.transactions1 }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(2) }">
          <div class="card-title"># Transacciones hace 2 meses</div>
          <div class="card-value">{{ animatedValues.transactions2 }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(3) }">
          <div class="card-title"># Transacciones hace 3 meses</div>
          <div class="card-value">{{ animatedValues.transactions3 }}</div>
        </div>
      </div>

      <!-- Gastos Column -->
      <div class="cards-column">
        <h3 class="column-title">Gastos Mensuales</h3>
        <div class="card" :class="{ 'visible': visibleCards.has(4) }">
          <div class="card-title">Gastos mensuales este mes</div>
          <div class="card-value expense">${{ formatNumber(animatedValues.expenses0) }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(5) }">
          <div class="card-title">Gasto mensual hace 1 mes</div>
          <div class="card-value expense">${{ formatNumber(animatedValues.expenses1) }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(6) }">
          <div class="card-title">Gasto mensuales hace 2 meses</div>
          <div class="card-value expense">${{ formatNumber(animatedValues.expenses2) }}</div>
        </div>
        <div class="card" :class="{ 'visible': visibleCards.has(7) }">
          <div class="card-title">Gasto mensual hace 3 meses</div>
          <div class="card-value expense">${{ formatNumber(animatedValues.expenses3) }}</div>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="button-container" :class="{ 'visible': showButton }">
      <button class="continue-button" @click="handleContinue">
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showTitle = ref(false)
const showIcons = ref(false)
const showCategory = ref(false)
const showCards = ref(false)
const showButton = ref(true)
const visibleCards = ref<Set<number>>(new Set())

// Data rotation state
const currentDataIndex = ref(0)
const isTransitioning = ref(false)

// Multiple datasets for rotation
const datasets = [
  {
    category: {
      code: "EXP-ENT-001",
      name: "Comidas preparadas",
      color: "#6b7280"
    },
    tableColor: "#6b7280",
    transactions: [14, 16, 12, 15],
    expenses: [220000, 260000, 180000, 240000]
  },
  {
    category: {
      code: "INC-LAB-001",
      name: "Salario o nómina",
      color: "#6b7280"
    },
    tableColor: "#6b7280",
    transactions: [1, 1, 1, 1],
    expenses: [3200000, 3200000, 3300000, 3200000]
  },
  {
    category: {
      code: "EXP-TRA-002",
      name: "Transporte público",
      color: "#6b7280"
    },
    tableColor: "#6b7280",
    transactions: [7, 8, 6, 9],
    expenses: [65000, 72000, 60000, 80000]
  },
  {
    category: {
      code: "EXP-REC-003",
      name: "Entretenimiento",
      color: "#6b7280"
    },
    tableColor: "#6b7280",
    transactions: [3, 4, 2, 3],
    expenses: [140000, 180000, 100000, 150000]
  }
]

// Computed current dataset
const currentDataset = computed(() => datasets[currentDataIndex.value])


// Animated values (start at 0)
const animatedValues = ref({
  transactions0: 0,
  transactions1: 0,
  transactions2: 0,
  transactions3: 0,
  expenses0: 0,
  expenses1: 0,
  expenses2: 0,
  expenses3: 0
})

// Number formatting function
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-CO').format(Math.round(value))
}


// Number animation function
const animateNumber = (key: keyof typeof animatedValues.value, target: number, duration = 1000) => {
  const start = 0
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3)

    animatedValues.value[key] = Math.round(start + (target - start) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}

// Sequential card animation
const animateCardsSequentially = async () => {
  return new Promise<void>((resolve) => {
    const animateNextCard = (index: number) => {
      if (index >= 8) {
        resolve()
        return
      }

      // Add card to visible set
      visibleCards.value.add(index)

      // Start number animation for this card
      if (index < 4) {
        // Transactions
        const transactionKey = `transactions${index}` as keyof typeof animatedValues.value
        const target = currentDataset.value.transactions[index]
        animateNumber(transactionKey, target, 800)
      } else {
        // Expenses
        const expenseKey = `expenses${index - 4}` as keyof typeof animatedValues.value
        const target = currentDataset.value.expenses[index - 4]
        animateNumber(expenseKey, target, 1200)
      }

      // Animate next card after delay
      setTimeout(() => {
        animateNextCard(index + 1)
      }, 400)
    }

    animateNextCard(0)
  })
}

// Start title animation
const startTitleAnimation = async () => {
  return new Promise<void>((resolve) => {
    showTitle.value = true
    setTimeout(() => {
      showIcons.value = true
      setTimeout(() => {
        showCategory.value = true
        setTimeout(() => {
          showCards.value = true
          setTimeout(async () => {
            await animateCardsSequentially()
            showButton.value = true
            resolve()
          }, 400)
        }, 600)
      }, 800)
    }, 800)
  })
}

// Data rotation function
const rotateToNextDataset = async () => {
  if (isTransitioning.value) return

  isTransitioning.value = true

  // Check if we're at the last dataset before incrementing
  const nextIndex = (currentDataIndex.value + 1) % datasets.length

  // Fade out cards and category
  showCards.value = false
  showCategory.value = false
  visibleCards.value.clear()

  // Reset animated values
  Object.keys(animatedValues.value).forEach(key => {
    animatedValues.value[key as keyof typeof animatedValues.value] = 0
  })

  // Wait for fade out
  await new Promise(resolve => setTimeout(resolve, 600))

  // Move to next dataset
  currentDataIndex.value = nextIndex

  // Save current state to localStorage
  localStorage.setItem('agregados_current_index', currentDataIndex.value.toString())

  // Wait a bit then fade in new content
  await new Promise(resolve => setTimeout(resolve, 200))

  // Fade in category first
  showCategory.value = true

  // Wait then show cards
  await new Promise(resolve => setTimeout(resolve, 600))
  showCards.value = true

  // Start card animations
  await new Promise(resolve => setTimeout(resolve, 400))
  await animateCardsSequentially()

  isTransitioning.value = false
}

// Handle continue button click
const handleContinue = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Start animations on mount
onMounted(async () => {
  await nextTick()

  // Load current index from localStorage
  const savedIndex = localStorage.getItem('agregados_current_index')
  if (savedIndex) {
    currentDataIndex.value = parseInt(savedIndex) % datasets.length
  }

  // Wait a moment before starting
  setTimeout(async () => {
    // Start title animation
    await startTitleAnimation()
    // Start automatic rotation loop after initial animation
    startAutoRotationLoop()
  }, 300)
})

// Automatic rotation every 3 seconds
const AUTO_DELAY_MS = 3000
let isDestroyed = false

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const startAutoRotationLoop = async () => {
  // initial wait before first rotation
  await delay(AUTO_DELAY_MS)
  while (!isDestroyed) {
    await rotateToNextDataset()
    await delay(AUTO_DELAY_MS)
  }
}

onUnmounted(() => {
  isDestroyed = true
})
</script>

<style scoped>
.agregados-categorizacion-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 40px 20px 20px;
  opacity: 0;
  transform: scale(1.02);
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}

/* Media Queries for horizontal screens */
@media (orientation: landscape) and (min-width: 1200px) {
  .agregados-categorizacion-container {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    padding: 30px 20px 40px;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .icons-container {
    margin: 40px 0;
  }

  .data-cards-container {
    margin: 30px 0;
  }

  .button-container {
    margin-top: 30px;
    margin-bottom: 20px;
  }
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
  animation: float 30s ease-in-out infinite;
  user-select: none;
}

.number {
  font-size: 1.2rem;
  font-weight: 700;
}

.number:nth-child(1) {
  top: 15%;
  right: 20%;
  animation-delay: -3s;
}

.number:nth-child(2) {
  bottom: 20%;
  left: 15%;
  animation-delay: -8s;
}

.number:nth-child(3) {
  top: 25%;
  left: 10%;
  animation-delay: -15s;
}

.data-point {
  font-size: 1rem;
}

.data-point:nth-child(4) {
  top: 60%;
  right: 10%;
  animation-delay: -5s;
}

.data-point:nth-child(5) {
  bottom: 40%;
  right: 30%;
  animation-delay: -12s;
}

.data-point:nth-child(6) {
  top: 40%;
  left: 25%;
  animation-delay: -18s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.15;
  }

  50% {
    transform: translateY(-10px) rotate(0.5deg);
    opacity: 0.25;
  }
}

/* Title at top */
.title-container {
  text-align: center;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.title-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

.description-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 700px;
  margin: 25px auto 0;
}

.description-card {
  background: white;
  border-radius: 16px;
  padding: 24px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(10px);
  margin: 10px 0;
}

.description-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.description-list li {
  position: relative;
  padding-left: 25px;
  margin: 8px 0;
}

.description-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.description-text {
  font-size: 1rem;
  color: #4b5563;
  margin: 8px 0;
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
}

/* Icons Container */
.icons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin: 60px 0;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.icons-container.visible {
  opacity: 1;
  transform: scale(1);
}

.table-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 25px rgba(16, 185, 129, 0.3));
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transform: translateX(-100px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-text {
  text-align: center;
}

.category-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 5px 0;
  font-family: 'Courier New', monospace;
}

.category-name {
  font-size: 1.3rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Data Cards */
.data-cards-container {
  display: flex;
  gap: 40px;
  margin: 40px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.data-cards-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.cards-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 280px;
}

.column-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
  text-align: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-30px) scale(0.9);
}

.card.visible {
  opacity: 1;
  transform: translateX(0) scale(1);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card.visible:hover {
  transform: translateX(0) scale(1) translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Courier New', monospace;
}

.card-value.expense {
  color: #000000;
}

/* Continue Button */
.button-container {
  text-align: center;
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.button-container.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 16px 35px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.3);
}

.continue-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(97, 40, 120, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }

  .icons-container {
    gap: 60px;
  }

  .table-icon svg {
    width: 100px;
    height: 100px;
  }

  .category-icon svg {
    width: 50px;
    height: 50px;
  }

  .data-cards-container {
    gap: 30px;
  }

  .cards-column {
    min-width: 240px;
  }
}

@media (max-width: 768px) {
  .agregados-categorizacion-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .icons-container {
    gap: 40px;
    flex-direction: column;
  }

  .table-icon svg {
    width: 80px;
    height: 80px;
  }

  .category-icon svg {
    width: 40px;
    height: 40px;
  }

  .data-cards-container {
    flex-direction: column;
    gap: 25px;
    margin: 30px 0;
  }

  .cards-column {
    min-width: auto;
    width: 100%;
  }

  .card {
    padding: 15px;
  }

  .card-value {
    font-size: 1.5rem;
  }

  .continue-button {
    padding: 14px 30px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .agregados-categorizacion-container {
    padding: 20px 5px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .card-value {
    font-size: 1.3rem;
  }

  .continue-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}

/* Reusable gradient background style */
.gradient-icon {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>
