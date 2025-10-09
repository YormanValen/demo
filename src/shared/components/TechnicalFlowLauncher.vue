<template>
  <!-- Launch button (can be inline or floating) -->
  <button :class="[inline ? 'tf-inline-btn' : 'tf-floating-btn']" @click="open = true" title="Flujo técnico">
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" />
      <rect x="9" y="14" width="7" height="7" rx="1.5" fill="currentColor" />
    </svg>
  </button>

  <!-- Fullscreen overlay (teleported to body) -->
  <Teleport to="body">
    <div v-if="open" class="tf-overlay">
      <div class="tf-modal">
        <button class="tf-close" @click="open = false" aria-label="Cerrar">✕</button>
        <TechnicalFlowView />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, withDefaults, defineProps } from 'vue'
import TechnicalFlowView from '../../modules/technical-flow/views/TechnicalFlowView.vue'

const props = withDefaults(defineProps<{ inline?: boolean }>(), { inline: false })
const inline = props.inline

const STORAGE_KEY = 'technicalFlow.launcher.open'
const open = ref(localStorage.getItem(STORAGE_KEY) === '1')

watch(open, v => {
  localStorage.setItem(STORAGE_KEY, v ? '1' : '0')
  document.documentElement.classList.toggle('tf-no-scroll', v)
})
</script>

<style scoped>
.tf-floating-btn {
  position: fixed;
  right: 22px;
  bottom: 92px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  color: #ffffff;
  background: linear-gradient(135deg, #3b0764, #a21caf, #1d4ed8);
  box-shadow: 0 10px 30px rgba(29, 78, 216, 0.35);
  display: grid;
  place-items: center;
  z-index: 10000;
}

.tf-floating-btn svg { width: 28px; height: 28px; color: #fff; }

/* Inline variant to place inside existing control bars */
.tf-inline-btn {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.tf-inline-btn:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

.tf-inline-btn svg { width: 20px; height: 20px; color: currentColor; }

.tf-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 6, 13, 0.65);
  backdrop-filter: blur(6px);
  z-index: 10001;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.tf-modal {
  background: #ffffff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.tf-close {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 10;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #111827;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  cursor: pointer;
}

.tf-no-scroll { overflow: hidden; }
</style>
