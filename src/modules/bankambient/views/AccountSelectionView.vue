<template>
  <div class="account-selection">
    <div class="header-section">
      <div class="bank-logo-header">
        <div class="bank-logo-circle">
          <img v-if="bankName === 'Neodigi Bank'" src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank"
            class="bank-logo-image" />
          <img v-else-if="bankName === 'TekCredit'" src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit"
            class="bank-logo-image" />
          <img v-else-if="bankName === 'Flexfinia'" src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia"
            class="bank-logo-image" />
          <span v-else class="bank-initials">{{ bankInitials }}</span>
        </div>
        <span class="bank-name">{{ bankName }}</span>
      </div>

      <h1 class="page-title">Solicitud de Información de Cuentas Colombia (AIS)</h1>

    </div>

    <div class="content-section">
      <p class="instructions">
        Danos acceso a todas tus cuentas y déjanos mostrarte todo lo que Open Finance puede ofrecerte..
      </p>

      <div class="accounts-container">
        <div class="accounts-header">
          <h3 class="accounts-title">Cuentas disponibles</h3>
          <div class="selection-control">
            <div class="main-checkbox">
              <input type="checkbox" id="selectAll" v-model="allAccountsSelected" @change="toggleAllAccounts"
                class="checkbox-input" />
              <label for="selectAll" class="checkbox-label"></label>
            </div>
          </div>
        </div>

        <div class="accounts-grid">
          <div v-for="account in accounts" :key="account.id" class="account-item">
            <div class="account-info">
              <h4 class="account-name">{{ account.name }}</h4>
              <p class="account-type">{{ account.type }}</p>
              <p class="account-number">{{ account.number }}</p>
            </div>
          </div>
        </div>

        <!-- Información sobre credenciales bancarias -->
        <div class="credentials-info">
          <div class="credentials-header">
            <h3 class="credentials-title">Conexión segura con tu entidad financiera</h3>
            <p class="credentials-subtitle">Para validar tu identidad y traer tu información, te pediremos tus
              credenciales bancarias.</p>
          </div>

          <div class="credentials-points">
            <div class="credential-point">
              <div class="point-icon">🛡️</div>
              <div class="point-content">
                <strong>Seguridad garantizada:</strong> ingresas tus datos en la pasarela oficial de la entidad
                financiera, no en
                nuestra plataforma.
              </div>
            </div>

            <div class="credential-point">
              <div class="point-icon">⏳</div>
              <div class="point-content">
                <strong>Uso único:</strong> tus credenciales solo se usan para autenticarte en este momento, no quedan
                guardadas.
              </div>
            </div>

            <div class="credential-point">
              <div class="point-icon">📈</div>
              <div class="point-content">
                <strong>Propósito claro:</strong> esta conexión nos permite consultar tus ingresos y movimientos
                autorizados para ofrecerte una solución ajustada a tu perfil.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="review-section">
        <h2 class="review-title">Revisa la información que compartirás</h2>

        <div class="info-items">
          <div class="info-item-container">
            <div class="info-item" @click="toggleAccounts">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z"
                    stroke="#374151" stroke-width="1.5" />
                  <path d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18" stroke="#374151"
                    stroke-width="1.5" />
                </svg>
              </div>
              <span class="info-label">Cuentas</span>
              <div class="info-arrow" :class="{ 'rotated': showAccounts }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showAccounts" class="info-content">
                <p>Nombre de tu cuenta, apodo, código de clasificación, número de cuenta, moneda, IBAN, número de
                  registro (para cuentas de Building Society), y Número de Cuenta Principal (PAN), enmascarado o no,
                  dependiendo de cómo tu entidad financiera muestre esta información en línea.</p>
              </div>
            </transition>
          </div>

          <div class="info-item-container">
            <div class="info-item" @click="toggleBalances">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="#374151" stroke-width="1.5" />
                  <path d="M7 8H13M7 12H10" stroke="#374151" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
              <span class="info-label">Saldos</span>
              <div class="info-arrow" :class="{ 'rotated': showBalances }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showBalances" class="info-content">
                <p>Monto del saldo, moneda, indicador de crédito/débito, tipo de saldo, y fecha/hora.</p>
              </div>
            </transition>
          </div>

          <div class="info-item-container">
            <div class="info-item" @click="toggleTransactions">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H17M3 12H17" stroke="#374151" stroke-width="1.5" stroke-linecap="round" />
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="#374151" stroke-width="1.5" />
                </svg>
              </div>
              <span class="info-label">Transacciones</span>
              <div class="info-arrow" :class="{ 'rotated': showTransactions }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showTransactions" class="info-content">
                <p>Lista de todos los créditos y débitos a tu cuenta en el período seleccionado con monto, estado,
                  fecha/hora, tipo/código de transacción, más detalles de referencia e información sobre cada
                  pagador/beneficiario.</p>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button type="button" class="confirm-button" @click="handleConfirm" :disabled="!allAccountsSelected">
          Confirmar
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Account {
  id: string
  name: string
  number: string
  type: string
}

const router = useRouter()
const route = useRoute()

const selectedAccounts = ref<string[]>([])
const allAccountsSelected = ref(true)
const showAccounts = ref(false)
const showBalances = ref(false)
const showTransactions = ref(false)

const accounts = ref<Account[]>([
  {
    id: 'savings',
    name: 'Cuenta de ahorros',
    number: '0012-3456-7890-1234',
    type: 'Cuenta de Ahorros'
  },
  {
    id: 'credit1',
    name: 'Crédito',
    number: '4578-9012-3456-7890',
    type: 'Tarjeta de crédito'
  },
  {
    id: 'credit2',
    name: 'Crédito',
    number: '1001-0109-1010-5678',
    type: 'Crédito libre inversión'
  }
])

const bankName = computed(() => {
  return route.query.bankName as string || 'Neodigi Bank'
})

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'ND'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})

// Inicializar con todas las cuentas seleccionadas
onMounted(() => {
  selectedAccounts.value = accounts.value.map(account => account.id)
})

const toggleAccounts = () => {
  showAccounts.value = !showAccounts.value
}

const toggleBalances = () => {
  showBalances.value = !showBalances.value
}

const toggleTransactions = () => {
  showTransactions.value = !showTransactions.value
}

const toggleAllAccounts = () => {
  if (allAccountsSelected.value) {
    selectedAccounts.value = accounts.value.map(account => account.id)
  } else {
    selectedAccounts.value = []
  }
}


const handleConfirm = () => {
  if (allAccountsSelected.value) {
    console.log('Confirmed all accounts')
    router.push({
      path: '/bankambient/connection-loading',
      query: {
        bankName: bankName.value,
        bankInitials: bankInitials.value,
        bankColor: bankColor.value,
        selectedAccounts: accounts.value.map(account => account.id).join(',')
      }
    })
  }
}


</script>

<style scoped>
.account-selection {
  min-height: 100vh;
  width: 100vw;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.header-section {
  background: white;
  padding: 32px 40px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
}

.bank-logo-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.bank-logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.bank-logo-image {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.bank-name {
  font-size: 24px;
  font-weight: 700;
  color: #001340;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #001340;
  margin: 0 0 24px 0;
}


.content-section {
  flex: 1;
  padding: 40px 40px 24px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.instructions {
  font-size: 18px;
  color: #374151;
  margin: 0 0 32px 0;
  text-align: center;
}

.accounts-container {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 48px;
  overflow: hidden;
}

.accounts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.accounts-title {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.selection-control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.main-checkbox {
  position: relative;
}

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: #f1f5f9;
}

.account-item {
  padding: 20px 24px;
  background: white;
  transition: background-color 0.2s;
}

.account-item:hover {
  background: #f8fafc;
}

/* Información sobre credenciales */
.credentials-info {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 24px;
  margin-top: 24px;
}

.credentials-header {
  margin-bottom: 20px;
}

.credentials-title {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 8px 0;
}

.credentials-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.credentials-points {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.credential-point {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.point-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.point-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
}

.point-content strong {
  color: #059669;
  font-weight: 600;
}

.account-info {
  flex: 1;
}

.account-name {
  font-size: 16px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 8px 0;
}

.account-number {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.account-type {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}


.checkbox-input {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  appearance: none;
  position: relative;
}

.checkbox-input:checked {
  background: #001340;
  border-color: #001340;
}

.checkbox-input:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-label {
  cursor: pointer;
}

.review-section {
  margin-bottom: 32px;
}

.review-title {
  font-size: 20px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 24px 0;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.info-item:hover {
  background: #fafbfc;
  border-left: 3px solid #e5e7eb;
}

.info-icon {
  flex-shrink: 0;
}

.info-label {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.info-arrow {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.info-arrow.rotated {
  transform: rotate(90deg);
}

.info-content {
  padding: 0 16px 16px 16px;
  border-top: 1px solid #f3f4f6;
}

.info-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 16px 0 0 0;
  line-height: 1.5;
}

/* Animación de expansión */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 200px;
  opacity: 1;
}

.time-notice {
  text-align: center;
  margin-top: 32px;
}

.time-notice p {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.cancel-button {
  background: transparent;
  color: #6b7280;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 100px;
}

.cancel-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #374151;
}

.confirm-button {
  background: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 100px;
}

.confirm-button:hover:not(:disabled) {
  background: #ea580c;
}

.confirm-button:disabled {
  background: #fbb8a2;
  cursor: not-allowed;
}

.footer-section {
  background: #f3f4f6;
  padding: 16px 40px;
  border-top: 1px solid #e5e7eb;
}

.powered-by {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
}

.ozone-logo {
  display: flex;
  align-items: center;
  gap: 2px;
}

.ozone-text {
  background: #1f2937;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
}

.api-text {
  color: #1f2937;
  font-weight: 700;
  font-size: 12px;
}
</style>

<style>
/* Forzar responsive dentro del selector de dispositivo (no afecta escritorio/full) */
.is-tablet .header-section,
.tablet .header-section,
.is-mobile .header-section {
  padding: 24px 20px;
}

.is-tablet .page-title,
.tablet .page-title,
.is-mobile .page-title {
  font-size: 22px;
}

.is-tablet .content-section,
.tablet .content-section {
  padding: 24px 20px;
  max-width: 820px;
  margin: 0 auto;
}

.is-mobile .content-section {
  padding: 24px 16px;
  max-width: 420px;
  margin: 0 auto;
}

.is-tablet .accounts-grid {
  grid-template-columns: repeat(2, 1fr);
}

.is-mobile .accounts-grid {
  grid-template-columns: 1fr;
}

.is-tablet .instructions,
.tablet .instructions,
.is-mobile .instructions {
  font-size: 16px;
}

.is-tablet .confirm-button,
.tablet .confirm-button,
.is-mobile .confirm-button {
  padding: 10px 18px;
  font-size: 14px;
}
</style>
