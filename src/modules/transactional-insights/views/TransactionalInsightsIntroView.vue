<template>
  <div class="insights-animation-container">
    <!-- Animated background elements -->
    <div class="background-elements">
      <!-- Financial symbols -->
      <div class="floating-element dollar-sign">$</div>
      <div class="floating-element peso-sign">$</div>
      <div class="floating-element euro-sign">€</div>

      <!-- Data charts and graphs -->
      <div class="floating-element chart-bar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="16" width="4" height="5" fill="currentColor" />
          <rect x="8" y="12" width="4" height="9" fill="currentColor" />
          <rect x="13" y="8" width="4" height="13" fill="currentColor" />
          <rect x="18" y="4" width="4" height="17" fill="currentColor" />
        </svg>
      </div>

      <div class="floating-element trend-up">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" />
          <path d="M14 7H21V14" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element pie-chart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
          <path d="M12 4V12L18 18" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- Transaction symbols -->
      <div class="floating-element card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" />
          <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element transfer-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" />
          <path d="M17 17H17.01" stroke="currentColor" stroke-width="2" />
          <path d="M7 7H7.01" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- Data points and analytics -->
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>

      <!-- Numbers representing data -->
      <div class="floating-element number">42%</div>
      <div class="floating-element number">1.2M</div>
      <div class="floating-element number">+15%</div>
      <div class="floating-element number">87K</div>
      <div class="floating-element number">-8%</div>
      <div class="floating-element number">2.4K</div>
      <div class="floating-element number">+23%</div>
      <div class="floating-element number">156</div>

      <!-- More financial and data icons -->
      <div class="floating-element bank-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 8V10H2V8L12 2Z" stroke="currentColor" stroke-width="2" />
          <path d="M5 10V20H8V10" stroke="currentColor" stroke-width="2" />
          <path d="M10 10V20H14V10" stroke="currentColor" stroke-width="2" />
          <path d="M16 10V20H19V10" stroke="currentColor" stroke-width="2" />
          <path d="M3 20H21V22H3V20Z" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element wallet-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
          <path d="M18 10H20V14H18" stroke="currentColor" stroke-width="2" />
          <circle cx="18" cy="12" r="1" fill="currentColor" />
        </svg>
      </div>

      <div class="floating-element analytics-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" />
          <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element money-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
          <path d="M12 8V16" stroke="currentColor" stroke-width="2" />
          <path d="M8 12H16" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element shield-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 5V12C22 18 12 22 12 22S2 18 2 12V5L12 2Z" stroke="currentColor" stroke-width="2" />
          <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element lock-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2" />
          <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor"
            stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element target-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" />
          <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element users-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor"
            stroke-width="2" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" />
          <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="currentColor" stroke-width="2" />
          <path d="M16 3.12598C17.7252 3.56992 19 5.13616 19 7C19 8.86384 17.7252 10.4301 16 10.874"
            stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- New financial icons -->
      <div class="floating-element bitcoin-icon">₿</div>
      <div class="floating-element percentage-icon">%</div>

      <!-- New chart icons -->
      <div class="floating-element line-chart">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 20L9 14L13 18L21 10" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element calculator-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2" />
          <rect x="8" y="6" width="8" height="2" fill="currentColor" />
          <rect x="8" y="10" width="2" height="2" fill="currentColor" />
          <rect x="12" y="10" width="2" height="2" fill="currentColor" />
          <rect x="8" y="14" width="2" height="2" fill="currentColor" />
          <rect x="12" y="14" width="2" height="2" fill="currentColor" />
        </svg>
      </div>

      <!-- New business icons -->
      <div class="floating-element building-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 21H21M5 21V7L13 3L21 7V21M9 9V13M15 9V13" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element handshake-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 14C16 14 17.5 14 19 16S23 20 23 20M8 14C8 14 6.5 14 5 16S1 20 1 20M16 8C18 10 20 12 22 12M8 8C6 10 4 12 2 12"
            stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element document-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 3V7C14 8.1 14.9 9 16 9H20M6 3H14L20 9V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V5C4 3.9 4.9 3 6 3Z"
            stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- New diverse financial icons -->
      <div class="floating-element yen-icon">¥</div>
      <div class="floating-element pound-icon">£</div>
      <div class="floating-element rupee-icon">₹</div>

      <!-- Tech and digital icons -->
      <div class="floating-element blockchain-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
          <rect x="15" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
          <rect x="3" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
          <rect x="15" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
          <path d="M9 6H15M9 18H15M6 9V15M18 9V15" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element network-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2" />
          <circle cx="6" cy="19" r="3" stroke="currentColor" stroke-width="2" />
          <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2" />
          <path d="M9 7L7 17M15 7L17 17" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element database-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2" />
          <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2" />
          <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- Investment and growth icons -->
      <div class="floating-element growth-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element diamond-icon">◆</div>
      <div class="floating-element star-icon">★</div>
      <div class="floating-element plus-icon">+</div>

      <!-- Economic symbols -->
      <div class="floating-element infinity-icon">∞</div>
      <div class="floating-element delta-icon">Δ</div>
      <div class="floating-element sigma-icon">Σ</div>

      <!-- More currency symbols -->
      <div class="floating-element won-icon">₩</div>
      <div class="floating-element franc-icon">₣</div>
      <div class="floating-element lira-icon">₺</div>
      <div class="floating-element ruble-icon">₽</div>

      <!-- Business and finance icons -->
      <div class="floating-element briefcase-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2" />
          <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element chart-line-up">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 18L12 13L16 17L21 12" stroke="currentColor" stroke-width="2" />
          <path d="M17 12H21V16" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element coins-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
          <path d="M16 8C18.21 8 20 9.79 20 12S18.21 16 16 16" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- Geometric and mathematical symbols -->
      <div class="floating-element triangle-icon">▲</div>
      <div class="floating-element square-icon">■</div>
      <div class="floating-element circle-icon">●</div>
      <div class="floating-element hexagon-icon">⬡</div>
      <div class="floating-element arrow-up">↗</div>
      <div class="floating-element arrow-down">↘</div>
      <div class="floating-element equals-icon">=</div>
      <div class="floating-element hash-icon">#</div>

      <!-- Tech symbols -->
      <div class="floating-element api-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="4" height="12" stroke="currentColor" stroke-width="2" />
          <rect x="10" y="2" width="4" height="20" stroke="currentColor" stroke-width="2" />
          <rect x="18" y="8" width="4" height="8" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <div class="floating-element server-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
          <rect x="2" y="10" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
          <rect x="2" y="16" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
          <circle cx="6" cy="6" r="1" fill="currentColor" />
          <circle cx="6" cy="12" r="1" fill="currentColor" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
        </svg>
      </div>

      <div class="floating-element cloud-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M17.5 19H9C6.79 19 5 17.21 5 15C5 13.07 6.5 11.45 8.5 11.1C9.24 8.35 11.92 6.5 15 6.5C18.59 6.5 21.5 9.41 21.5 13C21.5 13.28 21.45 13.54 21.39 13.8C22.32 14.36 23 15.35 23 16.5C23 18.43 21.43 20 19.5 20H17.5"
            stroke="currentColor" stroke-width="2" />
        </svg>
      </div>

      <!-- More numbers and percentages -->
      <div class="floating-element number">5.1K</div>
      <div class="floating-element number">67%</div>
      <div class="floating-element number">+33K</div>
      <div class="floating-element number">-7%</div>
      <div class="floating-element number">724</div>
      <div class="floating-element number">+89%</div>
      <div class="floating-element number">8.9M</div>
      <div class="floating-element number">-3.8%</div>
      <div class="floating-element number">321K</div>
      <div class="floating-element number">+76%</div>

      <!-- More data symbols -->
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
      <div class="floating-element data-point">●</div>
    </div>

    <div class="intro-container">

      <div class="intro-title-container" :class="{ 'visible': showTitle }">
        <h1 class="intro-title">{{ titleText }}</h1>
      </div>

      <div class="intro-description-container" :class="{ 'visible': showDescription }">
        <p class="intro-description">{{ descriptionText }}</p>
      </div>

      <div class="button-container" :class="{ 'visible': showButton }">
        <button class="continue-button" @click="handleContinue">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Animation variables
const showTitle = ref(false)
const showDescription = ref(false)
const showButton = ref(false)

const titleText = "Transactional Insights"
const descriptionText = "Nuestra solución inteligente que convierte cada transacción en una oportunidad de entender mejor a tus clientes. Diseñado con experiencia global y listo para Colombia, abre el camino al verdadero potencial del Open Finance con información clara, ágil y accionable."

// Smooth appear animation function
const showElements = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      showTitle.value = true
      setTimeout(() => {
        showDescription.value = true
        setTimeout(() => {
          showButton.value = true
          resolve()
        }, 800)
      }, 800)
    }, 500)
  })
}

// Handle continue button click
const handleContinue = () => {
  router.push({ name: 'entity-transactional-insights-bank-selection' })
}

// Start smooth appear animation when component mounts
onMounted(async () => {
  // Start smooth appear animations sequentially after a short delay
  setTimeout(async () => {
    await showElements()
  }, 500)
})
</script>

<style scoped>
.insights-animation-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  opacity: 0;
  transform: scale(1.05);
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animated background elements */
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
  opacity: 0.5;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 20s ease-in-out infinite;
  user-select: none;
}

/* Financial symbols */
.dollar-sign {
  font-size: 3rem;
  top: 5%;
  left: 5%;
  animation-delay: -2s;
}

.peso-sign {
  font-size: 2.5rem;
  top: 85%;
  left: 95%;
  animation-delay: -8s;
}

.euro-sign {
  font-size: 2.8rem;
  top: 5%;
  left: 95%;
  animation-delay: -15s;
}

/* Data visualization elements */
.chart-bar {
  top: 85%;
  left: 25%;
  animation-delay: -5s;
  font-size: 1.5rem;
}

.trend-up {
  top: 25%;
  left: 50%;
  animation-delay: -12s;
  font-size: 1.8rem;
}

.pie-chart {
  top: 85%;
  left: 75%;
  animation-delay: -18s;
  font-size: 1.6rem;
}

/* Transaction elements */
.card-icon {
  top: 55%;
  left: 5%;
  animation-delay: -3s;
  font-size: 1.4rem;
}

.transfer-icon {
  top: 90%;
  left: 35%;
  animation-delay: -10s;
  font-size: 1.3rem;
}

/* Data points */
.data-point {
  font-size: 1rem;
}

.data-point:nth-child(10) {
  top: 30%;
  left: 25%;
  animation-delay: -1s;
}

.data-point:nth-child(11) {
  top: 55%;
  left: 90%;
  animation-delay: -7s;
}

.data-point:nth-child(12) {
  top: 85%;
  left: 50%;
  animation-delay: -14s;
}

.data-point:nth-child(13) {
  top: 10%;
  left: 45%;
  animation-delay: -9s;
}

/* Numbers and percentages */
.number {
  font-size: 1.2rem;
  font-weight: 700;
}

.number:nth-child(14) {
  top: 45%;
  left: 92%;
  animation-delay: -4s;
}

.number:nth-child(15) {
  top: 65%;
  left: 8%;
  animation-delay: -11s;
}

.number:nth-child(16) {
  top: 15%;
  left: 55%;
  animation-delay: -16s;
}

.number:nth-child(17) {
  top: 90%;
  left: 65%;
  animation-delay: -6s;
}

.number:nth-child(18) {
  top: 35%;
  left: 88%;
  animation-delay: -13s;
}

.number:nth-child(19) {
  top: 50%;
  left: 3%;
  animation-delay: -2s;
}

.number:nth-child(20) {
  top: 5%;
  left: 30%;
  animation-delay: -17s;
}

.number:nth-child(21) {
  top: 95%;
  left: 40%;
  animation-delay: -9s;
}

/* New financial and data icons */
.bank-icon {
  top: 25%;
  left: 5%;
  animation-delay: -4s;
  font-size: 1.5rem;
}

.wallet-icon {
  top: 65%;
  left: 95%;
  animation-delay: -11s;
  font-size: 1.4rem;
}

.analytics-icon {
  top: 45%;
  left: 75%;
  animation-delay: -7s;
  font-size: 1.6rem;
}

.money-icon {
  top: 85%;
  left: 5%;
  animation-delay: -14s;
  font-size: 1.3rem;
}

.shield-icon {
  top: 10%;
  left: 75%;
  animation-delay: -1s;
  font-size: 1.4rem;
}

.lock-icon {
  top: 35%;
  left: 15%;
  animation-delay: -8s;
  font-size: 1.2rem;
}

.target-icon {
  top: 75%;
  left: 30%;
  animation-delay: -16s;
  font-size: 1.5rem;
}

.users-icon {
  top: 55%;
  left: 60%;
  animation-delay: -5s;
  font-size: 1.4rem;
}

/* Additional data points */
.data-point:nth-child(32) {
  top: 20%;
  left: 95%;
  animation-delay: -3s;
}

.data-point:nth-child(33) {
  top: 40%;
  left: 35%;
  animation-delay: -12s;
}

.data-point:nth-child(34) {
  top: 95%;
  left: 85%;
  animation-delay: -6s;
}

.data-point:nth-child(35) {
  top: 5%;
  left: 15%;
  animation-delay: -15s;
}

.data-point:nth-child(36) {
  top: 60%;
  left: 45%;
  animation-delay: -10s;
}

.data-point:nth-child(37) {
  top: 80%;
  left: 60%;
  animation-delay: -18s;
}

/* New financial and business icons */
.bitcoin-icon {
  font-size: 2rem;
  top: 28%;
  left: 95%;
  animation-delay: -4s;
}

.percentage-icon {
  font-size: 1.8rem;
  top: 15%;
  left: 22%;
  animation-delay: -12s;
}

.line-chart {
  top: 68%;
  left: 65%;
  animation-delay: -7s;
  font-size: 1.4rem;
}

.calculator-icon {
  top: 85%;
  left: 15%;
  animation-delay: -20s;
  font-size: 1.3rem;
}

.building-icon {
  top: 22%;
  left: 88%;
  animation-delay: -10s;
  font-size: 1.5rem;
}

.handshake-icon {
  top: 75%;
  left: 5%;
  animation-delay: -14s;
  font-size: 1.4rem;
}

.document-icon {
  top: 45%;
  left: 85%;
  animation-delay: -8s;
  font-size: 1.3rem;
}

/* New diverse financial icons */
.yen-icon {
  font-size: 2.2rem;
  top: 42%;
  left: 2%;
  animation-delay: -22s;
}

.pound-icon {
  font-size: 2rem;
  top: 12%;
  left: 92%;
  animation-delay: -16s;
}

.rupee-icon {
  font-size: 1.9rem;
  top: 88%;
  left: 92%;
  animation-delay: -6s;
}

/* Tech and digital icons */
.blockchain-icon {
  top: 32%;
  left: 8%;
  animation-delay: -18s;
  font-size: 1.4rem;
}

.network-icon {
  top: 18%;
  left: 62%;
  animation-delay: -24s;
  font-size: 1.5rem;
}

.database-icon {
  top: 72%;
  left: 82%;
  animation-delay: -13s;
  font-size: 1.3rem;
}

/* Investment and growth icons */
.growth-icon {
  top: 28%;
  left: 8%;
  animation-delay: -19s;
  font-size: 1.4rem;
}

/* Simple symbols */
.diamond-icon {
  font-size: 1.5rem;
  top: 78%;
  left: 38%;
  animation-delay: -9s;
}

.star-icon {
  font-size: 1.7rem;
  top: 36%;
  left: 65%;
  animation-delay: -15s;
}

.plus-icon {
  font-size: 2rem;
  top: 58%;
  left: 92%;
  animation-delay: -23s;
}

/* Economic symbols */
.infinity-icon {
  font-size: 1.8rem;
  top: 52%;
  left: 5%;
  animation-delay: -26s;
}

.delta-icon {
  font-size: 1.6rem;
  top: 22%;
  left: 32%;
  animation-delay: -17s;
}

.sigma-icon {
  font-size: 1.9rem;
  top: 82%;
  left: 62%;
  animation-delay: -25s;
}

/* More currency symbols */
.won-icon {
  font-size: 2.1rem;
  top: 25%;
  left: 5%;
  animation-delay: -28s;
}

.franc-icon {
  font-size: 1.8rem;
  top: 65%;
  left: 5%;
  animation-delay: -32s;
}

.lira-icon {
  font-size: 2rem;
  top: 45%;
  left: 75%;
  animation-delay: -34s;
}

.ruble-icon {
  font-size: 1.9rem;
  top: 25%;
  left: 25%;
  animation-delay: -30s;
}

/* Business and finance icons */
.briefcase-icon {
  top: 19%;
  left: 5%;
  animation-delay: -36s;
  font-size: 1.4rem;
}

.chart-line-up {
  top: 71%;
  left: 42%;
  animation-delay: -29s;
  font-size: 1.5rem;
}

.coins-icon {
  top: 39%;
  left: 28%;
  animation-delay: -33s;
  font-size: 1.3rem;
}

/* Geometric and mathematical symbols - using grid positions */
.triangle-icon {
  font-size: 1.6rem;
  top: 5%;
  left: 75%;
  animation-delay: -31s;
}

.square-icon {
  font-size: 1.4rem;
  top: 65%;
  left: 25%;
  animation-delay: -35s;
}

.circle-icon {
  font-size: 1.2rem;
  top: 85%;
  left: 5%;
  animation-delay: -27s;
}

.hexagon-icon {
  font-size: 1.7rem;
  top: 45%;
  left: 95%;
  animation-delay: -37s;
}

.arrow-up {
  font-size: 1.8rem;
  top: 5%;
  left: 25%;
  animation-delay: -29s;
}

.arrow-down {
  font-size: 1.8rem;
  top: 65%;
  left: 95%;
  animation-delay: -38s;
}

.equals-icon {
  font-size: 1.5rem;
  top: 65%;
  left: 50%;
  animation-delay: -34s;
}

.hash-icon {
  font-size: 1.6rem;
  top: 85%;
  left: 50%;
  animation-delay: -30s;
}

/* Tech symbols */
.api-icon {
  top: 29%;
  left: 15%;
  animation-delay: -32s;
  font-size: 1.4rem;
}

.server-icon {
  top: 61%;
  left: 75%;
  animation-delay: -36s;
  font-size: 1.3rem;
}

.cloud-icon {
  top: 13%;
  left: 41%;
  animation-delay: -33s;
  font-size: 1.5rem;
}

/* Additional numbers positioning */
.number:nth-child(58) {
  top: 21%;
  left: 75%;
  animation-delay: -39s;
}

.number:nth-child(59) {
  top: 81%;
  left: 48%;
  animation-delay: -35s;
}

.number:nth-child(60) {
  top: 46%;
  left: 12%;
  animation-delay: -32s;
}

.number:nth-child(61) {
  top: 31%;
  left: 65%;
  animation-delay: -37s;
}

.number:nth-child(62) {
  top: 69%;
  left: 21%;
  animation-delay: -34s;
}

.number:nth-child(63) {
  top: 11%;
  left: 52%;
  animation-delay: -30s;
}

.number:nth-child(64) {
  top: 87%;
  left: 75%;
  animation-delay: -36s;
}

.number:nth-child(65) {
  top: 39%;
  left: 8%;
  animation-delay: -33s;
}

.number:nth-child(66) {
  top: 59%;
  left: 95%;
  animation-delay: -38s;
}

.number:nth-child(67) {
  top: 17%;
  left: 31%;
  animation-delay: -31s;
}

/* Float animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }

  25% {
    transform: translateY(-20px) rotate(2deg);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-10px) rotate(-1deg);
    opacity: 0.4;
  }

  75% {
    transform: translateY(-30px) rotate(1deg);
    opacity: 0.55;
  }
}

.intro-container {
  max-width: 900px;
  width: 90%;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
}

.intro-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40px;
  color: white;
  opacity: 0;
  transform: scale(0.8);
  animation: iconAppear 1s ease 0.5s forwards;
}

@keyframes iconAppear {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.intro-title-container {
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro-title-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0;
  min-height: 1.2em;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-description-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro-description-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-description {
  font-size: 1.4rem;
  line-height: 1.7;
  color: #374151;
  font-weight: 500;
  margin: 0;
  min-height: 2em;
}

.cursor {
  display: inline-block;
  opacity: 0;
  color: #ec4899;
  font-weight: 400;
  animation: blink 1s infinite;
  transition: opacity 0.3s ease;
}

.cursor.show {
  opacity: 1;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.button-container {
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
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
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(97, 40, 120, 0.3);
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.4);
}

/* Responsive styles */
@media (max-width: 768px) {
  .intro-container {
    padding: 30px 15px;
  }

  .intro-icon {
    width: 90px;
    height: 90px;
    margin-bottom: 35px;
  }

  .intro-title {
    font-size: 3rem;
  }

  .intro-description {
    font-size: 1.2rem;
  }

  .continue-button {
    padding: 12px 25px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .intro-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
  }

  .intro-title {
    font-size: 2.5rem;
  }

  .intro-description {
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .continue-button {
    padding: 10px 20px;
    font-size: 1rem;
  }
}
</style>