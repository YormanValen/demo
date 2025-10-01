<template>
  <div class="entity-dashboard">
    <div class="dashboard-content">
      <div class="content-header">
        <h1 class="page-title">Revocación de Consentimientos</h1>
      </div>
      <div class="pasarela-section">
        <div class="pasarela-selector">
          <label>Entidad:</label>
          <select v-model="selectedPasarela" class="pasarela-select">
            <option value="experian">Su entidad</option>
          </select>
        </div>
      </div>

      <div class="search-section">
        <div class="search-controls">
          <div class="search-field">
            <label>Buscar por:</label>
            <select v-model="searchType" class="search-select">
              <option value="id">ID</option>
              <option value="name">Nombre</option>
              <option value="email">Email</option>
            </select>
          </div>
          <div class="search-input">
            <label>Términos de búsqueda</label>
            <input type="text" v-model="searchQuery" placeholder="Ingrese términos..." class="search-field-input" />
          </div>
        </div>

        <div class="date-filters">
          <div class="date-field">
            <label>Fecha Inicial:</label>
            <input type="date" v-model="startDate" class="date-input" />
          </div>
          <div class="date-field">
            <label>Fecha Final:</label>
            <input type="date" v-model="endDate" class="date-input" />
          </div>
          <button class="search-button" @click="searchRevocations">
            Consultar
          </button>
        </div>
      </div>

      <div class="results-section">
        <div class="results-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Revocación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="revocation in revocations" :key="revocation.id">
                <td>{{ revocation.id }}</td>
                <td>{{ revocation.name }}</td>
                <td>{{ revocation.email }}</td>
                <td>{{ revocation.revocationDate }}</td>
                <td>
                  <button class="process-button" @click="processRevocation(revocation.id)">
                    Procesar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <div class="pagination-wrapper">
          <div class="pagination">
            <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
              ‹
            </button>

            <button v-for="page in getVisiblePages()" :key="page" class="pagination-btn"
              :class="{ active: page === currentPage }" @click="goToPage(page)">
              {{ page }}
            </button>

            <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
              ›
            </button>
          </div>

          <div class="pagination-info">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedPasarela = ref('experian')
const searchType = ref('id')
const searchQuery = ref('')
const startDate = ref('2025-09-01')
const endDate = ref('2025-09-26')

const revocations = ref([
  {
    id: 1001,
    name: 'Gabriela Ruiz',
    email: 'gabriela.ruiz@example.com',
    revocationDate: '19/04/2024 14:32:45'
  },
  {
    id: 1002,
    name: 'Carolina Morales',
    email: 'carolina.morales@example.com',
    revocationDate: '14/04/2024 09:15:23'
  },
  {
    id: 1003,
    name: 'Alejandro Silva',
    email: 'alejandro.silva@example.com',
    revocationDate: '14/04/2024 11:47:12'
  },
  {
    id: 1004,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    revocationDate: '14/04/2024 16:28:34'
  },
  {
    id: 1005,
    name: 'Andrea Gómez',
    email: 'andrea.gomez@example.com',
    revocationDate: '14/04/2024 08:52:07'
  },
  {
    id: 1006,
    name: 'Francisco Torres',
    email: 'francisco.torres@example.com',
    revocationDate: '14/04/2024 13:19:55'
  },
  {
    id: 1008,
    name: 'Laura Mendoza',
    email: 'laura.mendoza@example.com',
    revocationDate: '14/04/2024 10:43:18'
  },
  {
    id: 1009,
    name: 'Santiago Ramos',
    email: 'santiago.ramos@example.com',
    revocationDate: '14/04/2024 15:07:41'
  },
  {
    id: 1010,
    name: 'Patricia Vargas',
    email: 'patricia.vargas@example.com',
    revocationDate: '14/04/2024 17:22:15'
  }
])


const processRevocation = (id: number) => {
  console.log('Processing revocation for ID:', id)
}

const searchRevocations = () => {
  console.log('Searching revocations...', { searchType: searchType.value, searchQuery: searchQuery.value })
}

// Pagination variables
const currentPage = ref(1)
const totalPages = ref(4596)

// Pagination functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const getVisiblePages = () => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
}

</script>

<style scoped>
.entity-dashboard {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}

.content-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.dashboard-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.pasarela-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.pasarela-selector {
  display: flex;
  align-items: center;
  gap: 15px;
}

.pasarela-selector label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  min-width: 80px;
}

.pasarela-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 300px;
}

.search-section {
  margin-bottom: 30px;
}

.search-controls {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-bottom: 20px;
}

.search-field label,
.search-input label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.search-select,
.search-field-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.date-filters {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  align-items: end;
}

.date-field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.date-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.search-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  height: fit-content;
}

.search-button:hover {
  opacity: 0.9;
}

.results-section {
  margin-bottom: 20px;
}

.results-table {
  overflow-x: auto;
  width: 100%;
}

.results-table table {
  width: 100%;
  min-width: 1200px;
  border-collapse: collapse;
}

.results-table th,
.results-table td {
  padding: 12px 20px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.results-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.results-table td {
  font-size: 14px;
  color: #6b7280;
}

.process-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.process-button:hover {
  opacity: 0.9;
}

.selected-consents {
  margin-bottom: 30px;
}

.section-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.column-headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.consent-rows {
  border: 1px solid #e5e7eb;
  border-top: none;
}

.consent-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.consent-row:last-child {
  border-bottom: none;
}

.consent-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.activo {
  background: #dcfce7;
  color: #166534;
}

.action-button {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.action-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.action-buttons {
  margin-top: 30px;
}

.info-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  border-radius: 6px;
}

.info-icon {
  font-size: 16px;
}

.info-item span {
  font-size: 12px;
  color: white;
  flex: 1;
}

.download-btn {
  background: white;
  color: rgb(186, 45, 125);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.download-btn:hover {
  background: #f9fafb;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 20px 0 30px 0;
  padding: 0 20px;
}

.pagination-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.pagination-btn {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #9ca3af;
}

.pagination-btn:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border-color: rgb(97, 40, 120);
}

.pagination-info {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .pasarela-selector {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .pasarela-select {
    min-width: 100%;
  }

  .search-controls {
    grid-template-columns: 1fr;
  }

  .date-filters {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .section-header,
  .consent-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .column-headers,
  .consent-data {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .info-buttons {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>