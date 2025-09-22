<template>
  <div class="portal-container">
    <div class="left-section">
      <div class="background-image">
        <div class="people-image"></div>
      </div>
    </div>
    
    <div class="right-section">
      <div class="header">
        <div class="bank-logo">
          <div class="logo-icon">
            <div class="bank-logo-circle">
              <span class="bank-initials">BA</span>
            </div>
          </div>
          <span class="bank-name">Banco Azul</span>
          <div class="search-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#666" stroke-width="1.5"/>
              <path d="m13 13-6-6" stroke="#666" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="welcome-section">
        <h1 class="welcome-title">Bienvenido al Portal<br>Personas</h1>
        <p class="welcome-subtitle">
          Recuerda que tu usuario está compuesto por tu Tipo de<br>
          identificación (CC, CE, NI, TI, PE ) o su Número de Identificación<br>
          sin espacios, puntos ni comas.
        </p>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label class="form-label">Usuario</label>
            <input
              type="text"
              v-model="loginData.username"
              class="form-input"
              placeholder="Ejemplo: CC1234567890"
              required
            />
          </div>
          
          <div class="form-group">
            <div class="password-label-row">
              <label class="form-label">Contraseña</label>
              <button 
                type="button" 
                class="forgot-password-link"
                @click="handleForgotPassword"
              >
                ¿Olvidó su contraseña?
              </button>
            </div>
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginData.password"
                class="form-input"
                placeholder="Siguiente"
                required
              />
              <button 
                type="button"
                @click="togglePassword"
                class="password-toggle"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6.5 3 3.5 5.5 2 8.5C3.5 11.5 6.5 14 10 14C13.5 14 16.5 11.5 18 8.5C16.5 5.5 13.5 3 10 3Z" stroke="#666" stroke-width="1.5"/>
                  <circle cx="10" cy="8.5" r="2.5" stroke="#666" stroke-width="1.5"/>
                  <path v-if="!showPassword" d="M2 2L18 18" stroke="#666" stroke-width="1.5"/>
                </svg>
              </button>
            </div>
          </div>
          
          <button type="submit" class="continue-button" :disabled="!isFormValid || isLoggingIn">
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
            <span v-else>Siguiente</span>
          </button>
        </form>
        
        <div class="new-client-section">
          <span class="new-client-text">¿Es un cliente nuevo?</span>
          <button class="register-link" @click="handleRegister">Registrarse</button>
        </div>
      </div>
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

const isFormValid = computed(() => {
  return loginData.value.username.trim() && loginData.value.password.trim()
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleForgotPassword = () => {
  console.log('Forgot password clicked')
}

const handleRegister = () => {
  router.push('/finerio/connect-institutions')
}

const handleLogin = () => {
  if (isFormValid.value && !isLoggingIn.value) {
    isLoggingIn.value = true
    
    setTimeout(() => {
      router.push({
        path: '/bankambient/account-selection',
        query: {
          bankName: 'Banco Azul',
          bankInitials: 'BA',
          bankColor: '#0066cc'
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
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.people-image {
  width: 100%;
  height: 100%;
  background-image: url('/close-up-people-working-from-home.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.right-section {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  max-width: 500px;
}

.header {
  padding: 20px 40px;
  border-bottom: 1px solid #e9ecef;
}

.bank-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-logo-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #0066cc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials {
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.bank-name {
  font-size: 18px;
  font-weight: 600;
  color: #0066cc;
  flex: 1;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-section {
  flex: 1;
  padding: 60px 40px 40px;
  display: flex;
  flex-direction: column;
}

.welcome-title {
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 14px;
  color: #6c757d;
  margin: 0 0 40px 0;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.password-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #0066cc;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.form-input {
  height: 48px;
  width: 100%;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  padding: 0 16px;
  font-size: 14px;
  color: #495057;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-input::placeholder {
  color: #adb5bd;
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
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.password-toggle:hover {
  background: #f8f9fa;
}

.continue-button {
  width: 100%;
  height: 48px;
  background: #0066cc;
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
}

.continue-button:hover:not(:disabled) {
  background: #0052a3;
}

.continue-button:disabled {
  background: #dee2e6;
  color: #6c757d;
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

.new-client-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  padding-top: 20px;
}

.new-client-text {
  font-size: 14px;
  color: #6c757d;
}

.register-link {
  background: none;
  border: none;
  color: #0066cc;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  padding: 0;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .portal-container {
    flex-direction: column;
  }
  
  .left-section {
    height: 200px;
  }
  
  .right-section {
    max-width: none;
  }
  
  .welcome-section {
    padding: 40px 20px 20px;
  }
  
  .header {
    padding: 20px;
  }
  
  .welcome-title {
    font-size: 28px;
  }
}
</style>