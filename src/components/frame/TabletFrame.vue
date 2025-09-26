<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ src?: string; scale?: number; heightPx?: number }>(), {
  scale: 1,
})

// Para preservar el responsive del hijo, por defecto no escalamos visualmente
const scale = computed(() => props.scale ?? 1)
const containerStyle = computed(() => ({
  '--scale': String(scale.value),
  '--h': String(props.heightPx ?? 900) + 'px',
}))
</script>

<template>
  <div class="tablet" :style="containerStyle">
    <div class="tablet__notch" />
    <div class="tablet__screen">
      <div class="tablet__scale">
        <iframe v-if="src" class="tablet__iframe" :src="src" />
        <div v-else class="tablet__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tablet {
  height: min(var(--h, 900px), 95vh);
  aspect-ratio: 3 / 4; /* portrait */
  padding: 16px;
  border: 12px solid #1f2937;
  border-radius: 26px;
  background: linear-gradient(180deg, #0b1220, #111827);
  box-shadow: 0 10px 30px rgba(0,0,0,.35), inset 0 0 30px rgba(255,255,255,.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tablet__notch {
  width: 56px;
  height: 6px;
  background: #0b1220;
  border-radius: 3px;
  margin: 0 auto 10px auto;
  box-shadow: inset 0 1px 2px rgba(255,255,255,.08);
}

.tablet__screen {
  width: 100%;
  height: auto;
  flex: 1 1 auto;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.tablet__scale {
  width: 100%;
  height: 100%;
  transform: scale(var(--scale, 1));
  transform-origin: center center;
  display: flex;
  flex-direction: column;
}

.tablet__content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
}

.tablet__iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* Responsive adjustments for tablet frame */
@media (max-width: 1024px) {
  .tablet {
    height: min(var(--h, 700px), 90vh);
  }
}

@media (max-width: 768px) {
  .tablet {
    height: min(var(--h, 600px), 85vh);
    max-width: calc(100vw - 40px);
    padding: 12px;
    border-width: 8px;
  }
}

@media (max-width: 480px) {
  .tablet {
    height: min(var(--h, 500px), 80vh);
    max-width: calc(100vw - 20px);
    padding: 8px;
    border-width: 6px;
  }
}
</style>

