<template>
  <div class="categorizacion-intro-container">
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
      <h1 class="main-title">Categorización</h1>
      <p class="subtitle">Descubra las categorías de cada transacción de gastos e ingresos</p>
    </div>

    <!-- Main content with table and categories -->
    <div class="content-layout">
      <!-- Transaction table with floating category chips -->
      <div class="table-section" :class="{ 'visible': showTable }">
        <div class="table-wrapper">
          <table class="transactions-table">
            <thead>
              <tr>
                <th>Clase Transacción</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(transaction, index) in sampleTransactions" 
                :key="index"
                class="transaction-row"
                :style="{ animationDelay: `${index * 0.1}s` }"
                :class="{ 'visible': showTransactions }"
              >
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
          <div 
            v-for="(category, index) in sampleCategories" 
            :key="index"
            class="category-chip"
            :style="{ 
              top: `${index * 46 + 60}px`
            }"
            :class="{ 'visible': visibleCategoryIndices.has(index) }"
          >
            <div class="category-text">{{ category.text }}</div>
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
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showTitle = ref(false)
const showTable = ref(false)
const showTransactions = ref(false)
const showCategories = ref(false)
const showButton = ref(false)
const visibleCategoryIndices = ref<Set<number>>(new Set())

// Sample transaction data (20 records)
const sampleTransactions = [
  { type: 'debit', description: 'Compra en supermercado Metro' },
  { type: 'credit', description: 'Depósito salario empresa' },
  { type: 'debit', description: 'Pago restaurante La Pampa' },
  { type: 'credit', description: 'Transferencia recibida' },
  { type: 'debit', description: 'Compra gasolinera Shell' },
  { type: 'debit', description: 'Pago farmacia Cruz Verde' },
  { type: 'credit', description: 'Bonificación adicional' },
  { type: 'debit', description: 'Compra tienda Éxito' },
  { type: 'debit', description: 'Pago servicios públicos' },
  { type: 'credit', description: 'Devolución compra online' },
  { type: 'debit', description: 'Compra ropa Falabella' },
  { type: 'debit', description: 'Pago transporte público' },
  { type: 'credit', description: 'Intereses cuenta ahorros' },
  { type: 'debit', description: 'Compra medicamentos' },
  { type: 'debit', description: 'Pago gimnasio mensual' },
  { type: 'credit', description: 'Venta producto usado' },
  { type: 'debit', description: 'Compra comida rápida' },
  { type: 'debit', description: 'Pago telefonía móvil' },
  { type: 'credit', description: 'Reembolso seguro' },
  { type: 'debit', description: 'Compra libros librería' }
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
  { text: 'EXP-EDU-001: Educación' }
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
  // Navigate to next view (to be determined)
  console.log('Navigating to next categorization view...')
  // router.push({ name: 'next-view-name' })
}

// Start animations on mount
onMounted(async () => {
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
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
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
  width: 60%;
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

.transaction-type {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  width: 30%;
}

.transaction-type.credit {
  color: #059669;
}

.transaction-type.debit {
  color: #dc2626;
}

.transaction-description {
  color: #4b5563;
  width: 70%;
}

/* Category chips floating to the right */
.category-chips-container {
  position: absolute;
  left: 65%;
  top: 0;
  width: 35%;
  height: 100%;
  pointer-events: none;
}

.category-chip {
  position: absolute;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateX(-50px);
  animation: slideInChip 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-play-state: paused;
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
}

.category-chip.visible {
  animation-play-state: running;
}

@keyframes slideInChip {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.category-text {
  font-size: 0.8rem;
  color: #374151;
  line-height: 1.3;
  font-weight: 500;
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
    width: 55%;
  }
  
  .category-chips-container {
    left: 60%;
    width: 40%;
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