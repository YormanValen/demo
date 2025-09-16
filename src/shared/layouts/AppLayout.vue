<template>
  <div class="app-layout">
    <header class="app-layout__header">
      <h1 class="app-layout__title">Portal de Registro</h1>
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
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
  background: var(--surface-raised);
  box-shadow: var(--shadow-sm);
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
