<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <div class="header-content">
        <span class="header-tagline">"Evolucionando el camino de ser digital"</span>
      </div>
    </header>
    <main class="app-layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--surface-primary);
  color: var(--text-primary);
}

.app-layout__header {
  height: 100px;
  background: linear-gradient(135deg, #6B2C91 0%, #9C3493 50%, #8E44AD 100%);
  position: relative;
  overflow: hidden;
}

.app-layout__header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background: white;
  clip-path: polygon(0% 100%, 5% 80%, 15% 85%, 25% 75%, 35% 80%, 45% 70%, 55% 75%, 65% 65%, 75% 70%, 85% 60%, 95% 65%, 100% 50%, 100% 100%);
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
  color: white;
  font-size: 16px;
  font-style: italic;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.app-layout__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.app-layout__content {
  padding: var(--space-6);
  display: flex;
  justify-content: center;
}
</style>
