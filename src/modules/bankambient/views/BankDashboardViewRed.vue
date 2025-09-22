<template>
  <div class="portal-container">
    <div class="left-section">
      <div class="form-section">
        <div class="bank-logo">
          <div class="logo-container">
            <div class="bank-logo-circle">
              <span class="bank-initials">TC</span>
            </div>
            <span class="bank-name">TekCredit</span>
          </div>
        </div>
        
        <h1 class="main-title">Ingresa a tu Banca Virtual</h1>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="input-icon">
                <path d="M16 7C16 3.13401 12.866 0 9 0C5.13401 0 2 3.13401 2 7C2 10.866 5.13401 14 9 14C12.866 14 16 10.866 16 7Z" stroke="#999" stroke-width="1.5"/>
                <path d="M18 18L14 14" stroke="#999" stroke-width="1.5"/>
              </svg>
              <input
                type="text"
                v-model="loginData.username"
                class="form-input"
                placeholder="Nombre de usuario"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <div class="input-wrapper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="input-icon">
                <rect x="3" y="8" width="14" height="9" rx="2" stroke="#999" stroke-width="1.5"/>
                <path d="M7 8V6C7 3.79086 8.79086 2 11 2H9C11.2091 2 13 3.79086 13 6V8" stroke="#999" stroke-width="1.5"/>
              </svg>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginData.password"
                class="form-input"
                placeholder="Contraseña"
                required
              />
              <button 
                type="button"
                @click="togglePassword"
                class="password-toggle"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6.5 3 3.5 5.5 2 8.5C3.5 11.5 6.5 14 10 14C13.5 14 16.5 11.5 18 8.5C16.5 5.5 13.5 3 10 3Z" stroke="#999" stroke-width="1.5"/>
                  <circle cx="10" cy="8.5" r="2.5" stroke="#999" stroke-width="1.5"/>
                  <path v-if="!showPassword" d="M2 2L18 18" stroke="#999" stroke-width="1.5"/>
                </svg>
              </button>
            </div>
            <div class="forgot-password-wrapper">
              <button 
                type="button" 
                class="forgot-password-link"
                @click="handleForgotPassword"
              >
                ¿Olvidaste tu usuario o contraseña?
              </button>
            </div>
          </div>
          
          <div class="checkbox-group">
            <input type="checkbox" id="remember" v-model="rememberUser" class="checkbox-input" />
            <label for="remember" class="checkbox-label">Recordar mi nombre de usuario</label>
          </div>
          
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
            <span v-else>Ingresar</span>
          </button>
        </form>
        
        <div class="footer-links">
          <span class="new-user-text">¿Eres nuevo con nosotros?</span>
          <button class="activate-user-link" @click="handleActivateUser">Activa tu usuario</button>
        </div>
      </div>
    </div>
    
    <div class="right-section">
      <div class="background-image"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface LoginData {
  username: string
  password: string
}

const router = useRouter()

const loginData = ref<LoginData>({
  username: '',
  password: ''
})

const showPassword = ref(false)
const isLoggingIn = ref(false)
const rememberUser = ref(false)

const isFormValid = computed(() => {
  return loginData.value.username.trim() && loginData.value.password.trim()
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
}

const handleActivateUser = () => {
  router.push('/financial/connect-institutions')
}

const handleLogin = () => {
  if (isFormValid.value && !isLoggingIn.value) {
    isLoggingIn.value = true
    
    setTimeout(() => {
      router.push({
        path: '/bankambient/account-selection',
        query: {
          bankName: 'TekCredit',
          bankInitials: 'TC',
          bankColor: '#dc2626'
        }
      })
    }, 2000)
  }
}
</script>

<style scoped>
.portal-container {
  min-height: 100vh;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.left-section {
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  max-width: 500px;
}

.form-section {
  width: 100%;
  max-width: 400px;
}

.bank-logo {
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bank-logo-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dc2626;
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
  color: #dc2626;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 40px 0;
  text-align: left;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  z-index: 1;
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 48px;
  border: 1px solid #d1d5db;
  border-bottom: 2px solid #e5e7eb;
  border-radius: 0;
  padding: 0 16px 0 44px;
  font-size: 16px;
  color: #374151;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-bottom-color: #dc2626;
}

.form-input::placeholder {
  color: #9ca3af;
  font-size: 14px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.password-toggle:hover {
  background: #f3f4f6;
}

.forgot-password-wrapper {
  margin-top: 8px;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
  font-weight: 500;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: #dc2626;
}

.checkbox-label {
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.login-button {
  width: 100%;
  height: 48px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  background: #b91c1c;
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

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
}

.new-user-text {
  font-size: 14px;
  color: #6b7280;
}

.activate-user-link {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.activate-user-link:hover {
  text-decoration: underline;
}

.right-section {
  flex: 1;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  background-image: url('/lovely-couple-looking-laptop.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .portal-container {
    flex-direction: column;
  }
  
  .right-section {
    height: 200px;
    order: -1;
  }
  
  .left-section {
    max-width: none;
    padding: 20px;
  }
  
  .form-section {
    max-width: none;
  }
  
  .main-title {
    font-size: 24px;
    text-align: center;
  }
  
  .bank-logo {
    justify-content: center;
  }
}
</style>