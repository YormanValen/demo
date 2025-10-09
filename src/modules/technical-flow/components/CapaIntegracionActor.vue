<template>
  <BaseActor 
    type="capa-integracion"
    icon="💾"
    label="Capa de Integración"
    :active="active"
    :highlight="highlight"
    :show-description="showDescription"
    :current-action="currentAction"
  />
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
  currentAction: 'Base de datos réplica'
})
</script>

<style scoped>
/* Styles inherited from BaseActor */
</style>