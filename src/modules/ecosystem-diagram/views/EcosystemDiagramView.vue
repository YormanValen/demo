<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Controls for the staged reveal animation
const isPlaying = ref(false)
const revealed = ref(0) // how many cards are visible
const showOrientationModal = ref(true)

// Track animation for bottom elements
const trackAnimationStep = ref(0)

// Free-drag horizontal scroll state
const viewportRef = ref<HTMLElement | null>(null)
let isDragging = false
let startX = 0
let startScrollLeft = 0

const startAnimation = () => {
  if (isPlaying.value) return
  isPlaying.value = true
  revealed.value = 0
  trackAnimationStep.value = 0

  const totalItems = columns.length
  let i = 0
  const interval = setInterval(() => {
    i++
    revealed.value = i
    if (i >= totalItems) {
      clearInterval(interval)
      // Start track animation after grid is complete
      setTimeout(startTrackAnimation, 500)
    }
  }, 350)
}

const startTrackAnimation = () => {
  const delays = [0, 600, 1200, 1800, 2400, 3000, 3600] // 600ms between each element

  // 1. Habilitación (from top)
  setTimeout(() => trackAnimationStep.value = 1, delays[0])

  // 2. Arrow 1 (from top)
  setTimeout(() => trackAnimationStep.value = 2, delays[1])

  // 3. Tecnología Core (from bottom)
  setTimeout(() => trackAnimationStep.value = 3, delays[2])

  // 4. Arrow 2 (from bottom)
  setTimeout(() => trackAnimationStep.value = 4, delays[3])

  // 5. Monetización y crecimiento (from top)
  setTimeout(() => trackAnimationStep.value = 5, delays[4])

  // 6. Arrow 3 (from top)
  setTimeout(() => trackAnimationStep.value = 6, delays[5])

  // 7. Ecosistema (from bottom)
  setTimeout(() => trackAnimationStep.value = 7, delays[6])
}


const handleAgree = () => {
  showOrientationModal.value = false
  // small delay for smoothness
  setTimeout(startAnimation, 200)
}

// Pointer-driven drag-to-scroll (no snapping, no auto-advance)
const onPointerDown = (e: PointerEvent) => {
  const vp = viewportRef.value
  if (!vp) return
  isDragging = true
  startX = e.clientX
  startScrollLeft = vp.scrollLeft
  vp.classList.add('is-dragging')
  try { vp.setPointerCapture(e.pointerId) } catch { }
}

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging) return
  const vp = viewportRef.value
  if (!vp) return
  const dx = e.clientX - startX
  vp.scrollLeft = startScrollLeft - dx
  e.preventDefault()
}

const onPointerUp = (e: PointerEvent) => {
  if (!isDragging) return
  isDragging = false
  const vp = viewportRef.value
  vp?.classList.remove('is-dragging')
  try { vp?.releasePointerCapture(e.pointerId) } catch { }
}

// No scroll badge logic needed (always show hint)


// Simplified content adapted from the provided diagram
const columns = [
  {
    color: '#2f66c5',
    icon: 'mdi-account-tie',
    title: 'Consultoría y Acompañamiento',
    items: [
      'Guía estratégica y técnica para implementación.',
      '<strong>Acelera la entrada al mercado</strong> con riesgos mínimos.'
    ]
  },
  {
    color: '#1aa8a8',
    icon: 'mdi-school-outline',
    title: 'Entrenamiento Especializado',
    items: [
      'Desarrolla conocimiento y habilidades para el ecosistema.',
      '<strong>Asegura un equipo preparado</strong> para liderar.'
    ]
  },
  {
    color: '#18c55f',
    icon: 'mdi-shield-check',
    title: 'Plataforma de Consentimientos',
    items: [
      'Gestión transparente y auditable del consentimiento.',
      '<strong>Minimiza el riesgo legal</strong> y asegura cumplimiento.'
    ]
  },
  {
    color: '#12a0ff',
    icon: 'mdi-api',
    title: 'Plataforma de APIs Open Finance',
    items: [
      'APIs listas que cumplen estándares.',
      '<strong>Simplifica la complejidad técnica</strong> y la conexión.'
    ]
  },
  {
    color: '#ff7a1b',
    icon: 'mdi-chart-line',
    title: 'Variables Analíticas',
    items: [
      'Transformación de datos transaccionales en insights.',
      '<strong>Reduce el riesgo</strong> y potencia decisiones.'
    ]
  },
  {
    color: '#ff4d3c',
    icon: 'mdi-puzzle-outline',
    title: 'Integración con Productos Experian',
    items: [
      'Conexión nativa con motores de decisión.',
      '<strong>Maximiza el retorno</strong> de tu ecosistema.'
    ]
  },
  {
    color: '#9a57d3',
    icon: 'mdi-key-chain-variant',
    title: 'Bre-B',
    items: [
      'Habilitación en infraestructura de pagos inmediatos.',
      '<strong>Participa activamente</strong> en la nueva economía.'
    ]
  },
  {
    color: '#637bff',
    icon: 'mdi-database-check',
    title: 'Tercero Receptor de Datos (TRD)',
    items: [
      'Acompañamiento en certificación y marco de seguridad.',
      '<strong>Expande el alcance</strong> para <strong>consumir datos</strong> de terceros.'
    ]
  }
]

onMounted(() => {
  // Always show orientation modal before any animation
  showOrientationModal.value = true

  // Attach drag handlers
  const vp = viewportRef.value
  if (vp) {
    vp.addEventListener('pointerdown', onPointerDown, { passive: true })
    vp.addEventListener('pointermove', onPointerMove, { passive: false })
    vp.addEventListener('pointerup', onPointerUp, { passive: true })
    vp.addEventListener('pointerleave', onPointerUp, { passive: true })
    vp.addEventListener('pointercancel', onPointerUp, { passive: true })
  }
})

onBeforeUnmount(() => {
  const vp = viewportRef.value
  if (vp) {
    vp.removeEventListener('pointerdown', onPointerDown as any)
    vp.removeEventListener('pointermove', onPointerMove as any)
    vp.removeEventListener('pointerup', onPointerUp as any)
    vp.removeEventListener('pointerleave', onPointerUp as any)
    vp.removeEventListener('pointercancel', onPointerUp as any)
  }
})
</script>

<template>
  <section class="ecosystem">
    <header class="ecosystem__header">
      <div class="banner">
        <div class="banner__left">
          <div class="headline">
            Vive las <span class="highlight"><strong>Finanzas Abiertas</strong></span>
            <span class="brand"> con DataCrédito Experian</span>
          </div>
        </div>
        <div class="banner__right">
          Nuestra experiencia te ayudará a moverte con seguridad en esta nueva era financiera
          para que des <span class="sub-highlight"><strong>pasos correctos.</strong></span>
        </div>
      </div>
    </header>

    <!-- Orientation advisory modal -->
    <div v-if="showOrientationModal" class="modal-overlay">
      <div class="modal">
        <div class="image-wrapper" aria-hidden="true">
          <img class="orientation-img" src="/src/assets/orientation-horizontal.png"
            alt="Recomendación de orientación horizontal" />
        </div>
        <p class="modal-text">
          Este diagrama esta diseñado para pantallas con orientación horizontal, se recomienda girar su pantalla antes
          de
          continuar.
        </p>
        <button class="btn btn-primary" @click="handleAgree">De acuerdo</button>
      </div>
    </div>

    <!-- Carousel container for feature columns (free scroll) -->
    <div class="carousel-container">
      <div class="carousel-badges">
        <div class="badge badge--hint">
          <v-icon size="16">mdi-hand-pointing-right</v-icon>
          Arrastra para explorar
        </div>
      </div>
      <div class="carousel-viewport" ref="viewportRef">
        <div class="grid">
          <div v-for="(col, idx) in columns" :key="idx" class="grid__item" :class="{ 'is-visible': revealed > idx }">
            <div class="icon" :style="{ borderColor: col.color }">
              <v-icon :color="col.color" size="48">{{ col.icon }}</v-icon>
            </div>
            <!-- Title container (colored, white text) -->
            <div class="title-card" :style="{ backgroundColor: col.color }">
              <h3 class="title-card__title">{{ col.title }}</h3>
            </div>
            <!-- Description container (separate card below) -->
            <div class="desc-card">
              <ul class="desc-card__list">
                <li v-for="(it, i) in col.items" :key="i" v-html="it"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom ecosystem track -->
    <div class="track">
      <!-- Arrows positioned above the spaces between buttons -->
      <div class="arrow-connector animate-from-top" :class="{ 'visible': trackAnimationStep >= 2 }"
        style="margin-left: -50px;">
        <svg width="180" height="75" viewBox="0 0 252 92" class="arrow-svg" style="transform: scaleX(-1);">
          <path
            d="M14.4435 26.0257C16.3478 34.2205 18.0405 42.2052 20.1564 51.2405C14.6551 50.6101 11.4813 47.2481 10.2118 43.4659C6.40316 32.1193 2.80616 20.5625 0.267088 8.79558C-1.21403 2.07164 3.65251 -1.50048 10.2118 0.600755C21.2144 3.96273 32.0054 7.95508 43.0081 11.7373C43.6428 11.9474 44.4892 12.1576 44.7008 12.5778C45.7587 14.0487 46.3935 15.7296 47.2398 17.4106C45.7587 18.041 44.2776 19.5119 43.0081 19.3017C38.5647 18.6714 34.3329 17.6208 30.1011 16.7803C27.7736 16.36 25.6577 15.7297 22.2723 16.7803C24.5998 19.3018 26.9273 22.0333 29.2548 24.5548C79.6129 74.5642 155.15 85.0703 217.781 51.2405C225.821 46.8279 233.227 41.5748 241.055 36.742C243.806 35.061 246.557 33.5901 249.307 31.9092C249.942 32.3294 250.365 32.9598 251 33.38C250.365 35.2711 250.154 37.7926 248.673 39.0533C244.018 43.4659 239.363 47.8785 234.073 51.6607C181.599 89.4829 108.601 90.9538 52.1064 54.8126C41.3153 47.8785 31.7938 39.0533 21.8492 31.0686C19.7333 29.3876 18.0406 27.4966 16.1363 25.6054C15.7131 25.3953 15.0783 25.6054 14.4435 26.0257Z"
            fill="#4F9CF9" />
        </svg>
      </div>
      <div class="arrow-connector animate-from-bottom" :class="{ 'visible': trackAnimationStep >= 4 }"
        style="margin-left: -50px;">
        <svg width="180" height="75" viewBox="0 0 252 92" class="arrow-svg" style="transform: scaleX(-1) scaleY(-1);">
          <path
            d="M14.4435 26.0257C16.3478 34.2205 18.0405 42.2052 20.1564 51.2405C14.6551 50.6101 11.4813 47.2481 10.2118 43.4659C6.40316 32.1193 2.80616 20.5625 0.267088 8.79558C-1.21403 2.07164 3.65251 -1.50048 10.2118 0.600755C21.2144 3.96273 32.0054 7.95508 43.0081 11.7373C43.6428 11.9474 44.4892 12.1576 44.7008 12.5778C45.7587 14.0487 46.3935 15.7296 47.2398 17.4106C45.7587 18.041 44.2776 19.5119 43.0081 19.3017C38.5647 18.6714 34.3329 17.6208 30.1011 16.7803C27.7736 16.36 25.6577 15.7297 22.2723 16.7803C24.5998 19.3018 26.9273 22.0333 29.2548 24.5548C79.6129 74.5642 155.15 85.0703 217.781 51.2405C225.821 46.8279 233.227 41.5748 241.055 36.742C243.806 35.061 246.557 33.5901 249.307 31.9092C249.942 32.3294 250.365 32.9598 251 33.38C250.365 35.2711 250.154 37.7926 248.673 39.0533C244.018 43.4659 239.363 47.8785 234.073 51.6607C181.599 89.4829 108.601 90.9538 52.1064 54.8126C41.3153 47.8785 31.7938 39.0533 21.8492 31.0686C19.7333 29.3876 18.0406 27.4966 16.1363 25.6054C15.7131 25.3953 15.0783 25.6054 14.4435 26.0257Z"
            fill="#4F9CF9" />
        </svg>
      </div>
      <div class="arrow-connector animate-from-top" :class="{ 'visible': trackAnimationStep >= 6 }"
        style="margin-left: -20px;">
        <svg width="180" height="75" viewBox="0 0 252 92" class="arrow-svg" style="transform: scaleX(-1);">
          <path
            d="M14.4435 26.0257C16.3478 34.2205 18.0405 42.2052 20.1564 51.2405C14.6551 50.6101 11.4813 47.2481 10.2118 43.4659C6.40316 32.1193 2.80616 20.5625 0.267088 8.79558C-1.21403 2.07164 3.65251 -1.50048 10.2118 0.600755C21.2144 3.96273 32.0054 7.95508 43.0081 11.7373C43.6428 11.9474 44.4892 12.1576 44.7008 12.5778C45.7587 14.0487 46.3935 15.7296 47.2398 17.4106C45.7587 18.041 44.2776 19.5119 43.0081 19.3017C38.5647 18.6714 34.3329 17.6208 30.1011 16.7803C27.7736 16.36 25.6577 15.7297 22.2723 16.7803C24.5998 19.3018 26.9273 22.0333 29.2548 24.5548C79.6129 74.5642 155.15 85.0703 217.781 51.2405C225.821 46.8279 233.227 41.5748 241.055 36.742C243.806 35.061 246.557 33.5901 249.307 31.9092C249.942 32.3294 250.365 32.9598 251 33.38C250.365 35.2711 250.154 37.7926 248.673 39.0533C244.018 43.4659 239.363 47.8785 234.073 51.6607C181.599 89.4829 108.601 90.9538 52.1064 54.8126C41.3153 47.8785 31.7938 39.0533 21.8492 31.0686C19.7333 29.3876 18.0406 27.4966 16.1363 25.6054C15.7131 25.3953 15.0783 25.6054 14.4435 26.0257Z"
            fill="#4F9CF9" />
        </svg>
      </div>

      <!-- Pills container -->
      <div class="track-pills">
        <div class="track-item">
          <div class="pill pill--enable animate-down" :class="{ 'visible': trackAnimationStep >= 1 }">Habilitación</div>
        </div>
        <div class="track-item">
          <div class="pill pill--core animate-up" :class="{ 'visible': trackAnimationStep >= 3 }">Tecnología Core</div>
        </div>
        <div class="track-item">
          <div class="pill pill--growth animate-down" :class="{ 'visible': trackAnimationStep >= 5 }">Monetización y
            crecimiento</div>
        </div>
        <div class="track-item">
          <div class="pill pill--ecosystem animate-up" :class="{ 'visible': trackAnimationStep >= 7 }">Ecosistema 360
            Experian</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem {
  /* Ensure the view fills the entire available width inside AppLayout's flex container */
  width: 100%;
  flex: 1 1 auto;
  align-self: stretch;

  min-height: 100vh;
  background: #f5f7fb;
  padding: 24px 24px 60px;
  box-sizing: border-box;
  overflow-x: hidden;
  /* evita scroll horizontal global */
}

.ecosystem__header {
  width: 100%;
  max-width: none;
  margin: 0 0 16px 0;
}

.banner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 24px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: #fff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.banner__left {
  display: flex;
  align-items: center;
}

.headline {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
}

.headline .highlight {
  font-weight: 800;
  color: #ffffff;
}

.headline .sub-highlight {
  font-weight: 500;
  font-style: bold;
}

.headline .brand {
  color: #ffffff;
  font-weight: 700;
}

.banner__right {
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
}

.toolbar {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* Orientation advisory modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  display: grid;
  place-items: center;
  z-index: 10000;
}

.modal {
  width: min(520px, 92vw);
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 20px 16px;
  box-shadow: var(--shadow-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.modal-text {
  color: #374151;
  font-size: 14px;
  margin: 0;
}

/* Bigger primary button inside modal */
.modal .btn-primary {
  padding: 14px 22px;
  font-size: 15px;
  border-radius: 12px;
  width: 100%;
  max-width: 280px;
}

.image-wrapper {
  display: grid;
  place-items: center;
  margin-bottom: 10px;
}

.orientation-img {
  width: 140px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .25));
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  filter: brightness(0.98);
}

.btn-primary {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: #fff;
  border: none;
}

.ecosystem__intro {
  margin: 12px 2px 0;
  color: #475569;
}

/* Carousel container styles */
.carousel-container {
  width: 100%;
  margin: 44px 0 30px 0;
  position: relative;
}

/* Thin horizontal scrollbar for the carousel */
.carousel-viewport::-webkit-scrollbar {
  height: 10px;
}

.carousel-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.carousel-viewport::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .12);
  border-radius: 999px;
}

.carousel-viewport {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, .18) transparent;
}

/* Badges */
.carousel-badges {
  position: absolute;
  top: -30px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  /* centrado horizontal */
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.badge {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 6px 16px rgba(0, 0, 0, .12);
}

/* No back badge anymore */

.badge--hint {
  color: #111827;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
  background: #fff;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-btn:hover:not(.nav-btn--disabled) {
  border-color: #4F9CF9;
  background: #f8fafc;
  transform: scale(1.05);
}

.nav-btn--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  gap: 8px;
  align-items: center;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator--active {
  background: #4F9CF9;
  transform: scale(1.2);
}

.indicator:hover {
  background: #9ca3af;
}

.indicator--active:hover {
  background: #4F9CF9;
}

.carousel-viewport {
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  cursor: grab;
  padding-top: 28px;
}

.carousel-viewport.is-dragging {
  cursor: grabbing;
  user-select: none;
}

.grid {
  display: flex;
  flex-wrap: nowrap;
  gap: 18px;
}

.grid__item {
  opacity: 0;
  transform: translateY(10px);
  transition: all .4s ease;
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(25% - 13.5px);
  /* 4 items per slide on desktop (account for 3 gaps of 18px) */
  min-width: 180px;
}

.grid__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.icon {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 6px solid transparent;
  /* Separate the circle from the title container */
  margin: 0 auto 14px;
  color: #64748b;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .08);
}

.title-card {
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 16px 14px;
  height: auto;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.title-card__title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  line-height: 1.3;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.desc-card {
  background: #e8eefc;
  border-radius: 0 0 12px 12px;
  padding: 12px 14px 14px;
  box-shadow: var(--shadow-sm);
  /* Auto height to show full content */
  height: auto;
  min-height: 200px;
}

.desc-card__list {
  margin: 0;
  padding-left: 16px;
  color: #1f2937;
}

.desc-card__list li {
  margin: 4px 0;
  font-size: 24px;
}

.track {
  width: 100%;
  max-width: none;
  margin: 130px 0 0 0;
  position: relative;
}

.track-pills {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.track-item {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* Animation classes for pills */
.pill.animate-down {
  transform: translateY(-50px);
}

.pill.animate-up {
  transform: translateY(50px);
}

.pill.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animation classes for arrows */
.arrow-connector.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Specific positioning and animation delays */

.arrow-connector:nth-child(1) {
  left: calc(25% - 60px);
}

.arrow-connector:nth-child(2) {
  left: calc(50% - 60px);
  top: -60px;
  bottom: auto;
}

.arrow-connector:nth-child(3) {
  left: calc(75% - 60px);
}

.arrow-svg {
  width: 180px;
  height: 75px;
}

.pill {
  padding: 0 48px;
  height: 80px;
  border-radius: 24px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  box-shadow: var(--shadow-md);
  display: grid;
  place-items: center;
  font-size: 24px;
  min-width: 280px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.arrow-connector {
  position: absolute;
  bottom: -80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.pill--enable {
  background: #2364d2;
}

.pill--core {
  background: #1db98b;
}

.pill--growth {
  background: #e35422;
}

.pill--ecosystem {
  background: #6d34a3;
}

/* Responsive */

/* Specific rule for vertical 1080x1920 screens - larger items with horizontal scroll */
@media (orientation: portrait) and (min-width: 1080px) and (max-width: 1200px) {
  .grid__item {
    flex: 0 0 calc(85% - 12px);
    /* Larger items - about 1.1 items visible at once */
    min-width: 850px;
    max-width: 950px;
  }

  .grid {
    gap: 32px;
  }

  .carousel-container {
    margin: 32px 0 50px 0;
  }

  .icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 18px;
  }

  .title-card {
    height: auto;
    min-height: 140px;
    padding: 20px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-card__title {
    font-size: 26px;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;
    hyphens: auto;
  }

  .desc-card {
    height: auto;
    min-height: 280px;
    padding: 16px 18px 18px;
  }

  .desc-card__list li {
    font-size: 28px;
    margin: 6px 0;
  }

  .banner {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
    padding: 20px 24px;
  }

  .headline {
    font-size: 24px;
  }

  .banner__right {
    font-size: 16px;
  }

  .track {
    margin: 100px 0 0 0;
  }

  .track-pills {
    flex-direction: column;
    gap: 32px;
  }

  .track-item {
    flex: none;
    width: 100%;
  }

  .pill {
    min-width: 400px;
    max-width: 600px;
    margin: 0 auto;
    height: 100px;
    font-size: 28px;
  }

  .arrow-connector {
    display: none;
  }
}

/* Portrait orientation for vertical screens like tablets */
@media (orientation: portrait) and (min-width: 768px) and (max-width: 1079px) {
  .banner {
    grid-template-columns: 1fr;
    gap: 16px;
    text-align: center;
  }

  .grid__item {
    flex: 0 0 calc(50% - 12px);
    /* 2 items per slide on tablets */
    min-width: 280px;
  }

  .grid {
    gap: 24px;
  }

  .carousel-container {
    margin: 24px 0 40px 0;
  }

  .desc-card {
    height: auto;
    min-height: 220px;
  }

  .track {
    margin: 80px 0 0 0;
  }

  .track-pills {
    flex-direction: column;
    gap: 24px;
  }

  .track-item {
    flex: none;
    width: 100%;
  }

  .pill {
    min-width: 320px;
    max-width: 500px;
    margin: 0 auto;
  }

  .arrow-connector {
    display: none;
  }
}

/* Large portrait screens (tablets in portrait) */
@media (orientation: portrait) and (min-width: 1024px) {
  .grid__item {
    flex: 0 0 calc(25% - 13.5px);
    /* keep 4 items per slide for consistency */
    min-width: 240px;
  }

  .carousel-container {
    max-width: 1000px;
    margin: 24px auto 40px;
  }

  .banner {
    max-width: 1000px;
    margin: 0 auto 16px;
  }

  .track {
    max-width: 1000px;
    margin: 80px auto 0;
  }
}

@media (max-width: 1024px) {
  .grid__item {
    flex: 0 0 calc(50% - 9px);
    /* 2 items per slide on medium screens (account for one 18px gap) */
    min-width: 220px;
  }

  /* Let descriptions grow more comfortably on smaller screens */
  .desc-card {
    height: auto;
    min-height: 240px;
  }

  .track {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .arrow-connector {
    display: none;
  }

  .track-item {
    flex: 0 0 calc(50% - 8px);
  }
}

@media (max-width: 640px) {
  .banner {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .carousel-viewport {
    padding-top: 24px;
  }

  .grid__item {
    flex: 0 0 100%;
    /* 1 item per slide on mobile */
    min-width: auto;
  }

  .carousel-nav {
    gap: 12px;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .track {
    flex-direction: column;
    gap: 12px;
  }

  .arrow-connector {
    display: none;
  }

  .track-item {
    flex: none;
    width: 100%;
  }

  /* Avoid fixed height on very small screens */
  .desc-card {
    height: auto;
  }

  .modal {
    width: 92vw;
  }
}
</style>
