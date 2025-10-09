<template>
  <BaseActor 
    type="sistemas-core"
    icon="⚙️"
    label="Sistemas Core"
    :active="active"
    :highlight="highlight"
    :show-description="showDescription"
    :current-action="currentAction"
  >
    <template #extras v-if="showServices">
      <div class="core-services">
        <div class="service-item">☁️ Cloud</div>
        <div class="service-item">🏛️ Legacy</div>
      </div>
    </template>
  </BaseActor>
</template>

<script setup lang="ts">
import BaseActor from './BaseActor.vue'

interface Props {
  active?: boolean
  highlight?: boolean
  showDescription?: boolean
  showServices?: boolean
  currentAction?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  highlight: false,
  showDescription: false,
  showServices: false,
  currentAction: 'Servicios cloud y legacy'
})
</script>

<style scoped>
/* Styles for core services inherited from BaseActor */

.core-services {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.service-item {
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}
</style>