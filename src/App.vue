<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import AppLayout from './shared/layouts/AppLayout.vue'
import LoadingScreen from './shared/components/LoadingScreen.vue'

const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 5000)
})
</script>

<template>
  <LoadingScreen :show="!showContent" />
  <Transition name="slide-fade">
    <AppLayout v-if="showContent">
      <RouterView />
    </AppLayout>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: opacity 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
}
</style>
