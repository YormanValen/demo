<template>
  <div class="bank-selection-container">
    <!-- Animated background elements (simplified from intro) -->
    <div class="background-elements">
      <!-- Financial symbols -->
      <div class="floating-element dollar-sign">$</div>
      <div class="floating-element euro-sign">€</div>
      <div class="floating-element percentage-icon">%</div>

      <!-- Data visualization elements -->
      <div class="floating-element chart-bar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="16" width="4" height="5" fill="currentColor" />
          <rect x="8" y="12" width="4" height="9" fill="currentColor" />
          <rect x="13" y="8" width="4" height="13" fill="currentColor" />
          <rect x="18" y="4" width="4" height="17" fill="currentColor" />
        </svg>
      </div>

      <div class="floating-element trend-up">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" />
          <path d="M14 7H21V14" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- Numbers representing data -->
      <div class="floating-element number">42%</div>
      <div class="floating-element number">1.2M</div>
      <div class="floating-element number">+15%</div>
      <div class="floating-element number">87K</div>

      <!-- Data points -->
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <div class="main-content">
      <!-- Banks Container -->
      <div ref="banksContainer" class="banks-container" :class="{ 'visible': showBanks, 'fusing': fusion.active }"
        v-if="banksLoaded">
        <div v-for="bank in displayBanks" :key="bank.id" class="bank-item" :ref="el => setBankItemRef(el, bank.id)"
          :class="{ expanding: expandingBankId === bank.id }">
          <!-- Viewed check badge -->
          <div v-if="isViewed(bank.id)" class="viewed-check" :style="{ color: bank.bankColor }" title="Visto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.15" />
              <path d="M6 12.5L10 16.5L18 8.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <!-- Bank Logo -->
          <div class="bank-logo-container">
            <div class="bank-logo" :style="{ backgroundColor: bank.bankColor }"
              :ref="el => setBankLogoRef(el, bank.id)">
              <img v-if="bank.logo" :src="bank.logo" :alt="bank.name" class="bank-logo-image" />
              <span v-else class="bank-initials">{{ bank.bankInitials }}</span>
            </div>
          </div>

          <!-- Bank Name -->
          <h3 class="bank-name">{{ bank.name }}</h3>

          <!-- Table Icon with Bank Color -->
          <div class="table-icon" :style="{ color: bank.bankColor }">
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
              <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
              <path d="M8 10V19" stroke="currentColor" stroke-width="2" />
              <path d="M16 10V19" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Fusion core removed: items themselves converge and overlap -->

      <!-- Fusion summary after completing all banks -->
      <div v-if="fusion.showSummary" class="fusion-summary" :class="{ visible: fusion.showSummary }"
        :style="fusionSummaryStyle">
        <div class="fusion-logo" ref="fusionLogoEl">
          <span class="fusion-initials">HT</span>
        </div>
        <h3 class="fusion-title">Historial transaccional</h3>
        <div class="fusion-table-icon">
          <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
            <path d="M8 10V19" stroke="currentColor" stroke-width="2" />
            <path d="M16 10V19" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="button-container" :class="{ 'visible': showButton }">
        <button class="continue-button" @click="handleContinue">
          Continuar
        </button>
      </div>
    </div>

    <!-- Overlay eliminado: la animación de entrada ocurre en la vista de transacciones usando coordenadas -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// Logo imports
import neodigiBankLogo from '@/assets/logos/neodigi-bank-logo.png'
import tekcreditLogo from '@/assets/logos/tekcredit-logo.png'
import flexfiniaLogo from '@/assets/logos/flexfinia-logo.png'

// Router and route
const router = useRouter()
const route = useRoute()

// Animation variables
const showBanks = ref(false)
const showButton = ref(false)
const banksLoaded = ref(false)


// Viewed banks tracking
const VIEWED_KEY = 'ti_viewed_banks'
const viewedBankIds = ref<Set<number>>(new Set())
const loadViewed = () => {
  try {
    const raw = localStorage.getItem(VIEWED_KEY)
    if (raw) {
      const arr = JSON.parse(raw) as number[]
      viewedBankIds.value = new Set(arr)
    }
  } catch { }
}
const isViewed = (id: number) => viewedBankIds.value.has(id)

// Default banks - always displayed in consistent order
const defaultBanks = [
  {
    id: 1,
    name: 'Neodigi Bank',
    logo: neodigiBankLogo,
    bankInitials: 'ND',
    bankColor: '#1d4ed8',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  },
  {
    id: 2,
    name: 'TekCredit',
    logo: tekcreditLogo,
    bankInitials: 'TC',
    bankColor: '#dc2626',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  },
  {
    id: 3,
    name: 'Flexfinia',
    logo: flexfiniaLogo,
    bankInitials: 'FF',
    bankColor: '#059669',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  }
]

// Computed property for banks to display - always use default banks for consistent layout
const displayBanks = computed(() => {
  // Always return default banks to maintain consistent visualization
  // This ensures the same order and layout regardless of store state
  return defaultBanks
})

// Next bank to show when pressing Continue
const nextBankToView = computed(() => {
  const banks = displayBanks.value
  const next = banks.find(b => !isViewed(b.id))
  return next || banks[0]
})

// All banks viewed?
const allViewed = computed(() => displayBanks.value.every(b => isViewed(b.id)))


// Animation functions
const showElements = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      showBanks.value = true
      setTimeout(() => {
        showButton.value = true
        resolve()
      }, 1500) // Show button after banks animation
    }, 500)
  })
}

// Expanding bank effect (kept for animation reference)
const expandingBankId = ref<number | null>(null)

// Handle continue button click
const fusion = ref<{ active: boolean; showSummary: boolean }>({ active: false, showSummary: false })
// XY position (viewport coords) where fusion core/summary should appear
const fusionXY = ref<{ x: number; y: number } | null>(null)
// Inline style to position fusion core/summary at fusionXY
const fusionSummaryStyle = computed(() => {
  if (!fusionXY.value) return {}
  return {
    position: 'fixed',
    left: `${fusionXY.value.x}px`,
    top: `${fusionXY.value.y}px`,
    // Nota: el transform base para centrar se aplica via CSS de .fusion-summary
    zIndex: '9998'
  } as Record<string, string>
})
const startFusion = async () => {
  if (!banksContainer.value) {
    fusion.value.active = true
    setTimeout(() => { fusion.value.showSummary = true; showButton.value = true }, 1180)
    return
  }

  // Ocultar botón durante fusión
  showButton.value = false
  fusion.value.active = true

  // Calcular centro objetivo usando el banco central
  await nextTick()
  const ordered = displayBanks.value
  const centerIdx = Math.floor(ordered.length / 2)
  const centerBank = ordered[centerIdx]
  const centerLogoEl = bankLogoRefs.get(centerBank?.id || -1)
  let targetX: number
  let targetY: number
  if (centerLogoEl) {
    const r = centerLogoEl.getBoundingClientRect()
    targetX = r.left + r.width / 2
    targetY = r.top + r.height / 2
  } else {
    const containerRect = banksContainer.value.getBoundingClientRect()
    targetX = containerRect.left + containerRect.width / 2
    targetY = containerRect.top + containerRect.height / 2
  }

  // Posición del resumen y núcleo en el punto de unión (banco central) pero un poco más arriba
  const fusionSummaryPos = { x: targetX, y: targetY - 40 }
  fusionXY.value = fusionSummaryPos

  // Mover cada item completo (logo + nombre + icono + check) hacia el centro y solapar
  ordered.forEach((bank) => {
    const itemEl = bankItemRefs.get(bank.id)
    const logoEl = bankLogoRefs.get(bank.id)
    if (!itemEl || !logoEl) return

    const logoRect = logoEl.getBoundingClientRect()
    const cx = logoRect.left + logoRect.width / 2
    const cy = logoRect.top + logoRect.height / 2
    const dx = Math.round(targetX - cx)
    const dy = Math.round(targetY - cy)

    // Desactivar animación inicial para que el transform sea controlado por transición
    itemEl.style.animation = 'none'
    itemEl.style.opacity = '1'
    // Forzar reflow para que el navegador capte el cambio antes de aplicar el transform
    void itemEl.getBoundingClientRect()
    itemEl.style.willChange = 'transform, opacity'
    itemEl.style.transition = 'transform 900ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 360ms ease'
    requestAnimationFrame(() => {
      itemEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.18)`
      // iniciar desvanecido luego de llegar al centro
      setTimeout(() => { itemEl.style.opacity = '0' }, 820)
    })
  })

  // Mostrar resumen cuando termine el desvanecido de los bancos (820ms + 360ms)
  setTimeout(() => {
    fusion.value.showSummary = true
    showButton.value = true
    // Mark fusion as completed in localStorage
    localStorage.setItem('fusion_completed', 'true')
  }, 1180)
}

const handleContinue = () => {
  ('🔄 SELECTION VIEW - Continue button clicked')
  // Si ya se muestra el resumen, hacer zoom a HT y navegar a la console.logvista de historial
  if (fusion.value.showSummary) {
    navigateToHistoryWithReveal()
    return
  }

  // Si todos vistos y aún no mostramos fusión, disparar fusión
  if (allViewed.value && !fusion.value.showSummary) {
    startFusion()
    return
  }

  // Navegar al siguiente banco no visto (o al primero si todos vistos marcados externamente)
  const bank = nextBankToView.value
  expandingBankId.value = bank.id
  setTimeout(() => {
    navigateWithReveal(bank)
    setTimeout(() => (expandingBankId.value = null), 300)
  }, 250)
}

// Check if we're returning from a table view (bank transaction or history)
const isReturningFromTable = computed(() => {
  // Check if we have fusion-related query params
  const fromHistory = route.query.fromHistory === 'true'
  const fromBankTable = route.query.fromBankTable === 'true'
  return fromHistory || fromBankTable
})

// Check if fusion was already completed
const isFusionCompleted = computed(() => {
  return localStorage.getItem('fusion_completed') === 'true'
})

// Start animations when component mounts
onMounted(async () => {
  // Initialize fusion_completed to false by default
  if (localStorage.getItem('fusion_completed') === null) {
    localStorage.setItem('fusion_completed', 'false')
  }

  // Load viewed banks state
  loadViewed()

  // Wait for next tick
  await nextTick()

  // If returning from table view and fusion was already completed, show fusion state directly
  if (isReturningFromTable.value && isFusionCompleted.value) {
    banksLoaded.value = true
    await nextTick()

    // Show fusion state directly without animation
    fusion.value.active = true
    fusion.value.showSummary = true
    showButton.value = true

    // Position fusion summary higher up on screen (above center)
    fusionXY.value = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 80 // Move 80px up from center
    }
    return
  }

  // Always show banks first, then check if we need to auto-fuse
  banksLoaded.value = true

  // Wait for DOM update
  await nextTick()

  // Start animations after a short delay
  setTimeout(async () => {
    await showElements()

    // If all banks are viewed and fusion not completed yet, automatically start fusion
    if (allViewed.value && !isFusionCompleted.value) {
      setTimeout(() => {
        startFusion()
      }, 1500) // Wait for banks to fully appear before fusion
    }
  }, 300)
})

// ---- Refs de logos para cálculos de fusión ----
type BankLike = { id: number; name: string; logo?: string; bankInitials?: string; bankColor?: string }
const bankLogoRefs = new Map<number, HTMLElement>()
const setBankLogoRef = (el: Element | ComponentPublicInstance | null, bankId: number) => {
  if (el instanceof HTMLElement) bankLogoRefs.set(bankId, el)
}

// Refs para fusión programática de items
const banksContainer = ref<HTMLElement | null>(null)
const bankItemRefs = new Map<number, HTMLElement>()
const setBankItemRef = (el: Element | ComponentPublicInstance | null, bankId: number) => {
  if (el instanceof HTMLElement) bankItemRefs.set(bankId, el)
}

// Ref del logo de fusión (HT) para calcular coordenadas de zoom
const fusionLogoEl = ref<HTMLElement | null>(null)

// Overlay de zoom y navegación a la vista de tabla para un banco
const createZoomOverlay = (bank: BankLike, rect: DOMRect) => {
  const overlay = document.createElement('div')
  overlay.setAttribute('data-zoom-overlay', 'neodigi')
  Object.assign(overlay.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '9999',
    overflow: 'hidden',
    background: 'transparent'
  })

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const deltaX = Math.round(window.innerWidth / 2 - centerX)
  const deltaY = Math.round(window.innerHeight / 2 - centerY)

  const logo = document.createElement('div')
  Object.assign(logo.style, {
    position: 'fixed',
    left: rect.left + 'px',
    top: rect.top + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px',
    borderRadius: '50% ',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(12px)',
    border: '3px solid rgba(29, 78, 216, 0.25)',
    transform: 'translate(0, 0) scale(1)',
    transition: 'transform 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 800ms ease',
    willChange: 'transform, opacity',
    zIndex: '10000'
  })

  if (bank.logo) {
    const img = document.createElement('img')
    img.src = bank.logo
    img.alt = bank.name
    Object.assign(img.style, {
      width: Math.max(60, rect.width * 0.6) + 'px',
      height: Math.max(60, rect.height * 0.6) + 'px',
      objectFit: 'contain',
      background: 'transparent',
      padding: '12px'
    })
    logo.appendChild(img)
  } else if (bank.bankInitials) {
    const span = document.createElement('span')
    span.textContent = bank.bankInitials
    Object.assign(span.style, {
      color: '#374151',
      fontSize: '2rem',
      fontWeight: '700'
    })
    logo.appendChild(span)
  }

  const scrim = document.createElement('div')
  Object.assign(scrim.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.03)',
    transition: 'opacity 800ms ease',
    opacity: '0'
  })

  overlay.appendChild(scrim)
  overlay.appendChild(logo)
  document.body.appendChild(overlay)

  requestAnimationFrame(() => {
    scrim.style.opacity = '1'
    logo.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(4)`
  })

  setTimeout(() => {
    logo.style.opacity = '0'
    scrim.style.opacity = '0'
  }, 650)

  setTimeout(() => {
    overlay.remove()
  }, 1000)
}

const navigateWithReveal = (bank: BankLike) => {
  const el = bankLogoRefs.get(bank.id)
  if (!el) {
    router.push({ name: 'entity-transactional-insights-bank-transaction', params: { bankId: bank.id.toString() } })
    return
  }
  const rect = el.getBoundingClientRect()
  const centerX = Math.round(rect.left + rect.width / 2)
  const centerY = Math.round(rect.top + rect.height / 2)

  createZoomOverlay(bank, rect)

  router.push({
    name: 'entity-transactional-insights-bank-transaction',
    params: { bankId: bank.id.toString() },
    query: { rx: String(centerX), ry: String(centerY) }
  })
}

const navigateToHistoryWithReveal = () => {
  const el = fusionLogoEl.value
  // Fallback: si no existe el logo, navegar directo
  if (!el) {
    router.push({ name: 'entity-transactional-insights-history-transaction' })
    return
  }
  const rect = el.getBoundingClientRect()
  const centerX = Math.round(rect.left + rect.width / 2)
  const centerY = Math.round(rect.top + rect.height / 2)

  // Usar el mismo overlay de zoom con iniciales HT
  createZoomOverlay({ id: -1, name: 'Historial transaccional', bankInitials: 'HT' }, rect)

  router.push({
    name: 'entity-transactional-insights-history-transaction',
    query: { rx: String(centerX), ry: String(centerY) }
  })
}
</script>

<style scoped>
.bank-selection-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
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

/* Simplified animated background elements */
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
  opacity: 0.3;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 25s ease-in-out infinite;
  user-select: none;
}

/* Positioning for background elements */
.dollar-sign {
  font-size: 2.5rem;
  top: 10%;
  left: 10%;
  animation-delay: -2s;
}

.euro-sign {
  font-size: 2.2rem;
  top: 15%;
  right: 15%;
  animation-delay: -8s;
}

.percentage-icon {
  font-size: 2rem;
  bottom: 20%;
  left: 15%;
  animation-delay: -12s;
}

.chart-bar {
  top: 80%;
  right: 20%;
  animation-delay: -5s;
  font-size: 1.5rem;
}

.trend-up {
  top: 25%;
  left: 50%;
  animation-delay: -15s;
  font-size: 1.8rem;
}

.number {
  font-size: 1.2rem;
  font-weight: 700;
}

.number:nth-child(6) {
  top: 20%;
  right: 30%;
  animation-delay: -4s;
}

.number:nth-child(7) {
  bottom: 30%;
  left: 25%;
  animation-delay: -10s;
}

.number:nth-child(8) {
  top: 40%;
  right: 10%;
  animation-delay: -16s;
}

.number:nth-child(9) {
  bottom: 15%;
  right: 40%;
  animation-delay: -6s;
}

.data-point {
  font-size: 1rem;
}

.data-point:nth-child(10) {
  top: 35%;
  left: 20%;
  animation-delay: -3s;
}

.data-point:nth-child(11) {
  bottom: 25%;
  right: 25%;
  animation-delay: -9s;
}

.data-point:nth-child(12) {
  top: 60%;
  left: 5%;
  animation-delay: -14s;
}

.data-point:nth-child(13) {
  bottom: 40%;
  right: 5%;
  animation-delay: -7s;
}

/* Float animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }

  25% {
    transform: translateY(-15px) rotate(1deg);
    opacity: 0.4;
  }

  50% {
    transform: translateY(-8px) rotate(-0.5deg);
    opacity: 0.25;
  }

  75% {
    transform: translateY(-20px) rotate(0.5deg);
    opacity: 0.35;
  }
}

/* Main content */
.main-content {
  max-width: 1200px;
  width: 90%;
  text-align: center;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Banks container */
.banks-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
  margin-bottom: 60px;
  width: 100%;
  max-width: 900px;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.banks-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Fusion animation: converge logos towards center, then fade into core */
.banks-container.fusing {
  position: relative;
}

.banks-container.fusing .bank-item {
  /* Sin keyframes: desplazamiento controlado por JS para converger al centro */
  pointer-events: none;
}

/* Fusion core removed: overlap effect uses item clones only */

/* Blend the logos during fusion to emphasize union */
.banks-container.fusing .bank-logo {
  mix-blend-mode: screen;
  filter: saturate(1.15) brightness(1.05);
}

.fusion-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  opacity: 0;
  /* Posicionamiento: el left/top vienen por estilo inline; el centrado se hace aquí */
  transform: translate(-50%, -30%) translateY(12px) scale(0.96);
  filter: blur(6px);
}

.fusion-summary.visible {
  /* Animación de entrada suave en el montaje */
  animation: summaryIn 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes summaryIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -30%) translateY(12px) scale(0.96);
    filter: blur(6px);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -30%) translateY(0) scale(1);
    filter: blur(0);
  }
}

.fusion-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.fusion-initials {
  font-weight: 800;
  font-size: 2rem;
}

.fusion-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.fusion-table-icon {
  color: #6b7280;
  /* gray */
}

/* Individual bank item */
.bank-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  animation: bankAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  user-select: none;
  pointer-events: none;
  min-width: 180px;
  flex: 0 0 auto;
}


/* Selected bank fade out animation */
.bank-item.selected-bank-animating {
  animation: selectedBankFadeOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
}

@keyframes selectedBankFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
}

/* Other banks hide with smooth animation */
.bank-item.other-banks-hiding {
  animation: otherBanksHide 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes otherBanksHide {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
}

@keyframes bankAppear {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Bank logo container */
.bank-logo-container {
  position: relative;
}

.bank-logo {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.274) !important;
  backdrop-filter: blur(10px);
  animation: logoBreath 6s ease-in-out infinite;
}


.bank-logo-image {
  width: 130px;
  height: 130px;
  object-fit: contain;
  background: transparent;
  border-radius: 0;
  padding: 20px;
}

/* Pulso sutil de los logos para sensación de vida */
@keyframes logoBreath {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.025);
  }
}

.bank-initials {
  color: #374151;
  font-size: 2.5rem;
  font-weight: 700;
}

/* Bank name */
.bank-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  min-height: 1.5em;
}

/* Table icon */
.table-icon {
  opacity: 0.8;
  transition: all 0.3s ease;
}

.table-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Button container */
.button-container {
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
  padding: 18px 40px;
  font-size: 1.3rem;
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

/* Efecto de crecimiento local del logo de Neodigi y su ícono de tabla */
.bank-item.expanding {
  position: relative;
  z-index: 1000;
}

.bank-item .bank-logo,
.bank-item .table-icon {
  transition: transform 0.3s ease;
}

.bank-item.expanding .bank-logo {
  transform: scale(1.35);
}

.bank-item.expanding .table-icon {
  transform: scale(1.25);
}

/* Atenuar el resto mientras Neodigi crece */
.banks-container.visible .bank-item:not(.expanding) {
  opacity: 0.6;
}

.viewed-check {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
}

/* Eliminado overlay: la revelación ocurre en la siguiente vista con clip-path */

/* Responsive styles */
@media (max-width: 1024px) {
  .banks-container {
    gap: 50px;
    flex-direction: row;
    max-width: 800px;
  }

  .bank-logo {
    width: 160px;
    height: 160px;
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(10px);
  }

  .bank-logo-image {
    width: 100px;
    height: 100px;
    background: transparent;
    border-radius: 0;
    padding: 18px;
  }

  .bank-initials {
    font-size: 2.2rem;
    color: #374151;
  }

  .bank-name {
    font-size: 1.3rem;
  }

  .table-icon svg {
    width: 84px;
    height: 84px;
  }
}

@media (max-width: 768px) {
  .banks-container {
    flex-direction: row;
    gap: 35px;
    flex-wrap: wrap;
    max-width: 600px;
  }

  .bank-logo {
    width: 140px;
    height: 140px;
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(10px);
  }

  .bank-logo-image {
    width: 85px;
    height: 85px;
    background: transparent;
    border-radius: 0;
    padding: 15px;
  }

  .bank-initials {
    font-size: 2rem;
    color: #374151;
  }

  .bank-name {
    font-size: 1.2rem;
  }

  .table-icon svg {
    width: 76px !important;
    height: 76px !important;
  }

  .continue-button {
    padding: 15px 30px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    width: 95%;
  }

  .banks-container {
    flex-direction: column;
    gap: 30px;
  }

  .bank-logo {
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.85) !important;
    backdrop-filter: blur(10px);
  }

  .bank-logo-image {
    width: 70px;
    height: 70px;
    background: transparent;
    border-radius: 0;
    padding: 12px;
  }

  .bank-initials {
    font-size: 1.8rem;
    color: #374151;
  }

  .bank-name {
    font-size: 1.1rem;
  }

  .table-icon svg {
    width: 68px;
    height: 68px;
  }

  .continue-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>
