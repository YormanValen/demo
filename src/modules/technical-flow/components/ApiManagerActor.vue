<template>
  <BaseActor 
    type="api-manager"
    icon="🛡️"
    label="API Manager Gateway"
    :active="active"
    :highlight="highlight"
    :show-description="showDescription"
    :current-action="currentAction"
  >
    <template #extras>
      <slot name="extras"></slot>
    </template>
  </BaseActor>
  
</template>

<script setup lang="ts">
import BaseActor from './BaseActor.vue'

interface Props {
  active?: boolean
  highlight?: boolean
  showDescription?: boolean
  currentAction?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  highlight: false,
  showDescription: false,
  currentAction: 'Procesa solicitudes y validaciones'
})
</script>

<style scoped>
/* Styles inherited from BaseActor */
</style>
