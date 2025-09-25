<template>
  <div class="thank-you">
    <div class="thank-you-content">
      <!-- <div class="success-icon">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#001340"
            stroke-width="4"
          />
          <path
            d="M30 50L42 62L70 34"
            stroke="#001340"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div> -->

      <h1 class="main-title">¡Muchas gracias!</h1>

      <div class="thank-you-message">
        <p>
          Agradecemos profundamente la información proporcionada para conectar
          su entidad financiera. Esto nos permite ofrecerle un crédito de la
          forma más eficiente y personalizada posible.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" fill="#001340" opacity="0.1" />
              <path d="M24 8L32 16V32C32 36 24 40 24 40S16 36 16 32V16L24 8Z" fill="#001340" opacity="0.2" />
              <path d="M24 8L32 16V32C32 36 24 40 24 40S16 36 16 32V16L24 8Z" stroke="#001340" stroke-width="2" />
              <path d="M20 24L23 27L28 22" stroke="#001340" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="feature-title">Seguridad garantizada</h3>
          <p class="feature-description">
            Sus datos están protegidos con los más altos estándares de seguridad
            bancaria
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" fill="#001340" opacity="0.1" />
              <path d="M16 24H32M24 16L32 24L24 32" stroke="#001340" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="feature-title">Proceso eficiente</h3>
          <p class="feature-description">
            Evaluación y aprobación de crédito en tiempo récord
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" fill="#001340" opacity="0.1" />
              <circle cx="24" cy="18" r="6" fill="#001340" opacity="0.2" />
              <circle cx="24" cy="18" r="6" stroke="#001340" stroke-width="2" />
              <path d="M12 36C12 30 17.3 26 24 26S36 30 36 36" stroke="#001340" stroke-width="2"
                stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="feature-title">Atención personalizada</h3>
          <p class="feature-description">
            Créditos adaptados a su perfil financiero específico
          </p>
        </div>
      </div>

      <div class="contact-info">
        <p class="contact-text">
          Nos pondremos en contacto con usted pronto para continuar con el
          proceso de aprobación
        </p>
      </div>

      <div class="button-container">
        <button @click="handleNextClick" class="continue-button">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // Optional: Add any initialization logic here
});

const handleNextClick = () => {
  router.push("/bankambient/data-processing");
};
</script>

<style scoped>
.thank-you {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.thank-you-content {
  background: white;
  padding: 20px 15px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 19, 64, 0.12);
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}

.success-icon {
  display: flex;
  justify-content: center;
  animation: fadeInScale 0.6s ease-out;
}

.main-title {
  font-size: 28px;
  font-weight: 700;
  color: #001340;
  margin: 0;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.thank-you-message {
  max-width: 600px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.thank-you-message p {
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  margin-top: 12px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 12px;
  background: #f8fafc;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.8s ease-out calc(0.6s + var(--delay, 0s)) both;
}

.feature-item:nth-child(1) {
  --delay: 0s;
}

.feature-item:nth-child(2) {
  --delay: 0.1s;
}

.feature-item:nth-child(3) {
  --delay: 0.2s;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 19, 64, 0.1);
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.feature-description {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: #001340;
  color: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  animation: fadeInUp 0.8s ease-out 1s both;
}

.contact-icon {
  flex-shrink: 0;
}

.contact-icon svg {
  stroke: white;
}

.contact-text {
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
}

.continue-button {
  width: 160px;
  border-radius: 5px;
  height: 36px;
  background: #001340;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.continue-button:hover {
  opacity: 0.8;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .thank-you-content {
    padding: 40px 24px;
    gap: 32px;
  }

  .main-title {
    font-size: 28px;
  }

  .thank-you-message p {
    font-size: 16px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .contact-info {
    flex-direction: column;
    text-align: center;
  }

  .contact-text {
    text-align: center;
  }
}
</style>
