<template>
  <div class="connection-buttons">
    <button class="btn-primary" @click="$emit('connect')">
      Conectar cuenta
    </button>
    
    <button class="btn-secondary" @click="$emit('viewConnected')">
      Ver cuentas conectadas
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  connect: []
  viewConnected: []
}>()
</script>

<style scoped>
.connection-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
}

.btn-primary {
  width: 100%;
  height: 48px;
  background: #001340;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #002157;
}

.btn-secondary {
  width: 100%;
  height: 48px;
  background: white;
  color: #374151;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}
</style>