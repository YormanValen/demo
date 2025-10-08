<template>
  <div class="flow-connection" :class="{ visible, reverse }">
    <svg class="connection-arrow" viewBox="0 0 100 120">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :style="`stop-color:${colors.start}`"/>
          <stop offset="100%" :style="`stop-color:${colors.end}`"/>
        </linearGradient>
      </defs>
      <path 
        :id="pathId" 
        :d="reverse ? 'M 50 100 L 50 20' : 'M 50 20 L 50 100'" 
        :stroke="`url(#${gradientId})`" 
        stroke-width="3" 
        fill="none" 
      />
      <polygon 
        :points="reverse ? '50,20 45,30 55,30' : '50,100 45,90 55,90'" 
        :fill="`url(#${gradientId})`" 
      />
      <!-- Moving circle -->
      <circle 
        r="6" 
        :fill="circleColor" 
        class="moving-circle" 
        :class="{ active: animated }"
        v-if="animated"
      >
        <animateMotion dur="2s" repeatCount="indefinite">
          <mpath :href="`#${pathId}`"/>
        </animateMotion>
      </circle>
    </svg>
    <div class="connection-label" v-if="label">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  visible?: boolean
  animated?: boolean
  reverse?: boolean
  label?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  animated: false,
  reverse: false,
  label: '',
  color: 'blue'
})

const gradientId = computed(() => `gradient-${Math.random().toString(36).substr(2, 9)}`)
const pathId = computed(() => `path-${Math.random().toString(36).substr(2, 9)}`)

const colors = computed(() => {
  const colorMap: Record<string, { start: string; end: string }> = {
    blue: { start: '#6366f1', end: '#8b5cf6' },
    green: { start: '#10b981', end: '#059669' },
    purple: { start: '#a855f7', end: '#7c3aed' },
    orange: { start: '#f59e0b', end: '#d97706' },
    red: { start: '#ef4444', end: '#dc2626' },
    cyan: { start: '#06b6d4', end: '#0891b2' }
  }
  return colorMap[props.color] || colorMap.blue
})

const circleColor = computed(() => {
  const circleMap: Record<string, string> = {
    blue: '#fbbf24',
    green: '#34d399',
    purple: '#c084fc',
    orange: '#fb923c',
    red: '#f87171',
    cyan: '#67e8f9'
  }
  return circleMap[props.color] || circleMap.blue
})
</script>

<style scoped>
.flow-connection {
  width: 120px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.flow-connection.visible {
  opacity: 1;
}

.connection-arrow {
  width: 100%;
  height: 120px;
  z-index: 5;
}

.moving-circle {
  filter: drop-shadow(0 0 8px currentColor);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.moving-circle.active {
  opacity: 1;
  animation: circleGlow 1.5s ease-in-out infinite;
}

@keyframes circleGlow {
  0%, 100% { 
    filter: drop-shadow(0 0 8px currentColor);
  }
  50% { 
    filter: drop-shadow(0 0 16px currentColor);
  }
}

.connection-label {
  font-size: 0.7rem;
  color: #cbd5e1;
  text-align: center;
  margin-top: 0.2rem;
  opacity: 0.9;
  line-height: 1.1;
  max-width: 120px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flow-connection {
    width: 80px;
    height: 100px;
  }
  
  .connection-arrow {
    height: 80px;
  }
  
  .connection-label {
    font-size: 0.6rem;
    max-width: 100px;
  }
}
</style>