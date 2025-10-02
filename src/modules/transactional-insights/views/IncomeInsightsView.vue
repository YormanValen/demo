<template>
  <div class="income-insights-container">
    <!-- Animated background elements -->
    <div class="background-elements">
      <div class="floating-element number">💰</div>
      <div class="floating-element number">📊</div>
      <div class="floating-element number">💸</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">INCOME INSIGHTS</h1>
      <p class="subtitle">Visión holística de la frecuencia, riesgo y consumo de los ingresos.</p>
      <div class="description-container">
        <p class="description-text">Análisis integral de patrones de ingresos y comportamiento financiero</p>
        <p class="description-text highlight">Evaluación de frecuencia, estabilidad y correlación con gastos</p>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Comparison Table Section -->
      <div class="comparison-section" :class="{ 'visible': showTable }">
        <h3 class="comparison-title">Comparación de Perfiles</h3>
        <div class="table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="variable-header">Variable</th>
                <th class="user-header camilo-header">
                  <div class="user-info">
                    <div class="user-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                    <span>Camilo</span>
                    <div class="rating" :class="{ 'visible': showStars }">
                      <span class="star filled">★</span>
                      <span class="star">★</span>
                      <span class="star">★</span>
                    </div>
                  </div>
                </th>
                <th class="user-header jose-header">
                  <div class="user-info">
                    <div class="user-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                    <span>José</span>
                    <div class="rating" :class="{ 'visible': showStars }">
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                      <span class="star filled">★</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in tableData" :key="index" :class="{ 'visible': visibleRows.has(index) }">
                <td class="variable-cell" :class="{ 'visible': visibleVariables.has(index) }">{{ row.variable }}</td>
                <td class="data-cell camilo-cell" :class="{ 'visible': visibleCamiloData.has(index) }">{{ row.camilo }}</td>
                <td class="data-cell jose-cell" :class="{ 'visible': visibleJoseData.has(index) }">{{ row.jose }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="button-container" :class="{ 'visible': showButton }">
      <button class="back-button" @click="goBack">
        ← Volver al Menú
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
const showContent = ref(false)
const showTable = ref(false)
const showStars = ref(false)
const showButton = ref(false)
const visibleRows = ref<Set<number>>(new Set())
const visibleVariables = ref<Set<number>>(new Set())
const visibleCamiloData = ref<Set<number>>(new Set())
const visibleJoseData = ref<Set<number>>(new Set())

// Table data
const tableData = ref([
  {
    variable: 'Promedio de los ingresos totales últimos 6 meses',
    camilo: '$ 7.675.549',
    jose: '$ 12.540.832'
  },
  {
    variable: 'Promedio de los ingresos totales últimos 6 meses, descontando meses sin ingresos',
    camilo: '$ 6.270.416',
    jose: '$ 12.540.832'
  },
  {
    variable: 'Volatilidad del ingreso',
    camilo: '$ 2.241.192',
    jose: '$ 897.029'
  },
  {
    variable: 'Índice de estabilidad de ingreso',
    camilo: '58%',
    jose: '100%'
  },
  {
    variable: 'Número promedio de días hasta gastar el 100% de los ingresos principales',
    camilo: '16.0',
    jose: '12.0'
  },
  {
    variable: 'Número promedio de días hasta gastar el 50% de los ingresos principales',
    camilo: '5.3',
    jose: '4.5'
  },
  {
    variable: '% de los ingresos por juegos de azar en los últimos 6 meses',
    camilo: '10%',
    jose: '0%'
  },
  {
    variable: '% de los ingresos de arriendo en los últimos 6 meses',
    camilo: '10%',
    jose: '0%'
  },
  {
    variable: '% de ingresos por préstamos en los últimos 6 meses',
    camilo: '10%',
    jose: '100%'
  },
  {
    variable: '% de los ingresos principales en los últimos 6 meses',
    camilo: '50%',
    jose: '100%'
  },
  {
    variable: '¿Los ingresos totales son superiores a los gastos totales en los últimos 6 meses?',
    camilo: 'NO',
    jose: 'SI'
  },
  {
    variable: '¿Los ingresos con fuentes confiables representan más el 80% de los ingresos?',
    camilo: 'NO',
    jose: 'SI'
  }
])

// Animation functions
const showVariablesSequentially = async () => {
  return new Promise<void>((resolve) => {
    const showNextVariable = (index: number) => {
      if (index >= tableData.value.length) {
        resolve()
        return
      }
      
      visibleRows.value.add(index)
      visibleVariables.value.add(index)
      
      setTimeout(() => {
        showNextVariable(index + 1)
      }, 150)
    }
    
    showNextVariable(0)
  })
}

const showCamiloDataSequentially = async () => {
  return new Promise<void>((resolve) => {
    const showNextData = (index: number) => {
      if (index >= tableData.value.length) {
        resolve()
        return
      }
      
      visibleCamiloData.value.add(index)
      
      setTimeout(() => {
        showNextData(index + 1)
      }, 100)
    }
    
    showNextData(0)
  })
}

const showJoseDataSequentially = async () => {
  return new Promise<void>((resolve) => {
    const showNextData = (index: number) => {
      if (index >= tableData.value.length) {
        resolve()
        return
      }
      
      visibleJoseData.value.add(index)
      
      setTimeout(() => {
        showNextData(index + 1)
      }, 100)
    }
    
    showNextData(0)
  })
}

// Start animations
const startAnimations = async () => {
  return new Promise<void>((resolve) => {
    // 1. Mostrar título
    showTitle.value = true
    
    setTimeout(() => {
      // 2. Mostrar tabla con headers (Camilo y José sin estrellas)
      showContent.value = true
      setTimeout(() => {
        showTable.value = true
        setTimeout(async () => {
          // 3. Mostrar variables secuencialmente
          await showVariablesSequentially()
          
          setTimeout(async () => {
            // 4. Mostrar datos de Camilo secuencialmente
            await showCamiloDataSequentially()
            
            setTimeout(async () => {
              // 5. Mostrar datos de José secuencialmente
              await showJoseDataSequentially()
              
              // 6. Cuando todos los datos estén listos, mostrar estrellas
              setTimeout(() => {
                showStars.value = true
                
                setTimeout(() => {
                  showButton.value = true
                  resolve()
                }, 600)
              }, 300)
            }, 200)
          }, 300)
        }, 400)
      }, 400)
    }, 800)
  })
}

// Navigation
const goBack = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Start animations on mount
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    startAnimations()
  }, 300)
})
</script>

<style scoped>
.income-insights-container {
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
  0%, 100% {
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

/* Main Content */
.main-content {
  width: 100%;
  max-width: 1200px;
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


/* Comparison Table Section */
.comparison-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 50px;
}

.comparison-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.comparison-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 30px 0;
  text-align: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.table-container {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.comparison-table thead tr {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.variable-header {
  background: linear-gradient(135deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  min-width: 300px;
}

.user-header {
  padding: 15px 12px;
  text-align: center;
  font-weight: 600;
}

.camilo-header {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
}

.jose-header {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.rating {
  display: flex;
  gap: 2px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.rating.visible {
  opacity: 1;
  transform: translateY(0);
}

.star {
  font-size: 14px;
  color: rgba(107, 114, 128, 0.7);
}

.star.filled {
  color: rgba(186, 45, 125, 0.8);
}

.comparison-table tbody tr {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.comparison-table tbody tr.visible {
  opacity: 1;
  transform: translateX(0);
}

.comparison-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

.comparison-table tbody tr:hover {
  background: #f1f5f9;
  transform: translateX(5px);
}

.variable-cell {
  padding: 12px;
  border-left: 4px solid rgb(186, 45, 125);
  font-weight: 500;
  color: #374151;
  background: white !important;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.variable-cell.visible {
  opacity: 1;
  transform: translateX(0);
}

.data-cell {
  padding: 12px;
  text-align: center;
  font-weight: 600;
  color: #1f2937;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.data-cell.visible {
  opacity: 1;
  transform: translateY(0);
}

.camilo-cell {
  border-left: 3px solid #6b7280;
}

.jose-cell {
  border-left: 3px solid #6b7280;
}


/* Button */
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

.back-button {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  border-color: rgb(186, 45, 125);
  color: rgb(186, 45, 125);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .income-insights-container {
    padding: 30px 15px 15px;
  }
  
  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .comparison-title {
    font-size: 1.7rem;
  }
  
  .table-container {
    padding: 15px;
  }
  
  .comparison-table {
    font-size: 0.85rem;
  }
  
  .variable-header {
    min-width: 250px;
    padding: 12px 10px;
  }
  
  .user-header {
    padding: 12px 8px;
  }
  
  .user-avatar {
    width: 30px;
    height: 30px;
  }
  
  .variable-cell {
    padding: 10px 8px;
  }
  
  .data-cell {
    padding: 10px 6px;
  }
}

@media (max-width: 480px) {
  .income-insights-container {
    padding: 20px 10px 15px;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
  
  .comparison-title {
    font-size: 1.5rem;
  }
  
  .table-container {
    padding: 10px;
  }
  
  .comparison-table {
    font-size: 0.8rem;
  }
  
  .variable-header {
    min-width: 200px;
    padding: 10px 8px;
    font-size: 0.85rem;
  }
  
  .user-header {
    padding: 10px 6px;
  }
  
  .user-info {
    gap: 6px;
  }
  
  .user-avatar {
    width: 25px;
    height: 25px;
  }
  
  .user-avatar svg {
    width: 16px;
    height: 16px;
  }
  
  .star {
    font-size: 12px;
  }
  
  .star.filled {
    color: rgba(186, 45, 125, 0.7);
  }
  
  .variable-cell {
    padding: 8px 6px;
    font-size: 0.8rem;
  }
  
  .data-cell {
    padding: 8px 4px;
    font-size: 0.8rem;
  }
}
</style>