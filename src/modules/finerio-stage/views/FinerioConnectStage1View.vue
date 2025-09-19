<template>
  <div class="finerio-connect-stage1">
    <div class="connect-content">
      <ConnectionHeader />
      
      <h1 class="main-title">Conecta tus cuentas</h1>
      
      <BenefitsList />
      
      <ConnectionButtons 
        @connect="handleConnect"
        @viewConnected="handleViewConnected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ConnectionHeader from '../components/ConnectionHeader.vue'
import BenefitsList from '../components/BenefitsList.vue'
import ConnectionButtons from '../components/ConnectionButtons.vue'

const router = useRouter()

const handleConnect = () => {
  router.push('/finerio/connect-stage2')
}

const handleViewConnected = () => {
  router.push('/finerio/connected-accounts')
}
</script>

<style scoped>
.finerio-connect-stage1 {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.connect-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 32px 0;
  text-align: center;
}
</style>