<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Controls for the staged reveal animation
const isPlaying = ref(false)
const revealed = ref(0) // how many cards are visible
const showOrientationModal = ref(true)

const startAnimation = () => {
  if (isPlaying.value) return
  isPlaying.value = true
  revealed.value = 0

  const totalItems = columns.length
  let i = 0
  const interval = setInterval(() => {
    i++
    revealed.value = i
    if (i >= totalItems) clearInterval(interval)
  }, 350)
}


const handleAgree = () => {
  showOrientationModal.value = false
  // small delay for smoothness
  setTimeout(startAnimation, 200)
}


// Simplified content adapted from the provided diagram
const columns = [
  {
    color: '#2f66c5',
    icon: 'mdi-account-tie',
    title: 'Consultoría y Acompañamiento',
    items: [
      'Guía estratégica y técnica para implementación.',
      'Acelera la entrada al mercado con riesgos mínimos.'
    ]
  },
  {
    color: '#1aa8a8',
    icon: 'mdi-school-outline',
    title: 'Entrenamiento Especializado',
    items: [
      'Desarrolla conocimiento y habilidades para el ecosistema.',
      'Asegura un equipo preparado para liderar.'
    ]
  },
  {
    color: '#18c55f',
    icon: 'mdi-shield-check',
    title: 'Plataforma de Consentimientos',
    items: [
      'Gestión transparente y auditable del consentimiento.',
      'Minimiza el riesgo legal y asegura cumplimiento.'
    ]
  },
  {
    color: '#12a0ff',
    icon: 'mdi-api',
    title: 'Plataforma de APIs Open Finance',
    items: [
      'APIs listas que cumplen estándares.',
      'Simplifica la complejidad técnica y la conexión.'
    ]
  },
  {
    color: '#ff7a1b',
    icon: 'mdi-chart-line',
    title: 'Variables Analíticas',
    items: [
      'Transformación de datos transaccionales en insights.',
      'Reduce el riesgo y potencia decisiones.'
    ]
  },
  {
    color: '#ff4d3c',
    icon: 'mdi-puzzle-outline',
    title: 'Integración con Productos Experian',
    items: [
      'Conexión nativa con motores de decisión.',
      'Maximiza el retorno de tu ecosistema.'
    ]
  },
  {
    color: '#9a57d3',
    icon: 'mdi-key-chain-variant',
    title: 'Bre-B',
    items: [
      'Habilitación en infraestructura de pagos inmediatos.',
      'Participa activamente en la nueva economía.'
    ]
  },
  {
    color: '#637bff',
    icon: 'mdi-database-check',
    title: 'Tercero Receptor de Datos (TRD)',
    items: [
      'Acompañamiento en certificación y marco de seguridad.',
      'Expande el alcance para consumir datos de terceros.'
    ]
  }
]

onMounted(() => {
  // Always show orientation modal before any animation
  showOrientationModal.value = true
})
</script>

<template>
  <section class="ecosystem">
    <header class="ecosystem__header">
      <div class="banner">
        <div class="banner__left">
          <div class="headline">
            Vive las <span class="highlight">Finanzas Abiertas</span>
            <span class="brand"> con DataCrédito Experian</span>
          </div>
        </div>
        <div class="banner__right">
          Nuestra experiencia te ayudará a moverte con seguridad en esta nueva era financiera
          para que des los pasos correctos.
        </div>
      </div>
    </header>

    <!-- Orientation advisory modal -->
    <div v-if="showOrientationModal" class="modal-overlay">
      <div class="modal">
        <div class="image-wrapper" aria-hidden="true">
          <img class="orientation-img" src="/src/assets/orientation-horizontal.png"
            alt="Recomendación de orientación horizontal" />
        </div>
        <p class="modal-text">
          Este diagrama esta diseñado para pantallas con orientación horizontal, se recomienda girar su pantalla antes
          de
          continuar.
        </p>
        <button class="btn btn-primary" @click="handleAgree">De acuerdo</button>
      </div>
    </div>

    <!-- Top row of feature columns -->
    <div class="grid">
      <div v-for="(col, idx) in columns" :key="idx" class="grid__item" :class="{ 'is-visible': revealed > idx }">
        <div class="icon" :style="{ borderColor: col.color }">
          <v-icon :color="col.color" size="48">{{ col.icon }}</v-icon>
        </div>
        <!-- Title container (colored, white text) -->
        <div class="title-card" :style="{ backgroundColor: col.color }">
          <h3 class="title-card__title">{{ col.title }}</h3>
        </div>
        <!-- Description container (separate card below) -->
        <div class="desc-card">
          <ul class="desc-card__list">
            <li v-for="(it, i) in col.items" :key="i">{{ it }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom ecosystem track -->
    <div class="track">
      <div class="pill pill--enable">Habilitación</div>
      <div class="pill pill--core">Tecnología Core</div>
      <div class="pill pill--growth">Monetización y crecimiento</div>
      <div class="pill pill--ecosystem">Ecosistema</div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem {
  /* Ensure the view fills the entire available width inside AppLayout's flex container */
  width: 100%;
  flex: 1 1 auto;
  align-self: stretch;

  min-height: 100vh;
  background: #f5f7fb;
  padding: 24px 24px 60px;
  box-sizing: border-box;
}

.ecosystem__header {
  width: 100%;
  max-width: none;
  margin: 0 0 16px 0;
}

.banner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 24px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: #fff;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.banner__left {
  display: flex;
  align-items: center;
}

.headline {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
}

.headline .highlight {
  color: #7dd3fc;
}

.headline .brand {
  color: #ffffff;
  font-weight: 700;
}

.banner__right {
  color: #ffffff;
  font-size: 14px;
  line-height: 1.4;
}

.toolbar {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

/* Orientation advisory modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  display: grid;
  place-items: center;
  z-index: 10000;
}

.modal {
  width: min(520px, 92vw);
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 20px 16px;
  box-shadow: var(--shadow-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.image-wrapper {
  display: grid;
  place-items: center;
  margin-bottom: 10px;
}

.orientation-img {
  width: 140px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .25));
}

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-weight: 600;
}

.btn:hover {
  filter: brightness(0.98);
}

.btn-primary {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: #fff;
  border: none;
}

.ecosystem__intro {
  margin: 12px 2px 0;
  color: #475569;
}

.grid {
  width: 100%;
  max-width: none;
  margin: 18px 0 30px 0;
  display: grid;
  /* Force the eight items to stay on a single row on desktop */
  grid-template-columns: repeat(8, minmax(180px, 1fr));
  gap: 18px;
}

.grid__item {
  opacity: 0;
  transform: translateY(10px);
  transition: all .4s ease;
  display: flex;
  flex-direction: column;
}

.grid__item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.icon {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #fff;
  border: 6px solid transparent;
  /* Separate the circle from the title container */
  margin: 0 auto 14px;
  color: #64748b;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(0, 0, 0, .08);
}

.title-card {
  color: #ffffff;
  border-radius: 12px 12px 0 0;
  padding: 12px 14px;
  height: 80px;
  display: grid;
  place-items: center;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.title-card__title {
  font-size: 18px;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
}

.desc-card {
  background: #e8eefc;
  border-radius: 0 0 12px 12px;
  padding: 12px 14px 14px;
  box-shadow: var(--shadow-sm);
  /* Equal height across all cards on desktop */
  height: 200px;
  overflow: auto;
}

.desc-card__list {
  margin: 0;
  padding-left: 16px;
  color: #1f2937;
}

.desc-card__list li {
  margin: 4px 0;
  font-size: 16px;
}

.track {
  width: 100%;
  max-width: none;
  margin: 26px 0 0 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  align-items: center;
}

.pill {
  padding: 0 18px;
  height: 56px;
  border-radius: 18px;
  color: #fff;
  text-align: center;
  font-weight: 700;
  box-shadow: var(--shadow-md);
  display: grid;
  place-items: center;
}

.pill--enable {
  background: #2364d2;
}

.pill--core {
  background: #1db98b;
}

.pill--growth {
  background: #e35422;
}

.pill--ecosystem {
  background: #6d34a3;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  /* Let descriptions grow more comfortably on smaller screens */
  .desc-card {
    height: 240px;
  }

  .track {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .banner {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .track {
    grid-template-columns: 1fr;
  }

  /* Avoid fixed height on very small screens */
  .desc-card {
    height: auto;
  }

  .modal {
    width: 92vw;
  }
}
</style>
.modal-text { color: #374151; font-size: 14px; margin: 0; }

/* Bigger primary button inside modal */
.modal .btn-primary {
padding: 14px 22px;
font-size: 15px;
border-radius: 12px;
width: 100%;
max-width: 280px;
}
