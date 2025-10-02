<template>
  <div ref="rootContainer" class="history-transaction-container" :class="[{ revealing: reveal.active, expand: reveal.expand, exiting }]" :style="revealStyle">
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">42%</div>
      <div class="floating-element number">1.2M</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <div class="final-header" :class="{ 'visible': showFinalHeader }">
      <div class="fusion-logo">
        <span class="fusion-initials">HT</span>
      </div>
      <h1 class="title">Historial transaccional</h1>
      <p class="subtitle">Análisis combinado de transacciones</p>
    </div>

    <div class="table-container" :class="{ 'visible': showTable }">
      <div class="table-header">
        <h2 class="table-title">Historial de Transacciones</h2>
        <p class="table-subtitle">Últimas {{ desiredCount }} transacciones consolidadas</p>
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
            <tr v-for="(transaction, index) in displayTransactions" :key="transaction.id" class="transaction-row" :style="{ animationDelay: `${index * 0.1}s` }" :class="{ 'visible': showTransactions }">
              <td class="transaction-id">{{ transaction.id }}</td>
              <td class="transaction-date">{{ transaction.date }}</td>
              <td class="transaction-amount" :class="amountClass(transaction.amount)">{{ formatCOP(transaction.amount) }}</td>
              <td class="transaction-class">
                <span class="transaction-badge" :class="transaction.class">{{ transaction.className }}</span>
              </td>
              <td class="transaction-description">{{ transaction.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="button-container" :class="{ 'visible': showButton }">
      <button class="continue-button" @click="handleContinue">Continuar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRoute, useRouter } from 'vue-router'
import { useTxStore } from '@/modules/transactional-insights/stores/transactions.store'
import { useInstitutionsStore } from '@/modules/financial/stores/institutions.store'

const route = useRoute()
const router = useRouter()

const showFinalHeader = ref(false)
const showTable = ref(false)
const showTransactions = ref(false)
const showButton = ref(false)

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

const txStore = useTxStore()
const institutionsStore = useInstitutionsStore()

// Map bank names to consistent IDs
const mapBankNameToId = (bankName: string): number => {
  const nameMap: Record<string, number> = {
    'Neodigi Bank': 1,
    'TekCredit': 2,
    'Flexfinia': 3
  }
  return nameMap[bankName] || 1 // Default to 1 if bank name not found
}

const currencyCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const formatCOP = (value: number) => {
  const sign = value > 0 ? '+' : ''
  return sign + currencyCOP.format(Math.abs(value))
}
const amountClass = (value: number) => (value >= 0 ? 'credit' : 'debit')

// Allow 20 or 22 records via query param `count` (defaults to 22)
const desiredCount = computed(() => {
  const raw = parseInt((route.query.count as string) || '')
  return raw === 20 || raw === 22 ? raw : 22
})

const displayTransactions = computed(() => {
  // Get all transactions and sort by bankId first, then by date (newest first)
  const allTransactions = txStore.combined
  const sortedByBank = allTransactions.sort((a, b) => {
    // Primary sort: bankId ascending (1, 2, 3)
    if (a.bankId !== b.bankId) {
      return a.bankId - b.bankId
    }
    // Secondary sort: date descending (newest first within same bank)
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  })
  
  return sortedByBank.slice(0, desiredCount.value)
})

const startAnimations = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => { showFinalHeader.value = true }, 150)
    setTimeout(() => { showTable.value = true }, 400)
    setTimeout(() => {
      showTransactions.value = true
      setTimeout(() => { showButton.value = true; resolve() }, 800)
    }, 900)
  })
}

let entryRx: number | null = null
let entryRy: number | null = null

const handleContinue = () => {
  exiting.value = true
  if (entryRx != null && entryRy != null && rootContainer.value) {
    const containerEl = rootContainer.value as HTMLElement
    const rx = entryRx as number
    const ry = entryRy as number
    setTimeout(() => {
      const rect = containerEl.getBoundingClientRect()
      reveal.value.x = rx - rect.left
      reveal.value.y = ry - rect.top
      reveal.value.active = true
      reveal.value.expand = true
      requestAnimationFrame(() => { reveal.value.expand = false })
      setTimeout(() => {
        router.push({ 
          name: 'entity-transactional-insights-categorizacion-intro',
          query: { fromHistory: 'true' }
        })
        setTimeout(() => { reveal.value.active = false; exiting.value = false }, 50)
      }, 900)
    }, 180)
  } else {
    router.push({ 
      name: 'entity-transactional-insights-categorizacion-intro',
      query: { fromHistory: 'true' }
    })
  }
}

onMounted(async () => {
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 100))

  // reveal desde coordenadas rx,ry
  const rx = parseInt((route.query.rx as string) || '')
  const ry = parseInt((route.query.ry as string) || '')
  const hasReveal = Number.isFinite(rx) && Number.isFinite(ry)
  // Cargar transacciones desde localStorage y asegurar semillas demo básicas
  institutionsStore.loadFromLocalStorage()
  txStore.loadFromLocalStorage()
  
  // Asegurar que exista data para bancos conectados usando nombres mapeados
  const connectedIds = (institutionsStore.connectedInstitutions.length
    ? institutionsStore.connectedInstitutions.map(b => mapBankNameToId(b.name))
    : [1, 2, 3])
  txStore.ensureSeedFor(connectedIds)
  if (hasReveal && rootContainer.value) {
    const rect = rootContainer.value.getBoundingClientRect()
    reveal.value.x = rx - rect.left
    reveal.value.y = ry - rect.top
    reveal.value.active = true
    await nextTick()
    requestAnimationFrame(() => { reveal.value.expand = true })
    setTimeout(() => { startAnimations() }, 700)
    setTimeout(() => { reveal.value.active = false; reveal.value.expand = false }, 900)
    entryRx = rx
    entryRy = ry
  } else {
    setTimeout(() => startAnimations(), 50)
  }
})
</script>

<style scoped>
.history-transaction-container {
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

.history-transaction-container.revealing {
  clip-path: circle(0 at var(--reveal-x) var(--reveal-y));
}

.history-transaction-container.revealing.expand {
  clip-path: circle(150% at var(--reveal-x) var(--reveal-y));
  transition: clip-path 900ms ease-in-out;
}

.history-transaction-container.exiting .final-header,
.history-transaction-container.exiting .table-container,
.history-transaction-container.exiting .button-container {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.background-elements { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.floating-element { position: absolute; opacity: 0.25; color: #6b7280; user-select: none; }
.number { font-size: 1.2rem; font-weight: 700; }
.data-point { font-size: 1.5rem; }

.final-header { display: flex; flex-direction: column; align-items: center; gap: 20px; opacity: 0; transform: translateY(30px) scale(0.9); transition: all 1s cubic-bezier(0.4, 0, 0.2, 1); }
.final-header.visible { opacity: 1; transform: translateY(0) scale(1); }

.fusion-logo { width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%); color: white; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); }
.fusion-initials { font-weight: 800; font-size: 1.8rem; }
.title { font-size: 2.5rem; font-weight: 700; margin: 0; background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-align: center; }
.subtitle { font-size: 1.2rem; color: #6b7280; margin: 0; font-weight: 500; }

.table-container { width: 100%; max-width: 1200px; opacity: 0; transform: scale(0.1); transform-origin: center center; z-index: 10; position: relative; }
.table-container.visible { opacity: 1; transform: scale(1); transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.table-header { text-align: center; margin-bottom: 30px; }
.table-title { font-size: 1.8rem; font-weight: 600; color: #1f2937; margin: 0 0 10px 0; }
.table-subtitle { font-size: 1rem; color: #6b7280; margin: 0; }

.table-wrapper { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid #e5e7eb; }
.transactions-table { width: 100%; border-collapse: collapse; }
.transactions-table th { background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%); color: white; font-weight: 600; font-size: 0.9rem; padding: 16px 12px; text-align: left; border: none; }
.transaction-row { opacity: 0; transform: translateX(-30px); animation: slideInRow 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; animation-play-state: paused; border-bottom: 1px solid #f3f4f6; transition: background-color 0.2s ease; }
.transaction-row:hover { background-color: #f9fafb; }
.transaction-row.visible { animation-play-state: running; }
@keyframes slideInRow { to { opacity: 1; transform: translateX(0); } }
.transactions-table td { padding: 16px 12px; font-size: 0.9rem; color: #374151; border: none; }
.transaction-id { font-family: 'Courier New', monospace; font-weight: 600; color: #4b5563; }
.transaction-date { color: #6b7280; }
.transaction-amount { font-weight: 600; font-family: 'Courier New', monospace; }
.transaction-amount.credit { color: #059669; }
.transaction-amount.debit { color: #dc2626; }
.transaction-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #ffffff; background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%); box-shadow: 0 2px 8px rgba(97, 40, 120, 0.25); }
.transaction-description { color: #4b5563; }

.button-container { margin-top: 40px; opacity: 0; visibility: hidden; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); z-index: 10; position: relative; }
.button-container.visible { opacity: 1; visibility: visible; transform: translateY(0); }
.continue-button { background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%); color: white; border: none; padding: 18px 40px; font-size: 1.3rem; font-weight: 600; border-radius: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(97, 40, 120, 0.3); }
.continue-button:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(97, 40, 120, 0.4); }

@media (max-width: 1024px) {
  .history-transaction-container { padding: 30px 15px; }
  .transactions-table th, .transactions-table td { padding: 12px 8px; font-size: 0.8rem; }
  .title { font-size: 2rem; }
}

@media (max-width: 768px) {
  .history-transaction-container { padding: 20px 10px; }
  .table-wrapper { overflow-x: auto; }
  .transactions-table { min-width: 600px; }
  .transactions-table th, .transactions-table td { padding: 10px 6px; font-size: 0.75rem; }
  .title { font-size: 1.8rem; }
  .fusion-logo { width: 80px; height: 80px; }
}

@media (max-width: 480px) {
  .history-transaction-container { padding: 15px 5px; }
  .title { font-size: 1.5rem; }
  .continue-button { padding: 15px 30px; font-size: 1.1rem; }
}
</style>
