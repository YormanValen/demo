<template>
  <section class="base-card">
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--surface-raised);
  box-shadow: var(--shadow-md);
}
</style>
