<template>
  <div class="portal-container">
    <div class="main-content">
      <div class="left-section">
        <div class="background-image">
          <div class="people-image"></div>
        </div>
      </div>

      <div class="right-section">

        <div class="login-content">
          <div class="login-header">
            <div class="login-logo">
              <img src="/src/assets/logos/datacredito-experian.png" alt="Datacrédito Experian"
                class="datacredito-logo-image" />
            </div>
            <h1 class="login-title">Acceso a suscriptores</h1>
            <p class="login-subtitle">Ingrese sus datos para continuar</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label class="form-label">Tipo de ID</label>
              <select v-model="loginData.idType" class="form-select" required>
                <option value="">Seleccione tipo de documento</option>
                <option value="CC">Cédula o NIUP</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
                <option value="CD">Carnet Diplomático</option>
                <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                <option value="PEP">PEP (Permiso Especial de Permanencia)</option>
              </select>
            </div>

            <div class="form-group">
              <div class="input-container">
                <input type="text" v-model="loginData.idNumber" class="form-input" placeholder=" " required />
                <label class="floating-label" :class="{ 'active': loginData.idNumber }">Número de ID</label>
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <input :type="showPassword ? 'text' : 'password'" v-model="loginData.password" class="form-input"
                  placeholder=" " required />
                <label class="floating-label" :class="{ 'active': loginData.password }">Contraseña</label>
              </div>
            </div>

            <div class="form-group captcha-group">
              <div class="input-container">
                <input type="text" v-model="loginData.captcha" class="form-input captcha-input" placeholder=" " />
                <label class="floating-label" :class="{ 'active': loginData.captcha }">Ingrese las letras del
                  CAPTCHA</label>
              </div>
              <div class="captcha-display captcha-clickable" @click="refreshCaptcha" role="button"
                aria-label="Cambiar captcha">
                <svg class="captcha-svg" viewBox="0 0 400 56" preserveAspectRatio="xMidYMid meet">
                  <text x="200" y="38" text-anchor="middle" textLength="280" lengthAdjust="spacingAndGlyphs"
                    class="captcha-vector-text">{{ captchaText }}</text>
                </svg>
                <small class="captcha-hint">Click para cambiar</small>
              </div>
            </div>

            <div class="forgot-password">
              <a href="#" class="forgot-link">¿Olvidó su contraseña?</a>
            </div>

            <div class="terms-section">
              <div class="checkbox-group">
                <input type="checkbox" id="terms" v-model="loginData.acceptTerms" class="form-checkbox" />
                <label for="terms" class="checkbox-label">
                  He leído y acepto <a href="#" class="link">Condiciones de uso</a>
                </label>
              </div>

              <div class="checkbox-group">
                <input type="checkbox" id="privacy" v-model="loginData.acceptPrivacy" class="form-checkbox" />
                <label for="privacy" class="checkbox-label">
                  He leído y acepto <a href="#" class="link">Políticas de privacidad</a>
                </label>
              </div>
            </div>

            <button type="submit" class="submit-button" :disabled="!isFormValid || isLoggingIn">
              <div v-if="isLoggingIn" class="button-spinner">
                <svg width="20" height="20" viewBox="0 0 20 20" class="spinner">
                  <circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"
                    stroke-dasharray="25.1" stroke-dashoffset="25.1" />
                </svg>
              </div>
              <span v-else>Ingresar</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer with divider line -->
    <div class="login-footer">
      <hr class="divider-line" />
      <div class="footer-content">
        <p class="footer-text">©2025 Experian Information Solutions, Inc. Experian Marketing Services All rights
          reserved</p>
        <div class="footer-links">
          <a href="#" class="footer-link">Condiciones de uso</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface EntityLoginData {
  idType: string
  idNumber: string
  password: string
  captcha: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

const router = useRouter()

const loginData = ref<EntityLoginData>({
  idType: '',
  idNumber: '',
  password: '',
  captcha: '',
  acceptTerms: false,
  acceptPrivacy: false
})

const showPassword = ref(false)
const isLoggingIn = ref(false)
const captchaText = ref('')

const isFormValid = computed(() => {
  return loginData.value.idType &&
    loginData.value.idNumber &&
    loginData.value.password &&
    loginData.value.captcha &&
    loginData.value.acceptTerms &&
    loginData.value.acceptPrivacy
})

type CaptchaMode = 'digits' | 'letters' | 'alnum'
const CAPTCHA_LENGTH = 6
const CAPTCHA_MODE: CaptchaMode = 'letters'

const generateCaptcha = (length: number = CAPTCHA_LENGTH, mode: CaptchaMode = CAPTCHA_MODE) => {
  const charsets: Record<CaptchaMode, string> = {
    digits: '0123456789',
    letters: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
    alnum: 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789',
  }
  const chars = charsets[mode]
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const refreshCaptcha = () => {
  captchaText.value = generateCaptcha()
  loginData.value.captcha = ''
}

const handleLogin = async () => {
  if (!isFormValid.value) return

  isLoggingIn.value = true

  try {
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Navigate to two-factor authentication
    router.push('/entity/two-factor')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoggingIn.value = false
  }
}

// Initialize captcha value
captchaText.value = generateCaptcha()
</script>

<style scoped>
.portal-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.left-section {
  flex: 1;
  order: 1;
  background: url('/src/assets/bg-desktop.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  min-width: 0;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.right-section {
  flex: 1;
  order: 2;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}

.login-content {
  flex: 1;
  max-width: none;
  margin: 0;
  width: 100%;
}

/* Override for full-mode to remove width constraints */
:global(.app-container.full-mode) .login-content,
:global(.frame-container.full-mode) .login-content {
  width: 100% !important;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-logo {
  margin-bottom: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.datacredito-logo-image {
  height: 40px;
  width: auto;
  display: block;
}

.login-title {
  font-size: 2rem;
  font-weight: bold;
  color: #406eb3;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #666;
  margin-top: -5px;
  font-size: 1.4rem;
  font-weight: 300;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-container {
  position: relative;
}

.floating-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.9rem;
  color: #999;
  pointer-events: none;
  transition: all 0.3s ease;
  background: white;
  padding: 0 4px;
}

.floating-label.active,
.form-input:focus+.floating-label,
.form-select:focus+.floating-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #406eb3;
  font-weight: 500;
}

.form-label {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 4px;
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #ba2f7d;
  box-shadow: 0 0 8px rgba(186, 47, 125, 0.2);
}

.form-select {
  background-color: #f8f9fa;
}

.captcha-group {
  position: relative;
}

.captcha-input {
  font-size: 0.8rem;
}

.captcha-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f7f7;
  border: none;
  border-radius: 0;
  padding: 16px 12px;
  margin-top: 8px;
}

/* Replace plain text with SVG dot-matrix style */
.captcha-text {
  display: none;
}

.captcha-svg {
  width: 100%;
  height: 48px;
}

.captcha-vector-text {
  font-family: 'Courier New', monospace;
  font-size: 28px;
  fill: none;
  stroke: #4b5563;
  /* slightly softer */
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 2 3;
  /* denser dots */
  letter-spacing: 3px;
  /* tighter spacing */
}

.captcha-hint {
  color: #6b7280;
  font-size: 12px;
}

.captcha-clickable {
  cursor: pointer;
  user-select: none;
}

.captcha-clickable:hover {
  background: #f3f4f6;
}

.captcha-refresh {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.captcha-refresh:hover {
  background-color: #e0e0e0;
}

.forgot-password {
  text-align: center;
  margin: -8px 0 16px 0;
}

.forgot-link {
  color: #406eb3;
  text-decoration: none;
  font-weight: 700 !important;
  font-size: 1rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

.terms-section {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.form-checkbox {
  margin-top: 2px;
  cursor: pointer;
}

.checkbox-label {
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  line-height: 1.4;
}

.link {
  color: #ba2f7d;
  text-decoration: underline;
}

.link:hover {
  text-decoration: underline;
}

.submit-button {
  background: #ba2f7d;
  color: white;
  height: 46px;
  width: 180px;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 16px auto 0 auto;
}

.submit-button:hover:not(:disabled) {
  background: #c2185b;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.button-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
    stroke-dashoffset: 25.1;
  }

  to {
    transform: rotate(360deg);
    stroke-dashoffset: 0;
  }
}

.login-footer {
  width: 100%;
  background: #f8f9fa;
}

.divider-line {
  border: none;
  height: 3px;
  background: #ba2f7d;
  margin: 0 0 20px 0;
  width: 100%;
}

.footer-content {
  text-align: center;
  padding: 0 20px;
}

.footer-text {
  font-size: 1rem;
  color: #666;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer-link {
  color: #406eb3;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ba2f7d;
  text-decoration: underline;
}

.separator {
  color: #ccc;
  font-size: 0.8rem;
}

/* Desktop specific styles (non-full-mode) */
@media (min-width: 1025px) {
  .portal-container {
    height: 100vh;
  }

  .main-content {
    flex-direction: row;
  }

  .left-section {
    flex: 1;
    display: block;
    background: url('/src/assets/bg-desktop.jpg') no-repeat center center;
    background-size: cover;
    position: relative;
    overflow: hidden;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .right-section {
    flex: 1;
    min-width: 480px;
    max-width: none;
  }
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .left-section {
    min-height: 300px;
    flex: none;
    order: 1;
  }

  .right-section {
    width: 100%;
    flex: 1;
    order: 2;
  }
}

@media (max-width: 768px) {
  .left-section {
    min-height: 250px;
  }

  .right-section {
    padding: 20px;
  }

  .login-content {
    max-width: none;
  }

  .login-title {
    font-size: 1.5rem;
  }
}

/* Tablet specific adjustments */
@media (max-width: 1024px) and (min-width: 769px) {
  .left-section {
    min-height: 350px;
    background-size: cover;
    background-position: center center;
  }
}
</style>

<style>
/* Global styles for full-mode - higher specificity */
.app-container.full-mode .portal-container,
.frame-container.full-mode .portal-container {
  height: 100vh !important;
  width: 100vw !important;
  flex-direction: column !important;
  display: flex !important;
}

.app-container.full-mode .main-content,
.frame-container.full-mode .main-content {
  flex: 1 !important;
  display: flex !important;
  flex-direction: row !important;
}

.app-container.full-mode .left-section,
.frame-container.full-mode .left-section {
  width: 50% !important;
  flex: none !important;
  display: block !important;
  background: url('/src/assets/bg-desktop.jpg') no-repeat center center !important;
  background-size: cover !important;
  background-position: center center !important;
  position: relative !important;
  overflow: hidden !important;
  order: 1 !important;
}

.app-container.full-mode .right-section,
.frame-container.full-mode .right-section {
  width: 50% !important;
  height: 100vh !important;
  flex: none !important;
  order: 2 !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 40px !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}


.app-container.full-mode .login-content,
.frame-container.full-mode .login-content {
  flex: 1 !important;
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  margin: 0 !important;
}

.app-container.full-mode .login-form,
.frame-container.full-mode .login-form {
  width: 100% !important;
  max-width: 400px !important;
  margin: 0 auto !important;
  gap: 20px !important;
}

.app-container.full-mode .form-input,
.app-container.full-mode .form-select,
.frame-container.full-mode .form-input,
.frame-container.full-mode .form-select {
  padding: 15px 20px !important;
  font-size: 1rem !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.app-container.full-mode .form-input:focus,
.app-container.full-mode .form-select:focus,
.frame-container.full-mode .form-input:focus,
.frame-container.full-mode .form-select:focus {
  border-color: #ba2f7d !important;
  box-shadow: 0 0 8px rgba(186, 47, 125, 0.2) !important;
}

.app-container.full-mode .submit-button,
.frame-container.full-mode .submit-button {
  padding: 16px 32px !important;
  font-size: 1.1rem !important;
}

.app-container.full-mode .login-header,
.frame-container.full-mode .login-header {
  margin-bottom: 40px !important;
  text-align: center !important;
  width: 100% !important;
}

.app-container.full-mode .login-title,
.frame-container.full-mode .login-title {
  font-size: 2.5rem !important;
  margin-bottom: 12px !important;
}

.app-container.full-mode .terms-section,
.frame-container.full-mode .terms-section {
  margin: 20px 0 !important;
}

.app-container.full-mode .captcha-display,
.frame-container.full-mode .captcha-display {
  padding: 12px 16px !important;
}
</style>
