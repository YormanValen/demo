<template>
  <div class="finerio-connect-stage2">
    <div class="connect-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <ConnectionHeader />
      
      <div class="brand-intro">
        <p class="intro-text">
          <strong>Experian</strong> elige <strong>Finerio</strong> para conectar tus cuentas de forma fácil y segura.
        </p>
      </div>

      <div class="info-sections">
        <div class="info-section">
          <div class="section-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="15" rx="2" stroke="#001340" stroke-width="2"/>
              <path d="M7 8h6M7 12h8" stroke="#001340" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="section-content">
            <h3>Acerca de tus datos</h3>
            <p>Finerio gestionará tus datos financieros de la siguiente manera:</p>
            <ul>
              <li><a href="#" @click.prevent="handleDataAccess" class="link">Datos a los que se tendrá acceso</a></li>
              <li><a href="#" @click.prevent="handleDataUsageMode" class="link">Modo que se utilizarán los datos</a></li>
            </ul>
          </div>
        </div>

        <div class="info-section">
          <div class="section-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L12 8M12 8L16 4M12 8L8 4M6 10L18 10M6 14L18 14M6 18L18 18" stroke="#001340" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="section-content">
            <h3>Términos y privacidad</h3>
            <p>Al dar clic en "Aceptar y continuar", aceptas los <a href="#" class="link">términos y condiciones</a> y la <a href="#" class="link">política de privacidad</a> de Finerio.</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="accept-button" @click="handleAcceptAndContinue">
          Aceptar y continuar
        </button>
        <button class="info-button" @click="handleWhatIsFinerio">
          ¿Qué es Finerio?
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import ConnectionHeader from '../components/ConnectionHeader.vue'

const router = useRouter()

const handleGoBack = () => {
  router.push('/finerio/connect-stage1')
}

const handleDataAccess = () => {
  router.push('/finerio/data-access')
}

const handleDataUsageMode = () => {
  router.push('/finerio/data-usage-mode')
}

const handleAcceptAndContinue = () => {
  router.push('/finerio/connect-institutions')
}

const handleWhatIsFinerio = () => {
  router.push('/finerio/info')
}
</script>

<style scoped>
.finerio-connect-stage2 {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.connect-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background: #f1f5f9;
}

.brand-intro {
  margin-bottom: 32px;
  text-align: center;
}

.intro-text {
  font-size: 16px;
  line-height: 1.5;
  color: #334155;
  margin: 0;
}

.intro-text strong {
  color: #001340;
  font-weight: 600;
}

.info-sections {
  margin-bottom: 32px;
}

.info-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-content {
  flex: 1;
}

.section-content h3 {
  font-size: 16px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 8px 0;
}

.section-content p {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.section-content ul {
  margin: 0;
  padding-left: 16px;
  list-style-type: disc;
}

.section-content li {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 4px;
  line-height: 1.4;
}

.section-content li:last-child {
  margin-bottom: 0;
}

.link {
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 500;
}

.link:hover {
  color: #2563eb;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accept-button {
  background: #001340;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.accept-button:hover {
  background: #002157;
}

.info-button {
  background: transparent;
  color: #374151;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;
}

.info-button:hover {
  color: #001340;
}
</style>