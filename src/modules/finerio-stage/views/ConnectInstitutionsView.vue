<template>
  <div class="connect-institutions">
    <div class="institutions-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="main-title">Conecta tus Instituciones</h1>

      <div class="search-section">
        <div class="search-input">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="search-icon">
            <circle cx="9" cy="9" r="8" stroke="#9ca3af" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Busca tu institución"
            class="search-field"
          />
        </div>

        <div class="security-notice">
          <div class="security-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1L15 3V7.5C15 11.5 12.5 15.25 10 16C7.5 15.25 5 11.5 5 7.5V3L10 1Z" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="security-text">Conecta de forma segura tus instituciones</p>
        </div>
      </div>

      <div class="institutions-list">
        <div 
          v-for="bank in filteredBanks" 
          :key="bank.id"
          class="institution-item"
        >
          <div class="institution-info">
            <div class="institution-logo" :style="{ backgroundColor: bank.color }">
              <span class="logo-text">{{ bank.initials }}</span>
            </div>
            <div class="institution-details">
              <h3 class="institution-name">{{ bank.name }}</h3>
              <div v-if="bank.isConnected" class="connected-indicator">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="#10b981"/>
                  <path d="M5 8L7 10L11 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <button 
            class="connect-button"
            :class="{ 'connected': bank.isConnected }"
            @click="handleConnectBank(bank)"
          >
            {{ bank.isConnected ? 'Conectado' : 'Conectar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface Bank {
  id: string
  name: string
  initials: string
  color: string
  isConnected: boolean
}

const router = useRouter()
const searchQuery = ref('')

const banks = ref<Bank[]>([
  {
    id: '1',
    name: 'Banco Azul',
    initials: 'BA',
    color: '#2563eb',
    isConnected: false
  },
  {
    id: '2',
    name: 'Banco Rojo',
    initials: 'BR',
    color: '#dc2626',
    isConnected: false
  },
  {
    id: '3',
    name: 'Banco Verde',
    initials: 'BV',
    color: '#059669',
    isConnected: false
  }
])

const filteredBanks = computed(() => {
  if (!searchQuery.value) {
    return banks.value
  }
  return banks.value.filter(bank => 
    bank.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const handleGoBack = () => {
  router.push('/finerio/connect-stage2')
}

const handleConnectBank = (bank: Bank) => {
  if (!bank.isConnected) {
    router.push({
      path: '/finerio/validation',
      query: { 
        bankName: bank.name,
        bankInitials: bank.initials,
        bankColor: bank.color
      }
    })
  }
}
</script>

<style scoped>
.connect-institutions {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.institutions-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background: #f1f5f9;
}

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 32px 0;
  text-align: center;
}

.search-section {
  margin-bottom: 32px;
}

.search-input {
  position: relative;
  margin-bottom: 16px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.search-field {
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 16px 0 48px;
  font-size: 16px;
  color: #374151;
  background: white;
  transition: border-color 0.2s;
}

.search-field:focus {
  outline: none;
  border-color: #001340;
}

.search-field::placeholder {
  color: #9ca3af;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 8px;
}

.security-icon {
  flex-shrink: 0;
}

.security-text {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.institutions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.institutions-list::-webkit-scrollbar {
  width: 6px;
}

.institutions-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.institutions-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.institutions-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.institution-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.institution-item:hover {
  border-color: #d1d5db;
}

.institution-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.institution-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-text {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.institution-details {
  display: flex;
  align-items: center;
  gap: 8px;
}

.institution-name {
  font-size: 16px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.connected-indicator {
  display: flex;
  align-items: center;
}

.connect-button {
  background: white;
  color: #001340;
  border: 2px solid #001340;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;
}

.connect-button:hover {
  background: #001340;
  color: white;
}

.connect-button.connected {
  background: #f3f4f6;
  color: #6b7280;
  border-color: #d1d5db;
  cursor: default;
}

.connect-button.connected:hover {
  background: #f3f4f6;
  color: #6b7280;
}
</style>