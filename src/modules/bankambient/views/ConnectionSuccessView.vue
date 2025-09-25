<template>
  <div class="connection-success">
    <div class="success-content">
      <div class="bank-logo">
        <div class="bank-logo-circle" :style="{ backgroundColor: bankColor }">
          <span class="bank-initials">{{ bankInitials }}</span>
        </div>
      </div>

      <h1 class="main-title">Conexión exitosa</h1>

      <p class="success-message">Entidad conectada exitosamente.</p>

      <div class="countdown">
        {{ countdown }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInstitutionsStore } from '../../financial/stores/institutions.store'

const router = useRouter()
const route = useRoute()
const countdown = ref(10)
const institutionsStore = useInstitutionsStore()


const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})

onMounted(() => {
  // Save the connected institution to store
  const institutionData = {
    id: Date.now(), // Use timestamp as unique ID
    name: route.query.bankName as string || 'Entidad Financiera',
    logo: route.query.bankLogo as string || '',
    status: 'CONECTADO',
    connected: true,
    initialDate: new Date().toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    bankInitials: bankInitials.value,
    bankColor: bankColor.value
  }
  
  institutionsStore.addInstitution(institutionData)

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      // Navigate to thank you page
      router.push('/bankambient/thank-you')
    }
  }, 1000)
})
</script>

<style scoped>
.connection-success {
  min-height: 100vh;
  width: 100vw;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.success-content {
  background: white;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
}

.bank-logo {
  display: flex;
  justify-content: center;
}

.bank-logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.success-check {
  display: flex;
  justify-content: center;
}

.main-title {
  font-size: 28px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.success-message {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.countdown {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
</style>