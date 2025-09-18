<template>
  <div class="connected-accounts">
    <div class="accounts-content">
      <div class="header-section">
        <button class="back-button" @click="handleBack">
          <v-icon size="24" color="#001340">mdi-arrow-left</v-icon>
        </button>
        
        <h1 class="page-title">Mis instituciones conectadas</h1>
      </div>
      
      <SearchBar @search="handleSearch" />
      
      <SecurityMessage />
      
      <ConnectedBanksList :banks="connectedBanks" @manage="handleManageBank" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import SecurityMessage from '../components/SecurityMessage.vue'
import ConnectedBanksList from '../components/ConnectedBanksList.vue'

const router = useRouter()

const connectedBanks = ref([
  {
    id: 1,
    name: 'Bancolombia',
    logo: '/src/assets/bancolombia-logo.png',
    status: 'CONECTADO',
    connected: true
  }
])

const handleSearch = (query: string) => {
  console.log('Buscar:', query)
}

const handleBack = () => {
  router.push('/finerio/connect-stage1')
}

const handleManageBank = (bank: any) => {
  console.log('Gestionar banco:', bank)
}
</script>

<style scoped>
.connected-accounts {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

.accounts-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f1f5f9;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}
</style>