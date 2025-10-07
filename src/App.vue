<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed, watch } from 'vue'
import AppLayout from './shared/layouts/AppLayout.vue'
import LoadingScreen from './shared/components/LoadingScreen.vue'
import DeviceFrame from './components/frame/DeviceFrame.vue'

type DeviceKind = 'full' | 'desktop' | 'tablet'

const showContent = ref(false)
// Abrir por defecto en Pantalla completa
const currentDevice = ref<DeviceKind>('full')

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 5000)
})

const deviceOptions: { key: DeviceKind; label: string; icon: string }[] = [
  { key: 'full', label: 'Pantalla completa', icon: 'mdi-monitor' },
  { key: 'tablet', label: 'Tableta', icon: 'mdi-tablet' },
]

const router = useRouter()
const route = useRoute()
const goHome = () => {
  router.push('/registration/experience-selection').then(() => {
    window.location.reload()
  })
}

// Computed property to check if we're in full screen mode and on entity routes
const isFullScreenEntityDashboard = computed(() => {
  const entityRoutes = ['/entity/dashboard', '/entity/consent-revocation', '/entity/analytics']
  return currentDevice.value === 'full' && entityRoutes.includes(route.path)
})

// Computed property to check if we're in entity experience
const isInEntityExperience = computed(() => {
  return route.path.startsWith('/entity')
})

// Computed property to filter device options based on current route
const availableDeviceOptions = computed(() => {
  if (isInEntityExperience.value) {
    // Only show "Pantalla completa" when in entity experience
    return deviceOptions.filter(option => option.key !== 'tablet')
  }
  return deviceOptions
})

// Store previous device mode when not in entity experience
const previousDeviceMode = ref<DeviceKind>('full')

// Watch for route changes to handle device mode switching
watch(isInEntityExperience, (isInEntity, wasInEntity) => {
  if (isInEntity && !wasInEntity) {
    // Entering entity experience - store current mode and switch to full
    if (currentDevice.value !== 'full') {
      previousDeviceMode.value = currentDevice.value
    }
    currentDevice.value = 'full'
  } else if (!isInEntity && wasInEntity) {
    // Leaving entity experience - restore previous mode if it wasn't full
    if (previousDeviceMode.value !== 'full') {
      currentDevice.value = previousDeviceMode.value
    }
  }
}, { immediate: false })

// Fullscreen functionality
const isFullscreen = ref(false)

const toggleFullscreen = async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch (error) {
    console.error('Error toggling fullscreen:', error)
  }
}

// Listen for fullscreen changes
onMounted(() => {
  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('mozfullscreenchange', handleFullscreenChange)
  document.addEventListener('MSFullscreenChange', handleFullscreenChange)
})
</script>

<template>
  <div :class="['app-container', { 'full-mode': currentDevice === 'full' }]">
    <!-- Loading screen outside the frame -->
    <LoadingScreen :show="!showContent" />

    <!-- Content with device frame -->
    <Transition name="slide-fade">
      <div v-if="showContent" :class="['frame-container', { 'full-mode': currentDevice === 'full' }]">
        <!-- Modo Pantalla completa sin marco -->
        <template v-if="currentDevice === 'full'">
          <AppLayout>
            <RouterView />
          </AppLayout>
        </template>
        <!-- Con marco de dispositivo -->
        <template v-else>
          <DeviceFrame :device="currentDevice as Exclude<DeviceKind, 'full'>">
            <AppLayout>
              <RouterView />
            </AppLayout>
          </DeviceFrame>
        </template>
      </div>
    </Transition>


    <!-- Floating fullscreen button -->
    <div class="fullscreen-control">
      <button class="fullscreen-btn" :class="{ active: isFullscreen }" @click="toggleFullscreen"
        :title="isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa del navegador'">
        <div class="fullscreen-icon" :class="{ 'exit': isFullscreen }"></div>
      </button>
    </div>

    <!-- Floating device selector -->
    <div class="device-controls">
      <!-- Device mode buttons -->
      <button v-for="opt in availableDeviceOptions" :key="opt.key"
        :class="['device-btn', { active: currentDevice === opt.key }]" 
        @click="currentDevice = opt.key"
        :title="opt.label">
        <v-icon size="20">{{ opt.icon }}</v-icon>
      </button>
    </div>

    <!-- Floating Home control (top-left) -->
    <div class="home-control" :class="{ 'entity-dashboard-position': isFullScreenEntityDashboard }">
      <button class="home-btn" @click="goHome">
        <v-icon size="18">mdi-home</v-icon>
        <span>Volver al inicio</span>
      </button>
    </div>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.app-container.full-mode {
  padding: 0;
  /* remove outer padding for true full */
  align-items: stretch;
  /* let inner container fill width */
  overflow: hidden;
  /* no scroll on wrapper; inner controls scroll */
  height: 100vh;
  /* fixed height for full mode */
}

.fullscreen-control {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.device-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.home-control {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10000;
  padding: 10px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.home-control.entity-dashboard-position {
  top: 20px;
  right: 20px;
  left: auto;
}

.device-btn {
  padding: 10px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-btn:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

.device-btn.active {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: #ffffff !important;
  font-weight: 700;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(97, 40, 120, 0.35);
}

.fullscreen-btn {
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

.fullscreen-btn:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

.fullscreen-btn.active {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: #ffffff !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(97, 40, 120, 0.35);
}

.fullscreen-icon {
  width: 16px;
  height: 16px;
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
}

/* Fullscreen enter icon (4 corner arrows pointing outward) */
.fullscreen-icon::before,
.fullscreen-icon::after {
  content: '';
  position: absolute;
  border: 2px solid currentColor;
  transition: all 0.3s ease;
}

.fullscreen-icon::before {
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-right: none;
  border-bottom: none;
}

.fullscreen-icon::after {
  bottom: 0;
  right: 0;
  width: 6px;
  height: 6px;
  border-left: none;
  border-top: none;
}

/* Fullscreen exit icon (X shape) */
.fullscreen-icon.exit::before,
.fullscreen-icon.exit::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 2px;
  background-color: currentColor;
  border: none;
}

.fullscreen-icon.exit::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.fullscreen-icon.exit::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.home-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.frame-container {
  display: flex;
  justify-content: center;
  /* center horizontally */
  align-items: center;
  /* center vertically */
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  /* full height minus padding */
}

.frame-container.full-mode {
  position: fixed;
  inset: 0;
  /* top:0; right:0; bottom:0; left:0 */
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  align-items: stretch;
  overflow: auto;
  /* allow scroll in full mode */
}

/* Keep device selector visible in full mode */

/* Make AppLayout truly edge-to-edge in full mode */
.app-container.full-mode .app-layout {
  min-height: 100vh;
  width: 100vw;
}

.app-container.full-mode .app-layout__content {
  padding: 0;
}

/* Remove any height constraints from AppLayout inside frames */
.frame__content .app-layout,
.tablet__content .app-layout {
  height: auto;
  min-height: auto;
}

/* Make views that use viewport units adapt inside frames */
.frame__content .financial-connect-stage1,
.tablet__content .financial-connect-stage1 {
  position: relative !important;
  /* override fixed */
  width: 100% !important;
  /* override 100vw */
  min-height: 100% !important;
  /* override 100vh */
  height: auto !important;
  overflow: visible !important;
  /* avoid clipping within frame */
}

/* Apply same adaptation for ConnectInstitutions root */
.frame__content .connect-institutions,
.tablet__content .connect-institutions {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt Validation view inside device frames */
.frame__content .validation-view,
.tablet__content .validation-view {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt Bank dashboard (blue) root inside device frames */
.frame__content .portal-container,
.tablet__content .portal-container {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt AccountSelection view inside device frames */
.frame__content .account-selection,
.tablet__content .account-selection {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt connection loading/success screens inside frames */
.frame__content .connection-loading,
.tablet__content .connection-loading,
.frame__content .connection-success,
.tablet__content .connection-success {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt ThankYou view inside device frames */
.frame__content .thank-you,
.tablet__content .thank-you {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt DataProcessingAnimation view inside device frames */
.frame__content .data-processing-animation,
.tablet__content .data-processing-animation {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Tablet-specific layout for FinerioConnectStage1 (simulate <=1024px) */
.tablet .financial-connect-stage1 {
  padding: 20px !important;
}

.tablet .financial-connect-stage1 .main-container {
  grid-template-columns: 1fr !important;
  grid-template-rows: auto auto !important;
  max-width: 800px !important;
}

.tablet .financial-connect-stage1 .left-panel,
.tablet .financial-connect-stage1 .right-panel {
  padding: 40px 30px !important;
  justify-content: flex-start !important;
}

.tablet .financial-connect-stage1 .right-panel {
  overflow-y: visible !important;
}

.tablet .financial-connect-stage1 .main-title {
  font-size: 18px !important;
}

.tablet .financial-connect-stage1 .subtitle {
  font-size: 13px !important;
}

/* Tablet-specific layout for ConnectInstitutions (simulate <=1024px) */
.tablet .connect-institutions {
  padding: 20px !important;
}

.tablet .connect-institutions .main-container {
  grid-template-columns: 1fr !important;
  grid-template-rows: auto auto !important;
  max-width: 800px !important;
}

.tablet .connect-institutions .left-panel,
.tablet .connect-institutions .right-panel {
  padding: 40px 30px !important;
  justify-content: flex-start !important;
}

.tablet .connect-institutions .right-panel {
  overflow-y: visible !important;
}

.tablet .connect-institutions .panel-title {
  font-size: 20px !important;
}

/* Tablet-specific fix: allow DataProcessingAnimation white card to grow */
.tablet .data-processing-animation .main-container {
  height: auto !important;
  min-height: 0 !important;
  overflow: visible !important;
}

.tablet .data-processing-animation .pipeline-section {
  max-height: none !important;
  overflow: visible !important;
}

.tablet .data-processing-animation {
  padding-bottom: 24px !important;
  /* ensure extra space at bottom */
}

/* Adapt Finerio process screen inside frames */
.frame__content .financial-process,
.tablet__content .financial-process {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Adapt ConnectedAccounts view inside frames */
.frame__content .connected-accounts,
.tablet__content .connected-accounts {
  position: relative !important;
  width: 100% !important;
  min-height: 100% !important;
  height: auto !important;
  overflow: visible !important;
}

/* Fix footer positioning in full mode */
.app-container.full-mode .app-layout__footer {
  padding: 15px 40px;
  min-height: 80px;
}

.app-container.full-mode .footer-logo {
  margin-top: -20px;
  height: 80px;
}


.slide-fade-enter-active {
  transition: opacity 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }

  .fullscreen-control {
    bottom: 120px;
    right: 15px;
    padding: 6px;
  }

  .device-controls {
    bottom: 15px;
    right: 15px;
    padding: 8px;
    gap: 6px;
  }

  .device-btn {
    padding: 8px 10px;
    font-size: 11px;
    min-width: 60px;
  }

  .fullscreen-btn {
    width: 36px;
    height: 36px;
    padding: 8px;
  }

  .home-control {
    top: 15px;
    left: 15px;
    padding: 8px;
  }

  .home-control.entity-dashboard-position {
    top: 15px;
    right: 15px;
    left: auto;
  }

  .home-btn {
    padding: 8px 10px;
    font-size: 11px;
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 5px;
  }

  .fullscreen-control {
    bottom: 100px;
    right: 10px;
    padding: 4px;
  }

  .device-controls {
    bottom: 10px;
    right: 10px;
    padding: 6px;
    gap: 4px;
  }

  .device-btn {
    padding: 6px 8px;
    font-size: 10px;
    min-width: 50px;
  }

  .fullscreen-btn {
    width: 32px;
    height: 32px;
    padding: 6px;
  }

  .home-control {
    top: 10px;
    left: 10px;
    padding: 6px;
  }

  .home-control.entity-dashboard-position {
    top: 10px;
    right: 10px;
    left: auto;
  }

  .home-btn {
    padding: 6px 8px;
    font-size: 10px;
    gap: 4px;
  }
}
</style>
