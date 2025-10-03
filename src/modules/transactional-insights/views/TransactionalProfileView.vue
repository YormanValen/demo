<template>
  <div class="transactional-profile-container" ref="rootRef">
    <!-- Animated background elements -->
    <TransactionalInsightsBackground />

    <!-- Title at top -->
    <div class="title-container" :class="{ 'visible': showTitle }">
      <h1 class="main-title">Perfil Transaccional</h1>
      <p class="subtitle">Conocimiento de los estilos de vida y preferencias del cliente para una mejor segmentación.
      </p>
      <div class="description-container">
        <div class="description-card">
          <ul class="description-list">
            <li class="description-text">20 perfiles disponibles, en constante expansión.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="main-content" :class="{ 'visible': showContent }">
      <!-- Profile Comparison Table -->
      <div class="profile-table-container" :class="{ 'visible': showTable }">
        <div class="table-wrapper">
          <!-- Header with people -->
          <div class="table-header">
            <div class="category-header"></div>
            <div v-for="(person, index) in people" :key="person.id" class="person-column"
              :class="{ 'visible': visiblePeople.has(index) }">
              <div class="person-avatar">
                <span class="person-emoji">{{ person.emoji }}</span>
              </div>
              <h3 class="person-name">{{ person.name }}</h3>
              <p class="person-age">{{ person.age }} años</p>
            </div>
          </div>

          <!-- Category rows -->
          <div class="table-body">
            <div v-for="(category, categoryIndex) in categories" :key="category.id" class="category-row"
              :class="{ 'visible': visibleCategories.has(categoryIndex) }">
              <div class="category-info">
                <div class="category-icon">
                  <span>{{ category.icon }}</span>
                </div>
                <span class="category-name">{{ category.name }}</span>
              </div>

              <div v-for="(person, personIndex) in people" :key="`${category.id}-${person.id}`" class="check-cell">
                <div class="check-mark" :class="{ 'visible': visibleChecks.has(`${categoryIndex}-${personIndex}`) }">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Continue Button (always visible) -->
    <div class="continue-container">
      <button class="continue-button" @click="onContinue">Continuar</button>
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
const showTable = ref(false)
// const showButton = ref(false) // removed: now we show a persistent Continue button
const visiblePeople = ref<Set<number>>(new Set())
const visibleCategories = ref<Set<number>>(new Set())
const visibleChecks = ref<Set<string>>(new Set())

// People data
const people = ref([
  {
    id: 1,
    name: "Ana García",
    age: 28,
    emoji: "👩‍💼"
  },
  {
    id: 2,
    name: "Carlos López",
    age: 35,
    emoji: "👨‍🏫"
  },
  {
    id: 3,
    name: "María Rodríguez",
    age: 42,
    emoji: "👩‍⚕️"
  }
])

// Categories data
const categories = ref([
  {
    id: 1,
    name: "Propietario de vehículo",
    icon: "🚗"
  },
  {
    id: 2,
    name: "Amante de la comida",
    icon: "🍕"
  },
  {
    id: 3,
    name: "Viajero frecuente",
    icon: "✈️"
  },
  {
    id: 4,
    name: "Dueño de mascotas",
    icon: "🐕"
  },
  {
    id: 5,
    name: "Entusiasta de cuidado personal",
    icon: "💄"
  },
  {
    id: 6,
    name: "Explorador cultural premium",
    icon: "🎭"
  }
])

// Animation helpers
const showPeopleSequentially = async (delay = 600) => {
  return new Promise<void>((resolve) => {
    const showNext = (index: number) => {
      if (index >= people.value.length) {
        resolve()
        return
      }
      visiblePeople.value.add(index)
      setTimeout(() => showNext(index + 1), delay)
    }
    showNext(0)
  })
}

// Define which checks should be visible (categoryIndex-personIndex)
const predefinedChecks = [
  // Ana García (persona 0)
  '1-0', // Amante de la comida
  '2-0', // Viajero frecuente
  '4-0', // Entusiasta de cuidado personal
  '5-0', // Explorador cultural premium

  // Carlos López (persona 1)
  '0-1', // Propietario de vehículo
  '1-1', // Amante de la comida
  '3-1', // Dueño de mascotas

  // María Rodríguez (persona 2)
  '0-2', // Propietario de vehículo
  '2-2', // Viajero frecuente
  '3-2', // Dueño de mascotas
  '4-2', // Entusiasta de cuidado personal
  '5-2', // Explorador cultural premium
]

const showCategoriesWithDefinedChecks = async (delay = 1500) => {
  return new Promise<void>((resolve) => {
    const showNext = (categoryIndex: number) => {
      if (categoryIndex >= categories.value.length) {
        resolve()
        return
      }

      // Show category
      visibleCategories.value.add(categoryIndex)

      // Add predefined checks for this category after a short delay
      setTimeout(() => {
        people.value.forEach((_, personIndex) => {
          const checkKey = `${categoryIndex}-${personIndex}`
          if (predefinedChecks.includes(checkKey)) {
            setTimeout(() => {
              visibleChecks.value.add(checkKey)
            }, personIndex * 300)
          }
        })

        setTimeout(() => showNext(categoryIndex + 1), delay)
      }, 600)
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
      // 2. Mostrar tabla
      showTable.value = true
      setTimeout(() => {
        // 3. Mostrar personas primero
        showPeopleSequentially(600).then(() => {
          setTimeout(() => {
            // 4. Mostrar categorías con checks definidos
            showCategoriesWithDefinedChecks(1500).then(() => {
              // after full sequence completes, wait 3s and loop
              setTimeout(async () => {
                await resetSequence()
                loopSequence()
              }, 3000)
            })
          }, 800)
        })
      }, 500)
    }, 500)
  }, 500)
}

// Continue navigation
const onContinue = () => {
  router.push({ name: 'entity-transactional-insights-submenu' })
}

// Run a single animation sequence (people -> categories + checks)
const runSequence = async () => {
  await showPeopleSequentially(600)
  await new Promise((r) => setTimeout(r, 800))
  await showCategoriesWithDefinedChecks(1500)
}

// Reset state to re-run the sequence
const resetSequence = async () => {
  visiblePeople.value.clear()
  visibleCategories.value.clear()
  visibleChecks.value.clear()
  // retrigger container animation
  showTable.value = false
  await new Promise((r) => setTimeout(r, 200))
  showTable.value = true
}

// Loop the sequence indefinitely (called after first full run completes)
const loopSequence = async () => {
  await runSequence()
  setTimeout(async () => {
    await resetSequence()
    loopSequence()
  }, 3000)
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

.description-card {
  background: white;
  border-radius: 16px;
  padding: 24px 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(10px);
  margin: 10px 0;
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

/* Profile Table */
.profile-table-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.profile-table-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.table-wrapper {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  border: 2px solid #e5e7eb;
  overflow: hidden;
}

/* Table Header */
.table-header {
  display: grid;
  grid-template-columns: 250px repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #6b7280;
}

.person-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.person-column.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.person-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  box-shadow: 0 8px 20px rgba(97, 40, 120, 0.3);
}

.person-emoji {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.person-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.person-age {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* Table Body */
.table-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-row {
  display: grid;
  grid-template-columns: 250px repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-row.visible {
  opacity: 1;
  transform: translateX(0);
}

.category-row:last-child {
  border-bottom: none;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(97, 40, 120, 0.1);
  font-size: 1.5rem;
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.check-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.check-mark {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  opacity: 0;
  transform: scale(0);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 4px 12px rgba(97, 40, 120, 0.3);
}

.check-mark.visible {
  opacity: 1;
  transform: scale(1);
}

/* Button */
.continue-container {
  text-align: center;
  margin-top: 40px;
  position: relative;
  z-index: 10;
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 16px 35px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.3);
}

.continue-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(97, 40, 120, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-title {
    font-size: 2.5rem;
  }

  .table-header {
    grid-template-columns: 200px repeat(3, 1fr);
    gap: 16px;
  }

  .category-row {
    grid-template-columns: 200px repeat(3, 1fr);
    gap: 16px;
  }

  .table-wrapper {
    padding: 25px;
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

  .table-header {
    grid-template-columns: 150px repeat(3, 1fr);
    gap: 12px;
  }

  .category-row {
    grid-template-columns: 150px repeat(3, 1fr);
    gap: 12px;
  }

  .table-wrapper {
    padding: 20px;
  }

  .person-avatar {
    width: 60px;
    height: 60px;
  }

  .person-emoji {
    font-size: 2rem;
  }

  .category-icon {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }

  .category-name {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .transactional-profile-container {
    padding: 20px 10px 15px;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .table-header {
    grid-template-columns: 120px repeat(3, 1fr);
    gap: 8px;
  }

  .category-row {
    grid-template-columns: 120px repeat(3, 1fr);
    gap: 8px;
  }

  .table-wrapper {
    padding: 16px;
  }

  .person-name {
    font-size: 1rem;
  }

  .person-age {
    font-size: 0.8rem;
  }

  .category-name {
    font-size: 0.8rem;
  }

  .check-mark {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
}
</style>
