<script setup lang="ts">
import { computed } from 'vue'
import TabletFrame from './TabletFrame.vue'

type DeviceKind = 'desktop' | 'tablet' | 'mobile'

const props = withDefaults(defineProps<{
  device: DeviceKind
  src?: string
  scale?: number
  heightPx?: number
}>(), {
  scale: 1,
})

const scale = computed(() => props.scale ?? 1)

const deviceClass = computed(() => ({
  'is-desktop': props.device === 'desktop',
  'is-tablet': props.device === 'tablet',
  'is-mobile': props.device === 'mobile',
}))

const containerStyle = computed(() => {
  const defaultHeights: Record<DeviceKind, number> = {
    desktop: 800,
    tablet: 900,
    mobile: 820,
  }
  const h = props.heightPx ?? defaultHeights[props.device]
  return {
    '--h': `${h}px`,
    '--scale': String(scale.value),
  } as Record<string, string>
})
</script>

<template>
  <!-- Tablet uses a dedicated frame to ensure portrait look and bezel -->
  <TabletFrame v-if="deviceClass['is-tablet']" :src="src" :scale="scale" :heightPx="heightPx">
    <slot />
  </TabletFrame>

  <div v-else class="frame" :class="deviceClass" :style="containerStyle">
    <!-- Notches / camera -->
    <div v-if="deviceClass['is-mobile']" class="frame__notch" />
    <div v-else-if="deviceClass['is-tablet']" class="frame__notch frame__notch--tablet" />
    <div v-else-if="deviceClass['is-desktop']" class="frame__camera" aria-hidden="true" />

    <!-- Screen -->
    <div class="frame__screen">
      <div class="frame__scale">
        <iframe v-if="src" class="frame__iframe" :src="src" />
        <div v-else class="frame__content">
          <slot />
        </div>
      </div>
    </div>

    <!-- Desktop chin with stand connection (bottom thicker area) -->
    <div v-if="deviceClass['is-desktop']" class="frame__chin" aria-hidden="true" />
  </div>
</template>

<style scoped>
/* Base frame (bezel) */
.frame {
  height: min(var(--h, 800px), 95vh);
  padding: var(--bezel, 16px);
  border-radius: var(--radius, 18px);
  border: var(--bezel-border, 12px) solid var(--bezel-color, #111827);
  background: linear-gradient(135deg, #374151, #1f2937, #111827);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, .4),
    inset 0 2px 4px rgba(255, 255, 255, .08),
    inset 0 -2px 4px rgba(0, 0, 0, .3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  aspect-ratio: var(--aspect, 16 / 10);
  position: relative;
}

/* Status bars / notches */
.frame__notch {
  width: 60px;
  height: 6px;
  background: #0b1220;
  border-radius: 999px;
  margin: 0 auto 10px auto;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, .08);
}

.frame__notch--tablet {
  width: 56px;
}

/* Desktop webcam */
.frame__camera {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #0b1220;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

/* Inner screen */
.frame__screen {
  width: 100%;
  flex: 1 1 auto;
  border-radius: var(--screen-radius, 14px);
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.frame__scale {
  width: 100%;
  height: 100%;
  transform: scale(var(--scale, 1));
  transform-origin: center center;
  display: flex;
  flex-direction: column;
}

.frame__content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
}

.frame__iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* Desktop chin */
.frame__chin {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--chin-height, 18px);
  background: linear-gradient(180deg, #374151, #1f2937);
  border-radius: 0 0 var(--radius, 12px) var(--radius, 12px);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, .05);
}

/* Stand connection point on chin */
.frame__chin::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 8px;
  background: linear-gradient(135deg, #4b5563, #374151);
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
}

/* Device-specific tuning via CSS variables */
.is-desktop {
  --aspect: 16 / 9;
  --bezel-color: #1e293b;
  --bezel: 20px;
  --bezel-border: 8px;
  --radius: 12px;
  --screen-radius: 6px;
  --chin-height: 24px;
}

.is-desktop .frame__screen {
  margin-bottom: var(--chin-height);
}

.is-tablet {
  --aspect: 3 / 4;
  --bezel: 16px;
  --bezel-border: 12px;
  --radius: 24px;
  --screen-radius: 16px;
}

.is-mobile {
  --aspect: 9 / 19.5;
  --bezel: 12px;
  --bezel-border: 10px;
  --radius: 28px;
  --screen-radius: 20px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .frame {
    height: min(var(--h, 600px), 90vh);
  }
  
  .is-desktop {
    --bezel: 16px;
    --bezel-border: 6px;
  }
}

@media (max-width: 768px) {
  .frame {
    height: min(var(--h, 500px), 85vh);
    max-width: calc(100vw - 40px);
  }
  
  .is-desktop {
    --bezel: 12px;
    --bezel-border: 4px;
  }
  
  .is-tablet {
    --bezel: 12px;
    --bezel-border: 8px;
  }
  
  .is-mobile {
    --bezel: 8px;
    --bezel-border: 6px;
  }
}

@media (max-width: 480px) {
  .frame {
    height: min(var(--h, 400px), 80vh);
    max-width: calc(100vw - 20px);
  }
  
  .is-desktop {
    --bezel: 8px;
    --bezel-border: 3px;
  }
  
  .is-tablet {
    --bezel: 8px;
    --bezel-border: 6px;
  }
  
  .is-mobile {
    --bezel: 6px;
    --bezel-border: 4px;
  }
}

/* Monitor stand (desktop only) */
.monitor-stand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;
  position: relative;
}

.monitor-stand__neck {
  margin-right: -370px;
  margin-top: -13px;
  width: 50px;
  height: 36px;
  background: linear-gradient(135deg, #4b5563, #374151);
  border-radius: 6px 6px 3px 3px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, .3),
    inset 0 1px 2px rgba(255, 255, 255, .1),
    inset 0 -1px 2px rgba(0, 0, 0, .2);
  position: relative;
}

.monitor-stand__neck::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 12px;
  background: linear-gradient(135deg, #4b5563, #374151);
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, .2);
}

.monitor-stand__base {
  margin-top: 0px;
  margin-right: -370px;
  width: 200px;
  height: 20px;
  background: linear-gradient(135deg, #4b5563, #374151);
  border-radius: 12px 12px 18px 18px;
  box-shadow:
    0 6px 18px rgba(0, 0, 0, .3),
    inset 0 1px 2px rgba(255, 255, 255, .1);
}
</style>
