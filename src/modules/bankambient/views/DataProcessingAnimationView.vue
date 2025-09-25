<template>
  <div class="data-processing-animation">
    <div class="main-container">
      <div class="animation-container">
        <!-- Background with particles -->
        <div class="background-space">
          <div v-for="i in 50" :key="i" class="bg-particle" :style="getBgParticleStyle(i)"></div>
        </div>

        <!-- Title and description -->
        <div class="header-content">
          <h1 class="main-title">Analizando su información financiera</h1>
          <p class="subtitle">Estamos revisando sus datos para encontrar las mejores opciones crediticias para usted</p>
        </div>

        <!-- Animation space for custom animation -->
        <div class="animation-space">
          <!-- Progress bar on top of animation -->
          <div class="progress-wrapper" :class="{ done: animationStep >= 8 }">
            <div class="progress-header">
              <span class="progress-title">Analizando...</span>
              <span class="progress-value">{{ Math.round(progress) }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
          </div>
          <!-- Moving data box -->
          <div class="moving-data-box" :class="{
            visible: animationStep >= 1,
            moving: animationStep >= 2,
            disappeared: animationStep >= 3
          }">
            <div class="data-box-content">
              <div class="box-icon">📋</div>
              <span>Sus datos financieros</span>
            </div>

            <!-- Data rain falling into the box -->
            <div class="data-rain" :class="{ active: animationStep >= 1 && animationStep < 2 }">
              <div v-for="i in 12" :key="i" class="data-drop" :style="getDataDropStyle(i)">
                {{ getDataDropText(i) }}
              </div>
            </div>
          </div>

          <!-- Computer animation -->
          <div class="computer-animation">
            <div class="computer-container">
              <!-- Computer monitor -->
              <div class="computer-monitor">
                <div class="monitor-screen">
                  <!-- Processing lines when active -->
                  <div class="processing-display" :class="{ active: animationStep >= 3 }">
                    <div class="code-lines">
                      <div class="code-line" v-for="i in 8" :key="i" :style="{ animationDelay: `${i * 0.2}s` }"></div>
                    </div>
                    <div class="processing-symbols">
                      <div class="symbol" v-for="i in 6" :key="i" :style="getSymbolStyle(i)">
                        {{ getProcessingSymbol(i) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="monitor-stand"></div>
              </div>

              <!-- Computer base -->
              <div class="computer-base">
                <div class="power-light" :class="{ active: animationStep >= 3 }"></div>
                <div class="cpu-fan" :class="{ spinning: animationStep >= 3 }"></div>
              </div>
            </div>
          </div>

          <!-- Output product box -->
          <div class="output-product-box" :class="{
            visible: animationStep >= 5,
            moving: animationStep >= 6,
            disappeared: animationStep >= 7
          }">
            <div class="product-box-content">
              <div class="product-icon">📦</div>
              <span>Productos</span>
            </div>
          </div>

          <!-- Completion overlay inside the animation container -->
          <div v-if="animationStep >= 8" class="completion-overlay">
            <div class="completion-card">
              <p class="completion-message">Proceso completado. Sus resultados están listos.</p>
              <button @click="handleContinue" class="continue-button">Ver resultados</button>
            </div>
          </div>
        </div>

        <!-- Main data flow visualization -->
        <div class="data-flow-container" :class="{ hidden: animationStep >= 7 }">
          <!-- Step indicators at top -->
          <div class="flow-steps">
            <div class="flow-step" :class="{ active: animationStep >= 1 }">
              <div class="step-icon">📊</div>
              <span>Revisión</span>
            </div>
            <div class="flow-step" :class="{ active: animationStep >= 3 }">
              <div class="step-icon">🤖</div>
              <span>Análisis</span>
            </div>
            <div class="flow-step" :class="{ active: animationStep >= 5 }">
              <div class="step-icon">💼</div>
              <span>Resultados</span>
            </div>
          </div>


          <!-- Main pipeline - moved to bottom -->
          <div class="pipeline-container">
            <!-- Left section: Raw Data -->
            <div class="pipeline-section left-section">
              <div class="section-header">
                <h3>Su información bancaria</h3>
                <p>Revisamos sus ingresos, gastos y movimientos bancarios para conocer mejor su situación financiera.
                </p>
              </div>
              <div class="data-box" :class="{ active: animationStep >= 1 }">
                <div class="box-icon">🏦</div>
                <span>Conexión con su entidad financiera</span>
              </div>
              <div class="data-tags">
                <div class="data-tag" :class="{ active: animationStep >= 1 }" style="--delay: 0s">Sus ingresos</div>
                <div class="data-tag" :class="{ active: animationStep >= 1 }" style="--delay: 0.1s">Sus gastos</div>
                <div class="data-tag" :class="{ active: animationStep >= 1 }" style="--delay: 0.2s">Sus ahorros</div>
                <div class="data-tag" :class="{ active: animationStep >= 1 }" style="--delay: 0.3s">Su historial</div>
              </div>
            </div>

            <!-- Center section: ML Processing -->
            <div class="pipeline-section center-section">
              <div class="processing-core" :class="{ active: animationStep >= 3 }">
                <div class="ml-processor">
                  <div class="processor-title">Análisis inteligente</div>
                  <div class="processing-steps">
                    <div class="process-step">Revisión de datos</div>
                    <div class="process-step">Evaluación de riesgo</div>
                    <div class="process-step">Cálculo de opciones</div>
                  </div>
                </div>

                <!-- Better analysis visualization -->
                <div class="analysis-visual" :class="{ active: animationStep >= 3 }">
                  <div class="analysis-bars">
                    <div class="bar" v-for="i in 14" :key="i" :style="{ '--i': i }"></div>
                  </div>
                  <div class="scan-overlay"></div>
                </div>
              </div>
            </div>

            <!-- Right section: Output -->
            <div class="pipeline-section right-section">
              <div class="section-header">
                <h3>Sus opciones crediticias</h3>
                <p>Basado en su perfil financiero, estas son las mejores opciones de crédito disponibles para usted.</p>
              </div>
              <div class="output-categories">
                <div class="output-item demo-blur" :class="{ active: animationStep >= 5 }" style="--delay: 0s">
                  <div class="output-icon">💳</div>
                  <span>Tarjetas de crédito</span>
                </div>
                <div class="output-item demo-blur" :class="{ active: animationStep >= 5 }" style="--delay: 0.2s">
                  <div class="output-icon">🏠</div>
                  <span>Crédito hipotecario</span>
                </div>
                <div class="output-item demo-blur" :class="{ active: animationStep >= 5 }" style="--delay: 0.4s">
                  <div class="output-icon">🚗</div>
                  <span>Crédito vehicular</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const animationStep = ref(0)
let animationInterval: number | null = null
const progress = ref(0)

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})

const startAnimation = () => {
  const steps = [
    { step: 1, delay: 1000 },   // Caja de datos aparece y comienza la "lluvia"
    { step: 2, delay: 8000 },   // La lluvia se detiene, la caja se mueve al PC
    { step: 3, delay: 8000 },   // Caja llega al PC, desaparece y PC se activa
    { step: 4, delay: 4000 },   // Continúa el análisis
    { step: 5, delay: 2000 },   // Caja "Productos" aparece desde el PC
    { step: 6, delay: 6000 },   // La caja se mueve lentamente hacia el borde derecho
    { step: 7, delay: 500 },    // Se desvanece suavemente al llegar al final
    { step: 8, delay: 500 },    // Mostrar mensaje de completado y botón
  ]

  let currentIndex = 0
  const totalMs = steps.reduce((acc, s) => acc + s.delay, 0)
  const startTime = Date.now()

  const executeNextStep = () => {
    if (currentIndex < steps.length) {
      const currentStepData = steps[currentIndex]
      animationStep.value = currentStepData.step
      currentIndex++

      setTimeout(executeNextStep, currentStepData.delay)
    }
  }

  executeNextStep()

  // Smooth time-based progress synced with total timeline
  if (animationInterval) clearInterval(animationInterval)
  animationInterval = window.setInterval(() => {
    const elapsed = Date.now() - startTime
    const pct = Math.max(0, Math.min(100, (elapsed / totalMs) * 100))
    progress.value = pct
    if (elapsed >= totalMs) {
      progress.value = 100
      if (animationInterval) {
        clearInterval(animationInterval)
        animationInterval = null
      }
    }
  }, 50)
}

const getBgParticleStyle = (_index: number) => {
  const delay = Math.random() * 8
  const duration = 4 + Math.random() * 4
  const startX = Math.random() * 100
  const startY = Math.random() * 100
  const size = 2 + Math.random() * 3

  return {
    left: `${startX}%`,
    top: `${startY}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }
}

// Removed algo-visualization helpers (getAlgoStyle, getAlgoSymbol)

const getSymbolStyle = (index: number) => {
  const positions = [
    { top: '15%', left: '20%' },
    { top: '25%', right: '25%' },
    { top: '45%', left: '15%' },
    { top: '55%', right: '20%' },
    { top: '75%', left: '30%' },
    { top: '65%', right: '30%' }
  ]

  return {
    ...positions[index - 1],
    animationDelay: `${index * 0.4}s`
  }
}

const getProcessingSymbol = (index: number) => {
  const symbols = ['∑', '∆', 'π', '%', '∞', '∫']
  return symbols[index - 1] || '∑'
}

const getDataDropStyle = (index: number) => {
  const leftPosition = 20 + (index * 8) % 60 // Distribute across the box width
  const delay = Math.random() * 4
  const duration = 3 + Math.random() * 2 // Slower duration: 3-5 seconds

  return {
    left: `${leftPosition}%`,
    animationDelay: `${delay}s`,
    '--duration': `${duration}s`,
  }
}

const getDataDropText = (index: number) => {
  const dataItems = [
    'Ingresos', 'Gastos', 'Saldos', 'Historial', 'Pagos', 'Créditos',
    'Ahorros', 'Débitos', 'Transferencias', 'Depósitos', 'Retiros', 'Movimientos'
  ]
  return dataItems[index - 1] || 'Datos'
}

const handleContinue = () => {
  router.push('/financial/congrats')
}
</script>

<style scoped>
.data-processing-animation {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.background-space {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.bg-particle {
  position: absolute;
  background: rgba(0, 19, 64, 0.1);
  border-radius: 50%;
  animation: floatParticle 8s ease-in-out infinite;
  filter: blur(1px);
}

@keyframes floatParticle {

  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }

  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.8;
  }

  50% {
    transform: translateY(-10px) translateX(-15px);
    opacity: 0.5;
  }

  75% {
    transform: translateY(-30px) translateX(5px);
    opacity: 0.9;
  }
}

.main-container {
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 40px);
  margin: 20px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 19, 64, 0.12);
  overflow: hidden;
  position: relative;
}

.animation-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 1;
  padding: 20px;
}

.header-content {
  text-align: center;
  color: #001340;
  margin-bottom: 10px;
}

.main-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #001340;
}

.subtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

.animation-space {
  flex: 1;
  min-height: 200px;
  max-height: 300px;
  width: 100%;
  background: #f8fafc;
  border: 1px solid rgba(0, 19, 64, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.progress-wrapper {
  position: absolute;
  top: 10px;
  left: 12px;
  right: 12px;
  z-index: 20;
  transition: opacity 0.3s ease;
}

.progress-wrapper.done {
  opacity: 0;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  padding: 0 2px;
}

.progress-title {
  color: #001340;
  font-weight: 600;
  font-size: 12px;
}

.progress-value {
  color: #001340;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-size: 12px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(0, 19, 64, 0.08);
  border: 1px solid rgba(0, 19, 64, 0.15);
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #93c5fd, #1d4ed8);
  transition: width 0.2s ease;
}

.completion-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 250, 252, 0.6);
  backdrop-filter: blur(2px);
  z-index: 30;
  animation: fadeInUp 0.6s ease;
}

.completion-card {
  background: white;
  border: 1px solid rgba(0, 19, 64, 0.1);
  border-radius: 12px;
  padding: 20px 24px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 19, 64, 0.12);
}

.output-product-box {
  position: absolute;
  left: 52%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, #c7d2fe, #93c5fd);
  border: 3px solid #1d4ed8;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.8s ease;
  z-index: 11;
}

.output-product-box.visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.output-product-box.moving {
  left: 100%;
  transform: translate(-100%, -50%);
  transition: left 6s linear, transform 6s linear;
}

.output-product-box.disappeared {
  opacity: 0;
  transform: translate(-100%, -50%) scale(0.95);
  transition: opacity 0.6s ease;
}

.product-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}

.product-box-content .product-icon {
  font-size: 24px;
}

.moving-data-box {
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, #d2b48c, #daa520);
  border: 3px solid #8b4513;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.8s ease;
  z-index: 10;
}

.moving-data-box.visible {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.moving-data-box.moving {
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  transition: all 8s linear;
}

.moving-data-box.disappeared {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%) scale(0.8);
  transition: all 0.5s ease;
}

.data-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #8b4513;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.data-box-content .box-icon {
  font-size: 24px;
}

.data-rain {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 80px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.data-rain.active {
  opacity: 1;
}

.data-drop {
  position: absolute;
  top: -20px;
  font-size: 12px;
  font-weight: 500;
  color: #001340;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid rgba(0, 19, 64, 0.2);
  animation: dataDrop var(--duration, 4s) linear infinite;
  opacity: 0;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 19, 64, 0.1);
}

@keyframes dataDrop {
  0% {
    top: -20px;
    opacity: 0;
    transform: translateY(0) scale(0.8);
  }

  5% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  95% {
    opacity: 1;
    transform: translateY(80px) scale(1);
  }

  100% {
    top: 80px;
    opacity: 0;
    transform: translateY(80px) scale(0.8);
  }
}

.computer-animation {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.computer-container {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  opacity: 1;
  transform: scale(1);
}

.computer-monitor {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.monitor-screen {
  width: 180px;
  height: 130px;
  background: white;
  border: 4px solid #001340;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 20px rgba(0, 19, 64, 0.1),
    inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.monitor-stand {
  width: 60px;
  height: 30px;
  background: linear-gradient(180deg, #001340, #475569);
  border-radius: 0 0 8px 8px;
  margin-top: 5px;
  position: relative;
}

.monitor-stand::before {
  content: '';
  position: absolute;
  bottom: -15px;
  left: -20px;
  width: 100px;
  height: 15px;
  background: linear-gradient(180deg, #001340, #475569);
  border-radius: 8px;
}

.computer-base {
  width: 80px;
  height: 120px;
  background: linear-gradient(145deg, #001340, #475569);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 15px;
  box-shadow: 0 4px 12px rgba(0, 19, 64, 0.2);
}

.power-light {
  width: 8px;
  height: 8px;
  background: #64748b;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.power-light.active {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.cpu-fan {
  width: 40px;
  height: 40px;
  border: 2px solid #64748b;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.cpu-fan::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: repeating-conic-gradient(from 0deg,
      #94a3b8 0deg 30deg,
      #64748b 30deg 60deg);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.cpu-fan.spinning::before {
  animation: fanSpin 0.5s linear infinite;
}

.processing-display {
  width: 100%;
  height: 100%;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.processing-display.active {
  opacity: 1;
}

.code-lines {
  display: flex;
  flex-direction: column;
  gap: 3px;
  height: 50%;
}

.code-line {
  height: 2px;
  background: linear-gradient(90deg, transparent, #001340, transparent);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  animation: codeLine 2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

.processing-symbols {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.symbol {
  position: absolute;
  color: #001340;
  font-size: 12px;
  font-weight: bold;
  opacity: 0;
  animation: symbolAppear 2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes fanSpin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes codeLine {

  0%,
  100% {
    transform: scaleX(0);
    opacity: 0.3;
  }

  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes symbolAppear {

  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.data-flow-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  min-height: 0;
}

.flow-steps {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 19, 64, 0.2);
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
  transition: all 0.8s ease;
}

.flow-step.active {
  opacity: 1;
  transform: scale(1.05);
}

.step-icon {
  font-size: 1.5rem;
  background: rgba(0, 19, 64, 0.1);
  padding: 8px;
  border-radius: 50%;
  border: 2px solid rgba(0, 19, 64, 0.3);
}

.flow-step.active .step-icon {
  background: rgba(0, 19, 64, 0.2);
  border-color: #001340;
  box-shadow: 0 0 20px rgba(0, 19, 64, 0.4);
}

.flow-step span {
  color: #001340;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.pipeline-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  position: relative;
  padding: 15px 0;
  flex: 1;
  min-height: 0;
}

.pipeline-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 19, 64, 0.1);
  box-shadow: 0 4px 16px rgba(0, 19, 64, 0.05);
  min-height: 200px;
  max-height: 280px;
  overflow: hidden;
}

.section-header h3 {
  color: #001340;
  font-size: 1.1rem;
  margin: 0 0 6px 0;
  font-weight: 600;
}

.section-header p {
  color: #64748b;
  font-size: 11px;
  line-height: 1.3;
  margin: 0;
}

.data-box {
  background: rgba(0, 19, 64, 0.05);
  border: 2px solid rgba(0, 19, 64, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.data-box.active {
  opacity: 1;
  transform: translateY(0);
}

.box-icon {
  font-size: 1.5rem;
}

.data-box span {
  color: #001340;
  font-weight: 500;
}

.data-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.data-tag {
  background: rgba(0, 19, 64, 0.1);
  color: #001340;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.6s ease;
  animation-delay: var(--delay);
}

.data-tag.active {
  opacity: 1;
  transform: scale(1);
  animation: tagPulse 0.6s ease forwards;
  animation-delay: var(--delay);
}

@keyframes tagPulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.processing-core {
  height: 100%;
  position: relative;
  opacity: 0;
  transform: scale(0.9);
  transition: all 1s ease;
}

.processing-core.active {
  opacity: 1;
  transform: scale(1);
}

.ml-processor {
  background: rgba(0, 19, 64, 0.05);
  border: 2px solid rgba(0, 19, 64, 0.2);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}

.processor-title {
  color: #001340;
  font-weight: 600;
  margin-bottom: 12px;
}

.processing-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.process-step {
  background: rgba(0, 19, 64, 0.05);
  color: #001340;
  padding: 8px;
  border-radius: 6px;
  font-size: 12px;
  border: 1px solid rgba(0, 19, 64, 0.1);
}

.analysis-visual {
  position: relative;
  margin-top: 12px;
  height: 120px;
  overflow: hidden;
}

.analysis-bars {
  display: grid;
  grid-template-columns: repeat(14, 1fr);
  align-items: end;
  gap: 6px;
  height: 100%;
  padding: 6px 10px;
}

.analysis-bars .bar {
  width: 100%;
  height: 20%;
  background: linear-gradient(180deg, #93c5fd, #1d4ed8);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.15);
  animation: barPulse 1.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.05s);
  opacity: 0.95;
}

.analysis-bars .bar:nth-child(3n) {
  --h: 70%;
}

.analysis-bars .bar:nth-child(3n+1) {
  --h: 85%;
}

.analysis-bars .bar:nth-child(3n+2) {
  --h: 60%;
}

.analysis-bars .bar:nth-child(5n) {
  --h: 95%;
}

@keyframes barPulse {
  0% {
    height: 20%;
  }

  50% {
    height: var(--h, 80%);
  }

  100% {
    height: 20%;
  }
}

.scan-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(29, 78, 216, 0.10) 35%,
      rgba(29, 78, 216, 0.28) 50%,
      rgba(29, 78, 216, 0.10) 65%,
      transparent 100%);
  transform: translateX(-100%);
  animation: scanMove 2.6s linear infinite;
  mix-blend-mode: multiply;
  pointer-events: none;
}

@keyframes scanMove {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* Removed algo-visualization styles */

.output-categories {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.output-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 19, 64, 0.05);
  border: 2px solid rgba(0, 19, 64, 0.1);
  border-radius: 10px;
  padding: 12px;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s ease;
  animation-delay: var(--delay);
}

.output-item.active {
  opacity: 1;
  transform: translateX(0);
}

.output-icon {
  font-size: 1.3rem;
}

.output-item span {
  color: #001340;
  font-size: 13px;
  font-weight: 500;
}

/* Blur fuerte para contenido de ejemplo */
.output-item.demo-blur span {
  filter: blur(8px);
  -webkit-filter: blur(8px);
  user-select: none;
}

.connection-lines {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
}

.connection-svg {
  width: 100%;
  height: 200px;
}

.connection-path {
  stroke-dasharray: 10;
  stroke-dashoffset: 20;
  opacity: 0;
  transition: all 1s ease;
}

.connection-path.active {
  opacity: 1;
  animation: pathDraw 2s ease forwards;
}

@keyframes pathDraw {
  0% {
    stroke-dashoffset: 20;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

.path-particle {
  opacity: 0;
}

.path-particle.active {
  opacity: 1;
}

.process-indicators {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px 0;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
}

.indicator {
  opacity: 0.4;
  transition: all 0.5s ease;
}

.indicator.active {
  opacity: 1;
}

.indicator-label {
  color: white;
  font-size: 10px;
  padding: 4px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  text-align: center;
}

.continue-section {
  text-align: center;
  color: #001340;
  animation: fadeInUp 1s ease;
}

.completion-message {
  font-size: 1.2rem;
  margin-bottom: 24px;
  color: #64748b;
}

.continue-button {
  background: #001340;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 19, 64, 0.2);
}

.continue-button:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .main-container {
    margin: 10px;
    height: calc(100vh - 20px);
    max-width: none;
    width: calc(100% - 20px);
  }

  .pipeline-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .flow-steps {
    flex-direction: column;
    gap: 16px;
  }

  .connection-lines {
    display: none;
  }

  .process-indicators {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-container {
    margin: 5px;
    height: calc(100vh - 10px);
    width: calc(100% - 10px);
    border-radius: 16px;
  }

  .animation-container {
    padding: 15px;
    gap: 15px;
  }

  .main-title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .pipeline-section {
    padding: 16px;
  }

  .section-header h3 {
    font-size: 1.1rem;
  }

  .section-header p {
    font-size: 12px;
  }

  .flow-step {
    gap: 4px;
  }

  .step-icon {
    font-size: 1.5rem;
    padding: 8px;
  }

  .flow-step span {
    font-size: 12px;
  }

  .process-indicators {
    grid-template-columns: 1fr;
  }
}
</style>
