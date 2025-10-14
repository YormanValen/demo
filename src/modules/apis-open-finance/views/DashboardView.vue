<template>
  <div class="dashboard-container" :class="{ 'fade-in': showDashboard }">
    <!-- Desktop Sidebar -->
    <aside class="desktop-sidebar">
      <div class="sidebar-logo">
        <h2>API MANAGER OPEN FINANCE</h2>
      </div>

      <nav class="sidebar-navigation">
        <div class="nav-group">
          <div class="nav-item" @click="navigateToOverview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
              <rect x="9" y="9" width="6" height="6" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Resumen</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>

          <div class="nav-item active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
              <path
                d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"
                stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Plataforma</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>

          <div class="nav-subitems">
            <div class="nav-subitem active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" />
                <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
              </svg>
              <span>Claves API</span>
            </div>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" />
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Transacciones</span>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Webhooks</span>
          </div>

          <div class="nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke="currentColor" stroke-width="2" />
            </svg>
            <span>Configuración</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="6,9 12,15 18,9" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="main-area">

      <nav class="navigation">
        <div class="nav-item active">
          <span>Plataforma</span>
          <span class="nav-divider">•</span>
          <span>Claves API</span>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Action Bar -->
        <div class="action-bar">
          <button class="new-api-key-btn">
            Nueva clave API
          </button>
        </div>

        <!-- API Keys Table -->
        <div class="api-table-container">
          <div class="table-header">
            <div class="col">Clave API</div>
            <div class="col">Clave secreta</div>
            <div class="col">Fecha de creación</div>
            <div class="col">Fecha de expiración</div>
            <div class="col">Estado</div>
            <div class="col">Acciones</div>
          </div>

          <div v-for="apiKey in paginatedApiKeys" :key="apiKey.id" class="table-row">
            <div class="col api-key">
              <span class="key-masked">{{ apiKey.keyMasked }}</span>
              <button class="copy-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"
                    stroke-width="2" />
                </svg>
              </button>
            </div>
            <div class="col api-secret">
              <span class="secret-masked">{{ apiKey.secretMasked }}</span>
              <button class="copy-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
            <div class="col">{{ apiKey.createdAt }}</div>
            <div class="col">{{ apiKey.expirationDate }}</div>
            <div class="col">
              <span class="status" :class="apiKey.status.toLowerCase()">{{ translateStatus(apiKey.status) }}</span>
            </div>
            <div class="col">
              <button class="config-btn" @click="openConfigModal(apiKey)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
                  <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    stroke="currentColor" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container">
          <div class="pagination-info">
            Mostrando {{ startIndex + 1 }}-{{ endIndex }} de {{ totalApiKeys }} resultados
          </div>
          <div class="pagination-controls">
            <button class="pagination-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" stroke-width="2" />
              </svg>
              Anterior
            </button>

            <div class="pagination-numbers">
              <button v-for="page in visiblePages" :key="page" class="pagination-number"
                :class="{ active: page === currentPage }" @click="goToPage(page)">
                {{ page }}
              </button>
            </div>

            <button class="pagination-btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
              Siguiente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" stroke-width="2" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation back to menu -->
        <div class="transactional-insights-section">
          <div class="insights-container">
            <div class="insights-content">
              <button class="insights-button" @click="goBackToMenu">
                Volver al menú
              </button>
            </div>
          </div>
        </div>

        <!-- API Config Modal -->
        <ApiConfigModal :show="showConfigModal" :apiKey="selectedApiKey" @close="closeConfigModal" />
      </main>

      <!-- Mobile Sidebar Menu -->
      <div class="mobile-sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-header">
          <h3>ADMINISTRACIÓN DE APIS</h3>
          <button @click="toggleSidebar" class="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section">
            <div class="nav-item">Productos</div>
            <div class="nav-item active">Plataforma</div>
            <div class="nav-subitem">Configuración</div>
            <div class="nav-subitem active">Claves API</div>
            <div class="nav-item">Facturación</div>
            <div class="nav-item">Webhooks</div>
            <div class="nav-item">Configuración</div>
          </div>
        </nav>
      </div>

      <!-- Menu Toggle for Mobile -->
      <button class="menu-toggle" @click="toggleSidebar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ApiConfigModal from '../components/ApiConfigModal.vue'

const sidebarOpen = ref(false)
const showDashboard = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const router = useRouter()
const navigateToOverview = () => {
  router.push('/apis-open-finance/overview')
}

// Traducción de estados para mostrar en la tabla
const translateStatus = (status: string) => {
  const map: Record<string, string> = {
    Active: 'Activa',
    Expired: 'Expirada',
    Revoked: 'Revocada'
  }
  return map[status] ?? status
}

// API Keys data
const apiKeys = ref([
  { id: 1, keyMasked: '••••••••gye', secretMasked: '••••••••191', createdAt: '04-12-2023', expirationDate: '04-06-2024', status: 'Active' },
  { id: 2, keyMasked: '••••••••fkl', secretMasked: '••••••••287', createdAt: '15-11-2023', expirationDate: '15-05-2024', status: 'Active' },
  { id: 3, keyMasked: '••••••••mnh', secretMasked: '••••••••394', createdAt: '22-10-2023', expirationDate: '22-04-2024', status: 'Expired' },
  { id: 4, keyMasked: '••••••••qrt', secretMasked: '••••••••512', createdAt: '08-09-2023', expirationDate: '08-03-2024', status: 'Active' },
  { id: 5, keyMasked: '••••••••wxy', secretMasked: '••••••••689', createdAt: '03-08-2023', expirationDate: '03-02-2024', status: 'Revoked' },
  { id: 6, keyMasked: '••••••••abc', secretMasked: '••••••••723', createdAt: '17-07-2023', expirationDate: '17-01-2024', status: 'Active' },
  { id: 7, keyMasked: '••••••••def', secretMasked: '••••••••856', createdAt: '29-06-2023', expirationDate: '29-12-2023', status: 'Expired' },
  { id: 8, keyMasked: '••••••••hij', secretMasked: '••••••••947', createdAt: '12-05-2023', expirationDate: '12-11-2023', status: 'Active' },
  { id: 9, keyMasked: '••••••••klm', secretMasked: '••••••••183', createdAt: '25-04-2023', expirationDate: '25-10-2023', status: 'Active' },
  { id: 10, keyMasked: '••••••••nop', secretMasked: '••••••••274', createdAt: '14-03-2023', expirationDate: '14-09-2023', status: 'Revoked' },
  { id: 11, keyMasked: '••••••••rst', secretMasked: '••••••••365', createdAt: '02-02-2023', expirationDate: '02-08-2023', status: 'Active' },
  { id: 12, keyMasked: '••••••••uvw', secretMasked: '••••••••456', createdAt: '18-01-2023', expirationDate: '18-07-2023', status: 'Expired' },
  { id: 13, keyMasked: '••••••••xyz', secretMasked: '••••••••587', createdAt: '09-12-2022', expirationDate: '09-06-2023', status: 'Active' },
  { id: 14, keyMasked: '••••••••aaa', secretMasked: '••••••••698', createdAt: '21-11-2022', expirationDate: '21-05-2023', status: 'Active' },
  { id: 15, keyMasked: '••••••••bbb', secretMasked: '••••••••789', createdAt: '07-10-2022', expirationDate: '07-04-2023', status: 'Revoked' },
  { id: 16, keyMasked: '••••••••ccc', secretMasked: '••••••••891', createdAt: '19-09-2022', expirationDate: '19-03-2023', status: 'Active' },
  { id: 17, keyMasked: '••••••••ddd', secretMasked: '••••••••123', createdAt: '03-08-2022', expirationDate: '03-02-2023', status: 'Expired' },
  { id: 18, keyMasked: '••••••••eee', secretMasked: '••••••••234', createdAt: '16-07-2022', expirationDate: '16-01-2023', status: 'Active' },
  { id: 19, keyMasked: '••••••••fff', secretMasked: '••••••••345', createdAt: '28-06-2022', expirationDate: '28-12-2022', status: 'Active' },
  { id: 20, keyMasked: '••••••••ggg', secretMasked: '••••••••456', createdAt: '11-05-2022', expirationDate: '11-11-2022', status: 'Expired' }
])

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(20)
const totalPages = ref(18) // Ficticio
const totalApiKeys = ref(360) // 20 * 18 = 360 total ficticio

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalApiKeys.value))

const paginatedApiKeys = computed(() => {
  // Mostrar siempre las 20 API keys que tenemos, independientemente de la página
  return apiKeys.value
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Modal state
const showConfigModal = ref(false)
const selectedApiKey = ref(null)

const openConfigModal = (apiKey: any) => {
  selectedApiKey.value = apiKey
  showConfigModal.value = true
}

const closeConfigModal = () => {
  showConfigModal.value = false
  selectedApiKey.value = null
}

const goBackToMenu = () => {
  router.push('/entity/intro')
}

// Fade in dashboard on mount
onMounted(() => {
  // Longer delay to ensure loading screen has fully faded out
  setTimeout(() => {
    showDashboard.value = true
  }, 500)
})

</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: row;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.dashboard-container.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* Desktop Sidebar */
.desktop-sidebar {
  width: 250px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 50;
}

.sidebar-logo {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-logo h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.sidebar-navigation {
  flex: 1;
  padding: 20px 0;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.nav-item:hover {
  background: #f8fafc;
  color: #374151;
}

.nav-item.active {
  background: #eff6ff;
  color: #3b82f6;
  border-right: 3px solid #3b82f6;
}

.nav-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.chevron {
  margin-left: auto;
}

.nav-subitems {
  padding-left: 20px;
  border-left: 2px solid #f3f4f6;
  margin-left: 20px;
}

.nav-subitem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.nav-subitem:hover {
  color: #374151;
}

.nav-subitem.active {
  color: #3b82f6;
  font-weight: 500;
}

.nav-subitem svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.sidebar-footer {
  border-top: 1px solid #e5e7eb;
  padding: 20px;
}

.report-bug,
.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 0.9rem;
}

.report-bug:hover,
.logout:hover {
  color: #374151;
}

.report-bug {
  color: #ef4444;
}

.report-bug:hover {
  color: #dc2626;
}

.main-area {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
}

/* Header */
.dashboard-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h1 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  font-size: 0.9rem;
  color: #6b7280;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Navigation */
.navigation {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 20px;
}

.nav-item {
  font-size: 0.9rem;
  color: #3b82f6;
  font-weight: 500;
}

.nav-divider {
  margin: 0 8px;
  color: #9ca3af;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Action Bar */
.action-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.new-api-key-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.new-api-key-btn:hover {
  background: #2563eb;
}

/* API Table */
.api-table-container {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 80px;
  gap: 16px;
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.8rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 80px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.table-row:last-child {
  border-bottom: none;
}

.col {
  font-size: 0.9rem;
  color: #374151;
}

.api-key,
.api-secret {
  display: flex;
  align-items: center;
  gap: 8px;
}

.key-masked,
.secret-masked {
  font-family: monospace;
  font-size: 0.8rem;
  color: #6b7280;
}

.copy-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.copy-btn:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.active {
  background: #d1fae5;
  color: #065f46;
}

.status.expired {
  background: #fee2e2;
  color: #991b1b;
}

.status.revoked {
  background: #fef3c7;
  color: #92400e;
}

.config-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.config-btn:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 20px 0;
}

.pagination-info {
  font-size: 0.9rem;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #d1d5db;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f9fafb;
  color: #9ca3af;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
  margin: 0 16px;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  background: #f8fafc;
  border-color: #d1d5db;
}

.pagination-number.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.pagination-number.active:hover {
  background: #2563eb;
  border-color: #2563eb;
}

/* Transactional Insights Section */
.transactional-insights-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
}

.insights-container {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.insights-content {
  max-width: 600px;
  margin: 0 auto;
}

.insights-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(97, 40, 120, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.insights-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.3);
}

/* Mobile Sidebar */
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 200;
  transition: left 0.3s ease;
  border-right: 1px solid #e5e7eb;
}

.mobile-sidebar.open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
}

.sidebar-nav {
  padding: 20px;
}

.nav-section .nav-item {
  padding: 12px 0;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
}

.nav-section .nav-item.active {
  color: #3b82f6;
  font-weight: 600;
}

.nav-subitem {
  padding: 8px 0 8px 16px;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
}

.nav-subitem.active {
  color: #3b82f6;
  font-weight: 500;
}

/* Menu Toggle */
.menu-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  z-index: 150;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .desktop-sidebar {
    display: none;
  }

  .main-area {
    margin-left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .header-content {
    padding-left: 60px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr 80px;
    gap: 8px;
    padding: 12px 16px;
  }

  .table-header .col:nth-child(3),
  .table-header .col:nth-child(4),
  .table-row .col:nth-child(3),
  .table-row .col:nth-child(4) {
    display: none;
  }

  .main-content {
    padding: 16px;
  }

  .action-bar {
    margin-bottom: 16px;
  }

  .new-api-key-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  .pagination-container {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .pagination-controls {
    justify-content: center;
  }

  .pagination-btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }

  .pagination-numbers {
    margin: 0 8px;
  }

  .pagination-number {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {

  .table-header,
  .table-row {
    grid-template-columns: 1fr 80px;
    gap: 8px;
  }

  .table-header .col:nth-child(2),
  .table-header .col:nth-child(5),
  .table-row .col:nth-child(2),
  .table-row .col:nth-child(5) {
    display: none;
  }

  .api-key {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .pagination-btn span {
    display: none;
  }

  .pagination-numbers {
    margin: 0 4px;
  }

  .pagination-number {
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
  }
}

/* Media Queries for horizontal screens */
@media (orientation: landscape) and (min-width: 1400px) {
  .dashboard-container {
    max-width: 110vw;
  }

  .desktop-sidebar {
    width: 300px;
  }


  .nav-item {
    padding: 14px 24px;
  }

  .nav-subitem {
    padding: 10px 24px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.2fr 1.2fr 1fr 1fr 0.8fr 80px;
    gap: 20px;
    padding: 18px 24px;
  }

  .action-bar {
    margin-bottom: 32px;
  }

  .new-api-key-btn {
    padding: 12px 24px;
  }

  .pagination-container {
    padding: 24px 0;
  }

  .insights-container {
    padding: 40px 30px;
  }

  .insights-button {
    padding: 16px 32px;
  }
}

/* Media Queries for 1920x1080 and larger horizontal screens */
@media (orientation: landscape) and (min-width: 1920px) {
  .desktop-sidebar {
    width: 350px;
  }

  .main-area {
    margin-left: 550px;
  }

  .main-content {
    padding: 40px 60px;
    max-width: 1400px;
  }

  .nav-item {
    padding: 16px 28px;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1.3fr 1.3fr 1fr 1fr 0.8fr 90px;
    gap: 24px;
    padding: 20px 28px;
  }

  .action-bar {
    margin-bottom: 36px;
  }

  .new-api-key-btn {
    padding: 14px 28px;
  }

  .pagination-container {
    padding: 28px 0;
  }

  .pagination-btn {
    padding: 10px 18px;
  }

  .pagination-number {
    width: 44px;
    height: 44px;
  }

  .insights-container {
    padding: 50px 40px;
  }

  .insights-button {
    padding: 18px 36px;
  }
}
</style>
