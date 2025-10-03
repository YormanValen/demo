<template>
  <div class="entity-layout" :class="{ 'hide-sidebar': hideSidebar }">
    <EntitySidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EntitySidebar from '../components/EntitySidebar.vue'

const hideSidebar = ref(false)

// Function to hide/show sidebar - will be called globally
const toggleSidebar = (hide: boolean) => {
  hideSidebar.value = hide
}

// Make function available globally
onMounted(() => {
  ;(window as any).toggleEntitySidebar = toggleSidebar
})
</script>

<style scoped>
.entity-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f2f2;
  transition: all 0.3s ease;
}

.entity-layout.hide-sidebar {
  background: transparent;
}

.entity-layout.hide-sidebar .entity-sidebar {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-100%);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.entity-layout.hide-sidebar .main-content {
  margin-left: 0;
}


/* Tablet frame specific styles */
.tablet .entity-layout,
.tablet__content .entity-layout {
  flex-direction: column;
}

.tablet .entity-layout .main-content,
.tablet__content .entity-layout .main-content {
  margin-left: 0 !important;
  padding: 15px;
}

@media (max-width: 1024px) {
  .entity-layout {
    flex-direction: column;
  }
  
  .main-content {
    margin-left: 0;
    padding: 15px;
  }
}
</style>