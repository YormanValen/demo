<template>
  <div class="connection-success">
    <div class="success-content">
      <div class="connected-banks-section">
        <div class="banks-logos-container">
          <div v-for="bank in connectedBanks" :key="bank.id" class="bank-logo-item">
            <div class="bank-logo-circle" :class="{ 'has-logo': hasLogo(bank.name) }"
              :style="!hasLogo(bank.name) ? { backgroundColor: bank.color } : {}">
              <img v-if="bank.name === 'Neodigi Bank'" src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank"
                class="bank-logo-image" />
              <img v-else-if="bank.name === 'TekCredit'" src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit"
                class="bank-logo-image" />
              <img v-else-if="bank.name === 'Flexfinia'" src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia"
                class="bank-logo-image" />
              <span v-else class="bank-initials">{{ bank.initials }}</span>
            </div>
          </div>
        </div>
        <div class="success-icon">✓</div>
      </div>

      <h1 class="main-title">Conexión exitosa</h1>

      <div class="countdown">
        {{ countdown }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInstitutionsStore } from '../../financial/stores/institutions.store'
import { useBankQueueStore } from '../../financial/stores/bank-queue.store'

const router = useRouter()
const countdown = ref(5)
const institutionsStore = useInstitutionsStore()
const bankQueueStore = useBankQueueStore()

const connectedBanks = computed(() => {
  // Obtener todos los bancos que se conectaron desde el store
  const allBanks = bankQueueStore.selectedBanks.value
  return allBanks.map(bank => ({
    id: bank.id,
    name: bank.name,
    initials: bank.initials,
    color: bank.color
  }))
})

const hasLogo = (bankName: string) => {
  return ['Neodigi Bank', 'TekCredit', 'Flexfinia'].includes(bankName)
}

onMounted(() => {
  console.log('ConnectionSuccessView - Saving all connected banks to institutions store')

  // Guardar TODOS los bancos seleccionados como instituciones conectadas
  const allSelectedBanks = bankQueueStore.selectedBanks.value

  allSelectedBanks.forEach((bank, index) => {
    const institutionData = {
      id: Date.now() + index, // Unique ID for each bank
      name: bank.name,
      logo: '',
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
      bankInitials: bank.initials,
      bankColor: bank.color
    }

    console.log('Adding institution:', institutionData.name)
    institutionsStore.addInstitution(institutionData)
  })

  // Limpiar la cola de bancos ya que todos fueron procesados exitosamente
  bankQueueStore.reset()

  console.log('All banks saved. Total connected institutions:', institutionsStore.connectedInstitutions.value.length)

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

.connected-banks-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.banks-logos-container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.bank-logo-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bank-logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.bank-logo-circle.has-logo {
  background-color: white;
}

.bank-logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.bank-initials {
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.success-icon {
  font-size: 40px;
  color: #10b981;
  background: white;
  border: 3px solid #10b981;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
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
