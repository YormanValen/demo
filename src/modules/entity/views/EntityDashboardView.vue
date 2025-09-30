<template>
  <div class="main-container" ref="entityRootRef">
    <!-- Full Screen Animation -->
    <div class="full-screen-animation" :class="{ 'show': showMessage }">
      <!-- Animated background - always visible -->
      <div class="animated-background">
        <!-- Financial symbols -->
        <div class="floating-element dollar-sign">$</div>
        <div class="floating-element peso-sign">$</div>
        <div class="floating-element euro-sign">€</div>

        <!-- Data charts and graphs -->
        <div class="floating-element chart-bar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="16" width="4" height="5" fill="currentColor" />
            <rect x="8" y="12" width="4" height="9" fill="currentColor" />
            <rect x="13" y="8" width="4" height="13" fill="currentColor" />
            <rect x="18" y="4" width="4" height="17" fill="currentColor" />
          </svg>
        </div>

        <div class="floating-element trend-up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" />
            <path d="M14 7H21V14" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element pie-chart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
            <path d="M12 4V12L18 18" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- Transaction symbols -->
        <div class="floating-element card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M3 10H21" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element transfer-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7" stroke="currentColor" stroke-width="2" />
            <path d="M17 17H17.01" stroke="currentColor" stroke-width="2" />
            <path d="M7 7H7.01" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- Data points and analytics -->
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>

        <!-- Numbers representing data -->
        <div class="floating-element number">42%</div>
        <div class="floating-element number">1.2M</div>
        <div class="floating-element number">+15%</div>
        <div class="floating-element number">87K</div>
        <div class="floating-element number">-8%</div>
        <div class="floating-element number">2.4K</div>
        <div class="floating-element number">+23%</div>
        <div class="floating-element number">156</div>

        <!-- More financial and data icons -->
        <div class="floating-element bank-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L22 8V10H2V8L12 2Z" stroke="currentColor" stroke-width="2" />
            <path d="M5 10V20H8V10" stroke="currentColor" stroke-width="2" />
            <path d="M10 10V20H14V10" stroke="currentColor" stroke-width="2" />
            <path d="M16 10V20H19V10" stroke="currentColor" stroke-width="2" />
            <path d="M3 20H21V22H3V20Z" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element wallet-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M18 10H20V14H18" stroke="currentColor" stroke-width="2" />
            <circle cx="18" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>

        <div class="floating-element analytics-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" />
            <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element money-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" />
            <path d="M12 8V16" stroke="currentColor" stroke-width="2" />
            <path d="M8 12H16" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element shield-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L22 5V12C22 18 12 22 12 22S2 18 2 12V5L12 2Z" stroke="currentColor" stroke-width="2" />
            <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element lock-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor"
              stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element target-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2" />
            <circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element users-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor"
              stroke-width="2" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" />
            <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="currentColor" stroke-width="2" />
            <path d="M16 3.12598C17.7252 3.56992 19 5.13616 19 7C19 8.86384 17.7252 10.4301 16 10.874"
              stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- New financial icons -->
        <div class="floating-element bitcoin-icon">₿</div>
        <div class="floating-element percentage-icon">%</div>

        <!-- New chart icons -->
        <div class="floating-element line-chart">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 20L9 14L13 18L21 10" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element calculator-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2" />
            <rect x="8" y="6" width="8" height="2" fill="currentColor" />
            <rect x="8" y="10" width="2" height="2" fill="currentColor" />
            <rect x="12" y="10" width="2" height="2" fill="currentColor" />
            <rect x="8" y="14" width="2" height="2" fill="currentColor" />
            <rect x="12" y="14" width="2" height="2" fill="currentColor" />
          </svg>
        </div>

        <!-- New diverse financial icons -->
        <div class="floating-element yen-icon">¥</div>
        <div class="floating-element pound-icon">£</div>
        <div class="floating-element crypto-icon">₹</div>

        <!-- Tech and digital icons -->
        <div class="floating-element blockchain-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
            <rect x="15" y="3" width="6" height="6" stroke="currentColor" stroke-width="2" />
            <rect x="3" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
            <rect x="15" y="15" width="6" height="6" stroke="currentColor" stroke-width="2" />
            <path d="M9 6H15M9 18H15M6 9V15M18 9V15" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element network-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="3" stroke="currentColor" stroke-width="2" />
            <circle cx="6" cy="19" r="3" stroke="currentColor" stroke-width="2" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2" />
            <path d="M9 7L7 17M15 7L17 17" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element database-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2" />
            <path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2" />
            <path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- Investment and growth icons -->
        <div class="floating-element growth-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element diamond-icon">◆</div>
        <div class="floating-element star-icon">★</div>
        <div class="floating-element plus-icon">+</div>

        <!-- Economic symbols -->
        <div class="floating-element infinity-icon">∞</div>
        <div class="floating-element delta-icon">Δ</div>
        <div class="floating-element sigma-icon">Σ</div>

        <!-- More currency symbols -->
        <div class="floating-element won-icon">₩</div>
        <div class="floating-element franc-icon">₣</div>
        <div class="floating-element lira-icon">₺</div>
        <div class="floating-element ruble-icon">₽</div>

        <!-- Business and finance icons -->
        <div class="floating-element briefcase-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2" />
            <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element chart-line-up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 18L12 13L16 17L21 12" stroke="currentColor" stroke-width="2" />
            <path d="M17 12H21V16" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element coins-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
            <path d="M16 8C18.21 8 20 9.79 20 12S18.21 16 16 16" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- Geometric and mathematical symbols -->
        <div class="floating-element triangle-icon">▲</div>
        <div class="floating-element square-icon">■</div>
        <div class="floating-element circle-icon">●</div>
        <div class="floating-element hexagon-icon">⬡</div>
        <div class="floating-element arrow-up">↗</div>
        <div class="floating-element arrow-down">↘</div>
        <div class="floating-element equals-icon">=</div>
        <div class="floating-element hash-icon">#</div>

        <!-- Tech symbols -->
        <div class="floating-element api-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="6" width="4" height="12" stroke="currentColor" stroke-width="2" />
            <rect x="10" y="2" width="4" height="20" stroke="currentColor" stroke-width="2" />
            <rect x="18" y="8" width="4" height="8" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="floating-element server-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
            <rect x="2" y="10" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
            <rect x="2" y="16" width="20" height="4" rx="2" stroke="currentColor" stroke-width="2" />
            <circle cx="6" cy="6" r="1" fill="currentColor" />
            <circle cx="6" cy="12" r="1" fill="currentColor" />
            <circle cx="6" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>

        <div class="floating-element cloud-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17.5 19H9C6.79 19 5 17.21 5 15C5 13.07 6.5 11.45 8.5 11.1C9.24 8.35 11.92 6.5 15 6.5C18.59 6.5 21.5 9.41 21.5 13C21.5 13.28 21.45 13.54 21.39 13.8C22.32 14.36 23 15.35 23 16.5C23 18.43 21.43 20 19.5 20H17.5"
              stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <!-- More numbers and percentages -->
        <div class="floating-element number">3.7K</div>
        <div class="floating-element number">99%</div>
        <div class="floating-element number">+45K</div>
        <div class="floating-element number">-12%</div>
        <div class="floating-element number">890</div>
        <div class="floating-element number">+78%</div>
        <div class="floating-element number">12.3M</div>
        <div class="floating-element number">-5.2%</div>
        <div class="floating-element number">456K</div>
        <div class="floating-element number">+99%</div>

        <!-- More data symbols -->
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
        <div class="floating-element data-point">●</div>
      </div>

      <div class="intro-container">
        <div class="intro-title-container" :class="{ 'visible': showTitle }">
          <h1 class="intro-title">{{ fullText1 }}</h1>
        </div>

        <div class="intro-description-container" :class="{ 'visible': showDescription }">
          <p class="intro-description">{{ fullText2 }}</p>
        </div>

        <div class="button-container" :class="{ 'visible': showButton }">
          <button class="continue-button" @click="navigateToTransactionalInsights">
            Continuar
          </button>
        </div>
      </div>
    </div>

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

        <div class="action-buttons">
          <div class="info-buttons">
            <div class="info-item">
              <DesmaterializedFormPdf :datos-generales="datosGenerales" :solicitante="solicitante"
                :solicitud="solicitud"
                :descargar-nombre="`FormularioDesmaterializado_${selectedConsent?.identificationNumber || ''}.pdf`"
                label="📄 Formulario desmaterializado" @pdf-ready="onPdfReady" />
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

      <!-- PDF Preview Modal -->
      <div v-if="showPdfModal" class="modal-overlay" @click="closePdfModal">
        <div class="pdf-modal" @click.stop>
          <div class="modal-header">
            <h3>Formulario desmaterializado</h3>
            <div class="zoom-controls">
              <button class="zoom-btn" @click="zoomOut" :disabled="scale <= minScale">-</button>
              <span class="zoom-label">{{ Math.round(scale * 100) }}%</span>
              <button class="zoom-btn" @click="zoomIn" :disabled="scale >= maxScale">+</button>
            </div>
            <button class="modal-close" @click="closePdfModal">✕</button>
          </div>
          <div class="pdf-container">
            <div v-if="pdfIsLoading" class="loading">
              <div class="loading-spinner" />
              <span>Cargando documento…</span>
            </div>
            <div v-else class="pages" ref="pagesRef">
              <div v-for="page in pageNumbers" :key="page" class="page-wrapper">
                <canvas :ref="registerCanvas(page)" class="pdf-canvas"></canvas>
                <div class="page-index">Página {{ page }} / {{ pageCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as pdfjsLib from 'pdfjs-dist'
// Use worker via URL so Vite resolves it correctly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url'
import DesmaterializedFormPdf from '../components/DesmaterializedFormPdf.vue'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker as unknown as string

const router = useRouter()
const selectedPasarela = ref('experian')
const searchType = ref('identification')
const searchQuery = ref('')
const startDate = ref('2025-09-01')
const endDate = ref('2025-09-26')
const showSignatureModal = ref(false)
const showMessage = ref(false)

// PDF Viewer state
const showPdfModal = ref(false)
const pdfIsLoading = ref(false)
const pageCount = ref(0)
const scale = ref(1.0)
const minScale = 0.6
const maxScale = 3.0
const pagesRef = ref<HTMLElement | null>(null)
let pdfDoc: any = null
const canvasMap = new Map<number, HTMLCanvasElement>()
// Entorno del visor
const entityRootRef = ref<HTMLElement | null>(null)
const isTabletEnv = ref(false)
const isFullEnv = ref(false)
const overlayEntered = ref(false)
const registerCanvas = (page: number) => (el: any) => {
  const canvas = el as HTMLCanvasElement | null
  if (canvas) canvasMap.set(page, canvas)
  else canvasMap.delete(page)
}

const pageNumbers = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1))

async function renderPage(pageNumber: number) {
  if (!pdfDoc) return
  const page = await pdfDoc.getPage(pageNumber)
  const viewport = page.getViewport({ scale: scale.value })
  const canvas = canvasMap.get(pageNumber)
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return
  const dpr = window.devicePixelRatio || 1
  // Ajustar tamaño interno (buffer) y tamaño visible CSS
  canvas.width = Math.max(1, Math.floor(viewport.width * dpr))
  canvas.height = Math.max(1, Math.floor(viewport.height * dpr))
  canvas.style.width = `${Math.max(1, Math.floor(viewport.width))}px`
  canvas.style.height = `${Math.max(1, Math.floor(viewport.height))}px`
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  const renderContext = { canvasContext: context, viewport, transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined }
  await page.render(renderContext).promise
}

async function renderAllPages() {
  if (!pdfDoc) return
  for (let p = 1; p <= pageCount.value; p++) {
    // eslint-disable-next-line no-await-in-loop
    await renderPage(p)
  }
}

async function onPdfReady(payload: { blob: Blob, url: string, nombre: string }) {
  showPdfModal.value = true
  pdfIsLoading.value = true
  try {
    // Detectar entorno (por si se quiere usar luego), pero la escala por defecto será 250%
    try {
      const root = entityRootRef.value
      isTabletEnv.value = !!root?.closest('.tablet, .tablet__content, .is-tablet')
      isFullEnv.value = !!document.querySelector('.frame-container.full-mode, .app-container.full-mode')
    } catch { }
    // Escala inicial por defecto: 250%
    scale.value = 2.5

    const arrayBuffer = await payload.blob.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
      verbosity: 0,
    })
    pdfDoc = await loadingTask.promise
    pageCount.value = pdfDoc.numPages || 0
    // Esperar a que el DOM pinte canvases
    const waitForCanvasRefs = async (tries = 10) => {
      for (let i = 0; i < tries; i++) {
        await nextTick()
        await new Promise((r) => requestAnimationFrame(() => r(undefined)))
        if (canvasMap.size >= pageCount.value) break
      }
    }
    overlayEntered.value = true
    await waitForCanvasRefs()
    await maybeRenderInitialPages()
  } finally {
    pdfIsLoading.value = false
  }
}

async function zoomIn() { if (scale.value < maxScale) { scale.value = +(Math.min(maxScale, scale.value + 0.1).toFixed(2)); await renderAllPages() } }
async function zoomOut() { if (scale.value > minScale) { scale.value = +(Math.max(minScale, scale.value - 0.1).toFixed(2)); await renderAllPages() } }
function closePdfModal() { showPdfModal.value = false; pdfDoc = null; canvasMap.clear(); pageCount.value = 0 }


async function maybeRenderInitialPages() {
  if (!overlayEntered.value || !pdfDoc) return
  await nextTick()
  await renderAllPages()
  // Segundo pase para asegurar nitidez tras layout
  await new Promise((r) => requestAnimationFrame(() => r(undefined)))
  await renderAllPages()
}

function handleResize() {
  if (!showPdfModal.value) return
  renderAllPages().catch(() => { })
}

// Pagination variables
const currentPage = ref(1)
const totalPages = ref(4585)

// Animation variables
const showTitle = ref(false)
const showDescription = ref(false)
const showButton = ref(false)

const fullText1 = "Con el gestor de consentimientos, tu entidad ya cuenta con una herramienta segura y transparente para administrar las autorizaciones de tus clientes."
const fullText2 = "Ahora demos el siguiente paso: transformar los datos que recibimos en inteligencia con nuestro motor de categorización."

// Smooth appear animation function
const showElements = async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      showTitle.value = true
      setTimeout(() => {
        showDescription.value = true
        setTimeout(() => {
          showButton.value = true
          resolve()
        }, 800)
      }, 800)
    }, 500)
  })
}

// Export function to trigger animation (will be called by sidebar)
const triggerTransactionalInsightsAnimation = async () => {
  showMessage.value = true

  // Hide sidebar
  const toggleSidebar = (window as any).toggleEntitySidebar
  if (toggleSidebar) {
    toggleSidebar(true)
  }

  // Reset animation variables
  showTitle.value = false
  showDescription.value = false
  showButton.value = false

  // Start smooth appear animation
  setTimeout(async () => {
    await showElements()
  }, 1000) // Start animation 1 second after screen appears
}

// Navigate to transactional insights on button click
const navigateToTransactionalInsights = () => {
  // Add fade out animation only to content, not background
  const introContainer = document.querySelector('.intro-container')
  if (introContainer) {
    introContainer.classList.add('fade-out-content')
  }

  // Wait for fade out to complete before navigating
  setTimeout(() => {
    const toggleSidebar = (window as any).toggleEntitySidebar
    if (toggleSidebar) {
      toggleSidebar(false)
    }
    router.push('/entity/transactional-insights')
  }, 500) // Match the CSS transition duration
}

  // Make function available globally for sidebar to call
  ; (window as any).triggerTransactionalInsightsAnimation = triggerTransactionalInsightsAnimation


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
  },
  {
    id: 3,
    transactionNumber: '53891',
    identificationNumber: '1234567890',
    fullName: 'Maria Rodriguez',
    createdAt: '10/03/2025 09:45',
    updatedAt: '10/03/2025 09:50',
    status: 'Activo',
    selected: false
  },
  {
    id: 4,
    transactionNumber: '54102',
    identificationNumber: '9876543210',
    fullName: 'Carlos Mendoza',
    createdAt: '05/02/2025 14:22',
    updatedAt: '05/02/2025 14:28',
    status: 'Activo',
    selected: false
  },
  {
    id: 5,
    transactionNumber: '54326',
    identificationNumber: '5555666777',
    fullName: 'Ana Gutierrez',
    createdAt: '18/01/2025 11:15',
    updatedAt: '18/01/2025 11:20',
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



onMounted(() => {
  startDate.value = '2025-09-01'
  endDate.value = '2025-09-26'
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
// Datos mínimos para el PDF
const selectedConsent = computed(() => {
  return consents.value.find(c => c.selected) ?? consents.value[0]
})

const datosGenerales = computed(() => {
  const createdAt = selectedConsent.value?.createdAt ?? ''
  const datePart = createdAt.split(' ')[0] ?? ''
  const [dia, mes, anio] = (datePart || '').split('/')
  return { fechaTramite: { dia, mes, anio } }
})

const solicitante = computed(() => {
  const fullName = (selectedConsent.value?.fullName ?? '').trim()
  const parts = fullName.split(/\s+/)
  const primerNombre = parts[0] || ''
  const primerApellido = parts[1] || ''
  return {
    tipoDocumento: undefined,
    numeroIdentificacion: selectedConsent.value?.identificationNumber,
    primerNombre,
    primerApellido,
    fechaExpedicion: undefined,
    celular: undefined,
    correo: undefined
  }
})

const solicitud = computed(() => {
  return {
    tipoCredito: undefined,
    ingresosMensuales: undefined,
    otrosIngresos: undefined,
    montoSolicitado: undefined,
    actividadEconomica: undefined,
    antiguedad: undefined,
    estadoCivil: undefined,
    nivelEducativo: undefined,
    gastosMensuales: undefined,
    numeroRadicacion: selectedConsent.value?.transactionNumber
  }
})
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}


/* Full Screen Animation */
.full-screen-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease;
  z-index: 9999;
  pointer-events: none;
}

.full-screen-animation.show {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.intro-container.fade-out-content {
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animated background elements */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-element {
  position: absolute;
  opacity: 0.5;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: rgb(97, 40, 120);
  font-weight: 600;
  animation: float 20s ease-in-out infinite;
  user-select: none;
}

/* Financial symbols */
.dollar-sign {
  font-size: 3rem;
  top: 5%;
  left: 5%;
  animation-delay: -2s;
}

.peso-sign {
  font-size: 2.5rem;
  top: 85%;
  left: 95%;
  animation-delay: -8s;
}

.euro-sign {
  font-size: 2.8rem;
  top: 5%;
  left: 95%;
  animation-delay: -15s;
}

/* Data visualization elements */
.chart-bar {
  top: 85%;
  left: 25%;
  animation-delay: -5s;
  font-size: 1.5rem;
}

.trend-up {
  top: 25%;
  left: 50%;
  animation-delay: -12s;
  font-size: 1.8rem;
}

.pie-chart {
  top: 85%;
  left: 75%;
  animation-delay: -18s;
  font-size: 1.6rem;
}

/* Transaction elements */
.card-icon {
  top: 65%;
  left: 5%;
  animation-delay: -3s;
  font-size: 1.4rem;
}

.transfer-icon {
  top: 85%;
  left: 50%;
  animation-delay: -10s;
  font-size: 1.3rem;
}

/* Data points */
.data-point {
  font-size: 1rem;
}

.data-point:nth-child(10) {
  top: 45%;
  left: 25%;
  animation-delay: -1s;
}

.data-point:nth-child(11) {
  top: 65%;
  left: 75%;
  animation-delay: -7s;
}

.data-point:nth-child(12) {
  top: 65%;
  left: 95%;
  animation-delay: -14s;
}

.data-point:nth-child(13) {
  top: 25%;
  left: 25%;
  animation-delay: -9s;
}

/* Numbers and percentages */
.number {
  font-size: 1.2rem;
  font-weight: 700;
}

.number:nth-child(14) {
  top: 45%;
  left: 75%;
  animation-delay: -4s;
}

.number:nth-child(15) {
  top: 45%;
  left: 5%;
  animation-delay: -11s;
}

.number:nth-child(16) {
  top: 5%;
  left: 75%;
  animation-delay: -16s;
}

.number:nth-child(17) {
  top: 65%;
  left: 50%;
  animation-delay: -6s;
}

.number:nth-child(18) {
  top: 25%;
  left: 75%;
  animation-delay: -13s;
}

.number:nth-child(19) {
  top: 45%;
  left: 95%;
  animation-delay: -2s;
}

.number:nth-child(20) {
  top: 5%;
  left: 25%;
  animation-delay: -17s;
}

.number:nth-child(21) {
  top: 65%;
  left: 25%;
  animation-delay: -9s;
}

/* New financial and data icons */
.bank-icon {
  top: 25%;
  left: 5%;
  animation-delay: -4s;
  font-size: 1.5rem;
}

.wallet-icon {
  top: 45%;
  left: 50%;
  animation-delay: -11s;
  font-size: 1.4rem;
}

.analytics-icon {
  top: 25%;
  left: 95%;
  animation-delay: -7s;
  font-size: 1.6rem;
}

.money-icon {
  top: 85%;
  left: 5%;
  animation-delay: -14s;
  font-size: 1.3rem;
}

.shield-icon {
  top: 5%;
  left: 50%;
  animation-delay: -1s;
  font-size: 1.4rem;
}

.lock-icon {
  top: 65%;
  left: 25%;
  animation-delay: -8s;
  font-size: 1.2rem;
}

.target-icon {
  top: 65%;
  left: 75%;
  animation-delay: -16s;
  font-size: 1.5rem;
}

.users-icon {
  top: 25%;
  left: 50%;
  animation-delay: -5s;
  font-size: 1.4rem;
}

/* Additional data points */
.data-point:nth-child(32) {
  top: 20%;
  left: 95%;
  animation-delay: -3s;
}

.data-point:nth-child(33) {
  top: 40%;
  left: 35%;
  animation-delay: -12s;
}

.data-point:nth-child(34) {
  top: 95%;
  left: 85%;
  animation-delay: -6s;
}

.data-point:nth-child(35) {
  top: 5%;
  left: 15%;
  animation-delay: -15s;
}

.data-point:nth-child(36) {
  top: 60%;
  left: 45%;
  animation-delay: -10s;
}

.data-point:nth-child(37) {
  top: 80%;
  left: 60%;
  animation-delay: -18s;
}

/* New financial and business icons */
.bitcoin-icon {
  font-size: 2rem;
  top: 30%;
  left: 92%;
  animation-delay: -3s;
}

.percentage-icon {
  font-size: 1.8rem;
  top: 12%;
  left: 25%;
  animation-delay: -11s;
}

.line-chart {
  top: 65%;
  left: 68%;
  animation-delay: -6s;
  font-size: 1.4rem;
}

.calculator-icon {
  top: 88%;
  left: 12%;
  animation-delay: -19s;
  font-size: 1.3rem;
}

/* New diverse financial icons */
.yen-icon {
  font-size: 2.2rem;
  top: 55%;
  left: 2%;
  animation-delay: -21s;
}

.pound-icon {
  font-size: 2rem;
  top: 8%;
  left: 88%;
  animation-delay: -15s;
}

.crypto-icon {
  font-size: 1.9rem;
  top: 92%;
  left: 88%;
  animation-delay: -5s;
}

/* Tech and digital icons */
.blockchain-icon {
  top: 38%;
  left: 3%;
  animation-delay: -17s;
  font-size: 1.4rem;
}

.network-icon {
  top: 15%;
  left: 65%;
  animation-delay: -23s;
  font-size: 1.5rem;
}

.database-icon {
  top: 78%;
  left: 88%;
  animation-delay: -12s;
  font-size: 1.3rem;
}

/* Investment and growth icons */
.growth-icon {
  top: 25%;
  left: 3%;
  animation-delay: -18s;
  font-size: 1.4rem;
}

/* Simple symbols */
.diamond-icon {
  font-size: 1.5rem;
  top: 82%;
  left: 35%;
  animation-delay: -8s;
}

.star-icon {
  font-size: 1.7rem;
  top: 33%;
  left: 68%;
  animation-delay: -14s;
}

.plus-icon {
  font-size: 2rem;
  top: 62%;
  left: 95%;
  animation-delay: -22s;
}

/* Economic symbols */
.infinity-icon {
  font-size: 1.8rem;
  top: 48%;
  left: 2%;
  animation-delay: -25s;
}

.delta-icon {
  font-size: 1.6rem;
  top: 18%;
  left: 35%;
  animation-delay: -16s;
}

.sigma-icon {
  font-size: 1.9rem;
  top: 85%;
  left: 65%;
  animation-delay: -24s;
}

/* More currency symbols */
.won-icon {
  font-size: 2.1rem;
  top: 65%;
  left: 5%;
  animation-delay: -27s;
}

.franc-icon {
  font-size: 1.8rem;
  top: 85%;
  left: 25%;
  animation-delay: -31s;
}

.lira-icon {
  font-size: 2rem;
  top: 45%;
  left: 75%;
  animation-delay: -33s;
}

.ruble-icon {
  font-size: 1.9rem;
  top: 45%;
  left: 25%;
  animation-delay: -29s;
}

/* Business and finance icons */
.briefcase-icon {
  top: 17%;
  left: 8%;
  animation-delay: -35s;
  font-size: 1.4rem;
}

.chart-line-up {
  top: 73%;
  left: 45%;
  animation-delay: -28s;
  font-size: 1.5rem;
}

.coins-icon {
  top: 38%;
  left: 25%;
  animation-delay: -32s;
  font-size: 1.3rem;
}

/* Geometric and mathematical symbols - using grid positions */
.triangle-icon {
  font-size: 1.6rem;
  top: 5%;
  left: 75%;
  animation-delay: -30s;
}

.square-icon {
  font-size: 1.4rem;
  top: 65%;
  left: 50%;
  animation-delay: -34s;
}

.circle-icon {
  font-size: 1.2rem;
  top: 85%;
  left: 95%;
  animation-delay: -26s;
}

.hexagon-icon {
  font-size: 1.7rem;
  top: 25%;
  left: 75%;
  animation-delay: -36s;
}

.arrow-up {
  font-size: 1.8rem;
  top: 25%;
  left: 25%;
  animation-delay: -28s;
}

.arrow-down {
  font-size: 1.8rem;
  top: 85%;
  left: 75%;
  animation-delay: -37s;
}

.equals-icon {
  font-size: 1.5rem;
  top: 45%;
  left: 50%;
  animation-delay: -33s;
}

.hash-icon {
  font-size: 1.6rem;
  top: 85%;
  left: 50%;
  animation-delay: -29s;
}

/* Tech symbols */
.api-icon {
  top: 27%;
  left: 18%;
  animation-delay: -31s;
  font-size: 1.4rem;
}

.server-icon {
  top: 64%;
  left: 72%;
  animation-delay: -35s;
  font-size: 1.3rem;
}

.cloud-icon {
  top: 11%;
  left: 38%;
  animation-delay: -32s;
  font-size: 1.5rem;
}

/* Additional numbers positioning */
.number:nth-child(58) {
  top: 19%;
  left: 72%;
  animation-delay: -38s;
}

.number:nth-child(59) {
  top: 83%;
  left: 52%;
  animation-delay: -34s;
}

.number:nth-child(60) {
  top: 47%;
  left: 8%;
  animation-delay: -31s;
}

.number:nth-child(61) {
  top: 29%;
  left: 62%;
  animation-delay: -36s;
}

.number:nth-child(62) {
  top: 71%;
  left: 18%;
  animation-delay: -33s;
}

.number:nth-child(63) {
  top: 9%;
  left: 45%;
  animation-delay: -29s;
}

.number:nth-child(64) {
  top: 89%;
  left: 78%;
  animation-delay: -35s;
}

.number:nth-child(65) {
  top: 37%;
  left: 5%;
  animation-delay: -32s;
}

.number:nth-child(66) {
  top: 61%;
  left: 92%;
  animation-delay: -37s;
}

.number:nth-child(67) {
  top: 14%;
  left: 28%;
  animation-delay: -30s;
}


/* Float animation */
@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.5;
  }

  25% {
    transform: translateY(-20px) rotate(2deg);
    opacity: 0.6;
  }

  50% {
    transform: translateY(-10px) rotate(-1deg);
    opacity: 0.4;
  }

  75% {
    transform: translateY(-30px) rotate(1deg);
    opacity: 0.55;
  }
}

.intro-container {
  max-width: 900px;
  width: 90%;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
}

.intro-title-container {
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro-title-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  min-height: 1.2em;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro-description-container {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro-description-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-description {
  font-size: 1.4rem;
  line-height: 1.7;
  color: #374151;
  font-weight: 500;
  margin: 0;
  min-height: 2em;
}

.button-container {
  margin-top: 40px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.button-container.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.continue-button {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(97, 40, 120, 0.3);
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(97, 40, 120, 0.4);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cursor {
  display: inline-block;
  opacity: 0;
  color: #ec4899;
  font-weight: 400;
  animation: blink 1s infinite;
  transition: opacity 0.3s ease;
}

.cursor.show {
  opacity: 1;
}

@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}


.entity-dashboard {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
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
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
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
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
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
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%) 0% 0% no-repeat padding-box padding-box transparent !important;
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
  border-top: 4px solid rgb(97, 40, 120);
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
  background: #fff;
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
