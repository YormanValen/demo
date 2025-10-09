<template>
  <div class="user-experience-intro" :class="{ 'exiting': isExiting }">
    <TransactionalInsightsBackground />

    <div class="intro-content">
      <div class="content-container" :class="{ 'visible': isVisible, 'exiting': isExiting }">
        <div class="intro-text">
          <div class="title-container" :class="{ 'visible': showTitle, 'exiting': isExiting }">
            <p class="intro-title-text">
              ¡Bienvenidos a la nueva era de la Banca!
            </p>
          </div>

          <div class="description-container" :class="{ 'visible': showDescription, 'exiting': isExiting }">
            <p class="intro-description-text">
              Hoy les mostraremos como <strong>Open Finance</strong> no es solo una tendencia, sino una revolución que
              pone el poder de sus datos en sus manos.
            </p>

            <p class="intro-description-text">
              Están a punto de iniciar un onboarding de producto con <strong>Open Finance</strong>, así, podemos
              entender mejor sus necesidades y personalizar su oferta al instante y con total seguridad.
            </p>

            <p class="intro-description-text">
              Van a experimentar un proceso rápido, simple y transparente que utiliza sus datos financieros para:
            </p>
          </div>

          <div class="benefits-container" :class="{ 'visible': showBenefits, 'exiting': isExiting }">
            <ul class="benefits-list">
              <li class="benefit-item" :class="{ 'visible': showBenefit1, 'exiting': isExiting }">
                <span class="check-icon">✓</span>
                <span>Acelerar la aprobación</span>
              </li>
              <li class="benefit-item" :class="{ 'visible': showBenefit2, 'exiting': isExiting }">
                <span class="check-icon">✓</span>
                <span>Ofrecerle exactamente lo que necesita</span>
              </li>
              <li class="benefit-item" :class="{ 'visible': showBenefit3, 'exiting': isExiting }">
                <span class="check-icon">✓</span>
                <span>Mantener el control absoluto de su información</span>
              </li>
            </ul>
          </div>

          <div class="final-text-container" :class="{ 'visible': showFinalText, 'exiting': isExiting }">
            <p class="intro-description-text">
              Una vez que experimenten esta agilidad como usuarios, les mostraremos el 'detrás de escena':
              cómo la entidad logra esta experiencia de manera eficiente y segura.
            </p>
          </div>
        </div>

        <div class="demo-badge" :class="{ 'visible': showFinalText, 'exiting': isExiting }">
          <span class="badge-label">DEMOSTRACIÓN DE CONCEPTO:</span>
          Esta es una muestra potencial, no es el producto final. Funcionalidades y datos simulados y sujetos a cambio.
        </div>

        <button class="start-experience-button" :class="{ 'exiting': isExiting }" @click="startExperience">
          Comenzar experiencia
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TransactionalInsightsBackground from '@/modules/transactional-insights/components/TransactionalInsightsBackground.vue'

const router = useRouter()
const isVisible = ref(false)
const showTitle = ref(false)
const showDescription = ref(false)
const showBenefits = ref(false)
const showBenefit1 = ref(false)
const showBenefit2 = ref(false)
const showBenefit3 = ref(false)
const showFinalText = ref(false)
const isExiting = ref(false)

const startExperience = () => {
  // Trigger exit animation
  isExiting.value = true

  // Navigate after animation completes
  setTimeout(() => {
    router.push('/registration/basic-information')
  }, 800)
}

const startAnimationSequence = async () => {
  // Show main container first
  setTimeout(() => isVisible.value = true, 100)

  // Show title
  setTimeout(() => showTitle.value = true, 600)

  // Show description
  setTimeout(() => showDescription.value = true, 1200)

  // Show benefits container
  setTimeout(() => showBenefits.value = true, 1800)

  // Show benefits sequentially
  setTimeout(() => showBenefit1.value = true, 2200)
  setTimeout(() => showBenefit2.value = true, 2500)
  setTimeout(() => showBenefit3.value = true, 2800)

  // Show final text
  setTimeout(() => showFinalText.value = true, 3200)
}

onMounted(() => {
  startAnimationSequence()
})
</script>

<style scoped>
.user-experience-intro {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  opacity: 0;
  transform: scale(1.05);
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.user-experience-intro.exiting {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.intro-content {
  max-width: 900px;
  width: 90%;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
}

.content-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.content-container.exiting {
  opacity: 0;
  transform: translateY(-50px);
  transition: all 0.6s ease-in;
}

.intro-text {
  margin-bottom: 32px;
}

/* Animated containers */
.title-container,
.description-container,
.benefits-container,
.final-text-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.title-container.visible,
.description-container.visible,
.benefits-container.visible,
.final-text-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.title-container.exiting,
.description-container.exiting,
.benefits-container.exiting,
.final-text-container.exiting {
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.5s ease-in;
}

.intro-title-text {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0 0 30px 0;
  line-height: 1.2;
}

.intro-description-text {
  font-size: 1.3rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 20px;
  text-align: left;
  font-weight: 500;
}

.intro-description-text strong {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 1.2rem;
  color: #374151;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.benefit-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.benefit-item.exiting {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.4s ease-in;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.start-experience-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(97, 40, 120, 0.3);
  margin-top: 20px;
}

.start-experience-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.4);
}

.start-experience-button:active {
  transform: translateY(0);
}

.start-experience-button.exiting {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
  transition: all 0.5s ease-in;
}

.demo-badge {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 12px;
  padding: 12px 16px;
  margin: 20px 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #856404;
  text-align: left;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.demo-badge.visible {
  opacity: 1;
  transform: translateY(0);
}

.demo-badge.exiting {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s ease-in;
}

.badge-label {
  font-weight: 700;
  color: #b45309;
}

@media (max-width: 768px) {
  .content-container {
    padding: 24px;
    margin: 20px;
  }

  .intro-paragraph {
    font-size: 1rem;
  }

  .intro-paragraph:first-child {
    font-size: 1.1rem;
  }

  .start-experience-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}
</style>