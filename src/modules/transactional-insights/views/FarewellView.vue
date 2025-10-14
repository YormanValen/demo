<template>
  <div class="farewell-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />

    <!-- Floating particles for impact -->
    <div class="floating-particles">
      <div v-for="n in 12" :key="n" class="particle" :class="`particle-${n}`"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Icon/Logo Section -->
      <div class="icon-section" :class="{ 'visible': showIcon }">
        <div class="main-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="currentColor"
              fill-opacity="0.1" />
            <path d="M8 12l2 2 4-4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </div>

      <!-- Message Section -->
      <div class="message-section" :class="{ 'visible': showMessage }">
        <h1 class="main-question">¿Te gustaría identificar casos de uso específicos para tu entidad?</h1>

        <div class="description-block">
          <p class="description-text">Podemos ayudarte a mapear oportunidades con datos abiertos y APIs.</p>
        </div>

        <!-- Call to action -->
        <div class="cta-section" :class="{ 'visible': showCTA }">
          <div class="cta-message">¡Conversemos!</div>
          <button class="contact-button" @click="goToEntityMenu">
            <span class="button-text">Volver al menú</span>
          </button>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="decorative-elements" :class="{ 'visible': showDecorative }">
        <div class="success-badge">
          <span class="badge-text">Demo completada</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'
import { useVisitedProductsStore } from '../stores/visited-products.store'

const router = useRouter()
const visitedProductsStore = useVisitedProductsStore()

// Animation states
const showContent = ref(false)
const showIcon = ref(false)
const showMessage = ref(false)
const showCTA = ref(false)
const showDecorative = ref(false)
const showFooter = ref(false)

// Start animations sequence
const startAnimations = async () => {
  showContent.value = true

  setTimeout(() => {
    showIcon.value = true

    setTimeout(() => {
      showMessage.value = true

      setTimeout(() => {
        showCTA.value = true

        setTimeout(() => {
          showDecorative.value = true

          setTimeout(() => {
            showFooter.value = true
          }, 600)
        }, 800)
      }, 1000)
    }, 600)
  }, 300)
}

// Actions
const goToEntityMenu = () => {
  router.push({ name: 'entity-intro' })
}


// Start animations on mount
onMounted(async () => {
  // Clear visited products when reaching farewell view
  visitedProductsStore.clearVisitedProducts()

  await nextTick()
  setTimeout(() => {
    startAnimations()
  }, 300)
})
</script>

<style scoped>
.farewell-container {
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

/* Floating particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 50%;
  opacity: 0.6;
  animation: floatParticle 8s ease-in-out infinite;
}

.particle-1 {
  top: 10%;
  left: 10%;
  animation-delay: -1s;
}

.particle-2 {
  top: 20%;
  right: 15%;
  animation-delay: -2s;
}

.particle-3 {
  top: 60%;
  left: 5%;
  animation-delay: -3s;
}

.particle-4 {
  bottom: 30%;
  right: 20%;
  animation-delay: -4s;
}

.particle-5 {
  top: 80%;
  left: 80%;
  animation-delay: -5s;
}

.particle-6 {
  top: 30%;
  left: 70%;
  animation-delay: -6s;
}

.particle-7 {
  bottom: 10%;
  left: 30%;
  animation-delay: -7s;
}

.particle-8 {
  top: 50%;
  right: 5%;
  animation-delay: -8s;
}

.particle-9 {
  bottom: 60%;
  left: 15%;
  animation-delay: -1.5s;
}

.particle-10 {
  top: 15%;
  left: 60%;
  animation-delay: -2.5s;
}

.particle-11 {
  bottom: 20%;
  right: 40%;
  animation-delay: -3.5s;
}

.particle-12 {
  top: 70%;
  right: 60%;
  animation-delay: -4.5s;
}

@keyframes floatParticle {

  0%,
  100% {
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.8;
  }
}

/* Main content */
.main-content {
  text-align: center;
  max-width: 900px;
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

/* Icon section */
.icon-section {
  margin-bottom: 40px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-section.visible {
  opacity: 1;
  transform: scale(1);
}

.main-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  box-shadow: 0 20px 60px rgba(97, 40, 120, 0.3);
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {

  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 20px 60px rgba(97, 40, 120, 0.3);
  }

  50% {
    transform: scale(1.05);
    box-shadow: 0 25px 80px rgba(97, 40, 120, 0.4);
  }
}

/* Message section */
.message-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 50px;
}

.message-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-question {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 30px 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.description-block {
  background: white;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin: 30px 0;
  backdrop-filter: blur(10px);
}

.description-text {
  font-size: 1.4rem;
  color: #4b5563;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
}

/* CTA section */
.cta-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 40px 0;
}

.cta-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.cta-message {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
}


.contact-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 20px 50px;
  font-size: 1.4rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(97, 40, 120, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 15px;
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

.contact-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(97, 40, 120, 0.6);
}

.contact-button:active {
  transform: translateY(-2px);
}

.button-text {
  font-size: 1.4rem;
}

.button-icon {
  font-size: 1.6rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

/* Decorative elements */
.decorative-elements {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.decorative-elements.visible {
  opacity: 1;
  transform: translateX(0);
}

.success-badge {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  animation: badgePulse 3s ease-in-out infinite;
}

@keyframes badgePulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.badge-icon {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {

  0%,
  100% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }
}

/* Footer actions */
.footer-actions {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-actions.visible {
  opacity: 1;
  visibility: visible;
}

.secondary-button {
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

.secondary-button:hover {
  border-color: rgb(186, 45, 125);
  color: rgb(186, 45, 125);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-question {
    font-size: 2rem;
  }

  .description-text {
    font-size: 1.2rem;
  }

  .cta-message {
    font-size: 1.6rem;
  }

  .contact-button {
    padding: 16px 35px;
    font-size: 1.2rem;
  }

  .description-block {
    padding: 25px 30px;
  }
}

@media (max-width: 480px) {
  .farewell-container {
    padding: 20px 15px;
  }

  .main-question {
    font-size: 1.8rem;
  }

  .main-icon {
    width: 120px;
    height: 120px;
  }

  .description-block {
    padding: 20px 25px;
  }

  .decorative-elements {
    top: 10px;
    right: 10px;
  }
}
</style>