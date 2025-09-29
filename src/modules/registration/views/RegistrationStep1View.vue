<template>
  <div class="registration-step1-view" ref="rootRef">
    <RegistrationForm @view-document="openPdf" />

    <!-- PDF Modal -->
    <v-dialog v-model="showPdfModal" :teleport="dialogTeleport" :fullscreen="isFullscreenEnv"
      :contained="!isFullscreenEnv" scrollable :class="dialogClasses" :max-width="dialogMaxWidth" :width="dialogWidth"
      @after-enter="onOverlayAfterEnter">
      <v-card>
        <v-toolbar color="#982881" density="comfortable" dark>
          <v-spacer />
          <div class="zoom-controls">
            <v-btn icon variant="text" @click="zoomOut" :disabled="scale <= minScale">
              <v-icon>mdi-magnify-minus-outline</v-icon>
            </v-btn>
            <span class="zoom-label">{{ Math.round(scale * 100) }}%</span>
            <v-btn icon variant="text" @click="zoomIn" :disabled="scale >= maxScale">
              <v-icon>mdi-magnify-plus-outline</v-icon>
            </v-btn>
          </div>
          <v-btn class="close-btn" icon="mdi-close" @click="closePdf" variant="text" />
        </v-toolbar>

        <div class="pdf-container">
          <div v-if="isLoading" class="loading">
            <v-progress-circular :size="36" :width="4" color="#982881" indeterminate />
            <span>Cargando documento…</span>
          </div>

          <div v-else class="pages" ref="pagesRef">
            <div v-for="page in pageNumbers" :key="page" class="page-wrapper">
              <canvas :ref="registerCanvas(page)" class="pdf-canvas"></canvas>
              <div class="page-index">Página {{ page }} / {{ pageCount }}</div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import RegistrationForm from '../components/RegistrationForm.vue'
import * as pdfjsLib from 'pdfjs-dist'
// Use worker via URL so Vite resolves it correctly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker as unknown as string

const rootRef = ref<HTMLElement | null>(null)

const showPdfModal = ref(false)
const pdfUrl = ref<string>('')
const pdfTitle = ref<string>('Documento')
const isLoading = ref(false)
const pageCount = ref(0)
const scale = ref(1.0)
const minScale = 0.5
const maxScale = 2.5
const overlayEntered = ref(false)
const isTabletEnv = ref(false)
const isFullEnv = ref(false)
const isFullscreenEnv = computed(() => isFullEnv.value)

const dialogTeleport = computed(() => (isFullscreenEnv.value ? 'body' : false))
const dialogClasses = computed(() => ['pdf-dialog', { 'is-fullscreen': isFullscreenEnv.value }])
const dialogMaxWidth = computed(() => (isFullscreenEnv.value ? undefined : (isTabletEnv.value ? 560 : undefined)))
const dialogWidth = computed(() => (isFullscreenEnv.value ? '100vw' : (isTabletEnv.value ? '92%' : undefined)))

// Pages container ref (for measuring available width)
const pagesRef = ref<HTMLElement | null>(null)

// Keep a reference to the loaded PDF document
let pdfDoc: any = null

// Canvas refs per page
const canvasMap = new Map<number, HTMLCanvasElement>()
const registerCanvas = (page: number) => (el: any) => {
  const canvas = el as HTMLCanvasElement | null
  if (canvas) canvasMap.set(page, canvas)
  else canvasMap.delete(page)
}

const pageNumbers = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1))

async function openPdf(input: string | File) {
  let arrayBuffer: ArrayBuffer
  let fileName = 'Documento'
  
  // Detect if running inside tablet frame
  try {
    const root = rootRef.value
    // Detect tablet by any of these ancestors
    isTabletEnv.value = !!root?.closest('.tablet, .tablet__content, .is-tablet')
    // Detect full-screen app mode globally
    isFullEnv.value = !!document.querySelector('.frame-container.full-mode, .app-container.full-mode')
  } catch {
    isTabletEnv.value = false
    isFullEnv.value = false
  }
  
  showPdfModal.value = true
  isLoading.value = true
  // Set 250% zoom for fullscreen mode, 100% for other modes
  scale.value = isFullEnv.value ? 2.5 : 1.0
  
  try {
    if (input instanceof File) {
      // Handle File input
      fileName = input.name
      arrayBuffer = await input.arrayBuffer()
      console.log('Loading PDF from File:', fileName, 'Size:', arrayBuffer.byteLength)
    } else {
      // Handle URL input - Load as ArrayBuffer directly without fetch issues
      pdfUrl.value = input
      fileName = extractFileName(input)
      console.log('Loading PDF from static asset:', input)
      
      // Load PDF directly using PDF.js with the URL
      // This avoids fetch issues and CORS problems with static assets
      const loadingTask = pdfjsLib.getDocument({
        url: input,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
        verbosity: 0 // Reduce logging
      })
      
      pdfDoc = await loadingTask.promise
      pageCount.value = pdfDoc.numPages || 0
      pdfTitle.value = fileName
      console.log('PDF loaded successfully from asset, pages:', pageCount.value)
      await nextTick()
      await maybeRenderInitialPages()
      return // Exit early on success
    }
    
    // File processing path
    pdfTitle.value = fileName
    
    // Validate PDF header for file input
    const uint8Array = new Uint8Array(arrayBuffer)
    const pdfHeader = String.fromCharCode(...uint8Array.slice(0, 5))
    console.log('PDF header:', pdfHeader)
    
    if (!pdfHeader.startsWith('%PDF-')) {
      throw new Error('Invalid PDF file: Missing PDF header')
    }
    
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
      verbosity: 0
    })
    
    pdfDoc = await loadingTask.promise
    pageCount.value = pdfDoc.numPages || 0
    console.log('PDF loaded successfully from file, pages:', pageCount.value)
    await nextTick()
    await maybeRenderInitialPages()
  } catch (err) {
    console.error('Error loading PDF:', err)
    alert('Error al cargar el documento PDF. Verifica que el archivo sea válido.')
  }
}

function closePdf() {
  showPdfModal.value = false
  overlayEntered.value = false
  // Optional: cleanup canvases
  canvasMap.forEach((canvas) => {
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  })
  canvasMap.clear()
  pageCount.value = 0
  pdfDoc = null
}

function extractFileName(path: string) {
  try {
    const idx = path.lastIndexOf('/')
    return idx >= 0 ? decodeURIComponent(path.slice(idx + 1)) : path
  } catch {
    return 'Documento'
  }
}

async function renderAllPages() {
  if (!pdfDoc) return
  for (let p = 1; p <= pageCount.value; p++) {
    // render sequentially for stability
    // eslint-disable-next-line no-await-in-loop
    await renderPage(p)
  }
}

async function renderPage(pageNumber: number) {
  if (!pdfDoc) return
  const page = await pdfDoc.getPage(pageNumber)
  const viewport = page.getViewport({ scale: scale.value })
  const canvas = canvasMap.get(pageNumber)
  if (!canvas) return
  const context = canvas.getContext('2d')
  if (!context) return

  // Handle HiDPI displays and ensure canvas has visible size
  const dpr = (window.devicePixelRatio || 1)
  // Set pixel buffer size for crisp rendering; CSS handles visual width (100%)
  canvas.width = Math.floor(viewport.width * dpr)
  canvas.height = Math.floor(viewport.height * dpr)
  // Reset any transform and clear before rendering
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)

  const renderContext = {
    canvasContext: context,
    viewport,
    transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
  }
  await page.render(renderContext).promise
}

async function zoomIn() {
  if (scale.value >= maxScale) return
  scale.value = Math.min(maxScale, +(scale.value + 0.1).toFixed(2))
  await renderAllPages()
}

async function zoomOut() {
  if (scale.value <= minScale) return
  scale.value = Math.max(minScale, +(scale.value - 0.1).toFixed(2))
  await renderAllPages()
}

async function onOverlayAfterEnter() {
  overlayEntered.value = true
  // Wait for layout/paint cycle to complete
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
  await maybeRenderInitialPages()
}

async function maybeRenderInitialPages() {
  if (!overlayEntered.value || !pdfDoc) return
  await nextTick()
  // In tablet (inside frame, not fullscreen), fit width initially
  if (isTabletEnv.value && !isFullscreenEnv.value) {
    await fitToWidth()
  }
  await renderAllPages()
  isLoading.value = false
  // Fallback: force a second paint on next frame in case
  // first render raced with layout in some environments.
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
  await renderAllPages()
}

async function fitToWidth() {
  if (!pdfDoc) return
  await nextTick()
  const container = pagesRef.value
  if (!container) return
  const containerWidth = container.clientWidth
  if (!containerWidth) return
  const firstPage = await pdfDoc.getPage(1)
  const vp = firstPage.getViewport({ scale: 1 })
  const target = containerWidth / vp.width
  // clamp within min/max
  scale.value = Math.max(minScale, Math.min(maxScale, target))
}

function handleResize() {
  if (!showPdfModal.value) return
  if (isTabletEnv.value && !isFullscreenEnv.value) {
    // Recompute scale and rerender
    fitToWidth().then(renderAllPages).catch(() => { })
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.registration-step1-view {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
}

.pdf-dialog :deep(.v-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-label {
  min-width: 44px;
  text-align: center;
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

.close-btn {
  margin-left: 4px;
}

/* Dialog sized like other views */
/* Desktop/inside-frame size */
.pdf-dialog:not(.is-fullscreen) :deep(.v-overlay__content) {
  width: clamp(320px, 60vw, 1100px);
  max-width: 95vw;
}

.pdf-dialog :deep(.v-card) {
  display: flex;
  flex-direction: column;
  height: 80vh;
  border-radius: 10px;
  overflow: hidden;
}

/* Fullscreen on tablet */
.pdf-dialog.is-fullscreen :deep(.v-overlay__content) {
  position: fixed !important;
  inset: 0 !important;
  /* top/right/bottom/left 0 */
  width: 100vw !important;
  height: 100dvh !important;
  max-width: 100vw !important;
  margin: 0 !important;
}

.pdf-dialog.is-fullscreen :deep(.v-card) {
  height: 100dvh;
  width: 100%;
  border-radius: 0;
}

/* Tablet inside device frame: fit width to form and adjust paddings */
:global(.tablet__content) .pdf-dialog:not(.is-fullscreen) :deep(.v-overlay__content),
:global(.is-tablet) .pdf-dialog:not(.is-fullscreen) :deep(.v-overlay__content) {
  width: min(92%, 600px);
}

:global(.tablet__content) .pdf-dialog :deep(.v-card),
:global(.is-tablet) .pdf-dialog :deep(.v-card) {
  height: 85vh;
}

:global(.tablet__content) .pdf-container,
:global(.is-tablet) .pdf-container {
  padding: 8px 8px 12px;
}

/* Media queries for responsive design */
@media (max-width: 768px) {
  .registration-step1-view {
    padding: 0 20px;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .registration-step1-view {
    padding: 0 15px;
    min-height: calc(100vh - 200px);
  }
}
</style>
