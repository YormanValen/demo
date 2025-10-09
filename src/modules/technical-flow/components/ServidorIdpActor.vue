<template>
  <BaseActor 
    type="servidor-idp"
    icon="🔐"
    label="Servidor IdP"
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
  currentAction: 'Valida autenticación y genera tokens'
})
</script>

<style scoped>
/* Styles inherited from BaseActor */
</style>
