<template>
  <div class="connection-line" :class="{ visible, animated }">
    <div class="line-container">
      <div class="line-track"></div>
      <div
        v-if="animated"
        class="moving-ball"
        :class="{ downward: oneWayDown, upward: oneWayUp, once: playOnce }"
      ></div>
    </div>

    <!-- Optional label -->
    <div v-if="label" class="connection-label">
      <svg v-if="labelCheck" class="label-check" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#4CAF50" />
        <path d="M7 12.5l3 3L17 9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean
  animated?: boolean
  label?: string
  oneWayDown?: boolean
  /**
   * When true, the moving ball animation runs a single time
   * instead of looping infinitely.
   */
  playOnce?: boolean
  /** When true, the ball travels upward once */
  oneWayUp?: boolean
  /** Show a green check beside the label */
  labelCheck?: boolean
}

withDefaults(defineProps<Props>(), {
  visible: false,
  animated: false,
  label: '',
  oneWayDown: false,
  playOnce: false,
  oneWayUp: false,
  labelCheck: false
})
</script>

<style scoped>
.connection-line {
  width: 4px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  /* No margin so it can touch adjacent actor edges */
  margin: 0;
  position: relative;
}

.connection-line.visible {
  opacity: 1;
}

.line-container {
  position: relative;
  width: 100%;
  height: 120px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.connection-line.visible .line-container {
  animation: lineReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.line-track {
  width: 4px;
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  border-radius: 2px;
  position: relative;
}

.moving-ball {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 50%;
  left: 50%;
  top: 0;
  transform: translateX(-50%) scale(0.8);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  opacity: 0;
  /* Smooth entrance, then start movement */
  animation: ballEntrance 0.6s ease-out forwards, moveBall 2s ease-in-out infinite 0.6s;
}

.moving-ball.downward {
  /* Always travel downward, then fade/reset to top */
  animation: ballEntrance 0.6s ease-out forwards, moveBallDown 1.8s linear infinite 0.6s;
}

/* One-shot variants */
.moving-ball.once {
  animation: ballEntrance 0.6s ease-out forwards, moveBall 2s ease-in-out 1 0.6s forwards;
}

.moving-ball.downward.once {
  animation: ballEntrance 0.6s ease-out forwards, moveBallDownOnce 1.8s linear 1 0.6s forwards;
}

.moving-ball.upward.once {
  animation: ballEntrance 0.6s ease-out forwards, moveBallUpOnce 1.8s linear 1 0.6s forwards;
}

@keyframes moveBall {
  0% {
    top: 0;
  }

  50% {
    top: calc(100% - 12px);
  }

  100% {
    top: 0;
  }
}

@keyframes moveBallDown {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    top: calc(100% - 12px);
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 0;
  }
}

/* One-shot downward: end at bottom and fade out without going back up */
@keyframes moveBallDownOnce {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    top: calc(100% - 12px);
    opacity: 1;
  }
  100% {
    top: calc(100% - 12px);
    opacity: 0;
  }
}

/* One-shot upward: start at bottom and end at top with fade out */
@keyframes moveBallUpOnce {
  0% {
    top: calc(100% - 12px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 0;
  }
}

@keyframes lineReveal {
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
}

@keyframes ballEntrance {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

.connection-label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #6b7280;
  opacity: 0;
  transition: opacity 0.45s ease-out 0.15s;
  line-height: 1.2;
  max-width: 200px;
  font-weight: 600;
  text-align: left;
}

.connection-line.visible .connection-label {
  opacity: 0.85;
}

.connection-label .label-check {
  margin-right: 6px;
  display: inline-block;
  vertical-align: -2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .connection-line {
    height: 80px;
    width: 3px;
  }

  .line-container {
    height: 80px;
  }

  .line-track {
    width: 3px;
  }

  .moving-ball {
    width: 10px;
    height: 10px;
  }

  .connection-label {
    font-size: 0.7rem;
    max-width: 160px;
    left: 10px;
  }
}
</style>
