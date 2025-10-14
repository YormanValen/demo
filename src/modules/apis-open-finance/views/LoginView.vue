<template>
  <div class="portal-container">
    <div class="main-content" :class="{ 'hidden': showLoadingScreen }">
      <!-- Left side with Passport branding -->
      <div class="left-section">
        <div class="passport-content">
          <div class="passport-logo">
            <h1 class="passport-title">API MANAGER OPEN FINANCE</h1>
            <div class="passport-icon">
            </div>
          </div>
        </div>
      </div>

      <!-- Right side with login form -->
      <div class="right-section">
        <div class="login-content">
          <div class="login-header">
            <div class="user-icon">
            </div>
            <h2 class="login-title">Iniciar Sesión</h2>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Correo Electrónico</label>
              <input id="email" v-model="loginForm.email" type="email" class="form-input"
                placeholder="Ingresa tu correo electrónico" required />
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Contraseña</label>
              <div class="password-input-wrapper">
                <input id="password" v-model="loginForm.password" :type="showPassword ? 'text' : 'password'"
                  class="form-input" placeholder="Ingresa tu contraseña" required />
                <button type="button" @click="togglePassword" class="password-toggle">
                  <svg v-if="showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                      stroke="currentColor" stroke-width="2" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="forgot-password">
              <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="!isLoading">Continuar</span>
              <span v-else>Iniciando sesión...</span>
            </button>

            <div class="signup-section">
              <span class="signup-text">¿No tienes cuenta? </span>
              <a href="#" class="signup-link">Regístrate</a>
            </div>

            <div class="terms-section">
              <p class="terms-text">
                Acepto la
                <a href="#" class="terms-link">Política de Privacidad</a>
                y los
                <a href="#" class="terms-link">Términos y Condiciones</a>
                de API Management
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Loading Screen -->
    <LoadingScreen v-if="showLoadingScreen" :fade-out="fadeOutLoading" @complete="handleLoadingComplete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoadingScreen from '../components/LoadingScreen.vue'

const router = useRouter()

// Form state
const loginForm = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const showLoadingScreen = ref(false)
const fadeOutLoading = ref(false)

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Handle login form submission
const handleLogin = async () => {
  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // For demo purposes, accept any email/password
    if (loginForm.value.email && loginForm.value.password) {
      // Show loading screen instead of immediate navigation
      isLoading.value = false
      showLoadingScreen.value = true
    }
  } catch (error) {
    console.error('Login error:', error)
    isLoading.value = false
  }
}

// Handle loading screen completion
const handleLoadingComplete = () => {
  fadeOutLoading.value = true
  // Navigate immediately without waiting for fade out
  router.push({ name: 'apis-open-finance-dashboard' })
}
</script>

<style scoped>
.portal-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
}

.main-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  transition: opacity 0.3s ease;
  width: 100%;
  max-width: 100vw;
}

.main-content.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Left side - Passport branding */
.left-section {
  flex: 1;
  order: 2;
  background: linear-gradient(45deg, #0f172a, #1e3a8a, #3b82f6, #60a5fa, #93c5fd, #dbeafe);
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
  min-width: 0;
}

/* Animated gradient keyframes */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.passport-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 400px;
  width: 100%;
}

.passport-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
}

.passport-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
}

.passport-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 8px;
  backdrop-filter: blur(10px);
}

.feature-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
}

.feature-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px;
  flex-shrink: 0;
  color: #10b981;
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.feature-description {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
}

.dots-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

/* Right side - Login form */
.right-section {
  width: 700px;
  flex: 1;
  order: 1;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

/* Responsive adjustments for horizontal layouts */
@media (orientation: landscape) and (min-width: 1200px) {
  .right-section {
    width: 1400px !important;
    flex: 2 !important;
    max-width: none !important;
  }
}

.login-content {
  flex: 1;
  max-width: none;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  text-align: center;
  justify-content: center;
}

.user-icon {
  color: #6b7280;
}

.login-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 16px 20px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #374151;
}

.forgot-password {
  text-align: right;
  margin-top: -8px;
}

.forgot-link {
  font-size: 0.9rem;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #1d4ed8;
}

.login-button {
  background: linear-gradient(90deg, #3b82f6, #216bc5);
  color: #ffffff;
  border: none;
  padding: 18px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  width: 100%;
}

.login-button:hover:not(:disabled) {
  background: #ffffff;
  color: #000000;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.signup-section {
  text-align: center;
  margin-top: 20px;
}

.signup-text {
  font-size: 0.9rem;
  color: #6b7280;
}

.signup-link {
  font-size: 0.9rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.signup-link:hover {
  color: #1d4ed8;
}

.terms-section {
  margin-top: 20px;
}

.terms-text {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}

.terms-link {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.terms-link:hover {
  color: #1d4ed8;
}



/* Media Queries for 1920x1080 and larger horizontal screens */
@media screen and (min-width: 1920px) and (orientation: landscape) {
  .left-section {
    flex: 1.5;
    padding: 80px;
  }

  .right-section {
    flex: 1;
    width: auto;
    max-width: 40%;
    padding: 80px;
  }

  .passport-title {
    font-size: 3.5rem;
    letter-spacing: 3px;
  }

  .login-title {
    font-size: 2.5rem;
  }

  .login-form {
    gap: 32px;
    padding: 40px 0;
  }

  .form-input {
    padding: 20px 24px;
    font-size: 1.1rem;
  }

  .login-button {
    padding: 22px 40px;
    font-size: 1.2rem;
  }

  .form-label {
    font-size: 1rem;
  }

  .signup-text,
  .signup-link,
  .forgot-link {
    font-size: 1rem;
  }

  .terms-text {
    font-size: 0.9rem;
  }
}
</style>