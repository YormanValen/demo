<template>
  <div class="connected-banks-list">
    <div v-for="bank in banks" :key="bank.id" class="bank-item">
      <div class="bank-info">
        <div class="bank-logo">
          <div class="logo-container" :class="{ 'has-logo': hasLogo(bank.name) }" :style="!hasLogo(bank.name) ? { backgroundColor: bank.bankColor } : {}">
            <img v-if="bank.name === 'Neodigi Bank'" src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank" class="bank-logo-image" />
            <img v-else-if="bank.name === 'TekCredit'" src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit" class="bank-logo-image" />
            <img v-else-if="bank.name === 'Flexfinia'" src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia" class="bank-logo-image" />
            <span v-else class="bank-initials">{{ bank.bankInitials || bank.name?.charAt(0) || '?' }}</span>
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
  bankInitials?: string
  bankColor?: string
}

defineProps<{
  banks: readonly Bank[]
}>()

defineEmits<{
  manage: [bank: Bank]
}>()

const hasLogo = (bankName: string) => {
  return ['Neodigi Bank', 'TekCredit', 'Flexfinia'].includes(bankName)
}
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.logo-container.has-logo {
  background-color: white;
}

.bank-logo-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.bank-initials {
  color: white;
  font-size: 16px;
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