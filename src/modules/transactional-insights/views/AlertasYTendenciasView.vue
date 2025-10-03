<template>
  <div class="alertas-tendencias-container">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">📊</div>
      <div class="floating-element number">📈</div>
      <div class="floating-element number">⚠️</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Alertas y Tendencias</h1>
      <p class="subtitle">Detección de tendencias de gastos e ingresos y comportamientos del cliente.</p>
      <div class="description-container">
        <div class="description-card">
          <ul class="description-list">
            <li class="description-text">Análisis avanzado de patrones de comportamiento financiero</li>
            <li class="description-text">Identificación automática de anomalías y cambios significativos</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Analysis Section -->
      <div class="analysis-section">
        <!-- Large Table with Magnifying Glass -->
        <div class="table-analysis-container" :class="{ 'visible': showTable }">
          <div class="large-table">
            <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
              <!-- Table structure -->
              <rect x="20" y="20" width="260" height="160" rx="8" stroke="url(#tableGradient)" stroke-width="3"
                fill="#f8fafc" />
              <!-- Table header -->
              <rect x="20" y="20" width="260" height="30" rx="8" fill="url(#tableGradient)" />
              <!-- Gradient definition -->
              <defs>
                <linearGradient id="tableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                </linearGradient>
              </defs>
              <!-- Grid lines -->
              <line x1="20" y1="60" x2="280" y2="60" stroke="#e5e7eb" stroke-width="1" />
              <line x1="20" y1="80" x2="280" y2="80" stroke="#e5e7eb" stroke-width="1" />
              <line x1="20" y1="100" x2="280" y2="100" stroke="#e5e7eb" stroke-width="1" />
              <line x1="20" y1="120" x2="280" y2="120" stroke="#e5e7eb" stroke-width="1" />
              <line x1="20" y1="140" x2="280" y2="140" stroke="#e5e7eb" stroke-width="1" />
              <line x1="20" y1="160" x2="280" y2="160" stroke="#e5e7eb" stroke-width="1" />

              <line x1="80" y1="20" x2="80" y2="180" stroke="#e5e7eb" stroke-width="1" />
              <line x1="150" y1="20" x2="150" y2="180" stroke="#e5e7eb" stroke-width="1" />
              <line x1="220" y1="20" x2="220" y2="180" stroke="#e5e7eb" stroke-width="1" />

              <!-- Data dots -->
              <circle cx="50" cy="70" r="2" fill="#6b7280" />
              <circle cx="115" cy="70" r="2" fill="#6b7280" />
              <circle cx="185" cy="70" r="2" fill="#6b7280" />
              <circle cx="250" cy="70" r="2" fill="#6b7280" />

              <circle cx="50" cy="90" r="2" fill="#6b7280" />
              <circle cx="115" cy="90" r="2" fill="#6b7280" />
              <circle cx="185" cy="90" r="2" fill="#6b7280" />
              <circle cx="250" cy="90" r="2" fill="#6b7280" />

              <circle cx="50" cy="110" r="2" fill="#6b7280" />
              <circle cx="115" cy="110" r="2" fill="#6b7280" />
              <circle cx="185" cy="110" r="2" fill="#6b7280" />
              <circle cx="250" cy="110" r="2" fill="#6b7280" />

              <circle cx="50" cy="130" r="2" fill="#6b7280" />
              <circle cx="115" cy="130" r="2" fill="#6b7280" />
              <circle cx="185" cy="130" r="2" fill="#6b7280" />
              <circle cx="250" cy="130" r="2" fill="#6b7280" />

              <circle cx="50" cy="150" r="2" fill="#6b7280" />
              <circle cx="115" cy="150" r="2" fill="#6b7280" />
              <circle cx="185" cy="150" r="2" fill="#6b7280" />
              <circle cx="250" cy="150" r="2" fill="#6b7280" />

              <circle cx="50" cy="170" r="2" fill="#6b7280" />
              <circle cx="115" cy="170" r="2" fill="#6b7280" />
              <circle cx="185" cy="170" r="2" fill="#6b7280" />
              <circle cx="250" cy="170" r="2" fill="#6b7280" />
            </svg>

            <!-- Animated Magnifying Glass -->
            <div class="magnifying-glass magnifying-glass-moving" ref="magnifyingGlass">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <!-- Gradient definition -->
                <defs>
                  <linearGradient id="magnifyingGlassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                  </linearGradient>
                </defs>
                <!-- Glass circle -->
                <circle cx="22" cy="22" r="18" stroke="url(#magnifyingGlassGradient)" stroke-width="3"
                  fill="rgba(97, 40, 120, 0.1)" />
                <!-- Handle -->
                <line x1="38" y1="38" x2="52" y2="52" stroke="url(#magnifyingGlassGradient)" stroke-width="3"
                  stroke-linecap="round" />
                <!-- Reflection -->
                <circle cx="18" cy="18" r="3" fill="rgba(255, 255, 255, 0.8)" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Discovery Results -->
        <div class="discovery-results" :class="{ 'visible': showResults }">
          <h3 class="results-title">Hallazgos del Análisis</h3>
          <div class="findings-grid">
            <div v-for="(finding, index) in findings" :key="finding.id" class="finding-item" :class="{
              'visible': visibleFindings.has(index),
              'checked': finding.discovered
            }">
              <div class="checkbox-container">
                <div class="checkbox" :class="{ 'checked': finding.discovered }">
                  <svg v-if="finding.discovered" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20,6 9,17 4,12" stroke="white" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div class="finding-content">
                <div class="finding-title">{{ finding.title }}</div>
                <div class="finding-status" :class="finding.discovered ? 'discovered' : 'investigating'">
                  {{ finding.discovered ? 'Encontrado' : 'No encontrado' }}
                </div>
              </div>
            </div>
          </div>
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

import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
const router = useRouter()

// Refs
const magnifyingGlass = ref<HTMLElement>()

// Animation states
const showTitle = ref(false)
const showContent = ref(false)
const showTable = ref(false)
const showResults = ref(false)
const showButton = ref(false)
const visibleFindings = ref<Set<number>>(new Set())

// Findings data
const findings = ref([
  {
    id: 1,
    title: 'Tiene cobranza',
    discovered: false,
    discoveryTime: 2000
  },
  {
    id: 2,
    title: 'Tiene hipoteca',
    discovered: false,
    discoveryTime: 4000
  },
  {
    id: 3,
    title: 'Hace apuestas',
    discovered: false,
    discoveryTime: 6000
  },
  {
    id: 4,
    title: 'Recibe salario',
    discovered: false,
    discoveryTime: 3000
  },
  {
    id: 5,
    title: 'Recibe subsidios de desempleo',
    discovered: false,
    discoveryTime: 8000
  },
  {
    id: 6,
    title: 'Tiene pensión',
    discovered: false,
    discoveryTime: 7000
  },
  {
    id: 7,
    title: 'Aumento de 25%+ en gastos médicos',
    discovered: false,
    discoveryTime: 5000
  },
  {
    id: 8,
    title: 'Caída de 20%+ de ingresos respecto a hace 6 meses',
    discovered: false,
    discoveryTime: 9000
  }
])

// Animation functions
const startMagnifyingGlassAnimation = () => {
  // Animation is now handled by CSS class
}

const showFindingsSequentially = async () => {
  return new Promise<void>((resolve) => {
    // Show all findings first (unchecked)
    const showNextFinding = (index: number) => {
      if (index >= findings.value.length) {
        // Start discovery process
        startDiscoveryProcess()
        resolve()
        return
      }

      visibleFindings.value.add(index)

      setTimeout(() => {
        showNextFinding(index + 1)
      }, 200)
    }

    showNextFinding(0)
  })
}

const startDiscoveryProcess = () => {
  // Randomly discover some findings (not all)
  const findingsToDiscover = [0, 3, 1, 6, 2] // Indices of findings to discover

  findingsToDiscover.forEach((findingIndex, order) => {
    setTimeout(() => {
      if (findings.value[findingIndex]) {
        findings.value[findingIndex].discovered = true
      }
    }, findings.value[findingIndex]?.discoveryTime || (order + 1) * 2000)
  })
}

// Start animations
const startAnimations = async () => {
  return new Promise<void>((resolve) => {
    showTitle.value = true

    setTimeout(() => {
      showContent.value = true
      setTimeout(() => {
        showTable.value = true
        startMagnifyingGlassAnimation()

        setTimeout(() => {
          showResults.value = true
          setTimeout(async () => {
            await showFindingsSequentially()
            showButton.value = true
            resolve()
          }, 400)
        }, 1000)
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
.alertas-tendencias-container {
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
  margin: 8px 0;
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
}

/* Main Content */
.main-content {
  width: 100%;
  max-width: 1400px;
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

/* Analysis Section */
.analysis-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 40px;
}

/* Table Analysis Container */
.table-analysis-container {
  position: relative;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.table-analysis-container.visible {
  opacity: 1;
  transform: scale(1);
}

.large-table {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.magnifying-glass {
  position: absolute;
  top: 40px;
  left: 30px;
  z-index: 10;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.magnifying-glass-moving {
  animation: magnifyingGlassMove 12s ease-in-out infinite;
}

@keyframes magnifyingGlassMove {
  0% {
    transform: translate(30px, 30px) rotate(-10deg);
  }

  8.33% {
    transform: translate(80px, 35px) rotate(5deg);
  }

  16.66% {
    transform: translate(130px, 40px) rotate(-5deg);
  }

  25% {
    transform: translate(180px, 45px) rotate(10deg);
  }

  33.33% {
    transform: translate(160px, 70px) rotate(-8deg);
  }

  41.66% {
    transform: translate(110px, 80px) rotate(3deg);
  }

  50% {
    transform: translate(60px, 90px) rotate(-12deg);
  }

  58.33% {
    transform: translate(40px, 100px) rotate(8deg);
  }

  66.66% {
    transform: translate(90px, 110px) rotate(-6deg);
  }

  75% {
    transform: translate(140px, 120px) rotate(12deg);
  }

  83.33% {
    transform: translate(190px, 115px) rotate(-4deg);
  }

  91.66% {
    transform: translate(120px, 85px) rotate(7deg);
  }

  100% {
    transform: translate(30px, 30px) rotate(-10deg);
  }
}

/* Discovery Results */
.discovery-results {
  width: 100%;
  max-width: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.discovery-results.visible {
  opacity: 1;
  transform: translateY(0);
}

.results-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 30px 0;
  text-align: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.findings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 15px;
}

.finding-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.finding-item.visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.finding-item.checked {
  border-color: rgb(186, 45, 125);
  background: white;
}

.checkbox-container {
  flex-shrink: 0;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.checkbox.checked {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
  border-color: rgb(186, 45, 125);
  animation: checkboxPulse 0.6s ease;
}

@keyframes checkboxPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.finding-content {
  flex: 1;
}

.finding-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 5px 0;
  line-height: 1.3;
}

.finding-status {
  font-size: 0.9rem;
  font-weight: 500;
}

.finding-status.discovered {
  color: rgb(186, 45, 125);
}

.finding-status.investigating {
  color: #16a34a;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
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

  .large-table svg {
    width: 250px;
    height: 160px;
  }

  .findings-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .alertas-tendencias-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .analysis-section {
    gap: 30px;
  }

  .large-table svg {
    width: 200px;
    height: 130px;
  }

  .magnifying-glass svg {
    width: 50px;
    height: 50px;
  }

  .findings-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .finding-item {
    padding: 15px;
  }

  .results-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .alertas-tendencias-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .large-table svg {
    width: 160px;
    height: 100px;
  }

  .magnifying-glass svg {
    width: 40px;
    height: 40px;
  }

  @keyframes magnifyingGlassMove {
    0% {
      transform: translate(15px, 15px) rotate(-10deg);
    }

    8.33% {
      transform: translate(40px, 18px) rotate(5deg);
    }

    16.66% {
      transform: translate(65px, 22px) rotate(-5deg);
    }

    25% {
      transform: translate(90px, 25px) rotate(10deg);
    }

    33.33% {
      transform: translate(80px, 40px) rotate(-8deg);
    }

    41.66% {
      transform: translate(55px, 45px) rotate(3deg);
    }

    50% {
      transform: translate(30px, 50px) rotate(-12deg);
    }

    58.33% {
      transform: translate(20px, 60px) rotate(8deg);
    }

    66.66% {
      transform: translate(45px, 65px) rotate(-6deg);
    }

    75% {
      transform: translate(70px, 70px) rotate(12deg);
    }

    83.33% {
      transform: translate(95px, 68px) rotate(-4deg);
    }

    91.66% {
      transform: translate(60px, 50px) rotate(7deg);
    }

    100% {
      transform: translate(15px, 15px) rotate(-10deg);
    }
  }

  .finding-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .checkbox-container {
    align-self: flex-start;
  }
}
</style>
