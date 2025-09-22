<template>
  <div class="financial-connect-stage1">
    <div class="connect-content">
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
        <h1 class="main-title">¡Conecta tu banco de forma fácil y segura!</h1>
        <p class="subtitle">Te ayudamos a obtener mejores opciones financieras analizando tu historial bancario</p>
      </div>
      
      <!-- Lista de beneficios mejorada -->
      <div class="benefits-section">
        <div class="benefit-card">
          <div class="benefit-icon secure">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="url(#gradient1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
              <circle cx="12" cy="12" r="10" stroke="url(#gradient2)" stroke-width="2"/>
              <polyline points="12,6 12,12 16,14" stroke="url(#gradient2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
              <path d="M9 12L11 14L15 10" stroke="url(#gradient3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="9" stroke="url(#gradient3)" stroke-width="2"/>
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
          <span class="btn-text">Conectar mi banco</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="btn-arrow">
            <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button class="btn-view" @click="handleViewConnected">
          Ver cuentas conectadas
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

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
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.connect-content {
  background: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 540px;
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.connect-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
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

.logo-bubble, .bank-bubble {
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

.logo-text, .bank-text {
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
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes flowDots {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Sección de título */
.title-section {
  margin-bottom: 40px;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #001340;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.subtitle {
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
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
  font-size: 16px;
  font-weight: 600;
  color: #001340;
  margin: 0 0 4px 0;
}

.benefit-text {
  font-size: 14px;
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
  font-size: 18px;
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
  font-size: 16px;
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
@media (max-width: 768px) {
  .financial-connect-stage1 {
    padding: 20px;
  }
  
  .connect-content {
    padding: 32px 24px;
    border-radius: 20px;
  }
  
  .main-title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 15px;
  }
  
  .benefit-card {
    padding: 16px;
  }
  
  .btn-connect {
    height: 52px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .connection-flow {
    gap: 12px;
  }
  
  .logo-bubble, .bank-bubble {
    width: 50px;
    height: 50px;
  }
  
  .logo-text, .bank-text {
    font-size: 20px;
  }
}
</style>