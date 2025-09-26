<template>
  <div class="connected-banks-list">
    <div v-for="bank in banks" :key="bank.id" class="bank-item">
      <div class="bank-info">
        <div class="bank-logo">
          <div class="logo-placeholder">
            <span class="logo-text">{{ bank.name?.charAt(0) || '?' }}</span>
          </div>
        </div>
        
        <div class="bank-details">
          <h3 class="bank-name">{{ bank.name || 'Entidad Financiera' }}</h3>
          <span class="bank-status" :class="{ 'connected': bank.connected }">
            {{ bank.status || 'DESCONOCIDO' }}
          </span>
        </div>
      </div>
      
      <button class="manage-button" @click="$emit('manage', bank)">
        Gestionar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Bank {
  id: number
  name: string
  logo: string
  status: string
  connected: boolean
}

defineProps<{
  banks: readonly Bank[]
}>()

defineEmits<{
  manage: [bank: Bank]
}>()
</script>

<style scoped>
.connected-banks-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bank-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.bank-item:hover {
  border-color: #d1d5db;
}

.bank-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bank-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #001340;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.bank-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bank-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.bank-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  width: fit-content;
}

.bank-status.connected {
  background-color: #dcfce7;
  color: #166534;
}

.manage-button {
  background: #001340;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.manage-button:hover {
  background: #002157;
}
</style>