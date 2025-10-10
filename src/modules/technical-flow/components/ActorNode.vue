<template>
  <div class="node" :class="[{ active }, extraClass]">
    <div class="icon-badge">
      <!-- Ciudadano -->
      <svg v-if="iconName === 'ciudadano'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7.5" r="4" fill="currentColor" />
        <path d="M4 20c0-4.2 4-6.5 8-6.5s8 2.3 8 6.5" fill="currentColor" />
      </svg>
      <!-- TRD / Bank -->
      <svg v-else-if="iconName === 'trd'" viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 3,8 21,8" fill="currentColor" />
        <rect x="5" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="10.75" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="16.5" y="9" width="2.5" height="9" fill="currentColor" />
        <rect x="3" y="19" width="18" height="2" fill="currentColor" />
      </svg>
      <!-- API Manager / Gateway -->
      <svg v-else-if="iconName === 'api'" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="6" rx="1.5" fill="currentColor" />
        <rect x="3" y="12" width="18" height="6" rx="1.5" fill="currentColor" />
        <circle cx="7" cy="7" r="1" fill="#0ea5e9" />
        <circle cx="7" cy="15" r="1" fill="#0ea5e9" />
      </svg>
      <!-- IdP / Shield -->
      <svg v-else-if="iconName === 'idp'" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" fill="currentColor" />
        <path d="M8 12l2.2 2.2L16 8.5" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <!-- Directorio / Folder -->
      <svg v-else-if="iconName === 'sfc'" viewBox="0 0 24 24" fill="none">
        <path d="M10 5l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6z" fill="currentColor" />
      </svg>
      <!-- Gestor de Consentimiento / Check -->
      <svg v-else-if="iconName === 'consent'" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="currentColor" />
        <path d="M8 12.5l2.5 2.5L16 9" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <!-- Sistemas Core / Grid -->
      <svg v-else-if="iconName === 'core'" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="8" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
      </svg>
      <!-- Capa de Integración / Database -->
      <svg v-else-if="iconName === 'integracion'" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor" />
        <path d="M4 6v8c0 1.7 3.6 3 8 3s8-1.3 8-3V6" fill="currentColor" />
      </svg>
      <!-- Experian / Bars -->
      <svg v-else-if="iconName === 'experian'" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="12" width="3" height="8" rx="1" fill="currentColor" />
        <rect x="10.5" y="9" width="3" height="11" rx="1" fill="currentColor" />
        <rect x="17" y="6" width="3" height="14" rx="1" fill="currentColor" />
      </svg>
      <!-- Fallback: emoji/text -->
      <span v-else class="node-emoji">{{ icon }}</span>
    </div>
    <div class="node-label">{{ label }}</div>
    <p v-if="showDescription && currentAction" class="node-desc">{{ currentAction }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  iconName?: 'ciudadano' | 'trd' | 'api' | 'idp' | 'sfc' | 'consent' | 'core' | 'integracion' | 'experian'
  active?: boolean
  showDescription?: boolean
  currentAction?: string
  extraClass?: string
}>()
</script>

<style scoped>
.icon-badge {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b0764, #4c1d95, #1d4ed8);
  display: grid;
  place-items: center;
  margin: 0 auto 0.75rem;
  box-shadow: 0 10px 30px rgba(29, 78, 216, 0.35);
}

.icon-badge svg {
  width: 36px;
  height: 36px;
  color: #ffffff; /* white icons */
}

.node-emoji {
  font-size: 2rem;
  color: #ffffff;
}

.node-desc {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  color: #6b7280;
}
</style>

