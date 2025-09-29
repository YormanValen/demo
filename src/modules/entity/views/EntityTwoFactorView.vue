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
            <p class="login-subtitle">Por favor digite el código generado en Google Authenticator</p>
          </div>

          <form @submit.prevent="handleVerification" class="login-form">
            <div class="form-group">
              <div class="input-container">
                <input type="text" v-model="verificationCode" class="form-input" placeholder=" " required maxlength="6"
                  pattern="[0-9]{6}" />
                <label class="floating-label" :class="{ 'active': verificationCode }">Código de verificación</label>
              </div>
            </div>

            <div class="button-group">
              <button type="submit" class="submit-button" :disabled="!isFormValid || isVerifying">
                <div v-if="isVerifying" class="button-spinner">
                  <svg width="20" height="20" viewBox="0 0 20 20" class="spinner">
                    <circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"
                      stroke-dasharray="25.1" stroke-dashoffset="25.1" />
                  </svg>
                </div>
                <span v-else>Verificar</span>
              </button>
              <button type="button" @click="handleCancel" class="cancel-button">
                Cancelar
              </button>
            </div>
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

const router = useRouter()

const verificationCode = ref('')
const isVerifying = ref(false)

const isFormValid = computed(() => {
  return verificationCode.value.length === 6 && /^[0-9]{6}$/.test(verificationCode.value)
})

const handleVerification = async () => {
  if (!isFormValid.value) return

  isVerifying.value = true

  try {
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Navigate to entity dashboard
    router.push('/entity/dashboard')
  } catch (error) {
    console.error('Verification error:', error)
  } finally {
    isVerifying.value = false
  }
}

const handleCancel = () => {
  router.back()
}
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
  margin-top: 100px;
  font-size: 1rem;
  font-weight: 300;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
.form-input:focus+.floating-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: #406eb3;
  font-weight: 500;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
  background: white;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  font-weight: 500;
  letter-spacing: 2px;
}

.form-input:focus {
  outline: none;
  border-color: #ba2f7d;
  box-shadow: 0 0 8px rgba(186, 47, 125, 0.2);
}

.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 16px;
}

.submit-button,
.cancel-button {
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
}

.submit-button {
  background: #ba2f7d;
  color: white;
}

.submit-button:hover:not(:disabled) {
  background: #c2185b;
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ccc;
}

.cancel-button:hover {
  background: #e9ecef;
  border-color: #999;
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

  .button-group {
    flex-direction: column;
    align-items: center;
  }

  .submit-button,
  .cancel-button {
    width: 100%;
    max-width: 300px;
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
.frame-container.full-mode .form-input {
  padding: 15px 20px !important;
  font-size: 1rem !important;
  transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.app-container.full-mode .form-input:focus,
.frame-container.full-mode .form-input:focus {
  border-color: #ba2f7d !important;
  box-shadow: 0 0 8px rgba(186, 47, 125, 0.2) !important;
}

.app-container.full-mode .submit-button,
.app-container.full-mode .cancel-button,
.frame-container.full-mode .submit-button,
.frame-container.full-mode .cancel-button {
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

.app-container.full-mode .button-group,
.frame-container.full-mode .button-group {
  margin-top: 20px !important;
}
</style>