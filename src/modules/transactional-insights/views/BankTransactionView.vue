<template>
  <div ref="rootContainer" class="bank-transaction-container" :class="[{ revealing: reveal.active, expand: reveal.expand, exiting }]" :style="revealStyle">
    <!-- Animated background elements (minimal) -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">42%</div>
      <div class="floating-element number">1.2M</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Zoom overlay removed; animation now occurs in selection view -->

    <!-- Final header layout -->
    <div class="final-header" :class="{ 'visible': showFinalHeader }" v-if="isBankLoaded && selectedBank">
      <div class="bank-logo-header" :style="{ backgroundColor: selectedBank.bankColor }">
        <img 
          v-if="selectedBank.logo" 
          :src="selectedBank.logo" 
          :alt="selectedBank.name" 
          class="bank-logo-image-header"
        />
        <span v-else class="bank-initials-header">{{ selectedBank.bankInitials }}</span>
      </div>
      <h1 class="bank-title">{{ selectedBank.name }}</h1>
      <p class="bank-subtitle">Análisis Transaccional</p>
    </div>

    <!-- Transactions Table -->
    <div class="table-container" :class="{ 'visible': showTable }">
      <div class="table-header">
        <h2 class="table-title">Historial de Transacciones</h2>
        <p class="table-subtitle">Transacciones registradas</p>
      </div>

      <div class="table-wrapper">
        <table class="transactions-table">
          <thead>
            <tr>
              <th>ID Transacción</th>
              <th>Fecha Transacción</th>
              <th>Monto Transacción</th>
              <th>Clase Transacción</th>
              <th>Descripción Transacción</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(transaction, index) in transactions" 
              :key="transaction.id"
              class="transaction-row"
              :style="{ animationDelay: `${index * 0.1}s` }"
              :class="{ 'visible': showTransactions }"
            >
              <td class="transaction-id">{{ transaction.id }}</td>
              <td class="transaction-date">{{ transaction.date }}</td>
              <td class="transaction-amount" :class="amountClass(transaction.amount)">
                {{ formatCOP(transaction.amount) }}
              </td>
              <td class="transaction-class">
                <span class="transaction-badge" :class="transaction.class">
                  {{ transaction.className }}
                </span>
              </td>
              <td class="transaction-description">{{ transaction.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Fictitious Pagination -->
      <div class="pagination-container" :class="{ 'visible': showTable }">
        <div class="pagination-info">
          <span class="pagination-text">Mostrando 1-10 de 147 transacciones</span>
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Anterior
          </button>
          
          <div class="pagination-numbers">
            <button class="pagination-number active">1</button>
            <button class="pagination-number">2</button>
            <button class="pagination-number">3</button>
            <span class="pagination-dots">...</span>
            <button class="pagination-number">15</button>
          </div>
          
          <button class="pagination-btn">
            Siguiente
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
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
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRoute, useRouter } from 'vue-router'
import { useInstitutionsStore } from '@/modules/financial/stores/institutions.store'
import { useTxStore } from '@/modules/transactional-insights/stores/transactions.store'
// Logo imports
import neodigiBankLogo from '@/assets/logos/neodigi-bank-logo.png'
import tekcreditLogo from '@/assets/logos/tekcredit-logo.png'
import flexfiniaLogo from '@/assets/logos/flexfinia-logo.png'

// Router and route
const route = useRoute()
const router = useRouter()

// Stores
const institutionsStore = useInstitutionsStore()
const txStore = useTxStore()

// Animation states
const showFinalHeader = ref(false)
const showTable = ref(false)
const showTransactions = ref(false)
const showButton = ref(false)
const isBankLoaded = ref(false)
const bankDataReady = ref(false)
// Removed: showNeodigiReference (handled in previous view)

// Reveal animation from previous view coordinates
const rootContainer = ref<HTMLElement | null>(null)
const reveal = ref<{ active: boolean; expand: boolean; x: number; y: number }>({ active: false, expand: false, x: 0, y: 0 })
const exiting = ref(false)
const revealStyle = computed(() => {
  if (!reveal.value.active) return {}
  return {
    '--reveal-x': reveal.value.x + 'px',
    '--reveal-y': reveal.value.y + 'px'
  } as Record<string, string>
})

// Default banks data (same as in BankSelectionAnimationView)
const defaultBanks = [
  {
    id: 1,
    name: 'Neodigi Bank',
    logo: '/src/assets/logos/neodigi-bank-logo.png',
    bankInitials: 'ND',
    bankColor: '#1d4ed8',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  },
  {
    id: 3,
    name: 'Flexfinia',
    logo: '/src/assets/logos/flexfinia-logo.png',
    bankInitials: 'FF',
    bankColor: '#dc2626',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  },
  {
    id: 2,
    name: 'TekCredit',
    logo: '/src/assets/logos/tekcredit-logo.png',
    bankInitials: 'TC',
    bankColor: '#059669',
    status: 'CONECTADO',
    connected: true,
    initialDate: '2024-01-01',
    expirationDate: '2024-12-31'
  }
]

// Map bank names to consistent IDs
const mapBankNameToId = (bankName: string): number => {
  const nameMap: Record<string, number> = {
    'Neodigi Bank': 1,
    'TekCredit': 2,
    'Flexfinia': 3
  }
  return nameMap[bankName] || 1 // Default to 1 if bank name not found
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

// Get selected bank (only when data is ready)
const selectedBank = computed(() => {
  // Don't return anything until bank data is confirmed ready
  if (!bankDataReady.value) {
    return null
  }
  
  const bankId = parseInt(route.params.bankId as string) || 1
  const connectedBanks = institutionsStore.connectedInstitutions
  
  let foundBank = null
  
  // First try to find by the original bankId (for backward compatibility)
  if (connectedBanks.length > 0) {
    foundBank = connectedBanks.find(b => b.id === bankId)
  }
  
  // Try default banks with exact ID match if not found in connected banks
  if (!foundBank) {
    foundBank = defaultBanks.find(b => b.id === bankId)
  }
  
  // Only fallback to first bank if no ID was provided (bankId === 1)
  if (!foundBank && bankId === 1) {
    foundBank = connectedBanks[0] || defaultBanks[0]
  }
  
  // If still not found, return first default bank
  if (!foundBank) {
    foundBank = defaultBanks[0]
  }
  
  // Return bank with correct logo mapped by name
  if (foundBank) {
    return {
      ...foundBank,
      logo: getBankLogo(foundBank.name) || foundBank.logo
    }
  }
  
  return foundBank
})

// Removed allBanks - no longer needed

// Watchers to detect bank visibility changes
watch(selectedBank, (newBank, oldBank) => {
  if (newBank) {
    console.log('🏦 BANK CHANGED TO:', newBank.name, '(ID:', newBank.id + ')')
    if (oldBank) {
      console.log('🔄 PREVIOUS BANK WAS:', oldBank.name, '(ID:', oldBank.id + ')')
    }
  } else if (oldBank) {
    console.log('❌ BANK HIDDEN (was:', oldBank.name + ')')
  }
}, { immediate: true })

watch(bankDataReady, (isReady) => {
  console.log('📊 Bank data ready:', isReady)
})

watch(isBankLoaded, (isLoaded) => {
  console.log('🎬 Bank component loaded:', isLoaded)
})

// Transactions from store (credit/debit only)
const transactions = computed(() => {
  if (!selectedBank.value) return []
  
  // Use mapped ID based on bank name for consistent transaction data
  const mappedId = mapBankNameToId(selectedBank.value.name)
  return txStore.byBank(mappedId)
})

// Formateo de montos en pesos colombianos (COP)
const currencyCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const formatCOP = (value: number) => {
  return currencyCOP.format(Math.abs(value))
}
const amountClass = (value: number) => (value >= 0 ? 'credit' : 'debit')

// Simplified animation sequence (no external overlay)
const startAnimations = async () => {
  return new Promise<void>((resolve) => {
    // Header quickly
    setTimeout(() => {
      showFinalHeader.value = true
    }, 150)

    // Table zooms in smoothly
    setTimeout(() => {
      showTable.value = true
    }, 400)

    // Rows + button
    setTimeout(() => {
      showTransactions.value = true
      setTimeout(() => {
        showButton.value = true
        resolve()
      }, 800)
    }, 900)
  })
}

// Guardar coordenadas de entrada para revertir el efecto al volver
let entryRx: number | null = null
let entryRy: number | null = null

// Manejar click en Continuar con animación inversa (cerrar hacia el logo)
const handleContinue = () => {
  // Desvanecer contenido actual para evitar corte abrupto
  exiting.value = true

  // Marcar banco como visto en localStorage
  try {
    const id = (selectedBank.value?.id) as number | undefined
    if (id) {
      const key = 'ti_viewed_banks'
      const raw = localStorage.getItem(key)
      const set = new Set<number>(raw ? (JSON.parse(raw) as number[]) : [])
      set.add(id)
      localStorage.setItem(key, JSON.stringify(Array.from(set)))
    }
  } catch {}

  // Si tenemos coordenadas de entrada, hacer "conceal" hacia ese punto primero con leve retraso tras el fade-out
  if (entryRx != null && entryRy != null && rootContainer.value) {
    const containerEl = rootContainer.value as HTMLElement
    // Capture non-null coordinates for async closure to satisfy TS
    const rx = entryRx as number
    const ry = entryRy as number
    setTimeout(() => {
      const rect = containerEl.getBoundingClientRect()
      reveal.value.x = rx - rect.left
      reveal.value.y = ry - rect.top
      reveal.value.active = true
      reveal.value.expand = true // estado grande
      requestAnimationFrame(() => {
        reveal.value.expand = false // transicionar a círculo 0 en rx,ry
      })
      // Navegar cuando termina el cierre
      setTimeout(() => {
        router.push({ 
          name: 'entity-transactional-insights-bank-selection',
          query: { fromBankTable: 'true' }
        })
        // limpiar estado por seguridad
        setTimeout(() => { reveal.value.active = false; exiting.value = false }, 50)
      }, 900)
    }, 180)
  } else {
    router.push({ 
      name: 'entity-transactional-insights-bank-selection',
      query: { fromBankTable: 'true' }
    })
  }
}

// Start animations on mount
onMounted(async () => {
  // Load institutions from localStorage first
  institutionsStore.loadFromLocalStorage()
  // Load transactions from localStorage, then ensure demo seeds if needed
  txStore.loadFromLocalStorage()
  // Ensure demo transactions exist for connected/default banks using mapped names
  const connectedIds = (institutionsStore.connectedInstitutions.length
    ? institutionsStore.connectedInstitutions.map(b => mapBankNameToId(b.name))
    : [1, 2, 3])
  txStore.ensureSeedFor(connectedIds)
  
  // Wait for the store to be fully updated and DOM to reflect changes
  await nextTick()
  
  // Small delay to ensure data is stable
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Now mark bank data as ready (this enables selectedBank computed)
  bankDataReady.value = true
  
  // Wait for computed to update
  await nextTick()
  
  // Mark bank as loaded to show the component
  isBankLoaded.value = true
  
  // Wait for DOM update
  await nextTick()
  
  // Reveal from coordinates passed via query (rx, ry), relative to viewport
  const rx = parseInt((route.query.rx as string) || '')
  const ry = parseInt((route.query.ry as string) || '')
  const hasReveal = Number.isFinite(rx) && Number.isFinite(ry)

  if (hasReveal && rootContainer.value) {
    const rect = rootContainer.value.getBoundingClientRect()
    reveal.value.x = rx - rect.left
    reveal.value.y = ry - rect.top
    reveal.value.active = true
    await nextTick()
    requestAnimationFrame(() => {
      reveal.value.expand = true
    })
  // Iniciar animaciones internas con leve solapamiento para que la tabla aparezca antes
    setTimeout(() => {
      startAnimations()
    }, 700)
    // Cerrar la revelación un poco después
    setTimeout(() => {
      reveal.value.active = false
      reveal.value.expand = false
    }, 900)
    // almacenar coordenadas de entrada para animación inversa
    entryRx = rx
    entryRy = ry
  } else {
    setTimeout(() => startAnimations(), 50)
  }
})
</script>

<style scoped>
.bank-transaction-container {
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
  opacity: 1;
}

/* reveal desde punto (coordenadas recibidas por query) */
.bank-transaction-container.revealing {
  clip-path: circle(0 at var(--reveal-x) var(--reveal-y));
}

.bank-transaction-container.revealing.expand {
  clip-path: circle(150% at var(--reveal-x) var(--reveal-y));
  transition: clip-path 900ms ease-in-out;
}

/* Exit fade for smoother transition back */
.bank-transaction-container.exiting .final-header,
.bank-transaction-container.exiting .table-container,
.bank-transaction-container.exiting .button-container {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 180ms ease, transform 180ms ease;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Simplified background elements */
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
  opacity: 0.2;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 30s ease-in-out infinite;
  user-select: none;
}

.number:nth-child(1) {
  font-size: 1.5rem;
  top: 10%;
  right: 15%;
  animation-delay: -5s;
}

.number:nth-child(2) {
  font-size: 1.3rem;
  bottom: 15%;
  left: 10%;
  animation-delay: -12s;
}

.data-point:nth-child(3) {
  font-size: 1rem;
  top: 30%;
  left: 5%;
  animation-delay: -8s;
}

.data-point:nth-child(4) {
  font-size: 1rem;
  bottom: 25%;
  right: 5%;
  animation-delay: -15s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-15px) rotate(1deg);
    opacity: 0.3;
  }
}

/* Removed Neodigi overlay (animation now in selection view) */

/* Cleaned up - removed unused animated elements */

/* Final header layout */
.final-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transform: translateY(30px) scale(0.9);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.final-header.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.bank-logo-header {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}

.bank-logo-image-header {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.bank-initials-header {
  color: #374151;
  font-size: 1.8rem;
  font-weight: 700;
}

.bank-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.bank-subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

/* Table Container with Zoom Animation */
.table-container {
  width: 100%;
  max-width: 1200px;
  opacity: 0;
  transform: scale(0.1);
  transform-origin: center center;
  z-index: 10;
  position: relative;
}

.table-container.visible {
  opacity: 1;
  transform: scale(1);
  transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.table-header {
  text-align: center;
  margin-bottom: 30px;
}

.table-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.table-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.table-wrapper {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 16px 12px;
  text-align: left;
  border: none;
}

.transaction-row {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideInRow 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s ease;
}

.transaction-row:hover {
  background-color: #f9fafb;
}

.transaction-row.visible {
  animation-play-state: running;
}

@keyframes slideInRow {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.transactions-table td {
  padding: 16px 12px;
  font-size: 0.9rem;
  color: #374151;
  border: none;
}

.transaction-id {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #4b5563;
}

.transaction-date {
  color: #6b7280;
}

.transaction-amount {
  font-weight: 600;
  font-family: 'Courier New', monospace;
}

.transaction-amount.credit {
  color: #059669;
}

.transaction-amount.debit {
  color: #dc2626;
}

.transaction-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  box-shadow: 0 2px 8px rgba(97, 40, 120, 0.25);
}

.transaction-description {
  color: #4b5563;
}

/* Pagination Styles */
.pagination-container {
  padding: 20px;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
}

.pagination-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.pagination-info {
  color: #6b7280;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.pagination-number {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.pagination-number.active {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border-color: transparent;
}

.pagination-dots {
  color: #9ca3af;
  padding: 0 8px;
  font-weight: bold;
}

/* Continue Button */
.button-container {
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  position: relative;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .bank-transaction-container {
    padding: 30px 15px;
  }
  
  .transactions-table th,
  .transactions-table td {
    padding: 12px 8px;
    font-size: 0.8rem;
  }
  
  .bank-title {
    font-size: 2rem;
  }

  .pagination-container {
    padding: 15px;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .pagination-controls {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .bank-transaction-container {
    padding: 20px 10px;
  }
  
  .table-wrapper {
    overflow-x: auto;
  }
  
  .transactions-table {
    min-width: 600px;
  }
  
  .transactions-table th,
  .transactions-table td {
    padding: 10px 6px;
    font-size: 0.75rem;
  }
  
  .bank-title {
    font-size: 1.8rem;
  }
  
  .bank-logo-header {
    width: 80px;
    height: 80px;
  }
  
  .bank-logo-image-header {
    width: 50px;
    height: 50px;
  }

  .pagination-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .pagination-number {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .pagination-info {
    font-size: 0.8rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .bank-transaction-container {
    padding: 15px 5px;
  }
  
  .bank-title {
    font-size: 1.5rem;
  }
  
  .continue-button {
    padding: 15px 30px;
    font-size: 1.1rem;
  }
}
</style>
