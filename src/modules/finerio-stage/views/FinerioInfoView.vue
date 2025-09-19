<template>
  <div class="finerio-info">
    <div class="info-content">
      <div class="back-button" @click="handleGoBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#001340" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>

      <h1 class="main-title">¿Qué es Finerio?</h1>

      <p class="description">
        Finerio Connect es una plataforma líder en soluciones de Open Finance en latinoamérica que facilita a bancos y
        fintechs la conexión y procesamiento de información financiera, simplificando la integración tecnológica para
        ofrecer mejores servicios para usuarios finales.
      </p>

      <div class="benefits-list">
        <div class="benefit-item">
          <div class="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7M3 7L12 2L21 7M3 7L12 13L21 7"
                stroke="#001340" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p class="benefit-text">
            Los principales bancos confían en Finerio para conectar tus cuentas a aplicaciones y servicios.
          </p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#001340" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <p class="benefit-text">
            Finerio te permite conectar tus cuentas de forma rápida y segura.
          </p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#001340" stroke-width="2" />
              <path d="M9 12L11 14L15 10" stroke="#001340" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <p class="benefit-text">
            Tu información está protegida cumpliendo con las normativas y estándares financieros.
          </p>
        </div>
      </div>

      <div class="website-info">
        <p class="website-text">Conócenos en www.finerioconnect.com</p>
        <div class="finerio-logo">
        </div>
      </div>

      <button class="back-to-stage-button" @click="handleGoBack">
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
.finerio-info {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.info-content {
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

.main-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 24px 0;
  text-align: center;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  color: #334155;
  margin: 0 0 32px 0;
  text-align: left;
}

.benefits-list {
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.benefit-item:last-child {
  margin-bottom: 0;
}

.benefit-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: #334155;
  margin: 0;
  padding-top: 8px;
}

.website-info {
  text-align: center;
  margin-bottom: 32px;
}

.website-text {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 16px 0;
}

.finerio-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.back-to-stage-button {
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

.back-to-stage-button:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}
</style>