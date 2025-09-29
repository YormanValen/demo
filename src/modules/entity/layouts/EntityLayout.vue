<template>
  <div class="entity-layout">
    <EntitySidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import EntitySidebar from '../components/EntitySidebar.vue'
</script>

<style scoped>
.entity-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f2f2;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 20px;
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