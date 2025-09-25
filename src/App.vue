<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import AppLayout from './shared/layouts/AppLayout.vue'
import LoadingScreen from './shared/components/LoadingScreen.vue'
import DeviceFrame from './components/frame/DeviceFrame.vue'

type DeviceKind = 'full' | 'desktop' | 'tablet' | 'mobile'

const showContent = ref(false)
// Abrir por defecto en Escritorio
const currentDevice = ref<DeviceKind>('desktop')

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 5000)
})

const deviceOptions: { key: DeviceKind; label: string }[] = [
  { key: 'full', label: 'Pantalla completa' },
  { key: 'desktop', label: 'Escritorio' },
  { key: 'tablet', label: 'Tableta' },
  { key: 'mobile', label: 'Móvil' },
]

const router = useRouter()
const goHome = () => router.push('/')
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
    
    
    <!-- Floating device selector -->
    <div class="device-controls">
      <button
        v-for="opt in deviceOptions"
        :key="opt.key"
        :class="['device-btn', { active: currentDevice === opt.key }]"
        @click="currentDevice = opt.key"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Floating Home control (top-left) -->
    <div class="home-control">
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
  padding: 0;            /* remove outer padding for true full */
  align-items: stretch;  /* let inner container fill width */
  overflow: hidden;      /* no scroll on wrapper; inner controls scroll */
  height: 100vh;         /* fixed height for full mode */
}

.device-controls {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
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
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.device-btn {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 70px;
  text-align: center;
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
  justify-content: center;  /* center horizontally */
  align-items: center;       /* center vertically */
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);  /* full height minus padding */
}

.frame-container.full-mode {
  position: fixed;
  inset: 0;       /* top:0; right:0; bottom:0; left:0 */
  width: 100vw;
  height: 100vh;
  justify-content: flex-start;
  align-items: stretch;
  overflow: auto; /* allow scroll in full mode */
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
  
  .home-control {
    top: 15px;
    left: 15px;
    padding: 8px;
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
  
  .home-control {
    top: 10px;
    left: 10px;
    padding: 6px;
  }
  
  .home-btn {
    padding: 6px 8px;
    font-size: 10px;
    gap: 4px;
  }
}
</style>
