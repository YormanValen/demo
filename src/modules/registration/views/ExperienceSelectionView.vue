<template>
  <div class="experience-selection-view">
    <div class="selection-container">
      <div class="title-container">
        <h1 class="selection-title">Elige tu experiencia</h1>
        <span>Esta demo te permitirá conocer dos perspectivas clave: </span>
      </div>

      <div class="experience-cards">
        <div
          class="experience-card user-experience"
          @click="selectExperience('user')"
          :class="{ selected: selectedExperience === 'user' }"
        >
          <div class="card-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="currentColor"
              />
              <path
                d="M12 14C7.029 14 3 18.029 3 23H21C21 18.029 16.971 14 12 14Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2 class="card-title">Experiencia de Usuario</h2>
          <p class="card-description">
            Para personas naturales que desean gestionar sus finanzas
            personales.
          </p>
        </div>

        <div
          class="experience-card entity-experience"
          @click="selectExperience('entity')"
          :class="{ selected: selectedExperience === 'entity' }"
        >
          <div class="card-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 13H21V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V13Z"
                fill="currentColor"
              />
              <path d="M3 7H21V11H3V7Z" fill="currentColor" />
              <path d="M12 2L21 7H3L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <h2 class="card-title">Experiencia de Entidad</h2>
          <p class="card-description">
            Para empresas que requieren herramientas avanzadas de gestión
            financiera.
          </p>
        </div>
      </div>

      <div class="action-buttons">
        <button
          class="continue-button"
          @click="continueWithSelection"
          :disabled="!selectedExperience"
        >
          Continuar
        </button>

        <span>Al finalizar, podrás volver a esta pantalla para seleccionar otra experiencia.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedExperience = ref<"user" | "entity" | null>(null);

const selectExperience = (type: "user" | "entity") => {
  selectedExperience.value = type;
};

const continueWithSelection = () => {
  if (!selectedExperience.value) return;

  // Guardar la selección en localStorage o store
  localStorage.setItem("selectedExperience", selectedExperience.value);

  // Navegar según la experiencia seleccionada
  if (selectedExperience.value === "entity") {
    router.push("/entity/dashboard");
  } else {
    router.push("/registration/basic-information");
  }
};
</script>

<style scoped>
.experience-selection-view {
  padding: 20px;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.title-container h1 {
  margin: 0;
}

.title-container {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.selection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  background: linear-gradient(
    21deg,
    rgb(97, 40, 120) 0%,
    rgb(186, 45, 125) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.experience-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.experience-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.experience-card.selected {
  border-color: rgb(97, 40, 120);
  background: linear-gradient(135deg, #faf7fb 0%, #f5f0f6 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(97, 40, 120, 0.15);
}

.card-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(
    21deg,
    rgb(97, 40, 120) 0%,
    rgb(186, 45, 125) 100%
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.card-description {
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.continue-button {
  width: fit-content;
  background: linear-gradient(
    21deg,
    rgb(97, 40, 120) 0%,
    rgb(186, 45, 125) 100%
  );
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(97, 40, 120, 0.3);
}

.continue-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  .experience-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .experience-card {
    padding: 16px;
  }

  .selection-title {
    font-size: 1.6rem;
  }
}
</style>
