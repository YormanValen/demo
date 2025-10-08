<template>
  <div class="entity-dashboard">
    <div class="content-header">
      <h1 class="page-title">Gestión de Consentimientos</h1>
    </div>
    
    <div class="dashboard-content">
        <div class="search-section">
          <div class="search-controls">
            <div class="search-field">
              <label>Buscar solicitud por:</label>
              <select v-model="searchType" class="search-select">
                <option value="identification">Número de identificación</option>
                <option value="transaction">Número de transacción</option>
              </select>
            </div>
            <div class="search-input">
              <label>Número / Código / Transacción</label>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Ingrese el número..."
                class="search-field-input"
              />
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
            <button class="search-button" @click="searchConsents">
              Consultar
            </button>
          </div>
        </div>

        <div class="results-section">
          <div class="results-table">
            <table>
              <thead>
                <tr>
                  <th>No. Transacción</th>
                  <th>Número Identificación</th>
                  <th>Nombres</th>
                  <th>Fecha de creación</th>
                  <th>Fecha de actualización</th>
                  <th>Estado consentimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="consent in consents" :key="consent.id">
                  <td>
                    <input type="checkbox" :checked="consent.selected" @change="toggleConsentSelection(consent.id)" />
                    {{ consent.transactionNumber }}
                  </td>
                  <td>{{ consent.identificationNumber }}</td>
                  <td>{{ consent.fullName }}</td>
                  <td>{{ consent.createdAt }}</td>
                  <td>{{ consent.updatedAt }}</td>
                  <td>
                    <span :class="['status-badge', consent.status.toLowerCase()]">
                      {{ consent.status }}
                    </span>
                  </td>
                  <td>
                    <button class="action-button" @click="viewConsentDetails(consent.id)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor"/>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="action-buttons">
          <div class="info-buttons">
            <div class="info-item">
              <div class="info-icon">ℹ️</div>
              <span>¿Qué es un formulario desmaterializado?</span>
              <button class="download-btn">📄 Formulario desmaterializado</button>
            </div>
            
            <div class="info-item">
              <div class="info-icon">ℹ️</div>
              <span>¿Qué es datos firmados?</span>
              <button class="download-btn">📋 Datos Firmados</button>
            </div>
            
            <div class="info-item">
              <div class="info-icon">ℹ️</div>
              <span>¿Qué es firma electrónica?</span>
              <button class="download-btn">✍️ Firma electrónica</button>
            </div>
            
            <div class="info-item">
              <div class="info-icon">ℹ️</div>
              <span>¿Qué es Log Transacción?</span>
              <button class="download-btn">📊 Log Transacción</button>
            </div>
            
            <div class="info-item">
              <div class="info-icon">ℹ️</div>
              <span>¿Qué es Descargar Documentos?</span>
              <button class="download-btn">📥 Descargar Documentos</button>
            </div>
          </div>
        </div>
      </div>

      
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const searchType = ref('identification')
const searchQuery = ref('')
const startDate = ref('2025-09-01')
const endDate = ref('2025-09-26')

const consents = ref([
  {
    id: 1,
    transactionNumber: '50787',
    identificationNumber: '1010230634',
    fullName: 'Jordi Acevedo',
    createdAt: '24/05/2025 16:32',
    updatedAt: '24/05/2025 16:37',
    status: 'Activo',
    selected: true
  },
  {
    id: 2,
    transactionNumber: '52624',
    identificationNumber: '1010230637',
    fullName: 'Andres Acevedo',
    createdAt: '15/11/2024 14:16',
    updatedAt: '15/11/2024 14:19',
    status: 'Activo',
    selected: false
  }
])

const searchConsents = () => {
  console.log('Searching consents...', { searchType: searchType.value, searchQuery: searchQuery.value })
}

const toggleConsentSelection = (id: number) => {
  const consent = consents.value.find(c => c.id === id)
  if (consent) {
    consent.selected = !consent.selected
  }
}

const viewConsentDetails = (id: number) => {
  console.log('Viewing consent details for ID:', id)
}

onMounted(() => {
  startDate.value = '2025-09-01'
  endDate.value = '2025-09-26'
})
</script>

<style scoped>
.entity-dashboard {
  width: 100%;
  max-width: 1200px;
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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
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
  margin-bottom: 30px;
}

.results-table {
  overflow-x: auto;
}

.results-table table {
  width: 100%;
  border-collapse: collapse;
}

.results-table th,
.results-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
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

@media (max-width: 768px) {
  .search-controls {
    grid-template-columns: 1fr;
  }
  
  .date-filters {
    grid-template-columns: 1fr;
    gap: 15px;
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
