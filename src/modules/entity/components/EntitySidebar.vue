<template>
  <div class="entity-sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13H21V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V13Z" fill="currentColor" />
            <path d="M3 7H21V11H3V7Z" fill="currentColor" />
            <path d="M12 2L21 7H3L12 2Z" fill="currentColor" />
          </svg>
        </div>
        <span class="brand-text">Experiencia Entidad</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-item"
        :class="{ active: $route.path === item.path }">
        <div class="nav-icon">
          <component :is="item.icon" />
        </div>
        <span class="nav-text">{{ item.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const menuItems = [
  {
    path: '/entity/dashboard',
    label: 'Visualizar consentimientos',
    icon: 'ViewIcon'
  },
  {
    path: '/entity/consent-revocation',
    label: 'Revocación de consentimientos',
    icon: 'RevokeIcon'
  },
  {
    path: '/entity/analytics',
    label: 'Dashboard de control',
    icon: 'AnalyticsIcon'
  }
]
</script>

<style scoped>
.entity-sidebar {
  width: 280px;
  height: calc(100vh - 60px);
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.brand-text {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}


.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  width: 100%;
  box-sizing: border-box;
}

.nav-item:hover {
  background: #f9fafb;
  color: #374151;
}

.nav-item.active {
  background: linear-gradient(135deg, #faf7fb 0%, #f5f0f6 100%);
  color: rgb(97, 40, 120);
  border-left-color: rgb(97, 40, 120);
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .entity-sidebar {
    width: 260px;
  }
}

/* Hide sidebar in tablet frame */
.tablet .entity-sidebar,
.tablet__content .entity-sidebar {
  display: none !important;
}

@media (max-width: 1024px) {
  .entity-sidebar {
    display: none;
  }
}
</style>