<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <div class="header-content">
        <span class="header-tagline">"Evolucionando el camino de ser digital"</span>
      </div>
      <svg class="header-wave" viewBox="0 0 2561 195" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="headerWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2981fd;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M2560.5 0H3.5H0V184L181 170.5C683 146.5 810 150.5 954 149.5C1069.2 148.7 1491.33 170.5 1688 181.5C1761 185.833 1945.2 194.5 2098 194.5C2250.8 194.5 2470 177.5 2560.5 169V0Z" fill="url(#headerWaveGradient)"/>
      </svg>
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
  background: #270d34;
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}

.header-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 1;
}


.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: calc(100vw - 80px);
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
