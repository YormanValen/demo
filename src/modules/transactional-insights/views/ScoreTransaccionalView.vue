<template>
  <div class="score-transaccional-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Score Transaccional</h1>
      <p class="subtitle">Potencie el scoring crediticio de sus clientes fusionando datos tradicionales de buró con
        datos transaccionales</p>
      <div class="description-container">
        <div class="description-card">
          <ul class="description-list">
            <li class="description-text">Aumentos notorios en la precisión al fusionar lo mejor de 2 mundos: datos de
              buró
              + datos transaccionales.</li>
            <li class="description-text">Incentiva a que su cliente comparta sus datos: Mejore su score crediticio dando
              permiso para acceder a sus datos en Open Finance.</li>
            <li class="description-text">Capture nuevos segmentos de mercado en población sin historial crediticio pero
              con cuentas bancarias, billeteras digitales y otros activos en el sistema financiero.</li>
          </ul>
        </div>
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
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2" />
                  <path d="M3 10h18" stroke="currentColor" stroke-width="2" />
                  <path d="M8 14h8" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>
              <h4 class="card-title">Datos de Buró</h4>
            </div>
          </div>

          <!-- Center (ML) -->
          <div class="fusion-center">
            <div ref="mlRef" class="ml-model" :class="{ 'visible': showML, 'processing': mlProcessing }">
              <h4 class="ml-title">Modelo de Machine Learning</h4>
              <div class="ml-status">
                <div class="gear-animation" :class="{ 'spinning': mlProcessing }">⚙️</div>
                <p class="ml-description" v-if="!mlProcessing">Listo para procesar</p>
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                </svg>
              </div>
              <h4 class="card-title">Datos Transaccionales</h4>
            </div>
          </div>
        </div>

        <!-- Continue button removed; confirm is fixed at bottom -->

        <!-- Score Result with Person and Confetti -->
        <div class="score-result-section" :class="{ 'visible': showScoreResult }">
          <div class="person-container">
            <!-- Confetti particles -->
            <div v-if="showConfetti" class="confetti-layer">
              <div v-for="(particle, index) in confettiParticles" :key="index" class="confetti-particle"
                :style="particle"></div>
            </div>

            <!-- Person icon -->
            <div class="person-icon" :class="{ 'celebrating': showConfetti }">
              <span class="person-emoji">{{ getCurrentPerson().emoji }}</span>
            </div>

            <!-- Person name -->
            <div class="person-name">{{ getCurrentPerson().name }}</div>

            <!-- Animated Score -->
            <div class="score-display-large">
              <div class="animated-score">{{ animatedScore }}</div>
              <div class="score-label-large">Score Transaccional</div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Button (fixed bottom, always visible) -->
    <div class="confirm-footer">
      <button class="continue-button" @click="onConfirm">Continuar</button>
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
const showScoreResult = ref(false)
const showConfetti = ref(false)
const visibleCards = ref<Set<number>>(new Set())
const movingCards = ref<Set<number>>(new Set())
const fadingCards = ref<Set<number>>(new Set())
const cardsGone = ref(false)
const processingSeconds = ref(6)

// Cards and movement
const cardMoveStyles = ref<Record<number, Record<string, string>>>({})
const card0Ref = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const mlRef = ref<HTMLElement | null>(null)

// Score animation
const animatedScore = ref(0)
const currentPersonIndex = ref(0)

// Different people data
const people = [
  {
    name: 'Juan',
    emoji: '👨‍🏫',
    targetScore: 770
  },
  {
    name: 'María',
    emoji: '👩‍💼',
    targetScore: 685
  },
  {
    name: 'Carlos',
    emoji: '👨‍🔬',
    targetScore: 742
  },
  {
    name: 'Ana',
    emoji: '👩‍🎨',
    targetScore: 695
  }
]

const getCurrentPerson = () => people[currentPersonIndex.value]

// Confetti particles
const confettiParticles = ref<Record<string, string>[]>([])

// Animation helpers
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
    fadingCards.value.add(0)
    fadingCards.value.add(1)
    setTimeout(() => {
      cardsGone.value = true
    }, 600)
  }, 1200)
}

const animateScore = () => {
  const duration = 3000 // 3 seconds
  const startTime = Date.now()
  const startScore = 0
  const targetScore = getCurrentPerson().targetScore

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic

    animatedScore.value = Math.round(startScore + (targetScore - startScore) * easeOutProgress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Score reached target, start confetti
      setTimeout(async () => {
        await startConfetti()
        // Wait 3 seconds after confetti ends, then restart cycle
        setTimeout(() => {
          restartAnimationCycle()
        }, 3000)
      }, 500)
    }
  }

  animate()
}

const startConfetti = () => {
  showConfetti.value = true
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']

  confettiParticles.value = Array.from({ length: 50 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${2 + Math.random() * 3}s`
  }))

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      showConfetti.value = false
      resolve()
    }, 4000)
  })
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
    showScoreResult.value = true

    setTimeout(() => {
      animateScore()
    }, 800)
  }, 6000)
}

// Reset animation state
const resetAnimationState = () => {
  // First hide the current result
  showScoreResult.value = false
  showConfetti.value = false
  confettiParticles.value = []

  // Wait for fade out, then change person
  setTimeout(() => {
    // Move to next person
    currentPersonIndex.value = (currentPersonIndex.value + 1) % people.length

    // Reset cards visibility and positions
    movingCards.value.clear()
    fadingCards.value.clear()
    cardsGone.value = false
    cardMoveStyles.value = {}

    // Reset ML processing
    mlProcessing.value = false

    // Reset score
    animatedScore.value = 0

    // Keep cards and ML visible for restart
    visibleCards.value.clear()
    visibleCards.value.add(0)
    visibleCards.value.add(1)
    showML.value = true
  }, 500) // Wait 500ms for fade out
}

const runAnimationCycle = async () => {
  // Wait 3 seconds before starting fusion
  setTimeout(async () => {
    // Start the fusion and processing cycle
    await moveCardsIntoML()
    setTimeout(() => runProcessing(), 200)
  }, 3000)
}

const restartAnimationCycle = () => {
  resetAnimationState()
  // Start next cycle after reset completes (500ms for fade + 500ms buffer)
  setTimeout(() => runAnimationCycle(), 1000)
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
      // 3. Iniciar el ciclo infinito de animación
      runAnimationCycle()
    }, 300)
  }, 300)
}

// Confirm action: navigate to submenu
const onConfirm = () => {
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
.score-transaccional-container {
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
  max-width: 1000px;
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
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.description-list li {
  position: relative;
  padding-left: 25px;
  margin: 8px 0;
}

.description-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
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

.card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 6px 0;
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

.ml-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 15px 0;
}

.gear-animation {
  font-size: 6rem;
  margin: 10px 0;
  display: inline-block;
  animation: none;
  transition: transform 0.5s ease;
}

.gear-animation.spinning {
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

/* Confirm footer (moved higher up) */
.confirm-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 350px;
  /* moved higher up from 16px to 80px */
  display: flex;
  justify-content: center;
  z-index: 20;
}

/* Score Result Section */
.score-result-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 40px;
}

.score-result-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.person-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(97, 40, 120, 0.15);
  border: 3px solid transparent;
  background-clip: padding-box;
  max-width: 500px;
  margin: 0 auto;
}

.person-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 24px;
  padding: 3px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  z-index: -1;
}

.person-icon {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #374151;
  margin-bottom: 24px;
  transition: transform 0.3s ease;
}

.person-icon.celebrating {
  animation: celebrate 3s ease-in-out infinite alternate;
}

@keyframes celebrate {
  0% {
    transform: scale(1) rotate(0deg);
  }

  20% {
    transform: scale(1.01) rotate(-1deg);
  }

  50% {
    transform: scale(1.03) rotate(1deg);
  }

  80% {
    transform: scale(1.05) rotate(2deg);
  }

  100% {
    transform: scale(1.05) rotate(2deg);
  }
}

.score-display-large {
  text-align: center;
  margin: 20px 0;
}

.animated-score {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 12px;
}

.person-emoji {
  font-size: 6rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.person-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}

.score-label-large {
  font-size: 1.4rem;
  font-weight: 600;
  color: #374151;
}

.celebration-message {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 24px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

/* Confetti */
.confetti-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.confetti-particle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: confettiFall linear forwards;
}

@keyframes confettiFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
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

  .data-sources {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .score-transaccional-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .data-sources {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .fusion-arrow {
    transform: rotate(90deg);
  }

  .fusion-arrow.visible {
    transform: rotate(90deg) scale(1);
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .score-transaccional-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .data-source {
    padding: 20px;
  }

  .result-container {
    padding: 30px 20px;
  }

  .benefit-card {
    padding: 20px;
  }
}
</style>
