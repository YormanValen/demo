<template>
  <div class="connection-header">
    <div class="logo-container">
      <span class="logo">Logo</span>
    </div>
    <div class="arrows">
      <v-icon size="24" color="#6b7280">mdi-arrow-right</v-icon>
      <v-icon size="24" color="#6b7280">mdi-arrow-left</v-icon>
    </div>
    <div class="bank-icon">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Rectángulo grande -->
        <rect x="3" y="1" width="22" height="18" rx="2" stroke="#001340" stroke-width="2" fill="none"/>
        <!-- Rectángulo pequeño -->
        <rect x="1" y="9" width="14" height="14" rx="2" stroke="#001340" stroke-width="2" fill="white"/>
        <!-- Cuadrado pequeño interno -->
        <rect x="9" y="11" width="4" height="4" rx="0.5" fill="#001340"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
// Header con logos y flechas de conexión
</script>

<style scoped>
.connection-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.logo-container {
  width: 60px;
  height: 60px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.logo {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bank-icon {
  width: 60px;
  height: 60px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}
</style>