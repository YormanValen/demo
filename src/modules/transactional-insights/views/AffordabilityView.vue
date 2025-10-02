<template>
  <div class="affordability-container">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">109</div>
      <div class="floating-element number">$</div>
      <div class="floating-element number">24</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Affordability</h1>
      <p class="subtitle">Evaluación histórica de la capacidad de pago y estilo de vida de los clientes.</p>
      <div class="description-container">
        <p class="description-text">Disponible para cada mes del periodo cubierto por el historial transaccional</p>
        <p class="description-text highlight">Cada una de las 109 categorías suma a un concepto de la evaluación.</p>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showCategories }">
      <!-- Left Side - Current Category -->
      <div ref="movingCard" class="current-category-card" :class="{ 'visible': visibleCategories.has(0) }">
        <div class="category-icon-large" :style="{ backgroundColor: currentCategory.color }">
          <!-- Food icon -->
          <svg v-if="currentCategory.icon === 'food'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M8.5 8.5c0-1.5 1.5-3 3.5-3s3.5 1.5 3.5 3c0 .5-.5 1-.5 1s2 1.5 2 3.5c0 2-2 4-2 4H7s-2-2-2-4c0-2 2-3.5 2-3.5s-.5-.5-.5-1z"
              fill="white" />
            <path d="M12 2v6M9 4l6 0" stroke="white" stroke-width="2" stroke-linecap="round" />
          </svg>
          <!-- Streaming icon -->
          <svg v-else-if="currentCategory.icon === 'streaming'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10Z" stroke="white"
              stroke-width="2" />
            <path d="M10 8l6 4-6 4V8Z" fill="white" />
          </svg>
          <!-- Supplements icon -->
          <svg v-else-if="currentCategory.icon === 'supplements'" width="40" height="40" viewBox="0 0 24 24"
            fill="none">
            <path d="M4.5 12a7.5 7.5 0 0 0 15 0a7.5 7.5 0 0 0-15 0Z" stroke="white" stroke-width="2" />
            <path d="M12 4.5v15M4.5 12h15" stroke="white" stroke-width="2" />
          </svg>
          <!-- Salary icon -->
          <svg v-else-if="currentCategory.icon === 'salary'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="white" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <!-- Rent icon -->
          <svg v-else-if="currentCategory.icon === 'rent'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M9 9v.01M9 12v.01M9 15v.01" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <!-- Medical icon -->
          <svg v-else-if="currentCategory.icon === 'medical'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5L12 21l7-6.5Z"
              fill="white" />
            <path d="M12 5.5v13M8.5 9h7" stroke="currentColor" stroke-width="2" />
          </svg>
          <!-- Electricity icon -->
          <svg v-else-if="currentCategory.icon === 'electricity'" width="40" height="40" viewBox="0 0 24 24"
            fill="none">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" />
          </svg>
          <!-- Technology icon -->
          <svg v-else-if="currentCategory.icon === 'technology'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="12" rx="2" stroke="white" stroke-width="2" />
            <path d="M8 20h8M12 16v4" stroke="white" stroke-width="2" />
          </svg>
          <!-- Pets icon -->
          <svg v-else-if="currentCategory.icon === 'pets'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="4" r="2" fill="white" />
            <circle cx="18" cy="8" r="2" fill="white" />
            <circle cx="20" cy="16" r="2" fill="white" />
            <circle cx="9" cy="20" r="2" fill="white" />
            <circle cx="15" cy="12" r="3" fill="white" />
          </svg>
          <!-- Credit icon -->
          <svg v-else-if="currentCategory.icon === 'credit'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="4" width="22" height="16" rx="2" stroke="white" stroke-width="2" />
            <path d="M1 10h22M5 14h2M13 14h6" stroke="white" stroke-width="2" />
          </svg>
          <!-- Mortgage icon -->
          <svg v-else-if="currentCategory.icon === 'mortgage'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" stroke="white"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <!-- Freelance icon -->
          <svg v-else-if="currentCategory.icon === 'freelance'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" stroke-width="2" />
            <circle cx="8.5" cy="7" r="4" stroke="white" stroke-width="2" />
            <path d="M20 8v6M23 11l-3 3-3-3" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <!-- Gambling icon -->
          <svg v-else-if="currentCategory.icon === 'gambling'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="6" height="6" rx="1" stroke="white" stroke-width="2" fill="none" />
            <circle cx="6" cy="6" r="1" fill="white" />
            <rect x="15" y="15" width="6" height="6" rx="1" stroke="white" stroke-width="2" fill="none" />
            <circle cx="17" cy="17" r="1" fill="white" />
            <circle cx="19" cy="19" r="1" fill="white" />
          </svg>
          <!-- Dividends icon -->
          <svg v-else-if="currentCategory.icon === 'dividends'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="white" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="18" cy="6" r="2" stroke="white" stroke-width="1.5" fill="white" />
            <circle cx="18" cy="18" r="2" stroke="white" stroke-width="1.5" fill="white" />
          </svg>
          <!-- Groceries icon -->
          <svg v-else-if="currentCategory.icon === 'groceries'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" stroke="white" stroke-width="2" />
            <path d="M5 4h14l-1 14H6L5 4Z" stroke="white" stroke-width="2" fill="none" />
            <path d="M9 8v4M15 8v4" stroke="white" stroke-width="2" />
          </svg>
          <!-- Clothing icon -->
          <svg v-else-if="currentCategory.icon === 'clothing'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M7 3h10l3 6v12H4V9l3-6Z" stroke="white" stroke-width="2" fill="none" />
            <path d="M7 3l1 6M17 3l-1 6" stroke="white" stroke-width="2" />
            <circle cx="12" cy="15" r="2" stroke="white" stroke-width="2" fill="white" />
          </svg>
          <!-- Education icon -->
          <svg v-else-if="currentCategory.icon === 'education'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M6 12v5c3 0 5-1 8-1s5 1 8 1v-5" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <!-- Taxes icon -->
          <svg v-else-if="currentCategory.icon === 'taxes'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" stroke-width="2" fill="none" />
            <path d="M7 2v4M17 2v4M3 10h18" stroke="white" stroke-width="2" />
            <path d="M12 14v4M9 16h6" stroke="white" stroke-width="2" />
          </svg>
        </div>
        <div class="category-details">
          <h3 class="category-name">{{ currentCategory.name }}</h3>
          <div class="category-value">${{ formatNumber(currentCategory.value) }}</div>
        </div>
      </div>

      <!-- Right Side - Categories Column -->
      <div class="categories-column">
        <h3 class="column-title">Categorías de Evaluación</h3>
        <div class="evaluation-categories">
          <div v-for="(evalCategory, index) in evaluationCategories" :key="evalCategory.id" ref="categoryItems"
            class="evaluation-item" :class="{
              'visible': visibleCategories.has(index + 1),
              'highlighted': highlightedCategory === evalCategory.id
            }" :data-category-id="evalCategory.id">
            <div class="evaluation-left">
              <div class="evaluation-icon" :style="{ backgroundColor: evalCategory.color }">
                <!-- Income Primary icon -->
                <svg v-if="evalCategory.icon === 'income-primary'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="white" stroke-width="2" fill="white" />
                </svg>
                <!-- Income Secondary icon -->
                <svg v-else-if="evalCategory.icon === 'income-secondary'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="white" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="16" cy="8" r="2" stroke="white" stroke-width="1.5" fill="white" />
                </svg>
                <!-- Essential expenses icon -->
                <svg v-else-if="evalCategory.icon === 'essential'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5L12 21l7-6.5Z"
                    fill="white" />
                </svg>
                <!-- Discretionary expenses icon -->
                <svg v-else-if="evalCategory.icon === 'discretionary'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <circle cx="12" cy="12" r="3" fill="white" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="white" stroke-width="2" />
                </svg>
                <!-- Quality of life icon -->
                <svg v-else-if="evalCategory.icon === 'quality-life'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <path d="M12 3l4 7h5l-4 7-4-7H8l4-7Z" fill="white" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
                <!-- Committed expenses icon -->
                <svg v-else-if="evalCategory.icon === 'committed'" width="20" height="20" viewBox="0 0 24 24"
                  fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" stroke-width="2" fill="none" />
                  <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M12 11v3" stroke="white" stroke-width="2" />
                  <circle cx="12" cy="14" r="1" fill="white" />
                </svg>
              </div>
              <div class="evaluation-label">{{ evalCategory.name }}</div>
            </div>
            <div class="evaluation-value">${{ formatNumber(evalCategory.value) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="button-container" :class="{ 'visible': showButton }">
      <button class="continue-button" @click="handleContinue">
        <span v-if="currentCategoryIndex < allCategories.length">
          Continuar ({{ currentCategoryIndex + 1 }}/{{ allCategories.length }})
        </span>
        <span v-else>
          Ir al Menú Principal
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Refs
const movingCard = ref<HTMLElement>()
const categoryItems = ref<HTMLElement[]>([])

// Animation states
const showTitle = ref(false)
const showCategories = ref(false)
const showButton = ref(false)
const visibleCategories = ref<Set<number>>(new Set())
const highlightedCategory = ref<string | null>(null)
const isAnimating = ref(false)

// All categories to process sequentially
const allCategories = [
  // Gastos discrecionales
  {
    id: "EXP-ENT-001",
    name: "Comidas preparadas",
    value: 34900,
    color: "#6b7280",
    targetCategory: "gastos-discrecionales",
    icon: "food"
  },
  {
    id: "EXP-ENT-005",
    name: "Plataformas de streaming",
    value: 25000,
    color: "#6b7280",
    targetCategory: "gastos-discrecionales",
    icon: "streaming"
  },
  {
    id: "EXP-BIE-008",
    name: "Suplementos y medicina alternativa",
    value: 67500,
    color: "#6b7280",
    targetCategory: "gastos-discrecionales",
    icon: "supplements"
  },
  // Ingresos principales
  {
    id: "INC-LAB-001",
    name: "Salario o nómina",
    value: 3200000,
    color: "#6b7280",
    targetCategory: "ingresos-principales",
    icon: "salary"
  },
  {
    id: "INC-FIN-003",
    name: "Ingreso por arriendo",
    value: 1500000,
    color: "#6b7280",
    targetCategory: "ingresos-principales",
    icon: "rent"
  },
  {
    id: "INC-LAB-002",
    name: "Ingresos como independiente",
    value: 2800000,
    color: "#6b7280",
    targetCategory: "ingresos-principales",
    icon: "freelance"
  },
  // Ingresos secundarios
  {
    id: "INC-COM-002",
    name: "Apuestas",
    value: 45000,
    color: "#6b7280",
    targetCategory: "ingresos-secundarios",
    icon: "gambling"
  },
  {
    id: "INC-FIN-002",
    name: "Dividendos",
    value: 180000,
    color: "#6b7280",
    targetCategory: "ingresos-secundarios",
    icon: "dividends"
  },
  // Gastos esenciales
  {
    id: "EXP-BIE-002",
    name: "Gastos médicos y cuidados de la salud",
    value: 145000,
    color: "#6b7280",
    targetCategory: "gastos-esenciales",
    icon: "medical"
  },
  {
    id: "EXP-COM-002",
    name: "Víveres – Cadenas de mercado",
    value: 420000,
    color: "#6b7280",
    targetCategory: "gastos-esenciales",
    icon: "groceries"
  },
  {
    id: "EXP-VIV-001",
    name: "Servicio público de luz",
    value: 89000,
    color: "#6b7280",
    targetCategory: "gastos-esenciales",
    icon: "electricity"
  },
  // Calidad básica de vida
  {
    id: "EXP-COM-006",
    name: "Tecnología",
    value: 234000,
    color: "#6b7280",
    targetCategory: "calidad-vida-basica",
    icon: "technology"
  },
  {
    id: "EXP-COM-007",
    name: "Ropa, calzado y maletas",
    value: 189000,
    color: "#6b7280",
    targetCategory: "calidad-vida-basica",
    icon: "clothing"
  },
  {
    id: "EXP-EDU-001",
    name: "Educación infantil y guarderías",
    value: 450000,
    color: "#6b7280",
    targetCategory: "calidad-vida-basica",
    icon: "education"
  },
  {
    id: "EXP-FAM-002",
    name: "Mascotas y animales",
    value: 78000,
    color: "#6b7280",
    targetCategory: "calidad-vida-basica",
    icon: "pets"
  },
  // Gastos comprometidos
  {
    id: "EXP-FIN-001",
    name: "Pago de balance de crédito",
    value: 567000,
    color: "#6b7280",
    targetCategory: "gastos-comprometidos",
    icon: "credit"
  },
  {
    id: "EXP-FIN-014",
    name: "Hipotecas",
    value: 1200000,
    color: "#6b7280",
    targetCategory: "gastos-comprometidos",
    icon: "mortgage"
  },
  {
    id: "EXP-FIN-012",
    name: "Impuestos y tasas públicas",
    value: 320000,
    color: "#6b7280",
    targetCategory: "gastos-comprometidos",
    icon: "taxes"
  }
]

// Current category index
const currentCategoryIndex = ref(0)

// Current category being processed
const currentCategory = computed(() => allCategories[currentCategoryIndex.value])

// Evaluation categories (right side)
const evaluationCategories = ref([
  {
    id: "ingresos-principales",
    name: "Ingresos Principales",
    value: 0,
    color: "#6b7280",
    icon: "income-primary"
  },
  {
    id: "ingresos-secundarios",
    name: "Ingresos Secundarios",
    value: 0,
    color: "#6b7280",
    icon: "income-secondary"
  },
  {
    id: "gastos-esenciales",
    name: "Gastos Esenciales",
    value: 0,
    color: "#6b7280",
    icon: "essential"
  },
  {
    id: "gastos-discrecionales",
    name: "Gastos Discrecionales",
    value: 0,
    color: "#6b7280",
    icon: "discretionary"
  },
  {
    id: "calidad-vida-basica",
    name: "Calidad de Vida Básica",
    value: 0,
    color: "#6b7280",
    icon: "quality-life"
  },
  {
    id: "gastos-comprometidos",
    name: "Gastos Comprometidos",
    value: 0,
    color: "#6b7280",
    icon: "committed"
  }
])

// Number formatting function
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('es-CO').format(Math.round(value))
}

// Number animation function
const animateNumber = (targetElement: any, targetValue: number, duration = 800) => {
  const startValue = targetElement.value
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    const easeOut = 1 - Math.pow(1 - progress, 3)

    targetElement.value = Math.round(startValue + (targetValue - startValue) * easeOut)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}

// Sequential category animation
const animateCategoriesSequentially = async () => {
  return new Promise<void>((resolve) => {
    // Show current category first
    visibleCategories.value.add(0)

    setTimeout(() => {
      // Show evaluation categories one by one
      const animateNextCategory = (index: number) => {
        if (index >= evaluationCategories.value.length) {
          resolve()
          return
        }

        visibleCategories.value.add(index + 1)

        setTimeout(() => {
          animateNextCategory(index + 1)
        }, 150)
      }

      animateNextCategory(0)
    }, 600)
  })
}

// Animation for moving card to target category
const animateCardToCategory = async () => {
  if (!movingCard.value || isAnimating.value) return

  isAnimating.value = true

  // Find target category element
  const targetCategoryId = currentCategory.value.targetCategory
  const targetElement = categoryItems.value?.find(el =>
    el.getAttribute('data-category-id') === targetCategoryId
  )

  if (!targetElement) return

  // Get positions
  const cardRect = movingCard.value.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()

  // Calculate movement to center of target element
  const deltaX = (targetRect.left + targetRect.width / 2) - (cardRect.left + cardRect.width / 2)
  const deltaY = (targetRect.top + targetRect.height / 2) - (cardRect.top + cardRect.height / 2)

  // Apply animation directly to the card
  movingCard.value.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
  movingCard.value.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`
  movingCard.value.style.opacity = '0'
  movingCard.value.style.zIndex = '1000'

  // After movement, highlight target and update value
  setTimeout(() => {
    // Highlight target category
    highlightedCategory.value = targetCategoryId

    // Update the highlighted category border color dynamically
    const targetCat = evaluationCategories.value.find(cat => cat.id === targetCategoryId)
    if (targetCat && targetElement) {
      targetElement.style.setProperty('--highlight-color', targetCat.color)
    }

    // Update target category value
    const targetCategory = evaluationCategories.value.find(cat => cat.id === targetCategoryId)
    if (targetCategory) {
      const oldValue = { value: targetCategory.value }
      const newValue = targetCategory.value + currentCategory.value.value

      animateNumber(oldValue, newValue)

      // Update the actual value after animation
      setTimeout(() => {
        targetCategory.value = newValue
      }, 800)
    }

    // Remove highlight and show next card
    setTimeout(() => {
      highlightedCategory.value = null

      // Move to next category
      currentCategoryIndex.value++

      // Check if we have more categories
      if (currentCategoryIndex.value < allCategories.length) {
        // Animate new card entrance
        animateNewCardEntrance()
      } else {
        // All categories processed - hide the card container
        if (movingCard.value) {
          movingCard.value.style.display = 'none'
        }
      }

      isAnimating.value = false
    }, 2500)

  }, 1200)
}

// Smooth entrance animation for new card
const animateNewCardEntrance = () => {
  if (!movingCard.value) return

  // Start with card hidden and positioned slightly off
  movingCard.value.style.transition = 'none'
  movingCard.value.style.transform = 'translate(-20px, 20px) scale(0.85)'
  movingCard.value.style.opacity = '0'
  movingCard.value.style.zIndex = 'auto'

  // Force a reflow
  movingCard.value.offsetHeight

  // Animate to normal position
  setTimeout(() => {
    if (movingCard.value) {
      movingCard.value.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      movingCard.value.style.transform = 'translate(0, 0) scale(1)'
      movingCard.value.style.opacity = '1'
    }
  }, 50)
}

// Start title animation
const startTitleAnimation = async () => {
  return new Promise<void>((resolve) => {
    showTitle.value = true
    setTimeout(() => {
      showCategories.value = true
      setTimeout(async () => {
        await animateCategoriesSequentially()
        showButton.value = true
        resolve()
      }, 800)
    }, 800)
  })
}

// Handle continue button click
const handleContinue = () => {
  if (isAnimating.value) return

  // Check if we have more categories to process
  if (currentCategoryIndex.value < allCategories.length) {
    animateCardToCategory()
  } else {
    // All categories completed - navigate to submenu
    router.push({ name: 'entity-transactional-insights-submenu' })
  }
}

// Start animations on mount
onMounted(async () => {
  await nextTick()
  setTimeout(async () => {
    await startTitleAnimation()
  }, 300)
})
</script>

<style scoped>
.affordability-container {
  width: 100vw;
  height: 100vh;
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

/* Title */
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

/* Main Content Layout */
.main-content {
  width: 100%;
  max-width: 1400px;
  margin: 80px 0 40px 0;
  display: flex;
  gap: 60px;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.main-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Left Side - Current Category */
.current-category-card {
  flex: 0 0 300px;
  background: transparent;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.current-category-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.category-icon-large {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.category-details {
  text-align: center;
}

.category-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.category-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #000000;
  font-family: 'Courier New', monospace;
  margin: 0;
}

/* Right Side - Categories Column */
.categories-column {
  flex: 1;
  min-width: 400px;
}

.column-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 30px 0;
  text-align: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.evaluation-categories {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.evaluation-item {
  background: white;
  border-radius: 12px;
  padding: 20px 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(30px);
}

.evaluation-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.evaluation-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.evaluation-item.visible {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.evaluation-item.highlighted {
  border-color: var(--highlight-color, #f59e0b);
  background: white;
  transform: scale(1.02);
  box-shadow: 0 12px 35px rgba(245, 158, 11, 0.4);
  animation: smooth-beat 2.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.evaluation-item.highlighted .evaluation-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

@keyframes smooth-beat {
  0% {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }

  25% {
    transform: scale(1.08);
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.3);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  }

  75% {
    transform: scale(1.06);
    box-shadow: 0 15px 42px rgba(0, 0, 0, 0.28);
  }

  100% {
    transform: scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  }
}

.evaluation-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

.evaluation-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Courier New', monospace;
  min-width: 120px;
  text-align: right;
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

.continue-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(97, 40, 120, 0.4);
}

.continue-button:disabled {
  background: linear-gradient(21deg, #9ca3af 0%, #6b7280 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 4px 15px rgba(156, 163, 175, 0.3);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .main-content {
    gap: 40px;
  }

  .current-category-card {
    flex: 0 0 280px;
  }

  .categories-column {
    min-width: 350px;
  }
}

@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }

  .main-content {
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  .current-category-card {
    flex: none;
    width: 100%;
    max-width: 350px;
  }

  .categories-column {
    width: 100%;
    max-width: 600px;
    min-width: auto;
  }

  .category-icon-large {
    width: 70px;
    height: 70px;
  }

  .category-name {
    font-size: 1.3rem;
  }

  .category-value {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .affordability-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .current-category-card {
    padding: 30px 20px;
  }

  .category-icon-large {
    width: 80px;
    height: 80px;
  }

  .category-name {
    font-size: 1.4rem;
  }

  .category-value {
    font-size: 1.8rem;
  }

  .evaluation-item {
    padding: 15px 20px;
  }

  .evaluation-left {
    gap: 12px;
  }

  .evaluation-icon {
    width: 35px;
    height: 35px;
  }

  .evaluation-icon svg {
    width: 16px;
    height: 16px;
  }

  .evaluation-label {
    font-size: 1rem;
  }

  .evaluation-value {
    font-size: 1.1rem;
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .affordability-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .main-content {
    gap: 30px;
  }

  .current-category-card {
    padding: 25px 15px;
  }

  .category-icon-large {
    width: 70px;
    height: 70px;
  }

  .category-name {
    font-size: 1.2rem;
  }

  .category-value {
    font-size: 1.6rem;
  }

  .evaluation-item {
    padding: 12px 15px;
  }

  .evaluation-left {
    gap: 10px;
  }

  .evaluation-icon {
    width: 30px;
    height: 30px;
  }

  .evaluation-icon svg {
    width: 14px;
    height: 14px;
  }

  .evaluation-label {
    font-size: 0.9rem;
  }

  .evaluation-value {
    min-width: auto;
    font-size: 1rem;
  }

  .continue-button {
    padding: 14px 30px;
    font-size: 1.1rem;
  }
}
</style>
