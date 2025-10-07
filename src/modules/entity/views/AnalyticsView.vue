<template>
  <div class="entity-dashboard">
    <div class="dashboard-content">
      <div class="content-header">
        <h1 class="page-title">Tableros de Control</h1>
        <div class="date-range">
          <span>Fecha inicial: 2025-09-01</span>
          <span>Entidad: Su entidad</span>
          <span>Fecha Final: 2025-09-26</span>
        </div>
      </div>
      <div class="analytics-section">
        <h2 class="section-title">Creación de consentimientos</h2>

        <div class="chart-container">
          <div class="pie-chart loading-chart">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                  <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgb(120, 60, 140)" />
                  <stop offset="100%" stop-color="rgb(200, 70, 145)" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgb(140, 80, 160)" />
                  <stop offset="100%" stop-color="rgb(220, 95, 165)" />
                </linearGradient>
              </defs>
              <!-- Pie chart segments -->
              <circle cx="150" cy="150" r="120" fill="none" stroke="url(#gradient1)" stroke-width="60"
                stroke-dasharray="188.4 376.8" stroke-dashoffset="0" transform="rotate(-90 150 150)" />
              <circle cx="150" cy="150" r="120" fill="none" stroke="url(#gradient2)" stroke-width="60"
                stroke-dasharray="113.04 376.8" stroke-dashoffset="-188.4" transform="rotate(-90 150 150)" />
              <circle cx="150" cy="150" r="120" fill="none" stroke="url(#gradient3)" stroke-width="60"
                stroke-dasharray="75.36 376.8" stroke-dashoffset="-301.44" transform="rotate(-90 150 150)" />
            </svg>
            <div class="chart-center">
              <div class="center-text">
                <div class="percentage">50%</div>
                <div class="label">FINALIZADO</div>
              </div>
            </div>
          </div>

          <div class="chart-legend loading-legend">
            <div class="legend-item loading-item">
              <div class="legend-color blue"></div>
              <span>CANCELADO</span>
              <span class="percentage">31.8%</span>
            </div>
            <div class="legend-item loading-item">
              <div class="legend-color red"></div>
              <span>EN PROCESO</span>
              <span class="percentage">18.2%</span>
            </div>
            <div class="legend-item loading-item">
              <div class="legend-color orange"></div>
              <span>FINALIZADO</span>
              <span class="percentage">50%</span>
            </div>
          </div>
        </div>

        <div class="status-definitions">
          <div class="definition-item">
            <span class="status-label canceled">CANCELADO:</span>
            <span>corresponde a las transacciones que se cancelaron y no finalizaron su proceso</span>
          </div>
          <div class="definition-item">
            <span class="status-label processing">PROCESO:</span>
            <span>corresponde a las transacciones que se encuentran en un proceso</span>
          </div>
          <div class="definition-item">
            <span class="status-label completed">FINALIZADO:</span>
            <span>corresponde a las transacciones que se concluyeron de forma exitosa</span>
          </div>
        </div>

      </div>

      <div class="charts-single-column">
        <div class="chart-card modern-card">
          <div class="card-header">
            <h3>Distribución de Consentimientos por Finalidad</h3>
            <p>Categorías de uso de datos financieros</p>
          </div>
          <div class="chart-content">
            <div class="consent-pie-chart">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <defs>
                  <linearGradient id="consentGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                    <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                  </linearGradient>
                  <linearGradient id="consentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(97, 40, 120, 0.8)" />
                    <stop offset="100%" stop-color="rgba(186, 45, 125, 0.8)" />
                  </linearGradient>
                  <linearGradient id="consentGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(97, 40, 120, 0.6)" />
                    <stop offset="100%" stop-color="rgba(186, 45, 125, 0.6)" />
                  </linearGradient>
                  <linearGradient id="consentGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(97, 40, 120, 0.4)" />
                    <stop offset="100%" stop-color="rgba(186, 45, 125, 0.4)" />
                  </linearGradient>
                  <linearGradient id="consentGrad5" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(97, 40, 120, 0.2)" />
                    <stop offset="100%" stop-color="rgba(186, 45, 125, 0.2)" />
                  </linearGradient>
                </defs>
                <!-- Pie chart segments - Open Finance 22.3% (80.28 degrees) -->
                <path d="M 100,100 L 100,20 A 80,80 0 0,1 169.6,54.4 z" 
                      fill="url(#consentGrad1)" stroke="white" stroke-width="2" class="chart-segment" />
                
                <!-- Validación ID 23.8% (85.68 degrees) -->
                <path d="M 100,100 L 169.6,54.4 A 80,80 0 0,1 180,100 L 100,100 z" 
                      fill="url(#consentGrad2)" stroke="white" stroke-width="2" class="chart-segment" />
                
                <!-- Scoring 20.3% (73.08 degrees) -->
                <path d="M 100,100 L 180,100 A 80,80 0 0,1 145.6,165.6 z" 
                      fill="url(#consentGrad3)" stroke="white" stroke-width="2" class="chart-segment" />
                
                <!-- Mercadeo 17.8% (64.08 degrees) -->
                <path d="M 100,100 L 145.6,165.6 A 80,80 0 0,1 54.4,169.6 z" 
                      fill="url(#consentGrad4)" stroke="white" stroke-width="2" class="chart-segment" />
                
                <!-- Otros 15.8% (56.88 degrees) -->
                <path d="M 100,100 L 54.4,169.6 A 80,80 0 0,1 100,20 z" 
                      fill="url(#consentGrad5)" stroke="white" stroke-width="2" class="chart-segment" />
              </svg>
            </div>
            <div class="consent-stats">
              <div class="stat-item">
                <div class="stat-color" style="background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%)">
                </div>
                <div class="stat-info">
                  <span class="stat-label">Open Finance</span>
                  <span class="stat-value">22.3%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-color" style="background: linear-gradient(21deg, rgba(97, 40, 120, 0.8) 0%, rgba(186, 45, 125, 0.8) 100%)"></div>
                <div class="stat-info">
                  <span class="stat-label">Validación ID</span>
                  <span class="stat-value">23.8%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-color" style="background: linear-gradient(21deg, rgba(97, 40, 120, 0.6) 0%, rgba(186, 45, 125, 0.6) 100%)"></div>
                <div class="stat-info">
                  <span class="stat-label">Scoring</span>
                  <span class="stat-value">20.3%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-color" style="background: linear-gradient(21deg, rgba(97, 40, 120, 0.4) 0%, rgba(186, 45, 125, 0.4) 100%)"></div>
                <div class="stat-info">
                  <span class="stat-label">Mercadeo</span>
                  <span class="stat-value">17.8%</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-color" style="background: linear-gradient(21deg, rgba(97, 40, 120, 0.2) 0%, rgba(186, 45, 125, 0.2) 100%)"></div>
                <div class="stat-info">
                  <span class="stat-label">Otros</span>
                  <span class="stat-value">15.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card modern-card">
          <div class="card-header">
            <h3>Ranking de Segmentos con Mayor Riesgo de Revocación</h3>
            <p>Número de revocaciones por segmento</p>
          </div>
          <div class="chart-content">
            <div class="ranking-chart">
              <div class="ranking-bars">
                <div class="ranking-item">
                  <span class="segment-label">Clientes Tradicionales</span>
                  <div class="bar-container">
                    <div class="ranking-bar" style="width: 100%"></div>
                    <span class="bar-value">550</span>
                  </div>
                </div>
                <div class="ranking-item">
                  <span class="segment-label">Clientes Digitales</span>
                  <div class="bar-container">
                    <div class="ranking-bar" style="width: 85%"></div>
                    <span class="bar-value">470</span>
                  </div>
                </div>
                <div class="ranking-item">
                  <span class="segment-label">Adultos</span>
                  <div class="bar-container">
                    <div class="ranking-bar" style="width: 75%"></div>
                    <span class="bar-value">410</span>
                  </div>
                </div>
                <div class="ranking-item">
                  <span class="segment-label">Mayores</span>
                  <div class="bar-container">
                    <div class="ranking-bar" style="width: 60%"></div>
                    <span class="bar-value">330</span>
                  </div>
                </div>
                <div class="ranking-item">
                  <span class="segment-label">Jóvenes</span>
                  <div class="bar-container">
                    <div class="ranking-bar" style="width: 50%"></div>
                    <span class="bar-value">275</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="ranking-scale">
              <span>0</span>
              <span>100</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
              <span>500</span>
              <span>600</span>
            </div>
          </div>
        </div>

        <div class="chart-card modern-card">
          <div class="card-header">
            <h3>Evolución de Consentimientos Activos vs Revocados</h3>
            <p>Número de consentimientos por mes</p>
          </div>
          <div class="chart-content">
            <div class="evolution-chart">
              <div class="chart-legend-small">
                <div class="legend-item-small">
                  <div class="legend-dot active"></div>
                  <span>Activos</span>
                </div>
                <div class="legend-item-small">
                  <div class="legend-dot revoked"></div>
                  <span>Revocados</span>
                </div>
              </div>
              <div class="evolution-svg-container">
                <svg width="300" height="120" viewBox="0 0 300 120">
                  <defs>
                    <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                      <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                    </linearGradient>
                    <linearGradient id="revokedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                      <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                    </linearGradient>
                  </defs>
                  <!-- Activos line (higher values) -->
                  <path d="M 30,20 L 70,15 L 110,18 L 150,12 L 190,16 L 230,10 L 270,8" 
                        fill="none" stroke="url(#activeGrad)" stroke-width="3" class="trend-line" />
                  <!-- Revocados line (lower values) -->
                  <path d="M 30,90 L 70,85 L 110,88 L 150,82 L 190,86 L 230,80 L 270,78" 
                        fill="none" stroke="url(#revokedGrad)" stroke-width="3" class="trend-line" />
                  
                  <!-- Activos points -->
                  <circle cx="30" cy="20" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="70" cy="15" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="110" cy="18" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="150" cy="12" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="190" cy="16" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="230" cy="10" r="4" fill="url(#activeGrad)" class="trend-point" />
                  <circle cx="270" cy="8" r="4" fill="url(#activeGrad)" class="trend-point" />
                  
                  <!-- Revocados points -->
                  <circle cx="30" cy="90" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="70" cy="85" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="110" cy="88" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="150" cy="82" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="190" cy="86" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="230" cy="80" r="4" fill="url(#revokedGrad)" class="trend-point" />
                  <circle cx="270" cy="78" r="4" fill="url(#revokedGrad)" class="trend-point" />
                </svg>
              </div>
              <div class="evolution-timeline">
                <span>2025-02</span>
                <span>2025-03</span>
                <span>2025-04</span>
                <span>2025-05</span>
                <span>2025-06</span>
                <span>2025-07</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- Bottom sheet: Experiencia de Entidad (analytics) -->
    <EntityAnimationContainer 
      :is-visible="true"
      :clickable-header="false"
      :force-open="isEntitySheetOpen"
      @toggle="onEntitySheetToggle"
    >
      <div class="analytics-flow" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; height:100%;">
        <EntityFlowVisualization
          :is-visible="showEntityFlow"
          :steps="analyticsSteps"
          :pre-completed="3"
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
import { ref, computed, onMounted } from 'vue'
import EntityAnimationContainer from '../components/EntityAnimationContainer.vue'
import EntityFlowVisualization from '../components/EntityFlowVisualization.vue'

// Bottom sheet & flow logic (analytics)
const isEntitySheetOpen = ref(false)
const showEntityFlow = computed(() => isEntitySheetOpen.value)
const showEntityNext = ref(false)

// Session storage key for tracking if flow was shown
const ANALYTICS_FLOW_SHOWN_KEY = 'analytics_flow_shown_this_session'

// Check if analytics flow was already shown this session
const hasAnalyticsFlowBeenShown = () => {
  return sessionStorage.getItem(ANALYTICS_FLOW_SHOWN_KEY) === 'true'
}

// Mark analytics flow as shown for this session
const markAnalyticsFlowAsShown = () => {
  sessionStorage.setItem(ANALYTICS_FLOW_SHOWN_KEY, 'true')
}

const analyticsSteps = [
  { title: 'Acceso a la interfaz de entidades', icon: 'mdi-door-open' },
  { title: 'Administrar los consentimientos', icon: 'mdi-clipboard-text-outline' },
  { title: 'Revocación de consentimientos', icon: 'mdi-cancel' },
  { title: 'Tableros de control', icon: 'mdi-view-dashboard-outline' }
]

const onEntityFlowStepChange = (step: number) => {
  if (step < analyticsSteps.length) showEntityNext.value = false
}

const onEntityFlowComplete = () => {
  showEntityNext.value = true
}

const onEntityFlowContinue = () => {
  // Mark flow as shown and close the bottom sheet when user clicks Continuar
  markAnalyticsFlowAsShown()
  isEntitySheetOpen.value = false
}

const onEntitySheetToggle = (open: boolean) => {
  isEntitySheetOpen.value = open
  if (!open) {
    showEntityNext.value = false
    // Mark as shown when user manually closes the sheet
    markAnalyticsFlowAsShown()
  }
}

onMounted(() => {
  // Only show the bottom sheet if it hasn't been shown this session
  if (!hasAnalyticsFlowBeenShown()) {
    isEntitySheetOpen.value = true
  }
})
</script>

<style scoped>
.entity-dashboard {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.content-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.date-range {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #6b7280;
}

.dashboard-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Make the flow a bit wider on Analytics */
.analytics-flow :deep(.flow-container) {
  max-width: 1000px;
}

.analytics-flow :deep(.step-card) {
  min-width: 0; /* allow cards to shrink */
}

@media (max-width: 1024px) {
  .analytics-flow :deep(.step-card) {
    min-width: auto;
  }
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(97, 40, 120, 0.3);
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.4);
}

.fade-slide-up-enter-active { transition: all 0.6s ease-out; }
.fade-slide-up-enter-from { opacity: 0; transform: translateY(12px); }

.analytics-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 30px;
}

.chart-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;
}

.pie-chart {
  position: relative;
  width: 300px;
  height: 300px;
}

.chart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-text .percentage {
  font-size: 36px;
  font-weight: bold;
  color: #1f2937;
}

.center-text .label {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.legend-color.blue {
  background: linear-gradient(21deg, rgb(140, 80, 160) 0%, rgb(220, 95, 165) 100%);
}

.legend-color.red {
  background: linear-gradient(21deg, rgb(120, 60, 140) 0%, rgb(200, 70, 145) 100%);
}

.legend-color.orange {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
}

.legend-item .percentage {
  margin-left: auto;
  font-weight: 600;
  color: #1f2937;
}

.status-definitions {
  background: #dcfce7;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.definition-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.definition-item:last-child {
  margin-bottom: 0;
}

.status-label {
  font-weight: 600;
  min-width: 100px;
}

.status-label.canceled {
  color: rgb(140, 80, 160);
}

.status-label.processing {
  color: rgb(120, 60, 140);
}

.status-label.completed {
  color: rgb(97, 40, 120);
}


.charts-single-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.modern-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(186, 45, 125, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.modern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(186, 45, 125, 0.15);
}

.card-header {
  margin-bottom: 20px;
  text-align: left;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.card-header p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Consent Chart Styles */
.consent-pie-chart {
  display: flex;
  justify-content: center;
}

.consent-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.stat-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.stat-label {
  font-size: 14px;
  color: #374151;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

/* Ranking Chart Styles */
.ranking-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ranking-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.segment-label {
  min-width: 140px;
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.ranking-bar {
  height: 20px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.ranking-bar:hover {
  filter: brightness(1.1);
}

.bar-value {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
  min-width: 30px;
}

.ranking-scale {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
}

/* Evolution Chart Styles */
.evolution-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-legend-small {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.legend-item-small {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.active {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
}

.legend-dot.revoked {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
}

.evolution-svg-container {
  display: flex;
  justify-content: center;
}

.evolution-timeline {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
  padding: 0 15px;
}

/* Expiry Chart Styles */
.expiry-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.expiry-number {
  text-align: center;
}

.big-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.number-label {
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.expiry-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  padding: 12px;
  border-radius: 8px;
}

.detail-item.urgent {
  background: rgba(239, 68, 68, 0.1);
}

.detail-item.warning {
  background: rgba(245, 158, 11, 0.1);
}

.detail-number {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.detail-label {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
}

/* Activity Chart Styles */
.activity-metrics {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.metric-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}

.pulse-dot {
  width: 100%;
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125));
  border-radius: 50%;
}

.success-dot {
  background: #10b981;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.warning-dot {
  background: #f59e0b;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.metric-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.metric-label {
  font-size: 13px;
  color: #6b7280;
}

.activity-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-bars {
  display: flex;
  align-items: end;
  gap: 6px;
  height: 60px;
}

.activity-bar {
  flex: 1;
  background: linear-gradient(to top, rgba(97, 40, 120, 0.7), rgba(186, 45, 125, 0.9));
  border-radius: 2px 2px 0 0;
  min-height: 4px;
}

.activity-timeline {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
}

.chart-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 5px 0;
}

.chart-card p {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.chart-placeholder {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}





@media (max-width: 1024px) {
  .chart-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .date-range {
    flex-direction: column;
    gap: 5px;
  }

  .chart-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .pie-chart {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }


  .chart-type-selector .selector-item {
    flex-direction: column;
    gap: 10px;
  }
}

/* Modern animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
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

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
  }

  50% {
    transform: scale(1.05) rotate(2deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes glow {

  0%,
  100% {
    box-shadow: 0 0 5px rgba(186, 45, 125, 0.2);
  }

  50% {
    box-shadow: 0 0 20px rgba(186, 45, 125, 0.4), 0 0 30px rgba(186, 45, 125, 0.1);
  }
}

@keyframes countUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modern-card {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.modern-card:nth-child(1) {
  animation-delay: 0.1s;
}

.modern-card:nth-child(2) {
  animation-delay: 0.2s;
}

.modern-card:nth-child(3) {
  animation-delay: 0.3s;
}

.modern-card:nth-child(4) {
  animation-delay: 0.4s;
}

.chart-segment {
  animation: popIn 0.8s ease-out;
  animation-fill-mode: both;
}

.chart-segment:nth-child(2) {
  animation-delay: 0.6s;
}

.chart-segment:nth-child(3) {
  animation-delay: 0.8s;
}

.chart-segment:nth-child(4) {
  animation-delay: 1.0s;
}

.chart-segment:nth-child(5) {
  animation-delay: 1.2s;
}

.revenue-bar {
  animation: scaleIn 0.7s ease-out;
  animation-fill-mode: both;
  transform-origin: bottom;
}

.revenue-bar:nth-child(1) {
  animation-delay: 0.7s;
}

.revenue-bar:nth-child(2) {
  animation-delay: 0.8s;
}

.revenue-bar:nth-child(3) {
  animation-delay: 0.9s;
}

.revenue-bar:nth-child(4) {
  animation-delay: 1.0s;
}

.revenue-bar:nth-child(5) {
  animation-delay: 1.1s;
}

.revenue-bar:nth-child(6) {
  animation-delay: 1.2s;
}

.trend-area {
  animation: scaleIn 1s ease-out 0.8s both;
  transform-origin: bottom left;
}

.trend-line {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: drawPath 1.5s ease-out 1s both;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.trend-point {
  animation: popIn 0.4s ease-out both;
}

.trend-point:nth-child(4) {
  animation-delay: 1.3s;
}

.trend-point:nth-child(5) {
  animation-delay: 1.4s;
}

.trend-point:nth-child(6) {
  animation-delay: 1.5s;
}

.trend-point:nth-child(7) {
  animation-delay: 1.6s;
}

.trend-point:nth-child(8) {
  animation-delay: 1.7s;
}

.trend-point:nth-child(9) {
  animation-delay: 1.8s;
}

.big-number {
  animation: countUp 0.8s ease-out 0.5s both;
}

.pulse-dot {
  animation: pulse 2s ease-in-out infinite;
}

.activity-bar {
  animation: scaleIn 0.5s ease-out both;
  transform-origin: bottom;
}

.activity-bar:nth-child(1) {
  animation-delay: 0.9s;
}

.activity-bar:nth-child(2) {
  animation-delay: 1.0s;
}

.activity-bar:nth-child(3) {
  animation-delay: 1.1s;
}

.activity-bar:nth-child(4) {
  animation-delay: 1.2s;
}

.activity-bar:nth-child(5) {
  animation-delay: 1.3s;
}

.activity-bar:nth-child(6) {
  animation-delay: 1.4s;
}

.activity-bar:nth-child(7) {
  animation-delay: 1.5s;
}

.activity-bar:nth-child(8) {
  animation-delay: 1.6s;
}

.stat-item {
  animation: slideInUp 0.5s ease-out both;
}

.stat-item:nth-child(1) {
  animation-delay: 1.4s;
}

.stat-item:nth-child(2) {
  animation-delay: 1.5s;
}

.stat-item:nth-child(3) {
  animation-delay: 1.6s;
}

.stat-item:nth-child(4) {
  animation-delay: 1.7s;
}
</style>
