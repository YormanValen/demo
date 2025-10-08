<template>
  <div class="actor-node base-actor" :class="[`actor-${type}`, { active, highlight, pulse }]">
    <div class="actor-icon">
      <!-- Iconos blancos por tipo de actor -->
      <!-- Ciudadano -->
      <svg v-if="type === 'ciudadano'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7.5" r="4" fill="currentColor" />
        <path d="M4 20c0-4.2 4-6.5 8-6.5s8 2.3 8 6.5" fill="currentColor" />
      </svg>
      <!-- Tercero Receptor (Banco) -->
      <svg v-else-if="type === 'tercero-receptor'" viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 3,8 21,8" fill="currentColor" />
        <rect x="5" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="10.75" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="16.5" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="3" y="19" width="18" height="2" fill="currentColor" />
      </svg>
      <!-- API Manager / Gateway -->
      <svg v-else-if="type === 'api-manager'" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="6" rx="1.5" fill="currentColor" />
        <rect x="3" y="12" width="18" height="6" rx="1.5" fill="currentColor" />
        <circle cx="7" cy="7" r="1.1" fill="#00e5ff" />
        <circle cx="7" cy="15" r="1.1" fill="#00e5ff" />
      </svg>
      <!-- Proveedor de Datos (Nube + base) -->
      <svg v-else-if="type === 'proveedor-datos'" viewBox="0 0 24 24" fill="none">
        <path d="M7 16a4 4 0 010-8 5 5 0 019.7-1.6A4.5 4.5 0 1120 16H7z" fill="currentColor" />
        <rect x="5" y="17" width="14" height="2" rx="1" fill="#00e5ff" />
      </svg>
      <!-- Servidor IdP (Escudo) -->
      <svg v-else-if="type === 'servidor-idp'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" fill="currentColor" />
        <path d="M8 12l2.2 2.2L16 8.5" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <!-- Directorio de Participantes (Carpeta) -->
      <svg v-else-if="type === 'directorio-participantes'" viewBox="0 0 24 24" fill="none">
        <path d="M10 5l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6z" fill="currentColor" />
      </svg>
      <!-- Gestor de Consentimiento (Check) -->
      <svg v-else-if="type === 'gestor-consentimiento'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path d="M8 12.5l2.5 2.5L16 9" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <!-- Sistemas Core (Grid) -->
      <svg v-else-if="type === 'sistemas-core'" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="8" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
      </svg>
      <!-- Capa de Integración (Base de datos) -->
      <svg v-else-if="type === 'capa-integracion'" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor" />
        <path d="M4 6v8c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="currentColor" />
      </svg>
      <!-- Experian (Barras) -->
      <svg v-else-if="type === 'experian'" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="12" width="3" height="8" rx="1" fill="currentColor" />
        <rect x="10.5" y="9" width="3" height="11" rx="1" fill="currentColor" />
        <rect x="17" y="6" width="3" height="14" rx="1" fill="currentColor" />
      </svg>
      <!-- Fallback emoji si llega -->
      <span v-else>{{ icon }}</span>
    </div>
    <div class="actor-label">
      <slot>{{ label }}</slot>
    </div>
    <div class="actor-description" v-if="showDescription && currentAction">
      {{ currentAction }}
    </div>
    <div class="actor-extras" v-if="$slots.extras">
      <slot name="extras"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: string
  icon?: string
  label?: string
  active?: boolean
  highlight?: boolean
  pulse?: boolean
  showDescription?: boolean
  currentAction?: string
}

withDefaults(defineProps<Props>(), {
  active: false,
  highlight: false,
  pulse: false,
  showDescription: false,
  icon: '🔵',
  label: 'Actor'
})
</script>

<style scoped>
.actor-node {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 35px;
  padding: 3rem 2.5rem;
  text-align: center;
  backdrop-filter: blur(15px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  width: 250px;
  transform: scale(0.8) translateY(30px);
  opacity: 0;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.actor-node.active {
  transform: scale(1) translateY(0);
  opacity: 1;
  animation: nodeEntrance 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), nodeGlow 3s ease-in-out infinite 0.8s;
}

.actor-node.highlight {
  transform: scale(1.05) translateY(-5px);
  opacity: 1;
}

.actor-node.pulse {
  animation: actorPulse 2s ease-in-out infinite;
}

@keyframes nodeEntrance {
  0% {
    transform: scale(0.8) translateY(30px) rotateY(-15deg);
    opacity: 0;
    filter: blur(4px);
  }

  60% {
    transform: scale(1.05) translateY(-5px) rotateY(0deg);
    opacity: 0.9;
    filter: blur(0px);
  }

  100% {
    transform: scale(1) translateY(0) rotateY(0deg);
    opacity: 1;
    filter: blur(0px);
  }
}

@keyframes nodeGlow {

  0%,
  100% {
    box-shadow: 0 0 25px var(--glow-color, rgba(99, 102, 241, 0.4));
  }

  50% {
    box-shadow: 0 0 50px var(--glow-color, rgba(99, 102, 241, 0.8));
  }
}

@keyframes actorPulse {

  0%,
  100% {
    transform: scale(1) translateY(0);
  }

  50% {
    transform: scale(1.03) translateY(-3px);
  }
}

.actor-icon {
  font-size: 0; /* evita espacio extra si renderiza span */
  margin-bottom: 1.5rem;
  display: grid;
  place-items: center;
  transition: filter 0.3s ease;
  filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.7));
}

.actor-icon svg {
  width: 44px;
  height: 44px;
  color: #ffffff; /* iconos blancos */
}

.actor-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

.actor-description {
  font-size: 1.1rem;
  color: #f1f5f9;
  line-height: 1.5;
  margin-top: 1rem;
  opacity: 0.95;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.actor-extras {
  margin-top: 0.8rem;
}

/* Color variants for actors */
.actor-node:not(.active) {
  --glow-color: rgba(255, 255, 255, 0.3);
}

.actor-node.active {
  --glow-color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.6);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .actor-node {
    width: 280px;
    padding: 2.5rem 2rem;
    border-radius: 30px;
  }

  .actor-icon {
    font-size: 3.5rem;
  }

  .actor-label {
    font-size: 1.2rem;
  }

  .actor-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .actor-node {
    width: 260px;
    padding: 2rem 1.5rem;
    border-radius: 25px;
  }

  .actor-icon {
    font-size: 3rem;
  }

  .actor-label {
    font-size: 1.1rem;
  }

  .actor-description {
    font-size: 0.9rem;
  }
}
</style>
