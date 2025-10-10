<template>
  <div class="arc-connection" :class="{ visible }" :style="styleVars">
    <svg :width="widthPx" :height="heightPx" :viewBox="`0 0 ${widthPx} ${heightPx}`" fill="none">
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stop-color="#612878" />
          <stop offset="100%" stop-color="#BA2D7D" />
        </linearGradient>
      </defs>
      <!-- Large right-side arc path -->
      <path class="arc-path" :d="pathD" stroke="url(#arcGrad)" stroke-width="4" fill="none" pathLength="1000" />

      <!-- Moving ball along the arc, once (split groups to avoid dynamic xlink binding issues) -->
      <g v-if="animated && direction === 'up'" class="moving">
        <circle r="8" fill="url(#arcGrad)" :style="{ filter: 'drop-shadow(0 0 10px rgba(186,45,125,0.8))' }">
          <animateMotion :dur="durationMs + 'ms'" repeatCount="1" fill="freeze">
            <mpath xlink:href="#arcPathDynUp" />
          </animateMotion>
          <animate attributeName="opacity" from="1" to="0" :dur="Math.floor(durationMs * 0.25) + 'ms'"
            :begin="(durationMs * 0.85) + 'ms'" fill="freeze" />
        </circle>
      </g>
      <g v-if="animated && direction === 'down'" class="moving">
        <circle r="8" fill="url(#arcGrad)" :style="{ filter: 'drop-shadow(0 0 10px rgba(186,45,125,0.8))' }">
          <animateMotion :dur="durationMs + 'ms'" repeatCount="1" fill="freeze">
            <mpath xlink:href="#arcPathDynDown" />
          </animateMotion>
          <animate attributeName="opacity" from="1" to="0" :dur="Math.floor(durationMs * 0.25) + 'ms'"
            :begin="(durationMs * 0.85) + 'ms'" fill="freeze" />
        </circle>
      </g>

      <!-- Hidden paths for motion (up and down variants) -->
      <path :id="'arcPathDynUp'" :d="pathD" stroke="transparent" fill="none" pathLength="1000" />
      <path :id="'arcPathDynDown'" :d="pathDReversed" stroke="transparent" fill="none" pathLength="1000" />

      <!-- Mid-curve labels with smooth cross-fade -->
      <g :transform="`translate(${labelX}, ${labelY})`" text-anchor="end">
        <g class="mid-group" :class="{ visible: activeMid === 1 }">
          <text class="arc-mid-label">
            <tspan dy="-8">{{ midLabel1 }}</tspan>
            <tspan x="0" dy="18" v-if="midLabel2">{{ midLabel2 }}</tspan>
          </text>
        </g>
        <g class="mid-group" :class="{ visible: activeMid === 2 }">
          <!-- green circular check above -->
          <g v-if="checkVisible" class="arc-check-icon" transform="translate(-40,-40)">
            <circle cx="0" cy="0" r="9" fill="#4CAF50" />
            <path d="M -4,0 L -1.2,2.8 L 5,-4" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round"
              stroke-linejoin="round" vector-effect="non-scaling-stroke" />
          </g>
          <text class="arc-mid-label">
            <tspan dy="-8">{{ mid2Label1 }}</tspan>
            <tspan x="0" dy="18" v-if="mid2Label2">{{ mid2Label2 }}</tspan>
          </text>
        </g>
      </g>
    </svg>
    <div v-if="label" class="arc-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  visible?: boolean
  animated?: boolean
  label?: string
  durationMs?: number
  widthPx?: number
  heightPx?: number
  top?: number
  right?: number
  bulgeFactor?: number
  leftPad?: number
  revealMs?: number
  midLabel1?: string
  midLabel2?: string
  midOffset?: number
  mid2Label1?: string
  mid2Label2?: string
  activeMid?: number
  checkVisible?: boolean
  direction?: 'up' | 'down'
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  animated: false,
  label: '',
  durationMs: 1800,
  widthPx: 420,
  heightPx: 900,
  top: 120,
  right: -40,
  bulgeFactor: 1.4,
  leftPad: 30,
  revealMs: 600,
  midLabel1: '',
  midLabel2: '',
  midOffset: 28,
  mid2Label1: '',
  mid2Label2: '',
  activeMid: 1,
  checkVisible: false,
  direction: 'up'
})

const styleVars = computed(() => ({
  '--arc-top': props.top + 'px',
  '--arc-right': props.right + 'px',
  '--arc-width': props.widthPx + 'px',
  '--arc-height': props.heightPx + 'px',
  '--arc-reveal-duration': props.revealMs + 'ms'
}))

// Generate a smooth arc on the right side from bottom-left to top-right of the SVG
const bezierPoints = computed(() => {
  const w = props.widthPx
  const h = props.heightPx
  const xLeft = Math.max(0, props.leftPad)
  const yBottom = h - Math.max(10, props.leftPad)
  const yTop = Math.max(10, props.leftPad)
  const cx = w * (props.bulgeFactor || 1.4)
  const cy1 = h * 0.75
  const cy2 = h * 0.25
  return { xLeft, yBottom, yTop, cx, cy1, cy2 }
})

const pathD = computed(() => {
  const { xLeft, yBottom, yTop, cx, cy1, cy2 } = bezierPoints.value
  return `M ${xLeft} ${yBottom} C ${cx} ${cy1} ${cx} ${cy2} ${xLeft} ${yTop}`
})

const pathDReversed = computed(() => {
  const { xLeft, yBottom, yTop, cx, cy1, cy2 } = bezierPoints.value
  // Reverse cubic Bezier by swapping endpoints and control points
  return `M ${xLeft} ${yTop} C ${cx} ${cy2} ${cx} ${cy1} ${xLeft} ${yBottom}`
})

// Compute mid point at t=0.5 for placing a left-of-arc label
const midPoint = computed(() => {
  const { xLeft, yBottom, yTop, cx, cy1, cy2 } = bezierPoints.value
  const t = 0.5
  const mt = 1 - t
  const bx = mt * mt * mt * xLeft + 3 * mt * mt * t * cx + 3 * mt * t * t * cx + t * t * t * xLeft
  const by = mt * mt * mt * yBottom + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * yTop
  return { x: bx, y: by }
})

const labelX = computed(() => midPoint.value.x - (props.midOffset || 28))
const labelY = computed(() => midPoint.value.y)
</script>

<style scoped>
.arc-connection {
  position: absolute;
  top: var(--arc-top, 100px);
  right: var(--arc-right, -30px);
  width: var(--arc-width, 420px);
  height: var(--arc-height, 900px);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.arc-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  vector-effect: non-scaling-stroke;
}

.arc-connection.visible .arc-path {
  animation: arcDraw var(--arc-reveal-duration, 0.6s) cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes arcDraw {
  0% {
    stroke-dashoffset: 1000;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

.arc-connection.visible {
  opacity: 1;
}

.arc-label {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 600;
}

.arc-mid-label {
  fill: #6b7280;
  font-weight: 600;
  font-size: 12px;
  user-select: none;
}

.arc-check-icon {
  width: 20px !important;
  height: 20px !important;
  opacity: 0.95;
}

.mid-group {
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.mid-group.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
