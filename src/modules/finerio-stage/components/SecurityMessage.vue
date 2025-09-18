<template>
  <div class="security-message">
    <div class="security-icon">
      <v-icon size="20" color="#001340">mdi-lock</v-icon>
    </div>
    <p class="security-text">Tus cuentas conectadas de forma segura</p>
  </div>
</template>

<script setup lang="ts">
// Mensaje de seguridad para cuentas conectadas
</script>

<style scoped>
.security-message {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #f1f5f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.security-icon {
  flex-shrink: 0;
}

.security-text {
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
</style>