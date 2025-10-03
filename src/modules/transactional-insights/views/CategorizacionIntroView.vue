<template>
  <div class="categorizacion-intro-container">
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
      <h1 class="main-title">Categorización</h1>
      <p class="subtitle">Descubra las categorías de cada transacción de gastos e ingresos</p>
      <div class="description-container">
        <div class="description-card">
          <ul class="description-list">
            <li class="description-text">Se basa en la información proporcionada por la transacción.</li>
            <li class="description-text">Ofrecemos 129 categorías: 107 orientadas a gastos y 22 a ingresos</li>
            <li class="description-text">Precisión de clase mundial</li>
            <li class="description-text">Modelo de Machine Learning y categorías en constante validación y adaptación a
              los cambios del mercado</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main content with table and categories -->
    <div class="content-layout">
      <!-- Transaction table with floating category chips -->
      <div class="table-section" :class="{ 'visible': showTable }">
        <div class="table-wrapper">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>ID Transacción</th>
                <th>Monto</th>
                <th>Clase Transacción</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in sampleTransactions" :key="index" class="transaction-row"
                :style="{ animationDelay: `${index * 0.1}s` }" :class="{ 'visible': showTransactions }">
                <td class="transaction-code">{{ transaction.code }}</td>
                <td class="transaction-amount" :class="transaction.type">{{ formatCOP(transaction.amount) }}</td>
                <td class="transaction-type" :class="transaction.type">
                  {{ transaction.type === 'credit' ? 'Crédito' : 'Débito' }}
                </td>
                <td class="transaction-description">{{ transaction.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Floating category chips -->
        <div class="category-chips-container">
          <div v-for="(category, index) in sampleCategories" :key="index" class="category-item-wrapper" :style="{
            top: `${index * 46 + 60}px`
          }" :class="{ 'visible': visibleCategoryIndices.has(index) }">
            <div class="arrow-icon">→</div>
            <div class="category-chip">
              <div class="category-text">
                <span class="category-code">{{ category.text.split(':')[0] }}</span>:
                <span class="category-desc">{{ category.text.split(':').slice(1).join(':') }}</span>
              </div>
            </div>
          </div>
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
import { ref, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()


// Animation states
const showTitle = ref(false)
const showTable = ref(false)
const showTransactions = ref(false)
const showButton = ref(false)
const visibleCategoryIndices = ref<Set<number>>(new Set())

// Currency formatter
const currencyCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const formatCOP = (value: number) => {
  return currencyCOP.format(Math.abs(value))
}

// Sample transaction data (22 records)
const sampleTransactions = [
  { code: 'TXN001', type: 'debit', description: 'Compra en supermercado Metro', amount: -45000, date: '2024-03-15' },
  { code: 'TXN002', type: 'credit', description: 'Depósito salario empresa', amount: 2500000, date: '2024-03-14' },
  { code: 'TXN003', type: 'debit', description: 'Pago restaurante La Pampa', amount: -65000, date: '2024-03-13' },
  { code: 'TXN004', type: 'credit', description: 'Transferencia recibida', amount: 150000, date: '2024-03-12' },
  { code: 'TXN005', type: 'debit', description: 'Compra gasolinera Shell', amount: -80000, date: '2024-03-11' },
  { code: 'TXN006', type: 'debit', description: 'Pago farmacia Cruz Verde', amount: -25000, date: '2024-03-10' },
  { code: 'TXN007', type: 'credit', description: 'Bonificación adicional', amount: 300000, date: '2024-03-09' },
  { code: 'TXN008', type: 'debit', description: 'Compra tienda Éxito', amount: -120000, date: '2024-03-08' },
  { code: 'TXN009', type: 'debit', description: 'Pago servicios públicos', amount: -180000, date: '2024-03-07' },
  { code: 'TXN010', type: 'credit', description: 'Devolución compra online', amount: 75000, date: '2024-03-06' },
  { code: 'TXN011', type: 'debit', description: 'Compra ropa Falabella', amount: -200000, date: '2024-03-05' },
  { code: 'TXN012', type: 'debit', description: 'Pago transporte público', amount: -15000, date: '2024-03-04' },
  { code: 'TXN013', type: 'credit', description: 'Intereses cuenta ahorros', amount: 35000, date: '2024-03-03' },
  { code: 'TXN014', type: 'debit', description: 'Compra medicamentos', amount: -40000, date: '2024-03-02' },
  { code: 'TXN015', type: 'debit', description: 'Pago gimnasio mensual', amount: -95000, date: '2024-03-01' },
  { code: 'TXN016', type: 'credit', description: 'Venta producto usado', amount: 50000, date: '2024-02-29' },
  { code: 'TXN017', type: 'debit', description: 'Compra comida rápida', amount: -18000, date: '2024-02-28' },
  { code: 'TXN018', type: 'debit', description: 'Pago telefonía móvil', amount: -55000, date: '2024-02-27' },
  { code: 'TXN019', type: 'credit', description: 'Reembolso seguro', amount: 120000, date: '2024-02-26' },
  { code: 'TXN020', type: 'debit', description: 'Compra libros librería', amount: -30000, date: '2024-02-25' },
  { code: 'TXN021', type: 'credit', description: 'Pago freelance proyecto', amount: 800000, date: '2024-02-24' },
  { code: 'TXN022', type: 'debit', description: 'Compra productos limpieza', amount: -22000, date: '2024-02-23' }
]

// Sample category data
const sampleCategories = [
  { text: 'EXP-ENT-001: Comidas preparadas' },
  { text: 'INC-LAB-001: Salario o nómina' },
  { text: 'EXP-ENT-002: Restaurantes' },
  { text: 'INC-TRA-001: Transferencias' },
  { text: 'EXP-TRA-001: Combustible' },
  { text: 'EXP-SAL-001: Farmacia' },
  { text: 'INC-BON-001: Bonificaciones' },
  { text: 'EXP-COM-001: Supermercado' },
  { text: 'EXP-SER-001: Servicios públicos' },
  { text: 'INC-DEV-001: Devoluciones' },
  { text: 'EXP-VES-001: Ropa y vestido' },
  { text: 'EXP-TRA-002: Transporte' },
  { text: 'INC-INT-001: Intereses' },
  { text: 'EXP-SAL-002: Medicamentos' },
  { text: 'EXP-DEP-001: Deportes' },
  { text: 'INC-VEN-001: Ventas' },
  { text: 'EXP-ENT-003: Comida rápida' },
  { text: 'EXP-TEC-001: Telefonía' },
  { text: 'INC-SEG-001: Seguros' },
  { text: 'EXP-EDU-001: Educación' },
  { text: 'INC-LAB-002: Trabajos independientes' },
  { text: 'EXP-HOG-001: Productos hogar' }
]

// Start title animation
const startTitleAnimation = async () => {
  return new Promise<void>((resolve) => {
    showTitle.value = true
    setTimeout(resolve, 600)
  })
}

// Animate categories one by one sequentially
const animateCategoriesSequentially = async () => {
  return new Promise<void>((resolve) => {
    const animateNextCategory = (index: number) => {
      if (index >= sampleCategories.length) {
        resolve()
        return
      }

      // Add current category to visible set
      visibleCategoryIndices.value.add(index)

      // Wait for animation to complete (800ms) before starting next one
      setTimeout(() => {
        animateNextCategory(index + 1)
      }, 800)
    }

    // Start with first category
    animateNextCategory(0)
  })
}

// Start content animations in sequence
const startContentAnimations = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      showTable.value = true
      setTimeout(() => {
        showTransactions.value = true
        setTimeout(async () => {
          // Start sequential category animations
          await animateCategoriesSequentially()
          setTimeout(() => {
            showButton.value = true
            resolve()
          }, 400)
        }, 1000)
      }, 400)
    }, 500)
  })
}

// Handle continue button click
const handleContinue = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Start animations on mount
onMounted(async () => {
  // Clear localStorage stores when component opens
  localStorage.removeItem('fusion_completed')
  localStorage.removeItem('ti_viewed_banks')

  await nextTick()

  // Wait a moment before starting
  setTimeout(async () => {
    // Start title animation
    await startTitleAnimation()

    // Start content animations
    await startContentAnimations()
  }, 300)
})
</script>

<style scoped>
.categorizacion-intro-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 20px;
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

/* Title at top */
.title-container {
  text-align: center;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
  margin: 0 0 20px 0;
  font-weight: 400;
  line-height: 1.5;
}

.description-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 700px;
  margin: 0 auto;
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
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
}

.description-text {
  font-size: 1rem;
  color: #4b5563;
  text-align: left;
  margin: 12px 0;
  font-weight: 400;
  line-height: 1.6;
}

/* Content layout */
.content-layout {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Table section */
.table-section {
  width: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.table-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e5e7eb;
  width: 70%;
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
  padding: 16px 18px;
  text-align: left;
  border: none;
}


.transaction-row {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInRow 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
  padding: 14px 18px;
  font-size: 0.9rem;
  color: #374151;
  border: none;
  vertical-align: middle;
}

.transaction-code {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #6b7280;
  width: 15%;
  font-size: 0.8rem;
}

.transaction-type {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  width: 20%;
}

.transaction-type.credit {
  color: #059669;
}

.transaction-type.debit {
  color: #dc2626;
}

.transaction-description {
  color: #4b5563;
  width: 45%;
}

.transaction-amount {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  width: 20%;
  text-align: right;
}

.transaction-amount.credit {
  color: #059669;
}

.transaction-amount.debit {
  color: #dc2626;
}

/* Category chips floating to the right */
.category-chips-container {
  position: absolute;
  left: 75%;
  top: 0;
  width: 25%;
  height: 100%;
  pointer-events: none;
}

.category-item-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateX(-50px);
  animation: slideInChip 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-item-wrapper.visible {
  animation-play-state: running;
}

.category-chip {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 14px 16px;
  border-left: 4px solid;
  border-image: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-height: calc(0.9rem + 28px);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex: 1;
}

@keyframes slideInChip {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.arrow-icon {
  font-size: 2rem;
  margin-left: -25px;
  color: #059669;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 1;
}

.category-text {
  font-size: 0.8rem;
  color: #374151;
  line-height: 1.3;
  font-weight: 500;
}

.category-code {
  font-weight: 700;
  color: #1f2937;
}

.category-desc {
  font-weight: 500;
  color: #374151;
}

/* Continue Button */
.button-container {
  text-align: center;
  margin-top: 30px;
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

  .table-wrapper {
    width: 65%;
  }

  .category-chips-container {
    left: 70%;
    width: 30%;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 12px 14px;
    font-size: 0.85rem;
  }

  .category-text {
    font-size: 0.75rem;
  }

  .category-chip {
    padding: 8px 12px;
  }
}

@media (max-width: 768px) {
  .categorizacion-intro-container {
    padding: 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .description-text {
    font-size: 0.9rem;
  }

  .description-text.highlight {
    font-size: 1rem;
  }

  .content-layout {
    gap: 25px;
  }

  .table-wrapper {
    width: 100%;
  }

  .category-chips-container {
    position: relative;
    left: 0;
    width: 100%;
    margin-top: 20px;
  }

  .category-chip {
    position: relative;
    margin-bottom: 10px;
    top: auto !important;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 10px 12px;
    font-size: 0.8rem;
  }

  .category-text {
    font-size: 0.7rem;
  }

  .continue-button {
    padding: 14px 30px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }

  .transactions-table th,
  .transactions-table td {
    padding: 8px 10px;
    font-size: 0.75rem;
  }

  .category-chip {
    padding: 6px 10px;
  }

  .category-text {
    font-size: 0.65rem;
  }

  .continue-button {
    padding: 12px 25px;
    font-size: 1rem;
  }
}
</style>
