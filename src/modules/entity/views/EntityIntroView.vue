<template>
  <div class="entity-intro-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />

    <!-- Main Content -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Title Section -->
      <div class="title-section" :class="{ 'visible': showTitle }">
        <h1 class="main-title">Experiencia de Entidad</h1>
        <p class="subtitle">Explora cómo las finanzas abiertas desbloquean un nuevo mundo de posibilidades: control
          total sobre consentimientos y analítica inteligente de datos transaccionales.</p>
      </div>

      <!-- Cards Section -->
      <div class="cards-section" :class="{ 'visible': showCards }">
        <div class="experience-card card-1" :class="{ 'visible': showCard1 }">
          <div class="card-number">1</div>
          <div class="card-content">
            <h2 class="card-title">Gestor de Consentimientos en finanzas abiertas</h2>
            <p class="card-description">Administra y controla los permisos de acceso a datos financieros de manera
              segura y transparente.</p>
          </div>
        </div>

        <div class="experience-card card-2" :class="{ 'visible': showCard2 }">
          <div class="card-number">2</div>
          <div class="card-content">
            <h2 class="card-title">Transactional Insights</h2>
            <p class="card-description">Obtén análisis profundos y visualizaciones de datos transaccionales para tomar
              decisiones informadas.</p>
          </div>
        </div>
      </div>

      <!-- Continue Button -->
      <div class="action-section" :class="{ 'visible': showAction }">
        <button class="continue-button" @click="continueToLogin">
          <span class="button-text">Comenzar experiencia</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../../transactional-insights/components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showContent = ref(false)
const showTitle = ref(false)
const showCards = ref(false)
const showCard1 = ref(false)
const showCard2 = ref(false)
const showAction = ref(false)

// Start animations sequence
const startAnimations = async () => {
  showContent.value = true

  setTimeout(() => {
    showTitle.value = true

    setTimeout(() => {
      showCards.value = true

      setTimeout(() => {
        showCard1.value = true

        setTimeout(() => {
          showCard2.value = true

          setTimeout(() => {
            showAction.value = true
          }, 600)
        }, 400)
      }, 300)
    }, 800)
  }, 300)
}

// Actions
const continueToLogin = () => {
  router.push({ name: 'entity-login' })
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
.entity-intro-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  padding: 40px 20px;
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

/* Main content */
.main-content {
  text-align: center;
  max-width: 800px;
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

/* Title section */
.title-section {
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 20px 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 1.3rem;
  color: #4b5563;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Cards section */
.cards-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.cards-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.experience-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 25px;
  text-align: left;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.experience-card.visible {
  opacity: 1;
  transform: translateX(0);
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
}

.card-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgba(97, 40, 120, 0.3);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.card-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.card-2 {
  animation-delay: 0.2s;
}

/* Action section */
.action-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.action-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(97, 40, 120, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  animation: buttonGlow 2s ease-in-out infinite alternate;
}

@keyframes buttonGlow {
  0% {
    box-shadow: 0 10px 30px rgba(97, 40, 120, 0.4);
    transform: translateY(0);
  }

  100% {
    box-shadow: 0 15px 40px rgba(97, 40, 120, 0.6);
    transform: translateY(-2px);
  }
}

.continue-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(97, 40, 120, 0.6);
}

.continue-button:active {
  transform: translateY(-2px);
}

.button-text {
  font-size: 1.2rem;
}

.button-icon {
  animation: slideArrow 2s ease-in-out infinite;
}

@keyframes slideArrow {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(3px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .experience-card {
    flex-direction: column;
    text-align: center;
    padding: 25px;
    gap: 20px;
  }

  .card-title {
    font-size: 1.2rem;
  }

  .card-description {
    font-size: 0.95rem;
  }

  .continue-button {
    padding: 16px 35px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .entity-intro-container {
    padding: 20px 15px;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .experience-card {
    padding: 20px;
  }

  .card-number {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }
}
</style>