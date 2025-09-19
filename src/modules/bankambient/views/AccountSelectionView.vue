<template>
  <div class="account-selection">
    <div class="header-section">
      <div class="bank-logo-header">
        <div class="bank-logo-circle" :style="{ backgroundColor: bankColor }">
          <span class="bank-initials">{{ bankInitials }}</span>
        </div>
        <span class="bank-name">{{ bankName }}</span>
      </div>
      
      <h1 class="page-title">Colombia Account Information Request (AIS)</h1>
      
      <div class="finerio-bar">
        <span>Finerio - Staging</span>
      </div>
    </div>

    <div class="content-section">
      <p class="instructions">
        Select and confirm account(s) to share information with <strong>Finerio - Staging</strong>
      </p>

      <div class="accounts-grid">
        <div 
          v-for="account in accounts" 
          :key="account.id"
          class="account-card"
        >
          <div class="account-info">
            <h3 class="account-name">{{ account.name }}</h3>
            <p class="account-number">{{ account.number }}</p>
            <p class="account-type">{{ account.type }}</p>
          </div>
          <div class="account-checkbox">
            <input 
              type="checkbox" 
              :id="account.id"
              v-model="selectedAccounts"
              :value="account.id"
              class="checkbox-input"
            />
            <label :for="account.id" class="checkbox-label"></label>
          </div>
        </div>
      </div>

      <div class="review-section">
        <h2 class="review-title">Review the information you will be sharing</h2>
        
        <div class="info-items">
          <div class="info-item-container">
            <div class="info-item" @click="toggleAccounts">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9Z" stroke="#374151" stroke-width="1.5"/>
                  <path d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18" stroke="#374151" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="info-label">Accounts</span>
              <div class="info-arrow" :class="{ 'rotated': showAccounts }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showAccounts" class="info-content">
                <p>Your account name, nickname, sort code, account number, currency, IBAN, roll number (for Building Society accounts), and Primary Account Number (PAN), masked or unmasked, depending on how your bank displays this online.</p>
              </div>
            </transition>
          </div>

          <div class="info-item-container">
            <div class="info-item" @click="toggleBalances">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="#374151" stroke-width="1.5"/>
                  <path d="M7 8H13M7 12H10" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <span class="info-label">Balances</span>
              <div class="info-arrow" :class="{ 'rotated': showBalances }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showBalances" class="info-content">
                <p>Balance amount, currency, credit/debit flag, type of balance, and date/time.</p>
              </div>
            </transition>
          </div>

          <div class="info-item-container">
            <div class="info-item" @click="toggleTransactions">
              <div class="info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H17M3 12H17" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="#374151" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="info-label">Transactions</span>
              <div class="info-arrow" :class="{ 'rotated': showTransactions }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <transition name="expand">
              <div v-if="showTransactions" class="info-content">
                <p>List of all credits and debits to your account in the selected period with amount, status, date/time, transaction type/code, plus reference details and information about each payer/payee for each.</p>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="time-notice">
        <p>Finerio - Staging will get information from your account(s) until :</p>
      </div>

      <div class="action-buttons">
        <button type="button" class="cancel-button" @click="handleCancel">
          Cancel
        </button>
        <button type="button" class="confirm-button" @click="handleConfirm" :disabled="selectedAccounts.length === 0">
          Confirm
        </button>
      </div>
    </div>

    <div class="footer-section">
      <div class="powered-by">
        <span>Powered by</span>
        <div class="ozone-logo">
          <span class="ozone-text">OZONE</span>
          <span class="api-text">API</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
const showAccounts = ref(false)
const showBalances = ref(false) 
const showTransactions = ref(false)

const accounts = ref<Account[]>([
  {
    id: 'luigi',
    name: 'Luigi International',
    number: '1234576',
    type: 'Business Current Account'
  },
  {
    id: 'mario',
    name: 'Mario International', 
    number: '1000010910103',
    type: 'Business Currency Account'
  },
  {
    id: 'spectrum',
    name: 'Spectrum',
    number: '1000010910105', 
    type: 'Foreign Currency Account'
  }
])

const bankName = computed(() => {
  return route.query.bankName as string || 'Banco Azul'
})

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
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

const handleCancel = () => {
  router.push('/bankambient/dashboard')
}

const handleConfirm = () => {
  if (selectedAccounts.value.length > 0) {
    console.log('Confirmed accounts:', selectedAccounts.value)
    router.push({
      path: '/bankambient/connection-loading',
      query: {
        bankName: bankName.value,
        bankInitials: bankInitials.value,
        bankColor: bankColor.value,
        selectedAccounts: selectedAccounts.value.join(',')
      }
    })
  }
}
</script>

<style scoped>
.account-selection {
  min-height: 100vh;
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

.finerio-bar {
  background: #001340;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 24px auto 0 auto;
  text-align: left;
  width: 100%;
  max-width: 1200px;
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

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.account-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: border-color 0.2s;
}

.account-card:hover {
  border-color: #d1d5db;
}

.account-info {
  flex: 1;
}

.account-name {
  font-size: 18px;
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

.account-checkbox {
  margin-left: 16px;
  position: relative;
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
  background: #f9fafb;
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