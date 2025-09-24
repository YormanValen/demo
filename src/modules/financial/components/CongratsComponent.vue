<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showCard = ref(false);

onMounted(() => {
  setTimeout(() => {
    showCard.value = true;
  }, 100);
});

const handleContinue = () => {
  router.push("/registration/experience-selection");
};
</script>

<template>
  <div class="congrats-container">
    <transition name="fade-up">
      <div v-if="showCard" class="congrats-card">
        <div class="congrats-content">
          <div class="congrats-header">
            <span class="party-emoji">🎉</span>
            <h1>¡Felicitaciones!</h1>
          </div>

          <h2 class="credit-approved">Tu crédito ha sido aprobado</h2>

          <div class="credit-details">
            <p>
              Por un monto de <span class="highlight">$50'000.000</span> con una
              tasa del <span class="highlight">14%</span> y un plazo de
              <span class="highlight">36 meses</span>
            </p>
          </div>

          <p class="open-finance-message">
            Gracias a la conexión segura con tus bancos mediante Open Finance,
            pudimos evaluar tu perfil de forma ágil y justa.
          </p>

          <button class="continue-button" @click="handleContinue">
            Aceptar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.congrats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.congrats-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.congrats-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.congrats-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.party-emoji {
  font-size: 32px;
  animation: bounce 1s ease infinite;
}

.congrats-header h1 {
  font-size: 28px;
  color: rgb(97, 40, 120);
  margin: 0;
}

.credit-approved {
  font-size: 24px;
  color: rgb(97, 40, 120);
  margin: 0;
}

.credit-details {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.credit-details p {
  margin: 0;
}

.highlight {
  color: rgb(97, 40, 120);
  font-weight: 600;
}

.open-finance-message {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.continue-button:hover {
  opacity: 0.9;
}

/* Animaciones */
.fade-up-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .congrats-card {
    padding: 30px 20px;
  }

  .congrats-header h1 {
    font-size: 24px;
  }

  .credit-approved {
    font-size: 20px;
  }

  .credit-details {
    font-size: 14px;
  }
}
</style>
