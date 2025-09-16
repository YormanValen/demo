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
    <div class="divider"></div>
    <footer class="app-layout__footer">
      <div class="footer-content">
        <span class="footer-text">Open Finance 2025.</span>
        <img src="/src/assets/logo.png" alt="Open Finance Demo" class="footer-logo" />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  background: #ffffff;
  color: var(--text-primary);
}

.app-layout__header {
  height: 100px;
  background: linear-gradient(135deg, #2981fd 0%, #3b82f6 50%, #1e40af 100%);
  position: relative;
  overflow: hidden;
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

.divider {
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 0;
}

.app-layout__footer {
  padding: 20px 40px;
  background: #ffffff;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-text {
  color: #6b7280;
  font-size: 18px;
  font-weight: 500;
}

.footer-logo {
  margin-top: -50px;
  height: 250px;
  width: auto;
  object-fit: contain;
}
</style>
