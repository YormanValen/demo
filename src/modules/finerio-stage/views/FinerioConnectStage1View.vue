<template>
  <div class="financial-connect-stage1">
    <div class="main-container">
      <!-- Panel Izquierdo - Contenido Principal -->
      <div class="left-panel" :class="{ 'animate': showContent }">
        <!-- Header animado con gradiente -->
        <div class="animated-header">
          <div class="connection-flow">
            <div class="logo-bubble">
              <div class="logo-text">📱</div>
            </div>
            <div class="flow-line">
              <div class="flow-dot"></div>
              <div class="flow-dot"></div>
              <div class="flow-dot"></div>
            </div>
            <div class="bank-bubble">
              <div class="bank-text">🏦</div>
            </div>
          </div>
        </div>

        <!-- Título principal más amigable -->
        <div class="title-section">
          <h1 class="main-title">Usa el poder de tus datos a través de Open Finance para obtener un mejor crédito</h1>
          <p class="subtitle">Conecta tu entidad financiera de forma fácil y segura para acceder a mejores opciones
            financieras</p>
        </div>

        <!-- Lista de beneficios mejorada -->
        <div class="benefits-section">
          <div class="benefit-card">
            <div class="benefit-icon secure">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="url(#gradient1)"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="benefit-content">
              <h3 class="benefit-title">100% Seguro</h3>
              <p class="benefit-text">Solo revisamos tu información, nunca tocamos tu dinero</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon fast">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="url(#gradient2)" stroke-width="2" />
                <polyline points="12,6 12,12 16,14" stroke="url(#gradient2)" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="benefit-content">
              <h3 class="benefit-title">Súper Rápido</h3>
              <p class="benefit-text">Solo toma unos minutos conectar tu cuenta</p>
            </div>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon control">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="url(#gradient3)" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="url(#gradient3)" stroke-width="2" />
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="benefit-content">
              <h3 class="benefit-title">Tú Decides</h3>
              <p class="benefit-text">Puedes desconectar cuando quieras</p>
            </div>
          </div>
        </div>

        <!-- Botones mejorados -->
        <div class="action-buttons">
          <button class="btn-connect" @click="handleConnect">
            <span class="btn-text">Conectar mi entidad</span>
          </button>

          <button class="btn-view" @click="handleViewConnected">
            Ver entidades conectadas
          </button>
        </div>
      </div>

      <!-- Panel Derecho - Información Explicativa -->
      <div class="right-panel" :class="{ 'animate': showContent }">
        <div class="info-box-internal">
          <div class="info-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="url(#gradient4)" stroke-width="2" />
              <path d="M12 16v-4" stroke="url(#gradient4)" stroke-width="2" stroke-linecap="round" />
              <path d="M12 8h.01" stroke="url(#gradient4)" stroke-width="2" stroke-linecap="round" />
              <defs>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:rgb(97, 40, 120);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgb(186, 45, 125);stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="info-content">
            <h4 class="info-title">¿Por qué conectar mi entidad?</h4>
            <p class="info-text">
              Al conectar tu cuenta bancaria de forma segura, analizamos tu historial financiero para ofrecerte
              productos crediticios personalizados con mejores tasas y condiciones adaptadas a tu perfil.
            </p>
            <p class="info-text">
              <strong>Tus datos están completamente protegidos</strong> - utilizamos tecnología de encriptación bancaria
              y solo accedemos a la información necesaria para evaluar tu perfil crediticio y encontrar las mejores
              opciones financieras disponibles para ti.
            </p>
            <p class="info-text">
              Puedes desconectar tu cuenta en cualquier momento y mantener el control total sobre tu información.
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showContent = ref(false)

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 300)
})


const handleConnect = () => {
  router.push('/financial/connect-institutions')
}

const handleViewConnected = () => {
  router.push('/financial/connected-accounts')
}
</script>

<style scoped>
.financial-connect-stage1 {
  min-height: 100vh;
  width: 100vw;
  background: #f8fafc;
  position: fixed;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  min-height: 600px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Panel Izquierdo - Contenido Principal */
.left-panel {
  background: white;
  padding: 40px;
  border-right: 1px solid #e5e7eb;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.left-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
}

.left-panel.animate {
  opacity: 1;
  transform: translateX(0);
}

/* Panel Derecho - Información */
.right-panel {
  background: #f8fafc;
  padding: 40px;
  overflow-y: auto;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.6s ease;
  transition-delay: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-panel.animate {
  opacity: 1;
  transform: translateX(0);
}

/* Header animado */
.animated-header {
  margin-bottom: 40px;
}

.connection-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.logo-bubble,
.bank-bubble {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(97, 40, 120, 0.1) 0%, rgba(186, 45, 125, 0.1) 100%);
  border: 2px solid rgba(97, 40, 120, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

.logo-text,
.bank-text {
  font-size: 24px;
}

.flow-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  animation: flowDots 1.5s infinite;
}

.flow-dot:nth-child(2) {
  animation-delay: 0.3s;
}

.flow-dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes flowDots {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}


/* Sección de título */
.title-section {
  margin-bottom: 40px;
}

.main-title {
  font-size: 19px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
}

/* Caja informativa interna */
.info-box-internal {
  background: white;
  border: 1px solid rgba(97, 40, 120, 0.15);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 16px;
  text-align: left;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.info-box-internal:hover {
  border-color: rgba(97, 40, 120, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(97, 40, 120, 0.12);
}

.info-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(97, 40, 120, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 15px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 4px 0;
}

.info-text {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  margin: 0 0 8px 0;
}

.info-text:last-child {
  margin-bottom: 0;
}

.info-text strong {
  color: rgb(97, 40, 120);
  font-weight: 600;
}

/* Sección de beneficios */
.benefits-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.benefit-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(0, 19, 64, 0.02);
  border: 1px solid rgba(0, 19, 64, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-align: left;
}

.benefit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 19, 64, 0.1);
  border-color: rgba(0, 19, 64, 0.2);
}

.benefit-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(0, 19, 64, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 14px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 4px 0;
}

.benefit-text {
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
  margin: 0;
}

/* Botones de acción */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 0;
}

.btn-connect {
  width: 100%;
  height: 56px;
  background: #001340;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.btn-connect::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-connect:hover::before {
  left: 100%;
}

.btn-connect:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 19, 64, 0.3);
  background: #002157;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-connect:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-view {
  width: 100%;
  height: 48px;
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-view:hover {
  border-color: rgba(97, 40, 120, 0.3);
  background: rgba(97, 40, 120, 0.02);
  color: rgb(97, 40, 120);
}


/* Responsive Design */
@media (max-width: 1024px) {
  .financial-connect-stage1 {
    padding: 20px;
  }

  .main-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    max-width: 800px;
  }

  .left-panel,
  .right-panel {
    padding: 40px 30px;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .financial-connect-stage1 {
    padding: 16px;
  }

  .main-container {
    border-radius: 16px;
    min-height: auto;
  }

  .left-panel,
  .right-panel {
    padding: 30px 24px;
  }

  .main-title {
    font-size: 18px;
  }

  .subtitle {
    font-size: 13px;
  }

  .benefit-card {
    padding: 16px;
  }

  .btn-connect {
    height: 52px;
    font-size: 14px;
  }

  .info-box-internal {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .connection-flow {
    gap: 12px;
  }

  .logo-bubble,
  .bank-bubble {
    width: 50px;
    height: 50px;
  }

  .logo-text,
  .bank-text {
    font-size: 20px;
  }
}
</style>
