<template>
  <div class="insights-proyectados-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />
    <div class="background-elements" v-if="false">
      <div class="floating-element number">📈</div>
      <div class="floating-element number">💹</div>
      <div class="floating-element number">📊</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Insights Proyectados</h1>
      <p class="subtitle">Proyección de ingresos, gastos y flujos de caja del cliente para cada uno de los siguientes 24
        meses.</p>
      <div class="description-container">
        <ul class="description-list">
          <li class="description-text">Desglosado para ingresos, egresos y los grupos del producto Affordability.</li>
          <li class="description-text">Requiere mínimo 12 meses de historial de transacciones</li>
          <li class="description-text">Indicadores macroeconómicos provenientes de fuentes internacionales
            especializadas y actualizados</li>
        </ul>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Process Flow Animation -->
      <div class="process-flow" :class="{ 'visible': showProcess }">
        <!-- Row: Left card — ML (center) — Right card -->
        <div class="fusion-row">
          <!-- Left (fixed space) -->
          <div class="fusion-side left">
            <div ref="card0Ref" class="input-card historical-card"
              :class="{ 'visible': visibleCards.has(0), 'moving': movingCards.has(0), 'fading': fadingCards.has(0), 'gone': cardsGone }"
              :style="cardMoveStyles[0]">
              <div class="card-icon historical-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" />
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </div>
              <h4 class="card-title">Historial de transacciones</h4>
            </div>
          </div>

          <!-- Center (ML) -->
          <div class="fusion-center">
            <div ref="mlRef" class="ml-model" :class="{ 'visible': showML, 'processing': mlProcessing }">
              <h4 class="ml-title">Modelo de Machine Learning</h4>
              <div class="ml-status">
                <div class="gear-animation" :class="{ 'spinning': mlProcessing }">⚙️</div>
                <p class="ml-description" v-if="!mlProcessing">Listo para procesar</p>
                <p class="ml-description processing-text" v-else>Procesando datos... {{ processingSeconds }}s</p>
              </div>
            </div>
          </div>

          <!-- Right (fixed space) -->
          <div class="fusion-side right">
            <div ref="card1Ref" class="input-card macro-card"
              :class="{ 'visible': visibleCards.has(1), 'moving': movingCards.has(1), 'fading': fadingCards.has(1), 'gone': cardsGone }"
              :style="cardMoveStyles[1]">
              <div class="card-icon macro-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18M7 12l4-4 4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <circle cx="7" cy="12" r="1" fill="currentColor" />
                  <circle cx="11" cy="8" r="1" fill="currentColor" />
                  <circle cx="15" cy="12" r="1" fill="currentColor" />
                  <circle cx="19" cy="8" r="1" fill="currentColor" />
                </svg>
              </div>
              <h4 class="card-title">Indicadores macroeconómicos de Colombia</h4>
            </div>
          </div>
        </div>



        <!-- Bottom Full Width: Chart -->
        <div class="chart-full-section" :class="{ 'visible': showChart }">
          <div ref="chartRef" class="chart-container" :class="{ 'visible': showChart }">
            <div class="chart-header">
              <h4>Proyecciones Generadas</h4>
            </div>

            <!-- Legend (top-right) -->
            <div class="chart-legend">
              <div class="legend-item"><span class="swatch swatch-income"></span>Ingresos</div>
              <div class="legend-item"><span class="swatch swatch-expense"></span>Gastos</div>
            </div>

            <!-- Animated Chart -->
            <div class="animated-chart">
              <svg width="100%" height="360" viewBox="0 0 860 360" fill="none">
                <!-- Timeline -->
                <line :x1="chartLeft" :y1="baselineY" :x2="chartRight" :y2="baselineY" stroke="#e5e7eb"
                  stroke-width="3" />

                <!-- Past bars: negative (purple) and positive (blue) -->
                <rect v-for="(h, index) in pastNegHeights" :key="`past-neg-${index}`" :x="chartLeft + index * barGap"
                  :y="baselineY" :width="barWidth" :height="h" fill="#982fa3"
                  :opacity="visiblePastBars.has(index) ? 0.9 : 0" class="past-bar" />
                <rect v-for="(h, index) in pastPosHeights" :key="`past-pos-${index}`" :x="chartLeft + index * barGap"
                  :y="baselineY - h" :width="barWidth" :height="h" fill="#002db8"
                  :opacity="visiblePastBars.has(index) ? 0.95 : 0" class="past-bar" />

                <!-- Present moment indicator -->
                <line :x1="presentX" y1="50" :x2="presentX" y2="230" stroke="#ef4444" stroke-width="4"
                  stroke-dasharray="8,4" />
                <text :x="presentX" y="40" fill="#ef4444" font-size="14" font-weight="600" text-anchor="middle">{{
                  presentMonthLabel }}</text>

                <!-- Future bars (animated): show pos (blue) and neg (purple) per month -->
                <rect v-for="(h, index) in futurePosHeights" :key="`future-pos-${index}`"
                  :x="chartLeft + (pastCount + index) * barGap" :y="baselineY - h" :width="barWidth" :height="h"
                  fill="#002db8" :opacity="visibleFutureBars.has(index) ? 0.95 : 0" class="future-bar" />
                <rect v-for="(h, index) in futureNegHeights" :key="`future-neg-${index}`"
                  :x="chartLeft + (pastCount + index) * barGap" :y="baselineY" :width="barWidth" :height="h"
                  fill="#982fa3" :opacity="visibleFutureBars.has(index) ? 0.9 : 0" class="future-bar" />

                <!-- Month labels: 12 past, present, 12 future -->
                <text v-for="(label, i) in pastMonthLabels" :key="`pl-${i}`" :x="chartLeft + i * barGap + barWidth / 2"
                  :y="labelY" fill="#9ca3af" font-size="10" text-anchor="middle">{{ label }}</text>
                <text :x="presentX" :y="labelY" fill="#ef4444" font-size="11" font-weight="600"
                  text-anchor="middle"></text>
                <text v-for="(label, i) in futureMonthLabels" :key="`fl-${i}`"
                  :x="chartLeft + (pastCount + i) * barGap + barWidth / 2" :y="labelY" fill="#9ca3af" font-size="10"
                  text-anchor="middle">{{ label }}</text>
              </svg>
            </div>

            <div class="chart-note" :class="{ 'visible': showChartNote }">
              <p>El gráfico se genera como resultado del procesamiento de ML, mostrando las proyecciones para los
                próximos 24 meses</p>
            </div>
          </div>
        </div>

        <!-- Continue Button (before fusion) -->
        <div v-if="showContinue" class="continue-container">
          <button class="continue-button" @click="onContinue">Continuar</button>
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
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showTitle = ref(false)
const showContent = ref(false)
const showProcess = ref(false)
const showML = ref(false)
const mlProcessing = ref(false)
const showChart = ref(false)
const showChartNote = ref(false)
const showButton = ref(false)
const showContinue = ref(false)
const visibleCards = ref<Set<number>>(new Set())
const movingCards = ref<Set<number>>(new Set())
const fadingCards = ref<Set<number>>(new Set())
const visiblePastBars = ref<Set<number>>(new Set())
const visibleFutureBars = ref<Set<number>>(new Set())
const processingSeconds = ref(6)
// Cards and movement
const cardsGone = ref(false)
const cardMoveStyles = ref<Record<number, Record<string, string>>>({})
const card0Ref = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const mlRef = ref<HTMLElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const chartRef = ref<HTMLElement | null>(null)

const chartLeft = 80
const chartRight = 780
const baselineY = 230
const labelY = baselineY + 100
const totalBars = 24
const barGap = Math.floor((chartRight - chartLeft) / totalBars)
const barWidth = 16
const pastCount = 12
const presentX = chartLeft + pastCount * barGap

// Alturas de barras: para cada mes, una positiva (arriba) y una negativa (abajo)
const pastPosHeights = ref<number[]>(Array(12).fill(0))
const pastNegHeights = ref<number[]>(Array(12).fill(0))
const futurePosHeights = ref<number[]>(Array(12).fill(0))
const futureNegHeights = ref<number[]>(Array(12).fill(0))

const generateBarHeights = () => {
  // Generador con tendencia ascendente y pequeñas caídas locales
  const genTrendingHeights = (n: number, minH: number, maxH: number) => {
    const out: number[] = []
    const range = maxH - minH
    const dipCap = range * 0.12 // caída máxima permitida entre meses (~12% del rango)
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 1 : i / (n - 1) // 0..1
      const trend = minH + range * t // línea base ascendente
      const noise = (Math.random() * 2 - 1) * range * 0.18 // ±18% del rango
      let val = trend + noise
      if (i > 0 && val < out[i - 1] - dipCap) {
        val = out[i - 1] - dipCap // limitar caídas fuertes pero permitir pequeñas bajadas
      }
      val = Math.max(minH, Math.min(maxH, val))
      out.push(Math.round(val))
    }
    return out
  }

  const pos24 = genTrendingHeights(24, 30, 120)
  const neg24 = genTrendingHeights(24, 20, 90)

  pastPosHeights.value = pos24.slice(0, pastCount)
  futurePosHeights.value = pos24.slice(pastCount)
  pastNegHeights.value = neg24.slice(0, pastCount)
  futureNegHeights.value = neg24.slice(pastCount)
}

// Month labels based on current date
const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const now = new Date()
const addMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() + months, 1)
const presentMonthLabel = `${monthNames[now.getMonth()]} ${now.getFullYear()}`
// axis labels in lowercase without year, with 'sept'
const axisMonthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic']
const formatAxisMonth = (d: Date) => axisMonthNames[d.getMonth()]
const pastMonthLabels = ref<string[]>(Array.from({ length: 12 }, (_, i) => formatAxisMonth(addMonths(now, -12 + i))))
const futureMonthLabels = ref<string[]>(Array.from({ length: 12 }, (_, i) => formatAxisMonth(addMonths(now, i + 1))))


// Animation helpers
const showPastBarsSequentially = async (delay = 250) => {
  return new Promise<void>((resolve) => {
    const showNext = (index: number) => {
      if (index >= pastPosHeights.value.length) { resolve(); return }
      visiblePastBars.value.add(index)
      setTimeout(() => showNext(index + 1), delay)
    }
    showNext(0)
  })
}

const showFutureBarsSequentially = async (delay = 250) => {
  return new Promise<void>((resolve) => {
    const showNextBar = (index: number) => {
      if (index >= futurePosHeights.value.length) {
        resolve()
        return
      }

      visibleFutureBars.value.add(index)

      setTimeout(() => {
        showNextBar(index + 1)
      }, delay)
    }

    showNextBar(0)
  })
}



const computeCardMove = (cardEl: HTMLElement, targetEl: HTMLElement) => {
  const c = cardEl.getBoundingClientRect()
  const t = targetEl.getBoundingClientRect()
  const dx = (t.left + t.width / 2) - (c.left + c.width / 2)
  const dy = (t.top + t.height / 2) - (c.top + c.height / 2)
  return { dx, dy }
}

const moveCardsIntoML = async () => {
  await nextTick()
  if (!card0Ref.value || !card1Ref.value || !mlRef.value) return
  const m = mlRef.value
  const m0 = computeCardMove(card0Ref.value, m)
  const m1 = computeCardMove(card1Ref.value, m)
  cardMoveStyles.value[0] = { '--dx': `${m0.dx}px`, '--dy': `${m0.dy}px` }
  cardMoveStyles.value[1] = { '--dx': `${m1.dx}px`, '--dy': `${m1.dy}px` }
  movingCards.value.add(0)
  movingCards.value.add(1)
  setTimeout(() => {
    // fade out
    fadingCards.value.add(0)
    fadingCards.value.add(1)
    setTimeout(() => {
      cardsGone.value = true
    }, 600)
  }, 1200)
}

const runProcessing = async () => {
  mlProcessing.value = true
  processingSeconds.value = 6
  const timer = setInterval(() => {
    processingSeconds.value = Math.max(0, processingSeconds.value - 1)
  }, 1000)
  setTimeout(() => {
    clearInterval(timer)
    mlProcessing.value = false
    showChart.value = true
    // revelar barras: pasado luego futuro, lentamente
    setTimeout(() => {
      showPastBarsSequentially(320)
        .then(() => showFutureBarsSequentially(320))
        .then(() => {
          setTimeout(() => {
            showChartNote.value = true
            showButton.value = true
          }, 600)
        })
    }, 200)
  }, 6000)
}

// Start animations
const startAnimations = async () => {
  // 1. Título y layout
  showTitle.value = true
  setTimeout(() => {
    showContent.value = true
    setTimeout(async () => {
      // 2. Mostrar flujo y tarjetas + ML
      showProcess.value = true
      visibleCards.value.add(0)
      visibleCards.value.add(1)
      showML.value = true
      // 3. Mostrar botón Continuar para ejecutar la fusión
      setTimeout(() => {
        showContinue.value = true
      }, 400)
    }, 300)
  }, 300)
}

// Continue action: fuse cards into ML and process
const onContinue = async () => {
  if (showContinue.value) {
    showContinue.value = false
    await moveCardsIntoML()
    setTimeout(() => runProcessing(), 200)
  }
}

// Navigation
const goBack = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Start animations on mount
onMounted(async () => {
  await nextTick()
  // generar alturas con tendencia (random + crecimiento)
  generateBarHeights()
  setTimeout(() => {
    startAnimations()
  }, 300)
})
</script>

<style scoped>
.insights-proyectados-container {
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
  max-width: 800px;
  margin: 25px auto 0;
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

/* Process Flow Animation */
.process-flow {
  display: block;
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.process-flow.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Fusion row: left card — ML (center) — right card */
.fusion-row {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) auto minmax(300px, 1fr);
  align-items: start;
  justify-content: center;
  column-gap: 24px;
  margin-top: 10px;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.fusion-side {
  display: flex;
  justify-content: center;
  align-items: start;
  min-width: 300px;
}

.fusion-center {
  display: flex;
  justify-content: center;
  align-items: start;
}

.input-card {
  background: white;
  border-radius: 16px;
  padding: 18px 20px;
  width: 300px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 2px solid #e5e7eb;
  text-align: center;
  opacity: 0;
  transform: translateY(-20px);
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
  position: relative;
  z-index: 2;
}

.input-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.input-card.moving {
  will-change: transform, opacity;
  transform: translate(var(--dx, 0), var(--dy, 0)) scale(0.65);
  z-index: 5;
}

.input-card.fading {
  opacity: 0;
}

.input-card.gone {
  opacity: 0 !important;
  visibility: hidden;
  pointer-events: none;
  transform: none !important;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: white;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
}

.historical-icon {
  color: white;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
}

.macro-icon {
  color: white;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) !important;
}

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
}

.card-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

/* Ingredients Side */
.ingredients-side {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.ingredient-item {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  text-align: center;
  max-width: 280px;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.ingredient-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.ingredient-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  background: linear-gradient(135deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
}

.ingredient-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.ingredient-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.fusion-text {
  background: rgba(245, 158, 11, 0.1);
  border: 2px solid rgba(245, 158, 11, 0.3);
  border-radius: 12px;
  padding: 20px;
  color: #d97706;
  font-weight: 600;
  text-align: center;
  max-width: 280px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fusion-text.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Funnel Section */
.funnel-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.funnel-container {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.funnel-container.visible {
  opacity: 1;
  transform: scale(1);
}

.funnel-shape {
  position: relative;
}

/* Particle animations */
.particle {
  opacity: 0;
  animation: particleFlow 3s ease-in-out infinite;
}

.p1 {
  animation-delay: 0s;
}

.p2 {
  animation-delay: 0.5s;
}

.p3 {
  animation-delay: 1s;
}

.p4 {
  animation-delay: 1.5s;
}

.p5 {
  animation-delay: 2s;
}

.p6 {
  animation-delay: 2.5s;
}

@keyframes particleFlow {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  20% {
    opacity: 1;
    transform: translateY(0);
  }

  80% {
    opacity: 1;
    transform: translateY(60px);
  }

  100% {
    opacity: 0;
    transform: translateY(80px);
  }
}

/* ML Model */
.ml-model {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  text-align: center;
  max-width: 280px;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.ml-model.visible {
  opacity: 1;
}

.ml-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
}

.ml-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.ml-process {
  opacity: 0.5;
  transition: all 0.5s ease;
}

.ml-process.active {
  opacity: 1;
}

.gear-animation {
  font-size: 6rem;
  margin: 10px 0;
  display: inline-block;
  animation: none;
  transition: transform 0.5s ease;
}

.ml-process.active .gear-animation {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.ml-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 10px 0 0 0;
  line-height: 1.4;
}

.ml-description.processing-text {
  color: #2563eb;
  font-weight: 600;
}

/* Chart Section */
.chart-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-container {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  position: relative;
  opacity: 0;
  transform: translateX(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-container.visible {
  opacity: 1;
  transform: translateX(0);
}

.chart-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
  text-align: center;
}

.chart-info {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
}

.chart-info p {
  font-size: 0.85rem;
  color: #3b82f6;
  margin: 0;
  line-height: 1.4;
}

.animated-chart {
  margin: 20px 0;
}

.future-bar {
  transition: opacity 0.4s ease;
}

.past-bar {
  transition: opacity 0.4s ease;
}



/* Legend */
.chart-legend {
  position: absolute;
  top: 10px;
  right: 12px;
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  padding: 6px 10px;
  border-radius: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 0.85rem;
}

.swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
}

.swatch-income {
  background: #002db8;
}

.swatch-expense {
  background: #982fa3;
}

/* ML center and processing tweaks */
.ml-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
}

.gear-animation.spinning {
  animation: spin 1s linear infinite;
}

/* Chart wrapper visibility */
.chart-full-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  grid-column: 1 / -1;
  width: 100%;
  margin-top: 40px;
  /* separa más el bloque de Proyecciones Generadas del ML */
}

.chart-full-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.chart-note {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-note.visible {
  opacity: 1;
  transform: translateY(0);
}

.chart-note p {
  font-size: 0.85rem;
  color: #059669;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.chart-note p:last-child {
  margin-bottom: 0;
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

/* Continue CTA */
.continue-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 24px 0 8px;
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

.continue-button:active {
  transform: translateY(0);
}

.continue-hint {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }

}

@media (max-width: 768px) {
  .insights-proyectados-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

}

@media (max-width: 480px) {
  .insights-proyectados-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

}
</style>
