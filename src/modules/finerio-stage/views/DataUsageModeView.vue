<template>
  <div class="data-usage-mode">
    <div class="usage-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 class="main-title">Modo que se utilizarán los datos</h1>

      <div class="security-notice">
        <div class="security-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1L15 3V7.5C15 11.5 12.5 15.25 10 16C7.5 15.25 5 11.5 5 7.5V3L10 1Z" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="security-text">Tus datos se compartirán de manera segura.</p>
      </div>

      <div class="usage-sections">
        <div class="usage-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#001340" stroke-width="2"/>
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="#001340" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h2 class="section-title">Finalidad</h2>
          </div>
          <p class="section-description">
            Los datos serán utilizados para la gestión de tus finanzas de manera integral: desde el seguimiento de ingresos y gastos, la categorización de transacciones, el análisis de consumo, hasta la creación de presupuestos y otras funciones similares, dentro del período de vigencia acordado.
          </p>
        </div>

        <div class="usage-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 20H21L19 18L21 16H12V20Z" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.5 9.5L21 5L19 3L14.5 7.5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 14.5L3 19L5 21L9.5 16.5" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="9" r="2" stroke="#001340" stroke-width="2"/>
              </svg>
            </div>
            <h2 class="section-title">Procesamiento</h2>
          </div>
          <p class="section-description">
            Se recopilarán y procesarán los datos financieros del usuario, para ser enviados al tercero encargado de cumplir con la finalidad de uso definida.
          </p>
        </div>

        <div class="usage-section">
          <div class="section-header">
            <div class="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#001340" stroke-width="2"/>
                <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.12598C17.7252 3.56986 19 5.13616 19 7C19 8.86384 17.7252 10.4301 16 10.874" stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="section-title">Tercero receptor de datos</h2>
          </div>
          <p class="section-description">
            El tercero receptor será responsable de utilizar la información financiera proporcionada exclusivamente para cumplir con la finalidad establecida, garantizando el estricto cumplimiento de las normativas aplicables.
          </p>
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
  router.push('/financial/connect-institutions')
}
</script>

<style scoped>
.data-usage-mode {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.usage-content {
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

.usage-sections {
  margin-bottom: 32px;
}

.usage-section {
  margin-bottom: 32px;
}

.usage-section:last-child {
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
  color: #334155;
  margin: 0;
  line-height: 1.6;
  text-align: left;
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