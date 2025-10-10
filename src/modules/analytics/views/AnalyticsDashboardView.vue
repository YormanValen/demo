<template>
  <div class="analytics-container">
    <!-- Header -->
    <div class="analytics-header">
      <div class="header-content">
        <h1 class="dashboard-title">Analisis de Uso Demo</h1>
        <p class="dashboard-subtitle">Métricas de uso en tiempo real de la plataforma demo</p>
        <div class="session-info">
          <span class="session-label">Sesión actual:</span>
          <span class="session-id">{{ analyticsStore.currentSessionId.slice(-8) }}</span>
          <span class="session-duration">{{ formatDuration(analyticsStore.currentSessionDuration) }}</span>
        </div>
      </div>
      <div class="header-actions">
        <button @click="refreshData" class="refresh-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23 4v6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          Actualizar
        </button>
        <button @click="clearData" class="clear-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Limpiar Datos
        </button>
      </div>
    </div>

    <!-- Overview Cards -->
    <div class="overview-section">
      <div class="metric-card">
        <div class="metric-icon">👥</div>
        <div class="metric-content">
          <h3 class="metric-title">Total Visitas Experiencias</h3>
          <div class="metric-value">{{ analyticsStore.totalExperienceVisits }}</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">📝</div>
        <div class="metric-content">
          <h3 class="metric-title">Formularios Completados</h3>
          <div class="metric-value">{{ analyticsStore.totalFormCompletions }}</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon">🔍</div>
        <div class="metric-content">
          <h3 class="metric-title">Insights Explorados</h3>
          <div class="metric-value">{{ analyticsStore.totalTransactionalInsightVisits }}</div>
        </div>
      </div>

      <div class="metric-card" v-if="mostVisited">
        <div class="metric-icon">⭐</div>
        <div class="metric-content">
          <h3 class="metric-title">Insight Más Visitado</h3>
          <div class="metric-value">{{ formatInsightName(mostVisited.item) }}</div>
          <div class="metric-detail">{{ mostVisited.count }} visitas</div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <!-- Experience Visits Chart -->
      <div class="chart-container">
        <h3 class="chart-title">Selección de Experiencias</h3>
        <div class=" chart-content">
          <div class="bar-chart">
            <div class="bar-item">
              <div class="bar-label">👤 Usuario</div>
              <div class="bar-wrapper">
                <div class="bar"
                  :style="{ width: getPercentage(experienceCounts.usuario, analyticsStore.totalExperienceVisits) + '%' }">
                  <span class="bar-value">{{ experienceCounts.usuario }}</span>
                </div>
              </div>
            </div>
            <div class="bar-item">
              <div class="bar-label">🏢 Entidad</div>
              <div class="bar-wrapper">
                <div class="bar"
                  :style="{ width: getPercentage(experienceCounts.entidad, analyticsStore.totalExperienceVisits) + '%' }">
                  <span class="bar-value">{{ experienceCounts.entidad }}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>

  <!-- Transactional Insights Chart -->
  <div class="full-width-chart">
    <div class="chart-container">
      <h3 class="chart-title">Frecuencia de Uso - Transactional Insights</h3>
      <div class="chart-content">
        <div class="horizontal-bar-chart">
          <div class="bar-item" v-for="(count, insight) in insightCounts" :key="insight">
            <div class="bar-label">{{ formatInsightName(insight) }}</div>
            <div class="bar-wrapper">
              <div class="bar"
                :style="{ width: getPercentage(count, analyticsStore.totalTransactionalInsightVisits) + '%' }">
                <span class="bar-value">{{ count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Data Tables -->
  <div class="tables-section">
    <div class="table-container">
      <h3 class="table-title">Resumen por Categorías</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Métrica</th>
            <th>Cantidad</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">Experiencias</td>
            <td>Usuario</td>
            <td>{{ experienceCounts.usuario }}</td>
            <td>{{ getPercentage(experienceCounts.usuario, analyticsStore.totalExperienceVisits).toFixed(1) }}%</td>
          </tr>
          <tr>
            <td>Entidad</td>
            <td>{{ experienceCounts.entidad }}</td>
            <td>{{ getPercentage(experienceCounts.entidad, analyticsStore.totalExperienceVisits).toFixed(1) }}%</td>
          </tr>
          <tr>
            <td rowspan="4">Formularios</td>
            <td>Información Básica</td>
            <td>{{ formCounts['basic-information'] }}</td>
            <td>{{ getPercentage(formCounts['basic-information'], analyticsStore.totalFormCompletions).toFixed(1) }}%
            </td>
          </tr>
          <tr>
            <td>Información Financiera</td>
            <td>{{ formCounts['financial-information'] }}</td>
            <td>{{ getPercentage(formCounts['financial-information'], analyticsStore.totalFormCompletions).toFixed(1)
              }}%</td>
          </tr>
          <tr>
            <td>Verificación</td>
            <td>{{ formCounts['verification'] }}</td>
            <td>{{ getPercentage(formCounts['verification'], analyticsStore.totalFormCompletions).toFixed(1) }}%</td>
          </tr>
          <tr>
            <td>Completado</td>
            <td>{{ formCounts['complete'] }}</td>
            <td>{{ getPercentage(formCounts['complete'], analyticsStore.totalFormCompletions).toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAnalyticsStore } from '../../../stores/analytics'

const analyticsStore = useAnalyticsStore()

// Computed values
const experienceCounts = computed(() => analyticsStore.experienceVisitCounts)
const formCounts = computed(() => analyticsStore.formCompletionCounts)
const insightCounts = computed(() => analyticsStore.transactionalInsightCounts)
const mostVisited = computed(() => analyticsStore.mostVisitedTransactionalInsight)

// Helper functions
const getPercentage = (value: number, total: number): number => {
  return total > 0 ? (value / total) * 100 : 0
}

const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}


const formatInsightName = (insight: string): string => {
  const names: Record<string, string> = {
    'categorizacion': 'Categorización',
    'agregados': 'Agregados',
    'affordability': 'Affordability',
    'alertas': 'Alertas y Tendencias',
    'income': 'Income Insights',
    'proyectados': 'Insights Proyectados',
    'perfil': 'Perfil Transaccional',
    'score': 'Score Transaccional'
  }
  return names[insight] || insight
}

// Actions
const refreshData = () => {
  // Force reactivity update
  analyticsStore.$patch({})
}

const clearData = () => {
  if (confirm('¿Estás seguro de que quieres limpiar todos los datos de analytics? Esta acción no se puede deshacer.')) {
    analyticsStore.clearAllData()
  }
}


onMounted(() => {
  // Auto-refresh every 30 seconds
  setInterval(refreshData, 30000)
})
</script>

<style scoped>
.analytics-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
  width: 100%;
}

.analytics-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  flex: 1;
}

.dashboard-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0 0 15px 0;
}

.session-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.session-label {
  color: #374151;
  font-weight: 500;
}

.session-id {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.session-duration {
  color: #10b981;
  font-weight: 600;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.refresh-btn,
.clear-btn,
.export-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
}

.refresh-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.clear-btn {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
}

.clear-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.export-btn {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
}

.export-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.overview-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.metric-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
}

.metric-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 12px;
}

.metric-content {
  flex: 1;
}

.metric-title {
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  margin: 0 0 5px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.metric-detail {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 2px;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
}

.full-width-chart {
  margin-bottom: 30px;
}

.chart-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.bar-chart,
.horizontal-bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  min-width: 150px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.bar-wrapper {
  flex: 1;
  height: 32px;
  background: #f3f4f6;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  min-width: 2px;
  transition: width 0.6s ease;
}

.bar-value {
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
}

.activity-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.activity-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f9fafb;
  border-radius: 6px;
}

.activity-icon {
  font-size: 1.2rem;
}

.activity-text {
  flex: 1;
  font-size: 0.9rem;
  color: #374151;
}

.activity-time {
  font-size: 0.8rem;
  color: #9ca3af;
}

.tables-section {
  margin-bottom: 30px;
}

.table-container {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.data-table td {
  font-size: 0.9rem;
  color: #6b7280;
}

.data-table tr:hover {
  background: #f9fafb;
}
</style>
