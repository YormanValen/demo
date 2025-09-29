<template>
  <div class="entity-dashboard">
    <div class="content-header">
      <h1 class="page-title">Consent as a Service</h1>
    </div>

    <div class="dashboard-content">
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
            <label>Buscar solicitud por:</label>
            <select v-model="searchType" class="search-select">
              <option value="identification">Número de identificación</option>
              <option value="transaction">Número de transacción</option>
            </select>
          </div>
          <div class="search-input">
            <label>Número / Código / Transacción</label>
            <input type="text" v-model="searchQuery" placeholder="Ingrese el número..." class="search-field-input" />
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
                  <button class="action-button" @click="viewConsentDetails">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        stroke="currentColor" stroke-width="2" />
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
            <button class="download-btn">📄 Formulario desmaterializado</button>
          </div>

          <div class="info-item">
            <button class="download-btn">📋 Datos Firmados</button>
          </div>

          <div class="info-item">
            <button class="download-btn">✍️ Firma electrónica</button>
          </div>

          <div class="info-item">
            <button class="download-btn">📊 Log Transacción</button>
          </div>

          <div class="info-item">
            <button class="download-btn">📥 Descargar Documentos</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Electronic Signature Modal -->
    <div v-if="showSignatureModal" class="modal-overlay" @click="closeSignatureModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>ReporteFirma_Electronica</h3>
          <button class="modal-close" @click="closeSignatureModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="signature-info">
            <div class="info-line">
              <span class="label">md5:</span>
              <span class="value">"834d401b1312a37c15cb8e40eff32eeb"</span>
            </div>
            <div class="info-line">
              <span class="label">sha1:</span>
              <span class="value">"5b296debff93efb2a2583c09ce680c932c2693b"</span>
            </div>
            <div class="info-line">
              <span class="label">sha256:</span>
              <span class="value">"cd8da7bbe8b2069172a4a02ee5e3f5a328f6b63df29500362be0c90b21674011"</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-button" @click="closeSignatureModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'
// Use worker via URL so Vite resolves it correctly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker as unknown as string

const selectedPasarela = ref('experian')
const searchType = ref('identification')
const searchQuery = ref('')
const startDate = ref('2025-09-01')
const endDate = ref('2025-09-26')
const showSignatureModal = ref(false)


// Canvas refs per page


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

const viewConsentDetails = () => {
  showSignatureModal.value = true
}

const closeSignatureModal = () => {
  showSignatureModal.value = false
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
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.info-item {
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  border-radius: 6px;
  padding: 2px;
}

.download-btn {
  background: transparent;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
}

.download-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
}

.modal-body {
  padding: 20px;
}

.signature-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-line {
  display: flex;
  gap: 8px;
}

.label {
  font-weight: 500;
  color: #374151;
  min-width: 60px;
}

.value {
  color: #6b7280;
  font-family: monospace;
  word-break: break-all;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.modal-button {
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

/* PDF Modal Styles */
.pdf-modal {
  max-width: 90vw;
  max-height: 90vh;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
}

.pdf-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border-radius: 8px 8px 0 0;
}

.pdf-modal .modal-header h3 {
  color: white;
  margin: 0;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s;
}

.zoom-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.zoom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zoom-label {
  min-width: 44px;
  text-align: center;
  color: white;
  font-size: 14px;
}

.pdf-modal .modal-close {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.pdf-modal .modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.pdf-container {
  flex: 1;
  overflow: auto;
  background: #f2f3f5;
  padding: 16px;
}

.loading {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #555;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid rgb(186, 45, 125);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.pages {
  max-width: 100%;
  margin: 0 auto;
}

.page-wrapper {
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto 16px;
  padding: 12px 12px 28px;
}

.pdf-canvas {
  width: 100%;
  height: auto;
  display: block;
}

.page-index {
  text-align: center;
  font-size: 12px;
  color: #777;
  margin-top: 8px;
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

  .info-buttons {
    justify-content: center;
    gap: 8px;
  }

  .download-btn {
    font-size: 12px;
    padding: 10px 14px;
  }
}
</style>