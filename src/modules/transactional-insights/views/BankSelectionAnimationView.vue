<template>
  <div class="bank-selection-container">
    <!-- Reusable animated background -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
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
          :data-bank-id="bank.id" :class="{
            expanding: expandingBankId === bank.id,
            'transferring-data': dataTransfer.activeBank === bank.id,
            'emptying': dataTransfer.completedBanks.has(bank.id)
          }">
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
      <div v-if="fusion.showSummary" class="fusion-summary" :class="{
        visible: fusion.showSummary,
        'data-transfer-mode': fusion.transferring
      }" :style="fusionSummaryStyle">
        <div class="fusion-logo" ref="fusionLogoEl">
        </div>
        <h3 class="fusion-title">Historial Transaccional</h3>
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

    <!-- Bottom sheet: flujo de procesamiento transaccional puro -->
    <EntityAnimationContainer 
      :is-visible="true"
      :clickable-header="false"
      :force-open="isEntitySheetOpen"
      @toggle="onEntitySheetToggle"
    >
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; height:100%;">
        <EntityFlowVisualization
          :is-visible="showEntityFlow"
          :steps="tiSteps"
          @step-change="onEntityFlowStepChange"
          @all-complete="onEntityFlowComplete"
        />

        <transition name="fade-slide-up">
          <button
            v-if="showEntityNext"
            class="continue-button"
            @click="onEntityFlowContinue"
          >
            Continuar
          </button>
        </transition>
      </div>
    </EntityAnimationContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import type { ComponentPublicInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInstitutionsStore } from '@/modules/financial/stores/institutions.store'
import EntityAnimationContainer from '../../entity/components/EntityAnimationContainer.vue'
import EntityFlowVisualization from '../../entity/components/EntityFlowVisualization.vue'
// Logo imports
import neodigiBankLogo from '@/assets/logos/neodigi-bank-logo.png'
import tekcreditLogo from '@/assets/logos/tekcredit-logo.png'
import flexfiniaLogo from '@/assets/logos/flexfinia-logo.png'

// Router and route
const router = useRouter()
const route = useRoute()

// Institutions store
const institutionsStore = useInstitutionsStore()

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

// Bottom sheet & flow logic for processing transactional data
const isEntitySheetOpen = ref(false)
const showEntityFlow = computed(() => isEntitySheetOpen.value)
const showEntityNext = ref(false)

// Session storage key for tracking if flow was shown
const BANK_SELECTION_FLOW_SHOWN_KEY = 'bank_selection_flow_shown_this_session'

// Check if bank selection flow was already shown this session
const hasBankSelectionFlowBeenShown = () => {
  return sessionStorage.getItem(BANK_SELECTION_FLOW_SHOWN_KEY) === 'true'
}

// Mark bank selection flow as shown for this session
const markBankSelectionFlowAsShown = () => {
  sessionStorage.setItem(BANK_SELECTION_FLOW_SHOWN_KEY, 'true')
}
const tiSteps = [
  { title: 'Procesando la información transaccional pura', icon: 'mdi-database-clock' }
]
const onEntityFlowStepChange = () => { showEntityNext.value = false }
const onEntityFlowComplete = () => { showEntityNext.value = true }
const onEntityFlowContinue = () => {
  // Mark flow as shown and close the bottom sheet when user clicks Continuar
  markBankSelectionFlowAsShown()
  isEntitySheetOpen.value = false
}
const onEntitySheetToggle = (open: boolean) => {
  isEntitySheetOpen.value = open
  if (!open) {
    showEntityNext.value = false
    // Mark as shown when user manually closes the sheet
    markBankSelectionFlowAsShown()
  }
}

// Map bank names to correct logo assets
const getBankLogo = (bankName: string) => {
  const logoMap: Record<string, string> = {
    'Neodigi Bank': neodigiBankLogo,
    'TekCredit': tekcreditLogo,
    'Flexfinia': flexfiniaLogo
  }
  return logoMap[bankName] || ''
}

// Computed property for banks to display - use store data if available, otherwise default banks
const displayBanks = computed(() => {
  // If institutions store has connected institutions, use those with correct logos
  if (institutionsStore.hasConnectedInstitutions) {
    return institutionsStore.connectedInstitutions.map(bank => ({
      ...bank,
      logo: getBankLogo(bank.name) || bank.logo // Use mapped logo or fallback to existing logo
    }))
  }

  // Otherwise fall back to default banks for consistent visualization
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
const fusion = ref<{ active: boolean; showSummary: boolean; transferring: boolean }>({ active: false, showSummary: false, transferring: false })
// XY position (viewport coords) where fusion core/summary should appear
const fusionXY = ref<{ x: number; y: number } | null>(null)
// Data transfer animation state
const dataTransfer = ref<{
  activeBank: number | null;
  completedBanks: Set<number>;
  connections: Array<{ id: string; from: { x: number; y: number }; to: { x: number; y: number } }>
}>({
  activeBank: null,
  completedBanks: new Set(),
  connections: []
})
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
  fusion.value.transferring = true

  await nextTick()

  // ¡NUEVA ANIMACIÓN ESPECTACULAR DE CONVERGENCIA DE DATOS!
  await startSpectacularDataConvergence()

  // Finalizar
  setTimeout(() => {
    fusion.value.transferring = false
    showButton.value = true
    localStorage.setItem('fusion_completed', 'true')
  }, 1000)
}

// 🚀 NUEVA ANIMACIÓN ESPECTACULAR DE CONVERGENCIA SECUENCIAL
const startSpectacularDataConvergence = async () => {
  const ordered = displayBanks.value

  // Paso 1: Elevar bancos primero
  await liftBanksUp()

  // Paso 2: Mostrar HT abajo después de que suban los bancos
  const htTargetX = window.innerWidth / 2
  const htTargetY = window.innerHeight / 2 + 280 // Increased from +180 to +280 for more separation
  fusionXY.value = { x: htTargetX, y: htTargetY }
  fusion.value.showSummary = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  // Paso 3: Procesar cada banco secuencialmente (uno por uno)
  for (let i = 0; i < ordered.length; i++) {
    const bank = ordered[i]
    await processIndividualBank(bank, htTargetX, htTargetY, i, ordered.length)

    // Esperar entre cada banco para efecto secuencial (reducido para compensar iconos adicionales)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Reduced from 2000ms to 1000ms
  }


  // Paso 5: HT vuelve a su tamaño normal primero
  await resetHTBalloonSize()

  // Paso 6: HT sube al centro Y los bancos se desvanecen AL MISMO TIEMPO
  await Promise.all([
    moveHTToCenter(),
    fadeOutAllBanks()
  ])
}

// Nueva función para procesar cada banco individualmente
const processIndividualBank = async (bank: any, htX: number, htY: number, bankIndex: number, totalBanks: number) => {
  const logoEl = bankLogoRefs.get(bank.id)
  if (!logoEl) return

  const logoRect = logoEl.getBoundingClientRect()
  const bankX = logoRect.left + logoRect.width / 2
  const bankY = logoRect.top + logoRect.height / 2

  // Crear efectos de vaciado en el banco y llenado en HT
  createBankEmptyingEffect(logoEl, bank.bankColor)
  createHTFillingEffect(htX, htY, bank.bankColor, bankIndex, totalBanks)

  // Crear flujo de iconos de dinero y estadísticas LENTO
  createSlowIconFlowEffect(bankX, bankY, htX, htY, bank.bankColor)

  // Esperar a que termine el flujo lento de iconos (con chips adicionales: 22 iconos × 300ms + 5500ms animación)
  await new Promise(resolve => setTimeout(resolve, 12100)) // Increased to account for all icons + chips
}


// Crear flujo lento de iconos de categorías de gasto
const createSlowIconFlowEffect = (fromX: number, fromY: number, toX: number, toY: number, bankColor: string) => {
  const icons = [
    // Categorías de alimentación
    { symbol: '🍕', type: 'food' },
    { symbol: '🍔', type: 'food' },
    { symbol: '☕', type: 'food' },
    { symbol: '🥘', type: 'food' },
    // Entretenimiento
    { symbol: '🎬', type: 'entertainment' },
    { symbol: '🎵', type: 'entertainment' },
    { symbol: '🎮', type: 'entertainment' },
    { symbol: '📺', type: 'entertainment' },
    // Transporte
    { symbol: '🚗', type: 'transport' },
    { symbol: '🚌', type: 'transport' },
    { symbol: '⛽', type: 'transport' },
    { symbol: '🚕', type: 'transport' },
    // Compras y servicios
    { symbol: '🛒', type: 'shopping' },
    { symbol: '👕', type: 'shopping' },
    { symbol: '🏥', type: 'services' },
    { symbol: '💊', type: 'services' },
    // Chips de palabras de análisis financiero
    { symbol: 'Gastos', type: 'chip' },
    { symbol: 'Ingresos', type: 'chip' },
    { symbol: 'Saldos', type: 'chip' },
    { symbol: 'Gastos', type: 'chip' },
    { symbol: 'Ingresos', type: 'chip' },
    { symbol: 'Saldos', type: 'chip' }
  ]

  // Crear múltiples iconos que fluyen lentamente
  icons.forEach((iconData, index) => {
    setTimeout(() => {
      createFloatingIcon(fromX, fromY, toX, toY, bankColor, iconData.symbol, iconData.type)
    }, index * 300) // Aparece un icono cada 300ms
  })
}

// Crear un icono individual que flota lentamente
const createFloatingIcon = (fromX: number, fromY: number, toX: number, toY: number, bankColor: string, symbol: string, type: string) => {
  const icon = document.createElement('div')
  icon.className = `floating-money-icon floating-${type}`

  // Diferentes tamaños y estilos para chips vs iconos
  let size, styles
  if (type === 'chip') {
    // Chips de texto más grandes y rectangulares
    size = 60 + Math.random() * 20 // Tamaño base más grande para texto
    styles = `
      width: auto;
      min-width: ${size}px;
      height: 24px;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    `
  } else {
    // Iconos emoji circulares
    size = 20 + Math.random() * 15 // Tamaño variable entre 20-35px
    styles = `
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      font-size: ${size * 0.8}px;
      font-weight: 700;
    `
  }

  icon.style.cssText = `
    position: fixed;
    left: ${fromX}px;
    top: ${fromY}px;
    ${styles}
    color: ${type === 'chip' ? '#334155' : bankColor};
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid ${type === 'chip' ? '#64748b' : bankColor};
    box-shadow: 0 0 15px ${type === 'chip' ? '#64748b40' : bankColor + '40'};
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transform: scale(0.5);
    transition: all 5.0s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `

  icon.textContent = symbol
  document.body.appendChild(icon)

  // Calcular posición con variación aleatoria para trayectoria más natural y extendida
  const randomOffsetX = (Math.random() - 0.5) * 200 // Increased from 100 to 200
  const randomOffsetY = (Math.random() - 0.5) * 150 // Increased from 50 to 150

  // Crear puntos intermedios para trayectoria curva
  const midX = (fromX + toX) / 2 + randomOffsetX * 1.5
  const midY = (fromY + toY) / 2 + randomOffsetY * 1.5
  
  // Animar hacia HT con movimiento lento y natural en tres etapas
  setTimeout(() => {
    icon.style.opacity = '1'
    icon.style.transform = 'scale(1)'
  }, 100)
  
  // Primera etapa: hacia punto intermedio
  setTimeout(() => {
    icon.style.left = `${midX}px`
    icon.style.top = `${midY}px`
    icon.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }, 200)
  
  // Segunda etapa: hacia destino final
  setTimeout(() => {
    icon.style.left = `${toX + randomOffsetX}px`
    icon.style.top = `${toY + randomOffsetY}px`
    icon.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }, 2700)

  // Efecto final al llegar a HT
  setTimeout(() => {
    icon.style.opacity = '0'
    icon.style.transform = 'scale(0.2)'
  }, 4800) // Increased from 3400 to 4800

  // Limpiar después de la animación
  setTimeout(() => {
    icon.remove()
  }, 5500) // Increased from 4000 to 5500
}


// Crear efecto de vaciado en el logo del banco
const createBankEmptyingEffect = (logoEl: HTMLElement, _bankColor: string) => {
  // Crear overlay blanco de vaciado que baja desde arriba
  const emptyingOverlay = document.createElement('div')
  emptyingOverlay.className = 'bank-emptying-overlay'

  emptyingOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    pointer-events: none;
    transition: height 2.5s ease-out;
    z-index: 0;
  `

  // Asegurar que el logo tenga position relative
  logoEl.style.position = 'relative'
  logoEl.style.overflow = 'hidden'
  logoEl.appendChild(emptyingOverlay)

  // Activar el efecto de vaciado (el overlay blanco baja desde arriba)
  setTimeout(() => {
    emptyingOverlay.style.height = '100%'
  }, 300)
}

// Crear efecto de llenado y crecimiento en HT como globo
const createHTFillingEffect = (_htX: number, _htY: number, _bankColor: string, bankIndex: number, totalBanks: number) => {
  const htElement = fusionLogoEl.value
  const htContainer = htElement?.parentElement // El contenedor completo de HT
  if (!htElement || !htContainer) return

  // Crear o encontrar el overlay de llenado
  let fillingOverlay = htElement.querySelector('.ht-filling-overlay') as HTMLElement
  if (!fillingOverlay) {
    fillingOverlay = document.createElement('div')
    fillingOverlay.className = 'ht-filling-overlay'

    fillingOverlay.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(97, 40, 120, 0.7);
      border-radius: 50%;
      pointer-events: none;
      height: 0%;
      transition: height 2.5s ease-out;
      z-index: 1;
      mix-blend-mode: overlay;
    `

    // Asegurar que HT tenga position relative
    htElement.style.position = 'relative'
    htElement.style.overflow = 'hidden'
    htElement.appendChild(fillingOverlay)
  }

  // Calcular el porcentaje de llenado
  const fillPercentage = ((bankIndex + 1) / totalBanks) * 100

  // Calcular el crecimiento del globo (desde 1x hasta 1.8x)
  const balloonScale = 1 + ((bankIndex + 1) / totalBanks) * 0.8

  // Activar el efecto de llenado (el relleno sube)
  setTimeout(() => {
    fillingOverlay.style.height = `${fillPercentage}%`
  }, 300)

  // Hacer crecer HT como un globo progresivamente
  setTimeout(() => {
    htElement.style.transition = 'width 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    // Calcular nuevos tamaños para el efecto globo
    const baseSize = 120 // Tamaño base de HT
    const newSize = baseSize * balloonScale

    htElement.style.width = `${newSize}px`
    htElement.style.height = `${newSize}px`

    // Añadir efecto de respiración/globo mientras crece
    htElement.classList.add('balloon-breathing')
  }, 500)
}


// Nueva función para hacer que los bancos suban mucho más arriba para mayor separación
const liftBanksUp = async () => {
  console.log('🚀 LIFTING BANKS UP - Starting smooth lift animation')
  const ordered = displayBanks.value

  // First ensure all banks are visible and properly positioned
  ordered.forEach((bank) => {
    const itemEl = bankItemRefs.get(bank.id)
    if (!itemEl) {
      console.warn(`❌ No element found for bank ${bank.id}`)
      return
    }
    
    // Ensure the bank is visible and has completed its initial animation
    itemEl.style.opacity = '1'
    itemEl.style.animation = 'none'
    console.log(`🏦 Prepared bank ${bank.name} for lifting`)
  })

  // Small delay to ensure all banks are ready
  await new Promise(resolve => setTimeout(resolve, 100))

  // Now apply the lifting animation with stagger
  ordered.forEach((bank, index) => {
    const itemEl = bankItemRefs.get(bank.id)
    if (!itemEl) return

    setTimeout(() => {
      console.log(`⬆️ Lifting bank ${bank.name} with class`)
      itemEl.classList.add('lifting-up')
    }, index * 200) // Stagger each bank by 200ms
  })

  console.log('⏱️ Waiting 3200ms for smooth staggered lift animation to complete')
  return new Promise(resolve => setTimeout(resolve, 3200)) // 3 banks * 200ms delay + 2500ms animation
}



// Función para hacer desaparecer todos los bancos suavemente - como la subida
const fadeOutAllBanks = async () => {
  console.log('🌅 FADING OUT BANKS - Starting smooth fade animation')
  console.log('Banks to fade:', displayBanks.value.map(b => b.name))
  const ordered = displayBanks.value

  if (ordered.length === 0) {
    console.warn('❌ No banks to fade out!')
    return
  }

  // First ensure all banks are properly positioned for fading
  ordered.forEach((bank) => {
    const itemEl = bankItemRefs.get(bank.id)
    console.log(`Checking bank ${bank.name} (${bank.id}):`, itemEl)
    
    if (!itemEl) {
      console.warn(`❌ No element found for bank ${bank.name}`)
      return
    }
    
    // Check current state
    const currentStyle = window.getComputedStyle(itemEl)
    console.log(`Bank ${bank.name} current opacity:`, currentStyle.opacity)
    console.log(`Bank ${bank.name} current transform:`, currentStyle.transform)
    
    // Force visible state first
    itemEl.style.opacity = '1'
    itemEl.style.visibility = 'visible'
    console.log(`🏦 Prepared bank ${bank.name} for fading`)
  })

  // Small delay to ensure all banks are ready
  await new Promise(resolve => setTimeout(resolve, 200))

  // Now apply the fading animation to ALL banks at the same time for smooth simultaneous fade
  ordered.forEach((bank) => {
    const itemEl = bankItemRefs.get(bank.id)
    if (!itemEl) {
      console.warn(`❌ Cannot fade bank ${bank.name} - no element`)
      return
    }

    console.log(`🌅 APPLYING FADE CLASS to bank ${bank.name} (simultaneous)`)
    
    // Remove any conflicting classes first
    itemEl.classList.remove('lifting-up')
    
    // Force a repaint
    itemEl.offsetHeight
    
    // Apply fade class immediately to all banks
    itemEl.classList.add('fading-out-bank')
    
    // Double-check the class was applied
    setTimeout(() => {
      console.log(`Class check - ${bank.name} has fading-out-bank:`, itemEl.classList.contains('fading-out-bank'))
      console.log(`Style check - ${bank.name} opacity:`, itemEl.style.opacity)
      console.log(`Computed check - ${bank.name} opacity:`, window.getComputedStyle(itemEl).opacity)
    }, 100)
  })

  // Limpiar estado de conexiones
  dataTransfer.value.connections = []
  dataTransfer.value.activeBank = null

  console.log('⏱️ Waiting for smooth simultaneous fade animation to complete')
  // Wait only for animation duration since all banks fade at the same time
  const totalFadeTime = 2500 // Just the 2500ms animation duration
  console.log(`Total fade time: ${totalFadeTime}ms`)
  return new Promise(resolve => setTimeout(resolve, totalFadeTime))
}

// Función para resetear el tamaño del globo HT a normal
const resetHTBalloonSize = async () => {
  const htElement = fusionLogoEl.value
  if (!htElement) return

  // Volver al tamaño base con transición suave
  htElement.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  htElement.style.width = '120px' // Tamaño base original
  htElement.style.height = '120px'

  // Opcional: quitar el efecto de respiración
  htElement.classList.remove('balloon-breathing')

  return new Promise(resolve => setTimeout(resolve, 1500))
}

// Función para mover HT al centro suavemente
const moveHTToCenter = async () => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2 - 40

  // Animar el movimiento suave hacia el centro
  fusionXY.value = { x: centerX, y: centerY }

  const htElement = fusionLogoEl.value?.parentElement
  if (htElement) {
    // Transición más larga y suave con un ligero rebote
    htElement.style.transition = 'all 1.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'

    // Añadir un efecto de brillo durante el movimiento
    htElement.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(97, 40, 120, 0.6))'

    // Restaurar el brillo después del movimiento
    setTimeout(() => {
      htElement.style.filter = ''
    }, 1800)
  }

  return new Promise(resolve => setTimeout(resolve, 1800))
}

const handleContinue = () => {
  console.log('🔄 SELECTION VIEW - Continue button clicked')
  // Si ya se muestra el resumen, hacer zoom a HT y navegar a la vista de historial
  if (fusion.value.showSummary) {
    navigateToHistoryWithReveal()
    return
  }

  // Si todos vistos y aún no mostramos fusión, disparar fusión
  if (allViewed.value && !fusion.value.showSummary) {
    startFusion()
    return
  }

  // Si no todos vistos, navegar al siguiente banco no visto
  if (!allViewed.value) {
    const bank = nextBankToView.value
    expandingBankId.value = bank.id
    setTimeout(() => {
      navigateWithReveal(bank)
      setTimeout(() => (expandingBankId.value = null), 300)
    }, 250)
    return
  }

  // Fallback de seguridad
  startFusion()
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
  // Only show the bottom sheet if it hasn't been shown this session
  if (!hasBankSelectionFlowBeenShown()) {
    isEntitySheetOpen.value = true
  }
  // Initialize fusion_completed to false by default
  if (localStorage.getItem('fusion_completed') === null) {
    localStorage.setItem('fusion_completed', 'false')
  }

  // Load institutions store data
  institutionsStore.loadFromLocalStorage()

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

    // Position fusion summary lower on screen
    fusionXY.value = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 150 // Increased from +50 to +150 for consistency
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
  createZoomOverlay({ id: -1, name: 'Historial Transaccional', bankInitials: 'HT' }, rect)

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
  gap: 140px;
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
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  border: 4px solid rgb(97, 40, 120); /* Borde sólido */
  color: rgb(97, 40, 120);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.fusion-initials {
  font-weight: 800;
  font-size: 2rem;
  color: rgb(97, 40, 120); /* Asegurar que las letras HT sean visibles */
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
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), scale 1s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  user-select: none;
  pointer-events: none;
  min-width: 180px;
  flex: 0 0 auto;
}

/* Smooth lifting animation for banks during fusion */
.bank-item.lifting-up {
  transform: translateY(-300px) scale(1) !important;
  transition: transform 2.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
  opacity: 1 !important;
  animation: none !important; /* Override any existing animations */
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
  backdrop-filter: blur(10px);
  animation: logoBreath 6s ease-in-out infinite;
}

/* Fondos de colores suaves para cada banco - completamente estáticos */
.bank-item[data-bank-id="1"] .bank-logo {
  background: linear-gradient(135deg, rgba(29, 78, 216, 0.25), rgba(29, 78, 216, 0.12)) !important;
}

.bank-item[data-bank-id="2"] .bank-logo {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.25), rgba(220, 38, 38, 0.12)) !important;
}

.bank-item[data-bank-id="3"] .bank-logo {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.25), rgba(5, 150, 105, 0.12)) !important;
}

/* Fondo por defecto para cualquier otro banco */
.bank-logo {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.25), rgba(156, 163, 175, 0.12)) !important;
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

/* Data transfer animation styles */
.data-particle {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
}

/* Bank data transfer states */
.bank-item.transferring-data {
  position: relative;
}

.bank-item.transferring-data::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  transform: translate(-50%, -50%) rotate(45deg);
  animation: dataFlow 1.5s ease-in-out infinite;
  z-index: 10;
}

@keyframes dataFlow {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(45deg) scaleX(0);
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(45deg) scaleX(1);
  }

  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(45deg) scaleX(0);
  }
}

/* HT positioning during data transfer */
.fusion-summary.data-transfer-mode {
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fusion-summary.data-transfer-mode .fusion-logo {
  animation: htPulse 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(97, 40, 120, 0.4);
}

@keyframes htPulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(97, 40, 120, 0.4);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(97, 40, 120, 0.6);
  }
}

/* Bank emptying animation */
.bank-item.emptying {
  position: relative;
}

.bank-item.emptying .bank-logo {
  animation: bankEmptying 3s ease-out forwards;
}

@keyframes bankEmptying {
  0% {
    filter: brightness(1) saturate(1);
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  25% {
    filter: brightness(0.9) saturate(0.8);
    transform: scale(0.98);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }

  50% {
    filter: brightness(0.7) saturate(0.5);
    transform: scale(0.95);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }

  75% {
    filter: brightness(0.5) saturate(0.2) grayscale(0.5);
    transform: scale(0.92);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  100% {
    filter: brightness(0.4) saturate(0.1) grayscale(1);
    transform: scale(0.88);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
}

/* 🚀 ESTILOS PARA ICONOS FLOTANTES DE DINERO Y ESTADÍSTICAS */

/* Iconos flotantes base */
.floating-money-icon {
  position: fixed;
  pointer-events: none;
  animation: floatGently 2s ease-in-out infinite;
}

/* Tipos específicos de iconos de categorías de gasto */
.floating-food {
  background: linear-gradient(135deg, #fef3c7, #f59e0b);
  border-color: #f59e0b;
}

.floating-entertainment {
  background: linear-gradient(135deg, #fce7f3, #ec4899);
  border-color: #ec4899;
}

.floating-transport {
  background: linear-gradient(135deg, #e0e7ff, #6366f1);
  border-color: #6366f1;
}

.floating-shopping {
  background: linear-gradient(135deg, #f3e8ff, #8b5cf6);
  border-color: #8b5cf6;
}

.floating-services {
  background: linear-gradient(135deg, #dcfce7, #16a34a);
  border-color: #16a34a;
}

.floating-chip {
  background: linear-gradient(135deg, #f1f5f9, #cbd5e1);
  border-color: #64748b;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  color: #334155;
  min-width: 60px;
  text-align: center;
}

@keyframes floatGently {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  25% {
    transform: translateY(-5px) rotate(2deg);
  }

  50% {
    transform: translateY(-3px) rotate(-1deg);
  }

  75% {
    transform: translateY(-7px) rotate(1deg);
  }
}

/* Efecto de respiración para el globo HT */
.balloon-breathing {
  animation: balloonBreath 3s ease-in-out infinite !important;
}

@keyframes balloonBreath {

  0%,
  100% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.02);
  }

  50% {
    transform: scale(1.05);
  }

  75% {
    transform: scale(1.03);
  }
}

/* Pulsadores de bancos */
.bank-data-pulser {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
}

@keyframes pulseGrow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.4);
    opacity: 0.4;
  }

  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

.bank-data-pulser.active {
  animation: pulseGrow 1.5s ease-out infinite, pulseColor 2s ease-in-out infinite;
}

@keyframes pulseColor {

  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.6) saturate(1.3);
  }
}

/* Puntos de datos fluyendo */
.flowing-data-point {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  animation: dataPointPulse 0.8s ease-in-out infinite;
}

@keyframes dataPointPulse {

  0%,
  100% {
    filter: brightness(1);
    transform: scale(1);
  }

  50% {
    filter: brightness(1.5);
    transform: scale(1.2);
  }
}

/* Explosión de convergencia */
.convergence-explosion {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
}

@keyframes convergenceBlast {
  0% {
    transform: scale(0.5);
    opacity: 0;
    border-width: 8px;
    filter: brightness(1);
  }

  30% {
    transform: scale(1.2);
    opacity: 1;
    border-width: 6px;
    filter: brightness(1.5) drop-shadow(0 0 20px rgba(97, 40, 120, 0.8));
  }

  60% {
    transform: scale(2);
    opacity: 0.8;
    border-width: 4px;
    filter: brightness(1.8) drop-shadow(0 0 40px rgba(97, 40, 120, 0.6));
  }

  100% {
    transform: scale(3.5);
    opacity: 0;
    border-width: 2px;
    filter: brightness(2) drop-shadow(0 0 60px rgba(97, 40, 120, 0.4));
  }
}

/* HT mejorado durante convergencia */
.fusion-summary.data-transfer-mode .fusion-logo {
  animation: htConvergenceReception 2s ease-in-out infinite;
  position: relative;
}

.fusion-summary.data-transfer-mode .fusion-logo::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 3px solid rgba(97, 40, 120, 0.6);
  border-radius: 50%;
  animation: htAura 3s ease-in-out infinite;
}

@keyframes htConvergenceReception {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(97, 40, 120, 0.4);
  }

  50% {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(97, 40, 120, 0.8);
  }
}

@keyframes htAura {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }

  50% {
    transform: scale(1.3);
    opacity: 0.3;
  }

  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* Improved data particles */
.data-particle {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: particleGlow 0.5s ease-in-out infinite alternate;
}

@keyframes particleGlow {
  from {
    filter: brightness(1);
  }

  to {
    filter: brightness(1.3);
  }
}

/* Data connection lines */
.data-connection {
  position: fixed;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  transform-origin: left center;
  pointer-events: none;
  z-index: 9998;
  animation: connectionPulse 1.5s ease-in-out infinite;
}

@keyframes connectionPulse {

  0%,
  100% {
    opacity: 0.6;
    box-shadow: 0 0 4px #3b82f6;
  }

  50% {
    opacity: 1;
    box-shadow: 0 0 8px #3b82f6;
  }
}

/* Animación suave y gradual de desaparición de bancos - como la subida */
.bank-item.fading-out-bank {
  opacity: 0 !important;
  transform: translateY(-400px) scale(0.8) !important; /* Final fade position */
  transition: opacity 2.5s cubic-bezier(0.23, 1, 0.32, 1) !important, transform 2.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
  pointer-events: none !important;
  z-index: -1 !important;
  animation: none !important; /* Override any existing animations */
  visibility: visible !important; /* Ensure visibility during fade */
}

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
</style>
