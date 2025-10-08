<template>
  <BaseActor 
    type="tercero-receptor"
    icon="🏢"
    label="Tercero Receptor de Datos"
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
  currentAction: 'Solicita creación de consentimiento'
})
</script>

<style scoped>
/* Styles inherited from BaseActor */
</style>