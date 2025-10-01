<template>
  <div class="agregados-categorizacion-container">
    <!-- Animated background elements -->
    <div class="background-elements">
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
        <p class="description-text">Calculados para todas las categorías y meses detectados en el historial transaccional del cliente.</p>
        <p class="description-text highlight">Muchas más variables disponibles</p>
      </div>
    </div>

    <!-- Table and Category Icons -->
    <div class="icons-container" :class="{ 'visible': showIcons }">
      <!-- Dynamic table icon -->
      <div class="table-icon">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="18" height="14" rx="2" :stroke="currentDataset.tableColor" stroke-width="2" />
          <path d="M3 10H21" :stroke="currentDataset.tableColor" stroke-width="2" />
          <path d="M8 10V19" :stroke="currentDataset.tableColor" stroke-width="2" />
          <path d="M14 10V19" :stroke="currentDataset.tableColor" stroke-width="2" />
        </svg>
      </div>
      
      <!-- Dynamic category icon that appears from table -->
      <div class="category-item" :class="{ 'visible': showCategory }">
        <div class="category-icon" :style="{ color: currentDataset.category.color }">
          <!-- Food icon for EXP-ENT-001 -->
          <svg v-if="currentDataset.category.code === 'EXP-ENT-001'" width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M8.5 8.5c0-1.5 1.5-3 3.5-3s3.5 1.5 3.5 3c0 .5-.5 1-.5 1s2 1.5 2 3.5c0 2-2 4-2 4H7s-2-2-2-4c0-2 2-3.5 2-3.5s-.5-.5-.5-1z" fill="currentColor"/>
            <path d="M12 2v6M9 4l6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <!-- Salary icon for INC-LAB-001 -->
          <svg v-else-if="currentDataset.category.code === 'INC-LAB-001'" width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Transport icon for EXP-TRA-002 -->
          <svg v-else-if="currentDataset.category.code === 'EXP-TRA-002'" width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
          <!-- Entertainment icon for EXP-REC-003 -->
          <svg v-else width="60" height="60" viewBox="0 0 24 24" fill="none">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.3"/>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showTitle = ref(false)
const showIcons = ref(false)
const showCategory = ref(false)
const showCards = ref(false)
const showButton = ref(false)
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
      color: "#f59e0b"
    },
    tableColor: "#10b981",
    transactions: [127, 142, 118, 135],
    expenses: [2450000, 2780000, 2120000, 2650000]
  },
  {
    category: {
      code: "INC-LAB-001",
      name: "Salario o nómina",
      color: "#3b82f6"
    },
    tableColor: "#8b5cf6",
    transactions: [89, 95, 87, 92],
    expenses: [3200000, 3150000, 3100000, 3180000]
  },
  {
    category: {
      code: "EXP-TRA-002",
      name: "Transporte público",
      color: "#ef4444"
    },
    tableColor: "#f97316",
    transactions: [156, 142, 167, 148],
    expenses: [890000, 920000, 850000, 910000]
  },
  {
    category: {
      code: "EXP-REC-003", 
      name: "Entretenimiento",
      color: "#10b981"
    },
    tableColor: "#ec4899",
    transactions: [67, 73, 59, 71],
    expenses: [1450000, 1680000, 1320000, 1590000]
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
  const isLastDataset = currentDataIndex.value === datasets.length - 1
  
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
  
  // If we just finished the last dataset, navigate to submenu
  if (isLastDataset) {
    // Reset the index for next time
    localStorage.setItem('agregados_current_index', '0')
    router.push({ name: 'entity-transactional-insights-submenu' })
    return
  }
  
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
  rotateToNextDataset()
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
  }, 300)
})
</script>

<style scoped>
.agregados-categorizacion-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  padding: 40px 20px 20px;
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
  0%, 100% {
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

.description-text {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
}

.description-text.highlight {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1f2937;
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
  filter: drop-shadow(0 6px 20px rgba(245, 158, 11, 0.4));
}

.category-text {
  text-align: center;
}

.category-code {
  font-size: 1rem;
  font-weight: 700;
  color: #374151;
  margin: 0 0 5px 0;
  font-family: 'Courier New', monospace;
}

.category-name {
  font-size: 0.9rem;
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
  color: #dc2626;
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
</style>