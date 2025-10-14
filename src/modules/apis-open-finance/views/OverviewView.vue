<template>
  <div class="dashboard-container">
    <!-- Desktop Sidebar -->
    <aside class="desktop-sidebar">
      <div class="sidebar-logo">
        <h2>API MANAGEMENT</h2>
      </div>

      <nav class="sidebar-navigation">
        <div class="nav-group">
          <div class="nav-item active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
              <rect x="9" y="9" width="6" height="6" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Resumen</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>

          <div class="nav-item" @click="navigateToApiKeys">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
              <path
                d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"
                stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Plataforma</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" />
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Facturación</span>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Webhooks</span>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Configuración</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="main-area">
      <!-- Header -->
      <div class="overview-header">
        <div class="header-info">
          <h1>Resumen</h1>
        </div>

        <div class="essentials-section">
          <h2>⚙️ Esenciales</h2>
          <div class="essentials-grid">
            <div class="essential-item">
              <label>Grupo de recursos (Mover)</label>
              <span>spin-hello-world</span>
            </div>
            <div class="essential-item">
              <label>Estado</label>
              <span class="status-online">En línea</span>
            </div>
            <div class="essential-item">
              <label>Ubicación</label>
              <span>Este de EE. UU.</span>
            </div>
            <div class="essential-item">
              <label>Suscripción (Mover)</label>
              <span></span>
            </div>
            <div class="essential-item">
              <label>ID de suscripción</label>
              <span></span>
            </div>
            <div class="essential-item">
              <label>Etiquetas (Editar)</label>
              <span class="add-tags">Haz clic aquí para agregar etiquetas</span>
            </div>
          </div>

          <div class="portal-urls">
            <div class="url-item">
              <label>URL del portal de desarrolladores</label>
              <span></span>
            </div>
            <div class="url-item">
              <label>URL del gateway</label>
              <span></span>
            </div>
            <div class="url-item">
              <label>Nivel</label>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Overview Content -->
      <div class="overview-content">
        <div class="charts-grid">
          <!-- Capacity Chart -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Capacidad</h3>
              <div class="time-selector">
                <button class="time-btn">Últimos 10</button>
                <button class="time-btn">1 hora</button>
                <button class="time-btn active">3 horas</button>
                <button class="time-btn">1 día</button>
                <button class="time-btn">UTC-05:00</button>
              </div>
            </div>
            <div class="chart-content">
              <canvas ref="capacityChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ capacityValue.toFixed(3) }}%</span>
                <span class="label">Últimos 10</span>
              </div>
            </div>
          </div>

          <!-- Gateway Errors Chart -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Errores del gateway</h3>
            </div>
            <div class="chart-content">
              <canvas ref="gatewayErrorsChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ gatewayErrorsValue }}</span>
                <span class="label">Código de autenticación posterior</span>
              </div>
            </div>
          </div>

          <!-- Gateway Requests Chart -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Solicitudes del gateway</h3>
            </div>
            <div class="chart-content">
              <canvas ref="gatewayRequestsChart" class="chart-canvas"></canvas>
              <div class="chart-value large-value">
                <span class="value">{{ gatewayRequestsValue }}</span>
                <span class="label">3 m</span>
                <div class="sub-values">
                  <span class="sub-value error">{{ gatewayRequestsError }} errores</span>
                  <span class="sub-value success">{{ gatewayRequestsSuccess }} éxito</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Backend Request Duration Chart -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Duración de solicitud al backend</h3>
            </div>
            <div class="chart-content">
              <canvas ref="backendDurationChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ backendDurationValue.toFixed(2) }} ms</span>
                <span class="label">últimos 10</span>
              </div>
            </div>
          </div>

          <!-- New: Gateway throughput -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Rendimiento del gateway</h3>
            </div>
            <div class="chart-content">
              <canvas ref="throughputChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ Math.round(throughputValue) }} req/s</span>
                <span class="label">en vivo</span>
              </div>
            </div>
          </div>

          <!-- New: Auth latency p95 -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Latencia de autenticación (p95)</h3>
            </div>
            <div class="chart-content">
              <canvas ref="authLatencyChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ authLatencyP95.toFixed(0) }} ms</span>
                <span class="label">p95</span>
              </div>
            </div>
          </div>

          <!-- New: Cache hit rate -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Tasa de aciertos de caché</h3>
            </div>
            <div class="chart-content">
              <canvas ref="cacheHitChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ cacheHitValue.toFixed(1) }}%</span>
                <span class="label">promedio móvil</span>
              </div>
            </div>
          </div>

          <!-- New: Active subscriptions -->
          <div class="chart-container">
            <div class="chart-header">
              <h3>Suscripciones activas</h3>
            </div>
            <div class="chart-content">
              <canvas ref="activeSubsChart" class="chart-canvas"></canvas>
              <div class="chart-value">
                <span class="value">{{ Math.round(activeSubsValue) }}</span>
                <span class="label">total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Sidebar Menu -->
      <div class="mobile-sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-header">
          <h3>API MANAGEMENT</h3>
          <button @click="toggleSidebar" class="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-item">Productos</div>
            <div class="nav-item">Plataforma</div>
            <div class="nav-subitem">Configuración</div>
            <div class="nav-subitem">Claves API</div>
            <div class="nav-item">Facturación</div>
            <div class="nav-item">Webhooks</div>
            <div class="nav-item">Configuración</div>
          </div>
        </nav>
      </div>

      <!-- Menu Toggle for Mobile -->
      <button class="menu-toggle" @click="toggleSidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const navigateToApiKeys = () => {
  router.push('/apis-open-finance/dashboard')
}

// Chart refs
const capacityChart = ref<HTMLCanvasElement | null>(null)
const gatewayErrorsChart = ref<HTMLCanvasElement | null>(null)
const gatewayRequestsChart = ref<HTMLCanvasElement | null>(null)
const backendDurationChart = ref<HTMLCanvasElement | null>(null)
const throughputChart = ref<HTMLCanvasElement | null>(null)
const authLatencyChart = ref<HTMLCanvasElement | null>(null)
const cacheHitChart = ref<HTMLCanvasElement | null>(null)
const activeSubsChart = ref<HTMLCanvasElement | null>(null)

// Chart data values
const capacityValue = ref(1.067)
const gatewayErrorsValue = ref(2)
const gatewayRequestsValue = ref(6)
const gatewayRequestsError = ref(2)
const gatewayRequestsSuccess = ref(1)
const backendDurationValue = ref(338.78)
const throughputValue = ref(120)
const authLatencyP95 = ref(220)
const cacheHitValue = ref(96.5)
const activeSubsValue = ref(128)

// Animation intervals
let capacityInterval: number | null = null

const drawChart = (canvas: HTMLCanvasElement, dataPoints: number[], color: string, fillColor?: string) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  // Find min and max values for scaling
  const minVal = Math.min(...dataPoints)
  const maxVal = Math.max(...dataPoints)
  const range = maxVal - minVal || 1

  // Scale points to canvas
  const scaledPoints = dataPoints.map((point, index) => ({
    x: (index / (dataPoints.length - 1)) * width,
    y: height - ((point - minVal) / range) * height
  }))

  // Draw fill area if fillColor provided
  if (fillColor) {
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.moveTo(0, height)
    scaledPoints.forEach(point => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.fill()
  }

  // Draw line
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.beginPath()
  scaledPoints.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y)
    } else {
      ctx.lineTo(point.x, point.y)
    }
  })
  ctx.stroke()
}

const generateCapacityData = () => {
  const data: number[] = []
  const baseValue = 1.067

  for (let i = 0; i < 50; i++) {
    const variation = (Math.sin(i * 0.1) + Math.sin(i * 0.03) * 0.5) * 0.2
    const noise = (Math.random() - 0.5) * 0.1
    data.push(Math.max(0, baseValue + variation + noise))
  }

  return data
}

const generateGatewayErrorsData = () => {
  const data: number[] = []

  for (let i = 0; i < 50; i++) {
    if (i > 35 && i < 42) {
      data.push(Math.random() * 3 + 1)
    } else {
      data.push(Math.random() * 0.5)
    }
  }

  return data
}

const generateGatewayRequestsData = () => {
  const data: number[] = []

  for (let i = 0; i < 50; i++) {
    const baseValue = 3
    const spike = i > 30 && i < 38 ? Math.random() * 5 + 3 : 0
    data.push(baseValue + spike + Math.random() * 2)
  }

  return data
}

const generateBackendDurationData = () => {
  const data: number[] = []
  const baseValue = 338.78

  for (let i = 0; i < 50; i++) {
    const variation = Math.sin(i * 0.05) * 50
    const spike = i > 25 && i < 35 ? Math.random() * 200 + 100 : 0
    const noise = (Math.random() - 0.5) * 30
    data.push(Math.max(100, baseValue + variation + spike + noise))
  }

  return data
}

// New charts generators
const generateThroughputData = () => {
  const data: number[] = []
  let base = 110
  for (let i = 0; i < 50; i++) {
    const wave = Math.sin(i * 0.12) * 10 + Math.sin(i * 0.03) * 5
    const spike = i % 23 === 0 ? 40 : 0
    const noise = (Math.random() - 0.5) * 6
    data.push(Math.max(20, base + wave + spike + noise))
  }
  return data
}

const generateAuthLatencyData = () => {
  const data: number[] = []
  for (let i = 0; i < 50; i++) {
    const base = 220
    const spike = Math.random() < 0.12 ? 120 + Math.random() * 150 : 0
    const wave = Math.sin(i * 0.08) * 20
    const noise = (Math.random() - 0.5) * 15
    data.push(Math.max(80, base + wave + spike + noise))
  }
  return data
}

const generateCacheHitData = () => {
  const data: number[] = []
  for (let i = 0; i < 50; i++) {
    const base = 96
    const wave = Math.sin(i * 0.05) * 2
    const noise = (Math.random() - 0.5) * 1.2
    data.push(Math.min(100, Math.max(85, base + wave + noise)))
  }
  return data
}

const generateActiveSubsData = () => {
  const data: number[] = []
  let base = 120
  for (let i = 0; i < 50; i++) {
    base += (Math.random() - 0.45) * 0.8
    const wave = Math.sin(i * 0.04) * 3
    data.push(Math.max(50, base + wave))
  }
  return data
}

// Chart data arrays
let capacityData = generateCapacityData()
let gatewayErrorsData = generateGatewayErrorsData()
let gatewayRequestsData = generateGatewayRequestsData()
let backendDurationData = generateBackendDurationData()
let throughputData = generateThroughputData()
let authLatencyData = generateAuthLatencyData()
let cacheHitData = generateCacheHitData()
let activeSubsData = generateActiveSubsData()

const animateCharts = () => {
  // Update capacity chart
  capacityData.shift()
  const newCapacityValue = Math.max(0, 1.067 + (Math.sin(Date.now() * 0.001) + Math.sin(Date.now() * 0.0003) * 0.5) * 0.2 + (Math.random() - 0.5) * 0.1)
  capacityData.push(newCapacityValue)
  capacityValue.value = newCapacityValue

  if (capacityChart.value) {
    drawChart(capacityChart.value, capacityData, '#3b82f6', 'rgba(59, 130, 246, 0.1)')
  }

  // Update gateway errors chart
  gatewayErrorsData.shift()
  const errorSpike = Math.random() < 0.1 ? Math.random() * 3 + 1 : Math.random() * 0.5
  gatewayErrorsData.push(errorSpike)
  gatewayErrorsValue.value = Math.round(errorSpike)

  if (gatewayErrorsChart.value) {
    drawChart(gatewayErrorsChart.value, gatewayErrorsData, '#ef4444')
  }

  // Update gateway requests chart
  gatewayRequestsData.shift()
  const requestSpike = Math.random() < 0.2 ? Math.random() * 5 + 3 : 3 + Math.random() * 2
  gatewayRequestsData.push(requestSpike)
  gatewayRequestsValue.value = Math.round(requestSpike)
  gatewayRequestsError.value = Math.round(Math.random() * 2)
  gatewayRequestsSuccess.value = Math.round(Math.random() * 2)

  if (gatewayRequestsChart.value) {
    drawChart(gatewayRequestsChart.value, gatewayRequestsData, '#10b981')
  }

  // Update backend duration chart
  backendDurationData.shift()
  const durationSpike = Math.random() < 0.15 ? Math.random() * 200 + 100 : 0
  const newDurationValue = Math.max(100, 338.78 + Math.sin(Date.now() * 0.0005) * 50 + durationSpike + (Math.random() - 0.5) * 30)
  backendDurationData.push(newDurationValue)
  backendDurationValue.value = newDurationValue

  if (backendDurationChart.value) {
    drawChart(backendDurationChart.value, backendDurationData, '#f59e0b', 'rgba(245, 158, 11, 0.1)')
  }

  // Update throughput
  throughputData.shift()
  const newT = Math.max(20, 110 + Math.sin(Date.now() * 0.0012) * 10 + (Math.random() - 0.5) * 6 + (Math.random() < 0.08 ? 35 : 0))
  throughputData.push(newT)
  throughputValue.value = newT
  if (throughputChart.value) {
    drawChart(throughputChart.value, throughputData, '#6366f1', 'rgba(99, 102, 241, 0.1)')
  }

  // Update auth latency p95
  authLatencyData.shift()
  const newL = Math.max(80, 220 + Math.sin(Date.now() * 0.0009) * 20 + (Math.random() - 0.5) * 15 + (Math.random() < 0.12 ? 150 : 0))
  authLatencyData.push(newL)
  authLatencyP95.value = newL
  if (authLatencyChart.value) {
    drawChart(authLatencyChart.value, authLatencyData, '#8b5cf6', 'rgba(139, 92, 246, 0.1)')
  }

  // Update cache hit
  cacheHitData.shift()
  const newC = Math.min(100, Math.max(85, 96 + Math.sin(Date.now() * 0.0007) * 2 + (Math.random() - 0.5) * 1.2))
  cacheHitData.push(newC)
  cacheHitValue.value = newC
  if (cacheHitChart.value) {
    drawChart(cacheHitChart.value, cacheHitData, '#22c55e', 'rgba(34, 197, 94, 0.1)')
  }

  // Update active subs
  activeSubsData.shift()
  const newS = Math.max(50, activeSubsValue.value + (Math.random() - 0.45) * 2 + Math.sin(Date.now() * 0.0006) * 0.8)
  activeSubsData.push(newS)
  activeSubsValue.value = newS
  if (activeSubsChart.value) {
    drawChart(activeSubsChart.value, activeSubsData, '#0ea5e9', 'rgba(14, 165, 233, 0.1)')
  }
}

// Responsive canvas sizing: keep canvas pixel buffer in sync with CSS size and DPR
const resizeCanvases = () => {
  const canvases = [capacityChart, gatewayErrorsChart, gatewayRequestsChart, backendDurationChart, throughputChart, authLatencyChart, cacheHitChart, activeSubsChart]
  const dpr = window.devicePixelRatio || 1
  canvases.forEach(canvasRef => {
    const canvas = canvasRef.value
    if (!canvas) return
    const cssWidth = canvas.clientWidth
    const cssHeight = canvas.clientHeight
    const targetW = Math.max(1, Math.floor(cssWidth * dpr))
    const targetH = Math.max(1, Math.floor(cssHeight * dpr))
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }
    }
  })
}

onMounted(() => {
  // Ensure canvases match container width on first render
  resizeCanvases()

  // Initial chart render
  if (capacityChart.value) {
    drawChart(capacityChart.value, capacityData, '#3b82f6', 'rgba(59, 130, 246, 0.1)')
  }
  if (gatewayErrorsChart.value) {
    drawChart(gatewayErrorsChart.value, gatewayErrorsData, '#ef4444')
  }
  if (gatewayRequestsChart.value) {
    drawChart(gatewayRequestsChart.value, gatewayRequestsData, '#10b981')
  }
  if (backendDurationChart.value) {
    drawChart(backendDurationChart.value, backendDurationData, '#f59e0b', 'rgba(245, 158, 11, 0.1)')
  }
  if (throughputChart.value) {
    drawChart(throughputChart.value, throughputData, '#6366f1', 'rgba(99, 102, 241, 0.1)')
  }
  if (authLatencyChart.value) {
    drawChart(authLatencyChart.value, authLatencyData, '#8b5cf6', 'rgba(139, 92, 246, 0.1)')
  }
  if (cacheHitChart.value) {
    drawChart(cacheHitChart.value, cacheHitData, '#22c55e', 'rgba(34, 197, 94, 0.1)')
  }
  if (activeSubsChart.value) {
    drawChart(activeSubsChart.value, activeSubsData, '#0ea5e9', 'rgba(14, 165, 233, 0.1)')
  }

  // Start animation
  const interval = setInterval(animateCharts, 2000) // Update every 2 seconds
  capacityInterval = interval
  // Resize canvases on viewport changes
  window.addEventListener('resize', resizeCanvases)
})

onUnmounted(() => {
  if (capacityInterval) {
    clearInterval(capacityInterval)
  }
  window.removeEventListener('resize', resizeCanvases)
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: row;
  position: relative;
}

/* Desktop Sidebar */
.desktop-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 50;
}

.sidebar-logo {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-logo h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.sidebar-navigation {
  flex: 1;
  padding: 20px 0;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.nav-item:hover {
  background: #f8fafc;
  color: #374151;
}

.nav-item.active {
  background: #eff6ff;
  color: #3b82f6;
  border-right: 3px solid #3b82f6;
}

.nav-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.chevron {
  margin-left: auto;
}

.main-area {
  flex: 1;
  width: 100%;
  padding-left: 250px;
  /* keep content out from under fixed sidebar */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Overview Header */
.overview-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 20px;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-info h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.header-btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.essentials-section h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.essentials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.essential-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.essential-item label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.essential-item span {
  font-size: 0.9rem;
  color: #1f2937;
}

.status-online {
  color: #059669 !important;
  font-weight: 500;
}

.add-tags {
  color: #3b82f6 !important;
  cursor: pointer;
}

.portal-urls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.url-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.url-item label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

/* Overview Content */
.overview-content {
  flex: 1;
  padding: 20px;
  background: #f8fafc;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.chart-container {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  height: 300px;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.time-selector {
  display: flex;
  gap: 4px;
}

.time-btn {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #6b7280;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-btn:hover {
  background: #f9fafb;
}

.time-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.chart-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.chart-canvas {
  flex: 1;
  width: 100%;
  height: 180px;
}

.chart-value {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chart-value.large-value {
  gap: 8px;
}

.chart-value .value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.chart-value .label {
  font-size: 0.8rem;
  color: #6b7280;
}

.sub-values {
  display: flex;
  gap: 12px;
}

.sub-value {
  font-size: 1rem;
  font-weight: 600;
}

.sub-value.error {
  color: #ef4444;
}

.sub-value.success {
  color: #10b981;
}

/* Mobile Sidebar */
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 200;
  transition: left 0.3s ease;
  border-right: 1px solid #e5e7eb;
}

.mobile-sidebar.open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
}

.sidebar-nav {
  padding: 20px;
}

.nav-section .nav-item {
  padding: 12px 0;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
}

.nav-section .nav-item.active {
  color: #3b82f6;
  font-weight: 600;
}

.nav-subitem {
  padding: 8px 0 8px 16px;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
}

.nav-subitem.active {
  color: #3b82f6;
  font-weight: 500;
}

/* Menu Toggle */
.menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  z-index: 150;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .desktop-sidebar {
    display: none;
  }

  .main-area {
    padding-left: 0;
    width: 100%;
  }

  .menu-toggle {
    display: block;
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    min-width: 300px;
  }

  .essentials-grid,
  .portal-urls {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .overview-content {
    padding: 16px;
  }

  .chart-container {
    padding: 16px;
    height: 250px;
  }

  .chart-canvas {
    height: 150px;
  }

  .header-actions {
    flex-direction: column;
    gap: 8px;
  }
}

/* Media Queries for 1920x1080 and larger horizontal screens */
@media (orientation: landscape) and (min-width: 1920px) {
  .desktop-sidebar {
    width: 350px;
  }

  .main-area {
    margin-left: 400px;
  }

  .main-content {
    padding: 40px 60px;
    max-width: 1400px;
  }

  .nav-item {
    padding: 16px 28px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.3fr 1.3fr 1fr 1fr 0.8fr 90px;
    gap: 24px;
    padding: 20px 28px;
  }

  .action-bar {
    margin-bottom: 36px;
  }

  .new-api-key-btn {
    padding: 14px 28px;
  }

  .pagination-container {
    padding: 28px 0;
  }

  .pagination-btn {
    padding: 10px 18px;
  }

  .pagination-number {
    width: 44px;
    height: 44px;
  }

  .insights-container {
    padding: 50px 40px;
  }

  .insights-button {
    padding: 18px 36px;
  }
}
</style>
