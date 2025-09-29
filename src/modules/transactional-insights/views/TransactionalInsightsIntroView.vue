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

      <!-- More data symbols -->
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
        <button class="continue-button">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Animation variables
const showTitle = ref(false)
const showDescription = ref(false)
const showButton = ref(false)

const titleText = "Transactional Insights"
const descriptionText = "nuestra solución inteligente que convierte cada transacción en una oportunidad de entender mejor a tus clientes. Diseñado con experiencia global y listo para Colombia, abre el camino al verdadero potencial del Open Finance con información clara, ágil y accionable"

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
  top: 15%;
  left: 10%;
  animation-delay: -2s;
}

.peso-sign {
  font-size: 2.5rem;
  top: 70%;
  left: 85%;
  animation-delay: -8s;
}

.euro-sign {
  font-size: 2.8rem;
  top: 25%;
  left: 80%;
  animation-delay: -15s;
}

/* Data visualization elements */
.chart-bar {
  top: 60%;
  left: 15%;
  animation-delay: -5s;
  font-size: 1.5rem;
}

.trend-up {
  top: 20%;
  left: 70%;
  animation-delay: -12s;
  font-size: 1.8rem;
}

.pie-chart {
  top: 75%;
  left: 75%;
  animation-delay: -18s;
  font-size: 1.6rem;
}

/* Transaction elements */
.card-icon {
  top: 40%;
  left: 5%;
  animation-delay: -3s;
  font-size: 1.4rem;
}

.transfer-icon {
  top: 80%;
  left: 20%;
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