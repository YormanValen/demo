<template>
  <div class="transactional-profile-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Perfil transaccional</h1>
      <p class="subtitle">Conocimiento de los estilos de vida y preferencias del cliente para una mejor segmentación.
      </p>
      <div class="description-container">
        <ul class="description-list">
          <li class="description-text">20 perfiles disponibles, en constante expansión.</li>
        </ul>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Profile Cards Grid -->
      <div class="profiles-grid" :class="{ 'visible': showProfiles }">
        <div v-for="(profile, index) in profiles" :key="profile.id" class="profile-card"
          :class="{ 'visible': visibleProfiles.has(index) }" :style="{ 'animation-delay': `${index * 100}ms` }">
          <div class="profile-icon">
            <span class="profile-emoji">{{ profile.emoji }}</span>
          </div>
          <h3 class="profile-name">{{ profile.name }}</h3>
          <p class="profile-description">{{ profile.description }}</p>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-label">Frecuencia:</span>
              <span class="stat-value">{{ profile.frequency }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Categoría:</span>
              <span class="stat-value">{{ profile.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="button-container" :class="{ 'visible': showButton }">
      <button class="back-button" @click="goBack">
        ← Volver al Menú
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TransactionalInsightsBackground from '../components/TransactionalInsightsBackground.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Animation states
const showTitle = ref(false)
const showContent = ref(false)
const showProfiles = ref(false)
const showButton = ref(false)
const visibleProfiles = ref<Set<number>>(new Set())

// Profile data
const profiles = ref([
  {
    id: 1,
    name: "Comprador Frecuente",
    description: "Realiza múltiples transacciones diarias en diferentes categorías",
    emoji: "🛒",
    frequency: "Diaria",
    category: "Retail"
  },
  {
    id: 2,
    name: "Inversor Digital",
    description: "Enfocado en inversiones y productos financieros digitales",
    emoji: "💰",
    frequency: "Semanal",
    category: "Finanzas"
  },
  {
    id: 3,
    name: "Viajero Urbano",
    description: "Gastos concentrados en transporte y movilidad urbana",
    emoji: "🚗",
    frequency: "Diaria",
    category: "Transporte"
  },
  {
    id: 4,
    name: "Gastronómico",
    description: "Alta actividad en restaurantes y delivery de comida",
    emoji: "🍕",
    frequency: "Diaria",
    category: "Alimentación"
  },
  {
    id: 5,
    name: "Ahorrista Disciplinado",
    description: "Patrones consistentes de ahorro y gastos controlados",
    emoji: "🏦",
    frequency: "Mensual",
    category: "Ahorro"
  },
  {
    id: 6,
    name: "Comprador Online",
    description: "Preferencia por compras digitales y e-commerce",
    emoji: "📱",
    frequency: "Semanal",
    category: "Digital"
  },
  {
    id: 7,
    name: "Fitness Enthusiast",
    description: "Gastos en gimnasios, suplementos y actividades deportivas",
    emoji: "💪",
    frequency: "Semanal",
    category: "Salud"
  },
  {
    id: 8,
    name: "Familiar Responsable",
    description: "Gastos enfocados en familia, educación y hogar",
    emoji: "👨‍👩‍👧‍👦",
    frequency: "Semanal",
    category: "Familia"
  },
  {
    id: 9,
    name: "Entretenimiento Premium",
    description: "Alta inversión en entretenimiento y experiencias premium",
    emoji: "🎭",
    frequency: "Mensual",
    category: "Entretenimiento"
  },
  {
    id: 10,
    name: "Profesional Ejecutivo",
    description: "Gastos corporativos y de alta gama profesional",
    emoji: "💼",
    frequency: "Semanal",
    category: "Profesional"
  },
  {
    id: 11,
    name: "Estudiante Activo",
    description: "Patrones de gasto típicos de estudiantes universitarios",
    emoji: "🎓",
    frequency: "Semanal",
    category: "Educación"
  },
  {
    id: 12,
    name: "Minimalista Digital",
    description: "Pocos gastos, enfocados en servicios digitales esenciales",
    emoji: "📐",
    frequency: "Mensual",
    category: "Minimalismo"
  }
])

// Animation helpers
const showProfilesSequentially = async (delay = 150) => {
  return new Promise<void>((resolve) => {
    const showNext = (index: number) => {
      if (index >= profiles.value.length) {
        resolve()
        return
      }
      visibleProfiles.value.add(index)
      setTimeout(() => showNext(index + 1), delay)
    }
    showNext(0)
  })
}

// Start animations
const startAnimations = async () => {
  // 1. Título
  showTitle.value = true
  setTimeout(() => {
    showContent.value = true
    setTimeout(() => {
      // 2. Mostrar perfiles
      showProfiles.value = true
      showProfilesSequentially(120).then(() => {
        setTimeout(() => {
          showButton.value = true
        }, 500)
      })
    }, 300)
  }, 300)
}

// Navigation
const goBack = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Start animations on mount
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    startAnimations()
  }, 300)
})
</script>

<style scoped>
.transactional-profile-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  padding: 40px 20px 20px;
  opacity: 0;
  transform: scale(1.02);
  animation: fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}

@keyframes fadeInScale {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Title */
.title-container {
  text-align: center;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.title-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.main-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  text-align: center;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

.description-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 800px;
  margin: 25px auto 0;
}

.description-list {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
}

.description-text {
  font-size: 1rem;
  color: #4b5563;
  margin: 8px 0;
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
}

/* Main Content */
.main-content {
  width: 100%;
  max-width: 1400px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.main-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Profiles Grid */
.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 20px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.profiles-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 2px solid #e5e7eb;
  text-align: center;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.profile-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.profile-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  border-color: rgb(186, 45, 125);
}

.profile-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  position: relative;
}

.profile-emoji {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.profile-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
}

.profile-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.profile-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

.stat-value {
  font-size: 0.9rem;
  color: #111827;
  font-weight: 600;
  background: rgba(97, 40, 120, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

/* Button */
.button-container {
  text-align: center;
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
}

.button-container.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-button {
  background: transparent;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  border-color: rgb(186, 45, 125);
  color: rgb(186, 45, 125);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }

  .profiles-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .transactional-profile-container {
    padding: 30px 15px 15px;
  }

  .main-title {
    font-size: 2.2rem;
    letter-spacing: 0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .profiles-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .transactional-profile-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .profile-card {
    padding: 20px;
  }
}
</style>