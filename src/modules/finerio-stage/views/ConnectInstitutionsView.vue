<template>
  <div class="connect-institutions">

    <div class="main-container">
      <!-- Panel Izquierdo - Selector de Bancos -->
      <div class="left-panel" :class="{ 'animate': showContent }">
        <div class="panel-header">
          <h1 class="panel-title">Selecciona el banco</h1>
          <p class="panel-subtitle">en el que tienes domiciliada tu nómina o pensión</p>
        </div>

        <div class="search-section">
          <div class="search-input">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="search-icon">
              <circle cx="9" cy="9" r="8" stroke="#9ca3af" stroke-width="2" />
              <path d="M21 21L16.65 16.65" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Busca tu banco" class="search-field" />
          </div>
        </div>

        <div class="institutions-list">
          <div v-for="(bank, index) in filteredBanks" :key="bank.id" class="institution-item"
            :style="{ 'animation-delay': `${index * 100}ms` }" @click="handleConnectBank(bank)">
            <div class="institution-info">
              <div class="institution-logo">
                <div v-if="bank.name === 'Neodigi Bank'" class="custom-logo neodigi-logo">
                  <img src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank" class="neodigi-logo-img" />
                </div>
                <div v-else-if="bank.name === 'TekCredit'" class="custom-logo tek-logo">
                  <img src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit" class="tekcredit-logo-img" />
                </div>
                <div v-else-if="bank.name === 'Flexfinia'" class="custom-logo flex-logo">
                  <img src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia" class="flexfinia-logo-img" />
                </div>
                <div v-else class="custom-logo initials-logo" :style="{ backgroundColor: bank.color }">
                  <span class="logo-text">{{ bank.initials }}</span>
                </div>
              </div>
              <div class="institution-details">
                <h3 class="institution-name">{{ bank.name }}</h3>
              </div>
            </div>
            <div v-if="bank.isConnected" class="connected-indicator">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#10b981" />
                <path d="M5 8L7 10L11 6" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <button class="back-button-bottom" @click="handleGoBack">
          Volver
        </button>
      </div>

      <!-- Panel Derecho - Información -->
      <div class="right-panel" :class="{ 'animate': showContent }">
        <div class="help-section">
          <div class="help-icon">
          </div>
        </div>


        <!-- Información sobre análisis de transacciones -->
        <div class="transaction-analysis-info">
          <div class="info-header">
            <div class="info-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="url(#gradient2)" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="url(#gradient2)" stroke-width="2" />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 class="info-title">Conecta el banco donde recibes tus ingresos o manejas tus productos</h2>
          </div>

          <div class="info-content">
            <p class="info-description">
              <strong>Al elegir tu banco nos permites conocer mejor tu realidad financiera:</strong> tus ingresos, tarjetas y movimientos principales.
            </p>

            <div class="info-grid">
              <div class="info-detail">
                <div class="detail-icon purpose">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z"
                      stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="detail-content">
                  <h4>Propósito claro</h4>
                  <p>Usamos esta información solo para crear una visión completa de ti y ofrecerte soluciones ajustadas a tu perfil.</p>
                </div>
              </div>

              <div class="info-detail">
                <div class="detail-icon duration">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#64748b" stroke-width="2" />
                    <polyline points="12,6 12,12 16,14" stroke="#64748b" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="detail-content">
                  <h4>Flexibilidad</h4>
                  <p>Puedes conectar uno o varios bancos, porque tu vida financiera no está en un solo lugar.</p>
                </div>
              </div>

              <div class="info-detail">
                <div class="detail-icon security">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="#64748b"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="detail-content">
                  <h4>Beneficio para ti</h4>
                  <p>Entre más completa sea tu información, más rápido y justo será tu acceso a productos financieros.</p>
                </div>
              </div>

              <div class="info-detail">
                <div class="detail-icon security">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="#64748b"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <div class="detail-content">
                  <h4>Siempre seguro</h4>
                  <p>La conexión se hace directamente con tu banco, sin que tus credenciales queden guardadas.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Timestamp fijo en la parte inferior -->
    <div class="timestamp-fixed">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" class="timestamp-icon">
        <circle cx="12" cy="12" r="10" stroke="#9ca3af" stroke-width="2"/>
        <polyline points="12,6 12,12 16,14" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="timestamp-text">{{ currentDateTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
const showContent = ref(false)
const currentDateTime = ref('')
let intervalId: ReturnType<typeof setInterval> | null = null

const updateDateTime = () => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }
  currentDateTime.value = now.toLocaleDateString('es-ES', options)
}

const banks = ref<Bank[]>([
  {
    id: '1',
    name: 'Neodigi Bank',
    initials: 'ND',
    color: '#2563eb',
    isConnected: false
  },
  {
    id: '2',
    name: 'TekCredit',
    initials: 'TC',
    color: '#dc2626',
    isConnected: false
  },
  {
    id: '3',
    name: 'Flexfinia',
    initials: 'FF',
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
  router.push('/financial/connect-stage1')
}

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 300)
  updateDateTime()
  intervalId = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleConnectBank = (bank: Bank) => {
  if (!bank.isConnected) {
    router.push({
      path: '/financial/validation',
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
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}


.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  min-height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Panel Izquierdo - Selector de Bancos */
.left-panel {
  background: white;
  padding: 40px;
  border-right: 1px solid #e5e7eb;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-panel.animate {
  opacity: 1;
  transform: translateX(0);
}

.panel-header {
  margin-bottom: 32px;
  text-align: center;
}

.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: #001340;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.panel-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
}

.search-section {
  margin-bottom: 24px;
}

.search-input {
  position: relative;
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
  border-radius: 12px;
  padding: 0 16px 0 48px;
  font-size: 16px;
  color: #374151;
  background: #f8fafc;
  transition: all 0.3s ease;
  text-align: center;
}

.search-field:focus {
  outline: none;
  border-color: rgb(97, 40, 120);
  box-shadow: 0 0 0 3px rgba(97, 40, 120, 0.1);
  background: white;
  text-align: left;
}

.search-field::placeholder {
  color: #9ca3af;
}

/* Lista de Instituciones */
.institutions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 24px;
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
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 3px;
}

.institution-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  animation: slideInUp 0.4s ease forwards;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.institution-item:hover {
  border-color: rgb(97, 40, 120);
  background: rgba(97, 40, 120, 0.02);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(97, 40, 120, 0.1);
}

.institution-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.institution-logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-text {
  color: white;
  font-size: 16px;
  font-weight: 700;
}

.custom-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.custom-logo svg {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.initials-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.neodigi-logo-img {
  width: 56px;
  height: auto;
  object-fit: contain;
}

.tekcredit-logo-img {
  width: 48px;
  height: auto;
  object-fit: contain;
}

.flexfinia-logo-img {
  width: 48px;
  height: auto;
  object-fit: contain;
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

.back-button-bottom {
  width: 100%;
  background: white;
  color: #374151;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.back-button-bottom:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

/* Panel Derecho - Información */
.right-panel {
  background: #f8fafc;
  padding: 40px;
  overflow-y: auto;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s ease;
  transition-delay: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-panel.animate {
  opacity: 1;
  transform: translateX(0);
}

.help-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.help-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-title {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}


/* Transaction Analysis Info */
.transaction-analysis-info {
  background: white;
  border: 1px solid rgba(97, 40, 120, 0.2);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.info-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba(97, 40, 120, 0.1) 0%, rgba(186, 45, 125, 0.1) 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-title {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.info-description {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 20px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.info-detail {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.detail-icon {
  width: 32px;
  height: 32px;
  background: rgba(97, 40, 120, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-content h4 {
  font-size: 14px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 4px 0;
}

.detail-content p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  margin: 0;
}


.security-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.security-icon {
  flex-shrink: 0;
}

.security-text {
  font-size: 13px;
  color: #059669;
  margin: 0;
  font-weight: 500;
}

/* Timestamp fijo */
.timestamp-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(156, 163, 175, 0.2);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.timestamp-icon {
  flex-shrink: 0;
}

.timestamp-text {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.3px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .connect-institutions {
    padding: 20px;
  }

  .main-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    max-width: 800px;
  }

  .left-panel,
  .right-panel {
    padding: 40px 30px;
    justify-content: flex-start;
  }

}

@media (max-width: 768px) {
  .connect-institutions {
    padding: 16px;
  }

  .main-container {
    border-radius: 16px;
    min-height: auto;
  }

  .left-panel,
  .right-panel {
    padding: 30px 24px;
  }

  .panel-title {
    font-size: 20px;
  }

}
</style>
