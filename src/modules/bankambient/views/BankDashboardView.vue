<template>
  <div class="bank-dashboard">
    <div class="bank-container">
      <div class="bank-header">
        <div class="bank-logo-section">
          <div class="bank-logo">
            <div class="bank-logo-circle" :style="{ backgroundColor: bankColor }">
              <span class="bank-initials">{{ bankInitials }}</span>
            </div>
            <span class="bank-name">{{ bankName }}</span>
          </div>
          <div class="model-bank-label">Model Bank</div>
        </div>
      </div>

      <div class="login-card">
        <h1 class="login-title">Login</h1>
        <p class="login-subtitle">Please enter your login details to proceed</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="login" class="form-label">Login *</label>
            <input
              id="login"
              type="text"
              v-model="loginData.username"
              class="form-input"
              placeholder="username"
              required
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password *</label>
            <div class="password-input-wrapper">
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="loginData.password"
                class="form-input"
                placeholder="••••••••••"
                required
              />
              <button 
                type="button"
                @click="togglePassword"
                class="password-toggle"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6.5 3 3.5 5.5 2 8.5C3.5 11.5 6.5 14 10 14C13.5 14 16.5 11.5 18 8.5C16.5 5.5 13.5 3 10 3Z" stroke="#9ca3af" stroke-width="1.5"/>
                  <circle cx="10" cy="8.5" r="2.5" stroke="#9ca3af" stroke-width="1.5"/>
                  <path v-if="!showPassword" d="M2 2L18 18" stroke="#9ca3af" stroke-width="1.5"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" @click="handleCancel">
              Cancel
            </button>
            <button type="submit" class="login-button" :disabled="!isFormValid || isLoggingIn">
              <div v-if="isLoggingIn" class="button-spinner">
                <svg width="20" height="20" viewBox="0 0 20 20" class="spinner">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="white"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-dasharray="25.1"
                    stroke-dashoffset="25.1"
                  />
                </svg>
              </div>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
      </div>

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

interface LoginData {
  username: string
  password: string
}

const router = useRouter()
const route = useRoute()

const loginData = ref<LoginData>({
  username: '',
  password: ''
})

const showPassword = ref(false)
const isLoggingIn = ref(false)

const bankName = computed(() => {
  return route.query.bankName as string || 'Banco Azul'
})

const bankInitials = computed(() => {
  return route.query.bankInitials as string || 'BA'
})

const bankColor = computed(() => {
  return route.query.bankColor as string || '#2563eb'
})

const isFormValid = computed(() => {
  return loginData.value.username.trim() && loginData.value.password.trim()
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleCancel = () => {
  router.push('/financial/connect-institutions')
}

const handleLogin = () => {
  if (isFormValid.value && !isLoggingIn.value) {
    isLoggingIn.value = true
    
    setTimeout(() => {
      router.push({
        path: '/bankambient/account-selection',
        query: {
          bankName: bankName.value,
          bankInitials: bankInitials.value,
          bankColor: bankColor.value
        }
      })
    }, 2000)
  }
}
</script>

<style scoped>
.bank-dashboard {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.bank-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  overflow: hidden;
}

.bank-header {
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bank-logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bank-logo {
  display: flex;
  align-items: center;
  gap: 12px;
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

.model-bank-label {
  background: #fbbf24;
  color: #92400e;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}

.login-card {
  background: #f9fafb;
  padding: 40px 32px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #001340;
  margin: 0 0 8px 0;
  text-align: center;
}

.login-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 32px 0;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-input {
  height: 48px;
  width: 100%;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 16px;
  color: #374151;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #f97316;
}

.form-input::placeholder {
  color: #9ca3af;
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-input {
  padding: 0 48px 0 16px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  background: #f3f4f6;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.cancel-button {
  flex: 1;
  height: 48px;
  background: transparent;
  color: #6b7280;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.login-button {
  flex: 1;
  height: 48px;
  background: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background: #ea580c;
}

.login-button:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

.button-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  animation: spin 1s linear infinite;
}

.spinner circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 50;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 25, 50;
    stroke-dashoffset: -12.5;
  }
  100% {
    stroke-dasharray: 25, 50;
    stroke-dashoffset: -37.5;
  }
}

.powered-by {
  background: #f3f4f6;
  padding: 16px 32px;
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