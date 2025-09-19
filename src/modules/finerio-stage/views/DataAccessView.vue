<template>
  <div class="data-access">
    <div class="data-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="main-title">Datos a los que se tendrá acceso</h1>

      <div class="security-notice">
        <div class="security-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1L15 3V7.5C15 11.5 12.5 15.25 10 16C7.5 15.25 5 11.5 5 7.5V3L10 1Z" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="security-text">Tus datos se compartirán de forma segura</p>
      </div>

      <div class="data-sections">
        <div class="data-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 21V19C16 17.8954 15.1046 17 14 17H10C8.89543 17 8 17.8954 8 19V21" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="#001340" stroke-width="2"/>
              </svg>
            </div>
            <h2 class="section-title">Datos personales</h2>
          </div>
          <p class="section-description">
            Incluye información básica necesaria para identificarte de manera única, como:
          </p>
          <ul class="data-list">
            <li>Nombre completo.</li>
            <li>Tipo de identificación personal (DNI, pasaporte).</li>
            <li>Número de identificación.</li>
            <li>Otros datos relevantes que puedan ser requeridos según el propósito del servicio.</li>
          </ul>
        </div>

        <div class="data-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="15" rx="2" stroke="#001340" stroke-width="2"/>
                <path d="M7 8H17M7 12H13" stroke="#001340" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h2 class="section-title">Cuentas</h2>
          </div>
          <p class="section-description">
            Acceso a la información relacionada con tus cuentas bancarias, incluyendo:
          </p>
          <ul class="data-list">
            <li>Números de cuenta.</li>
            <li>Saldos disponibles y promedio.</li>
            <li>Tipos de cuenta (ahorros, corriente, entre otros).</li>
            <li>Detalles de préstamos asociados, como montos pendientes y fechas de pago.</li>
            <li>Otra información vinculada a tus cuentas.</li>
          </ul>
        </div>
      </div>

      <button class="back-button-footer" @click="handleGoBack">
        Volver
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoBack = () => {
  router.push('/finerio/connect-stage2')
}
</script>

<style scoped>
.data-access {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.data-content {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
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

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 24px 0;
  text-align: center;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f1f5f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.security-icon {
  flex-shrink: 0;
}

.security-text {
  font-size: 14px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

.data-sections {
  margin-bottom: 32px;
}

.data-section {
  margin-bottom: 32px;
}

.data-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
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

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.section-description {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.data-list {
  margin: 0;
  padding-left: 20px;
  list-style-type: disc;
}

.data-list li {
  font-size: 14px;
  color: #334155;
  margin-bottom: 8px;
  line-height: 1.4;
}

.data-list li:last-child {
  margin-bottom: 0;
}

.back-button-footer {
  width: 100%;
  background: white;
  color: #374151;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button-footer:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}
</style>