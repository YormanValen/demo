<template>
  <div class="benefits-list">
    <div class="benefit-item">
      <div class="benefit-icon">
        <v-icon size="24" color="#001340">mdi-bank</v-icon>
      </div>
      <p class="benefit-text">Inicia sesión en tu cuenta de forma rápida.</p>
    </div>
    
    <div class="benefit-item">
      <div class="benefit-icon">
        <v-icon size="24" color="#001340">mdi-shield-check</v-icon>
      </div>
      <p class="benefit-text">Validamos tu autenticación para mayor seguridad.</p>
    </div>
    
    <div class="benefit-item">
      <div class="benefit-icon">
        <v-icon size="24" color="#001340">mdi-laptop</v-icon>
      </div>
      <p class="benefit-text">Puedes desconectar tus cuentas en cualquier momento.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Lista de beneficios de la conexión
</script>

<style scoped>
.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.benefit-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.benefit-text {
  color: #374151;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
}
</style>