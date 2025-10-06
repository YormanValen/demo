<template>
  <!-- Teleport to body so it renders outside the device frame and fills viewport -->
  <teleport to="body">
    <div v-if="isVisible" class="animation-container" :class="{ 'is-open': isOpen }">
      <div class="animation-header" @click="toggleContainer" :class="{ 'non-clickable': !clickableHeader }">
        <slot name="header">
          <span class="animation-title">Experiencia de Entidad</span>
        </slot>
        <v-icon class="toggle-icon" :class="{ 'rotated': isOpen }">
          mdi-chevron-up
        </v-icon>
      </div>

      <transition name="slide-up">
        <div v-if="isOpen" class="animation-content">
          <slot>
            <p>Contenido de animación aquí</p>
          </slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

interface Props {
  isVisible?: boolean
  initialOpen?: boolean
  clickableHeader?: boolean
  forceOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true,
  initialOpen: false,
  clickableHeader: true,
  forceOpen: false
})

const emit = defineEmits<{
  toggle: [isOpen: boolean]
}>()

const isOpen = ref(false)

watch(() => props.forceOpen, (newValue) => {
  isOpen.value = newValue
})

const toggleContainer = () => {
  if (props.clickableHeader) {
    isOpen.value = !isOpen.value
    emit('toggle', isOpen.value)
  }
}
</script>

<style scoped>
.animation-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  background: transparent;
  transition: transform 0.3s ease;
  transform: translateY(calc(100% - 40px));
}

.animation-container.is-open {
  transform: translateY(0);
}

.animation-header {
  height: 40px;
  background: #000d2c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  margin: 0 auto;
  width: 200px;
  border-radius: 8px 8px 0 0;
}

.animation-title {
  font-size: 14px;
  font-weight: 600;
}

.toggle-icon {
  transition: transform 0.3s ease;
  position: absolute;
  right: 12px;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.animation-header.non-clickable {
  cursor: default;
}

.animation-header.non-clickable .toggle-icon {
  display: none;
}

.animation-content {
  /* Stop opening a bit below the screen half */
  height: var(--sheet-content-height, 30vh);
  max-height: var(--sheet-content-height, 30vh);
  overflow-y: auto;
  padding: 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>