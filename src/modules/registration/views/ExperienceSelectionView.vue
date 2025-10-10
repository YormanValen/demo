<template>
  <div class="experience-selection-view">
    <!-- Imagen en la parte superior -->
    <div class="experience-hero">
      <img class="experience-hero__img" src="/src/assets/experience-selection-image.png"
        alt="Soluciones en el mercado - Experian" />
    </div>

    <div class="selection-container">
      <div class="title-container">
        <h1 class="selection-title">Elige tu experiencia</h1>
        <span>Esta demo te permitirá conocer dos perspectivas clave: </span>
        <div class="click-badge">
          Haz clic en una opción para continuar
        </div>
      </div>

      <div class="experience-cards">
        <div class="experience-card user-experience" @click="selectExperience('user')"
          :class="{ selected: selectedExperience === 'user' }">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                fill="currentColor" />
              <path d="M12 14C7.029 14 3 18.029 3 23H21C21 18.029 16.971 14 12 14Z" fill="currentColor" />
            </svg>
          </div>
          <h2 class="card-title">Experiencia de Usuario</h2>
          <p class="card-description">
            Para personas naturales que desean gestionar sus finanzas
            personales.
          </p>
        </div>

        <div class="experience-card entity-experience" @click="selectExperience('entity')"
          :class="{ selected: selectedExperience === 'entity' }">
          <div class="card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5,1L2,6V8H21V6M16,10V17H19V10M2,22H21V19H2M10,10V17H13V10M4,10V17H7V10H4Z"
                fill="currentColor" />
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
        <span>Al finalizar, podrás volver a esta pantalla para seleccionar otra experiencia.</span>
      </div>

      <div class="demo-badge">
        <span class="badge-label">DEMOSTRACIÓN DE CONCEPTO:</span>
        Esta es una muestra potencial, no es el producto final. Funcionalidades y datos simulados y sujetos a cambio.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserExperienceCounterStore } from "../stores/user-experience-counter.store";
import { useEntityModulesStore } from "../../entity/stores/entity-modules.store";
import { useAnalyticsStore } from "../../../stores/analytics";
import { useVisitedProductsStore } from "../../transactional-insights/stores/visited-products.store";

const router = useRouter();
const selectedExperience = ref<"user" | "entity" | null>(null);
const userExperienceCounterStore = useUserExperienceCounterStore();
const entityModulesStore = useEntityModulesStore();
const analyticsStore = useAnalyticsStore();
const visitedProductsStore = useVisitedProductsStore();

const selectExperience = (type: "user" | "entity") => {
  selectedExperience.value = type;

  // Navegar inmediatamente al seleccionar
  // Track analytics
  analyticsStore.trackExperienceVisit(type === 'user' ? 'usuario' : 'entidad');

  // Guardar la selección en localStorage o store
  localStorage.setItem("selectedExperience", type);

  // Incrementar contador solo para experiencia de usuario
  if (type === 'user') {
    userExperienceCounterStore.incrementVisit();
  }

  // Navegar según la experiencia seleccionada
  if (type === 'entity') {
    router.push('/entity/intro');
  } else {
    router.push('/registration/user-intro');
  }
};


// Cargar datos del store al montar el componente
onMounted(() => {
  userExperienceCounterStore.loadFromLocalStorage();
  // Limpiar el store de módulos de entidad cuando se regresa a esta vista
  entityModulesStore.clearAllModules();
  // Limpiar los productos visitados del transactional insights
  visitedProductsStore.clearVisitedProducts();
});
</script>

<style scoped>
.experience-selection-view {
  padding: 16px 20px 20px;
}

.experience-hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.experience-hero__img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: none;
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
  align-items: center;
}

.selection-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  background: linear-gradient(21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%);
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
  background: linear-gradient(21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%);
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

.click-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(21deg,
      rgb(97, 40, 120) 0%,
      rgb(186, 45, 125) 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
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
}

.badge-label {
  font-weight: 700;
  color: #b45309;
}

@media (max-width: 768px) {
  .experience-hero {
    margin-bottom: 20px;
  }

  .experience-hero__img {
    border-radius: 8px;
    box-shadow: none;
  }

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

/* Fullscreen mode adjustments */
.full-mode .experience-selection-view {
  display: flex;
  flex-direction: column;
  /* apila elementos: selector arriba, imagen abajo */
  justify-content: flex-start;
  /* inicia desde arriba */
  align-items: center;
  /* centra horizontalmente el contenido apilado */
  min-height: auto;
  /* quita la altura que empujaba hacia abajo */
  padding: 16px 20px 24px;
  /* padding más compacto */
}

.full-mode .selection-container {
  max-width: 800px;
  width: 100%;
  margin-top: 8px;
  /* ubica el selector justo debajo del contenido superior */
}
</style>
