<template>
  <div class="entity-intro-container" :class="{ ready: isReady }" ref="rootRef">
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
        <div class="experience-card card-1 clickable" :class="{ 'visible': showCard1, 'completed': entityModulesStore.isModuleVisited('consent-manager') }" role="button" tabindex="0"
          @click="goToLogin" @keydown.enter="goToLogin" @keydown.space.prevent="goToLogin">
          <div class="card-number">
            <span v-if="!entityModulesStore.isModuleVisited('consent-manager')">1</span>
            <svg v-else class="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h2 class="card-title">Gestor de Consentimientos en finanzas abiertas</h2>
            <p class="card-description">Administra y controla los permisos de acceso a datos financieros de manera
              segura y transparente.</p>
          </div>
        </div>

        <div class="experience-card card-2 clickable" :class="{ 'visible': showCard2, 'completed': entityModulesStore.isModuleVisited('transactional-insights') }" role="button" tabindex="0"
          @click="goToDashboard" @keydown.enter="goToDashboard" @keydown.space.prevent="goToDashboard">
          <div class="card-number">
            <span v-if="!entityModulesStore.isModuleVisited('transactional-insights')">2</span>
            <svg v-else class="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h2 class="card-title">Transactional Insights</h2>
            <p class="card-description">Obtén análisis profundos y visualizaciones de datos transaccionales para tomar
              decisiones informadas.</p>
          </div>
        </div>

        <div class="experience-card card-3 clickable" :class="{ 'visible': showCard3, 'completed': entityModulesStore.isModuleVisited('api-platform') }" role="button" tabindex="0"
          @click="goToApiLogin" @keydown.enter="goToApiLogin" @keydown.space.prevent="goToApiLogin">
          <div class="card-number">
            <span v-if="!entityModulesStore.isModuleVisited('api-platform')">3</span>
            <svg v-else class="check-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="card-content">
            <h2 class="card-title">Plataforma de APIs Open finance</h2>
            <p class="card-description">Integra y gestiona APIs abiertas para potenciar tus servicios financieros.</p>
          </div>
        </div>
      </div>

      <!-- Continue button removed as requested -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../../transactional-insights/components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'
import { useEntityModulesStore } from '../stores/entity-modules.store'

const router = useRouter()
const entityModulesStore = useEntityModulesStore()

// Animation states
const showContent = ref(false)
const showTitle = ref(false)
const showCards = ref(false)
const showCard1 = ref(false)
const showCard2 = ref(false)
const showCard3 = ref(false)
const isReady = ref(false)
const FULL_RELOAD_KEY = 'entity_intro_force_reload_once'

// Window load handler to reveal content and start animations
const onWindowLoad = () => {
  if (isReady.value) return
  isReady.value = true
  setTimeout(() => startAnimations(), 150)
}

const clearSessionExcept = (preserveKey?: string) => {
  let preserveVal: string | null = null
  if (preserveKey) preserveVal = sessionStorage.getItem(preserveKey)
  sessionStorage.clear()
  if (preserveKey && preserveVal !== null) sessionStorage.setItem(preserveKey, preserveVal)
}

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
            showCard3.value = true
          }, 400)
        }, 400)
      }, 300)
    }, 800)
  }, 300)
}

// Removed continue button action

// Navigation for cards
const goToLogin = () => {
  entityModulesStore.markModuleAsVisited('consent-manager')
  router.push('/entity/login')
}

const goToDashboard = () => {
  entityModulesStore.markModuleAsVisited('transactional-insights')
  router.push({ path: '/entity/dashboard', query: { intro: '1' } })
}

const goToApiLogin = () => {
  entityModulesStore.markModuleAsVisited('api-platform')
  router.push({ name: 'apis-open-finance-login' })
}

// Start animations when fully ready (after window load)
onMounted(async () => {
  // Load entity modules store data
  entityModulesStore.loadFromLocalStorage()
  
  // Force a one-time full reload before showing this page
  const alreadyReloaded = sessionStorage.getItem(FULL_RELOAD_KEY) === '1'
  if (!alreadyReloaded) {
    // Clear entire session storage on entering, then set flag
    clearSessionExcept()
    sessionStorage.setItem(FULL_RELOAD_KEY, '1')
    // Use replace to avoid adding extra history entry
    window.location.replace(window.location.href)
    return
  }

  await nextTick()

  // Clear session again on entry but preserve the reload flag to avoid loops
  clearSessionExcept(FULL_RELOAD_KEY)

  if (document.readyState === 'complete') {
    onWindowLoad()
  } else {
    window.addEventListener('load', onWindowLoad, { once: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('load', onWindowLoad)
  // Clear the reload flag so next visit also reloads
  sessionStorage.removeItem(FULL_RELOAD_KEY)
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
  visibility: hidden;
}

.entity-intro-container.ready {
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  visibility: visible;
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

.card-3 {
  animation-delay: 0.4s;
}

.experience-card.clickable {
  cursor: pointer;
}

.experience-card.completed {
  border: 2px solid #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);
}

.experience-card.completed .card-number {
  background: #10b981;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.check-icon {
  color: white;
  animation: checkPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.experience-card.completed:hover {
  transform: translateX(0) scale(1.02);
  box-shadow: 0 15px 50px rgba(16, 185, 129, 0.2);
}
</style>
