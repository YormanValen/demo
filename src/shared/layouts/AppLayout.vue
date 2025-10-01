<template>
  <div v-if="hideLayout">
    <slot />
  </div>
  <div v-else class="app-layout">
    <header class="app-layout__header">
      <div class="header-content">
        <span class="header-tagline">"Evolucionando el camino de ser digital"</span>
      </div>
    </header>
    <div v-if="showProgressBar" class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
    <main class="app-layout__content">
      <slot />
    </main>
    <div class="divider"></div>
    <footer class="app-layout__footer">
      <div class="footer-content">
        <span class="footer-text">Experiencia Open Finance 2025.</span>
        <img src="/src/assets/logo.png" alt="Experiencia Open Finance" class="footer-logo" />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showProgressBar = computed(() => {
  return route.path === '/registration/financial-information' || route.path === '/registration/financial-verification' || route.path === '/consent'
})

const hideLayout = computed(() => {
  return route.meta?.hideLayout === true
})
</script>

<style scoped>
.app-layout {
  display: block;
  background: #f3f2f2;
  color: var(--text-primary);
}

.app-layout__header {
  height: 150px;
  background-image: url('/src/assets/header-bg.svg');
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 10;
  overflow: visible;
}


.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  position: relative;
  z-index: 1;
}

.header-tagline {
  margin-bottom: 80px;
  margin-right: 140px;
  color: rgba(255, 255, 255, 0.822);
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
}

.app-layout__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.app-layout__content {
  padding: 10px var(--space-6);
  display: flex;
  justify-content: center;
}

/* Ensure proper centering in fullscreen mode */
.full-mode .app-layout__content {
  padding: 0;
  align-items: center;
  min-height: calc(100vh - 300px);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 0;
}

.app-layout__footer {
  padding: 20px 40px;
  background: #f3f2f2;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.footer-text {
  color: #6b7280;
  font-size: 18px;
  font-weight: 500;
}

.footer-logo {
  margin-top: -30px;
  height: 100px;
  width: auto;
  object-fit: contain;
}

.progress-container {
  width: 100%;
  height: fit-content;
  padding: 10px 0;
  background: transparent;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #dbe0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  width: 40%;
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

/* Media queries for responsive header */
@media (max-width: 768px) {
  .app-layout__header {
    height: 120px;
    background-size: cover;
  }

  .header-content {
    padding: 0 20px;
    justify-content: center;
  }

  .header-tagline {
    margin-right: 0;
    margin-bottom: 20px;
    font-size: 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .app-layout__header {
    height: 100px;
  }

  .header-content {
    padding: 0 15px;
  }

  .header-tagline {
    font-size: 14px;
    margin-bottom: 15px;
  }
}

/* Forzar responsive dentro del selector de dispositivo (no afecta escritorio/full) */
.tablet .app-layout__header,
.is-mobile .app-layout__header {
  height: 120px;
  background-size: cover;
}

.tablet .header-content,
.is-mobile .header-content {
  padding: 0 20px;
  justify-content: center;
}

.tablet .header-tagline,
.is-mobile .header-tagline {
  margin-right: 0;
  margin-bottom: 20px;
  text-align: center;
}

.is-mobile .header-tagline {
  font-size: 14px;
}
</style>
