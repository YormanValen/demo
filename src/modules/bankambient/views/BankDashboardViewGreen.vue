<template>
  <div class="portal-container">
    <div class="main-container">
      <div class="left-section">
      <div class="form-section">
        <div class="header-section">
          <div class="shield-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#ff8c00"/>
              <path d="M3 7V13C3 17.97 7.03 22 12 22C16.97 22 21 17.97 21 13V7" stroke="#ff8c00" stroke-width="1.5"/>
            </svg>
          </div>
          
          <div class="welcome-text">
            <h1 class="welcome-title">Bienvenido a</h1>
            <div class="bank-logo">
              <div class="bank-logo-circle">
                <span class="bank-initials">BV</span>
              </div>
              <span class="bank-name">Banco Verde</span>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div v-if="!showPasswordStep" class="form-group">
            <label class="form-label">Tipo de documento</label>
            <div class="select-wrapper">
              <select v-model="documentType" class="form-select" required>
                <option value="">Seleccionar tipo</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="PP">Pasaporte</option>
              </select>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="select-arrow">
                <path d="M4 6L8 10L12 6" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div v-if="!showPasswordStep" class="form-group">
            <label class="form-label">Número de documento</label>
            <input
              type="text"
              v-model="loginData.username"
              class="form-input"
              required
            />
          </div>
          
          <div v-if="showPasswordStep" class="form-group">
            <label class="form-label">Contraseña</label>
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginData.password"
                class="form-input"
                placeholder="Ingresa tu contraseña"
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
          </div>
          
          <div v-if="!showPasswordStep" class="checkbox-group">
            <input type="checkbox" id="remember" v-model="rememberDocument" class="checkbox-input" />
            <label for="remember" class="checkbox-label">Recordar tipo y número de documento</label>
          </div>
          
          <button v-if="!showPasswordStep" type="button" class="continue-button" :disabled="!isDocumentFormValid" @click="handleContinue">
            Continuar
          </button>
          
          <button v-else type="submit" class="continue-button" :disabled="!isLoginFormValid || isLoggingIn">
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
            <span v-else>Iniciar sesión</span>
          </button>
        </form>
        
        <div class="footer-links">
          <span class="new-user-text">¿No eres usuario?</span>
          <button class="register-link" @click="handleRegister">Regístrate aquí</button>
        </div>
        
        <div class="security-footer">
          <span class="security-text">Protegido por reCAPTCHA |</span>
          <button class="privacy-link" @click="handlePrivacy">Privacidad</button>
          <span> - </span>
          <button class="terms-link" @click="handleTerms">Condiciones</button>
        </div>
      </div>
    </div>
    
    <div class="right-section">
      <div class="content-area">
        <div class="main-image">
          <div class="person-image"></div>
          <div class="decorative-shapes">
            <div class="shape shape-yellow-1"></div>
            <div class="shape shape-yellow-2"></div>
            <div class="shape shape-green-1"></div>
            <div class="shape shape-green-2"></div>
          </div>
        </div>
        
        <div class="info-section">
          <div class="bank-logo-small">
            <div class="bank-logo-circle-small">
              <span class="bank-initials-small">BV</span>
            </div>
            <span class="bank-text">Banco Verde</span>
          </div>
          
          <div class="carousel-container">
            <transition name="carousel-fade" mode="out-in">
              <div :key="currentSlide" class="carousel-slide">
                <div class="slide-icon">
                  <!-- Transfer Icon -->
                  <svg v-if="currentSlide === 0" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#16a34a" opacity="0.1"/>
                    <path d="M16 24h16m-8-8l8 8-8 8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  
                  <!-- Security Icon -->
                  <svg v-else-if="currentSlide === 1" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#16a34a" opacity="0.1"/>
                    <path d="M24 8l8 4v8c0 6-8 12-8 12s-8-6-8-12v-8l8-4z" fill="#16a34a" opacity="0.2"/>
                    <path d="M24 8l8 4v8c0 6-8 12-8 12s-8-6-8-12v-8l8-4z" stroke="#16a34a" stroke-width="2"/>
                    <path d="M20 24l3 3 6-6" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  
                  <!-- Mobile Icon -->
                  <svg v-else-if="currentSlide === 2" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#16a34a" opacity="0.1"/>
                    <rect x="18" y="12" width="12" height="20" rx="2" fill="#16a34a" opacity="0.2"/>
                    <rect x="18" y="12" width="12" height="20" rx="2" stroke="#16a34a" stroke-width="2"/>
                    <circle cx="24" cy="28" r="1" fill="#16a34a"/>
                    <path d="M20 16h8" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  
                  <!-- Support Icon -->
                  <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" fill="#16a34a" opacity="0.1"/>
                    <circle cx="24" cy="18" r="4" fill="#16a34a" opacity="0.2"/>
                    <circle cx="24" cy="18" r="4" stroke="#16a34a" stroke-width="2"/>
                    <path d="M16 32c0-4 3.5-8 8-8s8 4 8 8" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 26c2 0 4 1 4 3v3" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
                    <path d="M18 26c-2 0-4 1-4 3v3" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3 class="info-title">{{ carouselData[currentSlide].title }}</h3>
                <p class="info-description">{{ carouselData[currentSlide].description }}</p>
                <button class="more-info-btn">{{ carouselData[currentSlide].buttonText }}</button>
              </div>
            </transition>
            
            <div class="carousel-indicators">
              <div 
                v-for="(_, index) in carouselData" 
                :key="index"
                :class="['indicator', { active: currentSlide === index }]"
                @click="currentSlide = index"
              ></div>
            </div>
          </div>
        </div>
        
        <div class="help-section">
          <h4 class="help-title">¿Cómo podemos ayudarte?</h4>
          <div class="help-options">
            <div class="help-option">
              <div class="help-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" fill="#16a34a" opacity="0.2"/>
                  <rect x="2" y="3" width="20" height="14" rx="2" stroke="#16a34a" stroke-width="1.5"/>
                  <path d="M2 7h20" stroke="#16a34a" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="help-text">Solicitar productos</span>
            </div>
            <div class="help-option">
              <div class="help-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#16a34a" opacity="0.2"/>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="#16a34a" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="#16a34a" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="help-text">Contáctanos</span>
            </div>
            <div class="help-option">
              <div class="help-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#16a34a" opacity="0.2"/>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#16a34a" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" stroke="#16a34a" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="help-text">Visítanos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
const rememberDocument = ref(false)
const documentType = ref('')
const showPasswordStep = ref(false)
const currentSlide = ref(0)

// Carousel data with different content
const carouselData = ref([
  {
    title: 'Transferencias rápidas',
    description: 'Optimiza tu tiempo realizando transferencias rápidas, mucho más rápido desde nuestra Zona Transaccional.',
    buttonText: 'Ver más'
  },
  {
    title: 'Máxima seguridad',
    description: 'Protegemos tu información con los más altos estándares de seguridad bancaria y cifrado de datos.',
    buttonText: 'Conocer más'
  },
  {
    title: 'Banca móvil 24/7',
    description: 'Accede a todos tus servicios bancarios desde cualquier lugar, las 24 horas del día.',
    buttonText: 'Descargar app'
  },
  {
    title: 'Soporte personalizado',
    description: 'Nuestro equipo de expertos está disponible para ayudarte con todas tus consultas financieras.',
    buttonText: 'Contactar'
  }
])

const isDocumentFormValid = computed(() => {
  return loginData.value.username.trim() && documentType.value.trim()
})

const isLoginFormValid = computed(() => {
  return isDocumentFormValid.value && loginData.value.password.trim()
})

// Auto-rotate carousel
let carouselInterval: number | null = null

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % carouselData.value.length
  }, 4000) // Change slide every 4 seconds
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  stopCarousel()
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleContinue = () => {
  if (isDocumentFormValid.value) {
    showPasswordStep.value = true
  }
}

const handleRegister = () => {
  router.push('/finerio/connect-institutions')
}

const handlePrivacy = () => {
  console.log('Privacy clicked')
}

const handleTerms = () => {
  console.log('Terms clicked')
}

const handleLogin = () => {
  if (isLoginFormValid.value && !isLoggingIn.value) {
    isLoggingIn.value = true
    
    setTimeout(() => {
      router.push({
        path: '/bankambient/account-selection',
        query: {
          bankName: 'Banco Verde',
          bankInitials: 'BV',
          bankColor: '#16a34a'
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
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #e5e7eb;
  padding: 20px;
}

.main-container {
  max-width: 1200px;
  width: 100%;
  height: 700px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  overflow: hidden;
}

.left-section {
  flex: 0 0 400px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form-section {
  width: 100%;
  max-width: 350px;
}

.header-section {
  margin-bottom: 40px;
  text-align: center;
}

.shield-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.welcome-text {
  text-align: center;
}

.welcome-title {
  font-size: 20px;
  font-weight: 400;
  color: #333;
  margin: 0 0 8px 0;
}

.bank-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.bank-logo-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #16a34a;
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
  font-size: 24px;
  font-weight: 700;
  color: #16a34a;
  text-transform: lowercase;
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

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 40px 0 16px;
  font-size: 14px;
  color: #333;
  background: white;
  appearance: none;
  cursor: pointer;
  transition: border-color 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: #16a34a;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.form-input {
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  color: #333;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #16a34a;
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-input {
  padding-right: 50px;
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
  background: #f3f4f6;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 10px 0;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  accent-color: #16a34a;
}

.checkbox-label {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  cursor: pointer;
}

.continue-button {
  width: 100%;
  height: 48px;
  background: #d1d5db;
  color: #9ca3af;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: not-allowed;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.continue-button:not(:disabled) {
  background: #16a34a;
  color: white;
  cursor: pointer;
}

.continue-button:not(:disabled):hover {
  background: #15803d;
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 50; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 25, 50; stroke-dashoffset: -12.5; }
  100% { stroke-dasharray: 25, 50; stroke-dashoffset: -37.5; }
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 13px;
}

.new-user-text {
  color: #666;
}

.register-link {
  background: none;
  border: none;
  color: #ff8c00;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
}

.register-link:hover {
  text-decoration: underline;
}

.security-footer {
  text-align: center;
  font-size: 12px;
  color: #999;
}

.security-text {
  color: #999;
}

.privacy-link, .terms-link {
  background: none;
  border: none;
  color: #ff8c00;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
}

.privacy-link:hover, .terms-link:hover {
  text-decoration: underline;
}

.right-section {
  flex: 1;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e5e7eb;
}

.content-area {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main-image {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.person-image {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 50%;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="100" fill="%23e0f2fe"/><circle cx="100" cy="80" r="30" fill="%2316a34a" opacity="0.2"/><rect x="70" y="120" width="60" height="60" rx="30" fill="%2316a34a" opacity="0.1"/></svg>');
  background-size: cover;
  background-position: center;
  z-index: 2;
  position: relative;
}

.decorative-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  border-radius: 20px;
}

.shape-yellow-1 {
  width: 80px;
  height: 80px;
  background: #fbbf24;
  top: 20%;
  left: 20%;
  transform: rotate(15deg);
}

.shape-yellow-2 {
  width: 60px;
  height: 60px;
  background: #f59e0b;
  top: 60%;
  right: 25%;
  transform: rotate(-20deg);
}

.shape-green-1 {
  width: 50px;
  height: 50px;
  background: #16a34a;
  opacity: 0.7;
  bottom: 30%;
  left: 15%;
  border-radius: 50%;
}

.shape-green-2 {
  width: 40px;
  height: 40px;
  background: #22c55e;
  opacity: 0.5;
  top: 15%;
  right: 15%;
  border-radius: 50%;
}

.info-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.bank-logo-small {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.bank-logo-circle-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bank-initials-small {
  color: white;
  font-size: 10px;
  font-weight: 600;
}

.bank-text {
  font-size: 14px;
  font-weight: 600;
  color: #16a34a;
  text-transform: lowercase;
}

.info-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.info-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0 0 20px 0;
}

.more-info-btn {
  background: #16a34a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.more-info-btn:hover {
  background: #15803d;
}

.carousel-container {
  position: relative;
}

.carousel-slide {
  text-align: center;
}

.slide-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d1d5db;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #16a34a;
  transform: scale(1.2);
}

.indicator:hover {
  background: #22c55e;
}

.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: all 0.5s ease;
}

.carousel-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.carousel-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.help-section {
  text-align: center;
}

.help-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 30px 0;
}

.help-options {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.help-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.help-option:hover {
  transform: translateY(-2px);
}

.help-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.help-text {
  font-size: 12px;
  color: #666;
  text-align: center;
  max-width: 80px;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .portal-container {
    padding: 10px;
  }
  
  .main-container {
    flex-direction: column;
    height: auto;
    min-height: 500px;
  }
  
  .left-section {
    flex: none;
    padding: 20px;
  }
  
  .content-area {
    padding: 20px;
  }
  
  .help-options {
    gap: 20px;
  }
  
  .main-image {
    min-height: 200px;
  }
  
  .person-image {
    width: 150px;
    height: 150px;
  }
}
</style>