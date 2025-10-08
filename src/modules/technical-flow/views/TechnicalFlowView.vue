<template>
  <div class="technical-flow-container">
    <!-- Background -->
    <div class="background-layer"></div>

    <!-- Main Title -->
    <div class="title-section">
      <h1 class="main-title">Flujo Técnico Completo</h1>
      <p class="subtitle">Proceso de transferencia de datos transaccionales - Open Finance</p>
      <div class="phase-indicator">
        <span class="phase-name">{{ currentPhase.name }}</span>
        <span class="phase-step">Paso {{ currentStep }} de {{ totalSteps }}</span>
      </div>

      <!-- Controls -->
      <div class="flow-controls">
        <button @click="prevStep" class="control-btn" :disabled="stepIndex === 0">⬅️</button>
        <button @click="nextStep" class="control-btn" :disabled="stepIndex >= totalSteps - 1">➡️</button>
        <button @click="resetAnimation" class="control-btn">🔄</button>
        <button @click="toggleDescriptions" :class="{ active: showDescriptions }" class="control-btn">📝</button>
      </div>
    </div>

    <!-- Flow Diagram -->
    <div class="flow-diagram" ref="flowDiagramRef">
      <div class="stack-group">
        <!-- Fase 1: Solicitud Inicial -->
        <CiudadanoActor v-if="visibleActors.ciudadano" :active="activeActors.ciudadano"
          :show-description="showDescriptions" :current-action="actorActions.ciudadano" />

        <ConnectionLine :visible="connections.ciudadanoToTercero" :animated="animatedConnections.ciudadanoToTercero"
          label="Solicitud de Crédito" :one-way-down="true" :play-once="true" />

        <TerceroReceptorActor v-if="visibleActors.terceroReceptor" :active="activeActors.terceroReceptor"
          :show-description="showDescriptions" :current-action="actorActions.terceroReceptor" />

        <!-- TRD -> Proveedor de Datos -->
        <ConnectionLine :visible="connections.terceroToProveedor" :animated="animatedConnections.terceroToProveedor"
          label="Solicitud Creación de Consentimiento" :one-way-down="true" :play-once="true" />

        <ProveedorDatosActor v-if="visibleActors.proveedorDatos" :active="activeActors.proveedorDatos"
          :show-description="showDescriptions" :current-action="actorActions.proveedorDatos" />

        <!-- Proveedor de Datos -> API Manager -->
        <ConnectionLine :visible="connections.proveedorToApi" :animated="animatedConnections.proveedorToApi"
          label="Solicitud Creación de Consentimiento" :one-way-down="true" :play-once="true" />

        <!-- Fase 2: Gestión API -->
        <ApiManagerActor v-if="visibleActors.apiManager" :active="activeActors.apiManager"
          :show-description="showDescriptions" :current-action="actorActions.apiManager">
          <template #extras>
            <div v-if="apiBadgeCredencialesVisible || apiBadgeConsentimientoVisible" class="bottom-badges">
              <div v-if="apiBadgeCredencialesVisible" class="badge-item">
                <svg class="badge-check" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                  <path d="M7 12.5l3 3L17 9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
                <span class="badge-text">Credenciales</span>
              </div>
              <div v-if="apiBadgeConsentimientoVisible" class="badge-item" :class="{ 'fade-out': apiBadgeConsentimientoFading }">
                <svg class="badge-check" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                  <path d="M7 12.5l3 3L17 9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
                <span class="badge-text">Consentimiento</span>
              </div>
            </div>
          </template>
        </ApiManagerActor>

        <!-- Arco API → Ciudadano (pasos 4 y 5) -->
        <ArcConnection
          v-if="visibleConnections.apiArcToCiudadano"
          :visible="visibleConnections.apiArcToCiudadano"
          :animated="animatedConnections.apiArcToCiudadano"
          :duration-ms="arcUi.durationMs"
          :top="arcUi.top"
          :right="arcUi.right"
          :width-px="arcUi.widthPx"
          :height-px="arcUi.heightPx"
          :bulge-factor="arcUi.bulgeFactor"
          :mid-label1="arcUi.midLabel1"
          :mid-label2="arcUi.midLabel2"
          :mid-2-label1="arcUi.mid2Label1"
          :mid-2-label2="arcUi.mid2Label2"
          :active-mid="arcUi.activeMid"
          :check-visible="arcUi.checkVisible"
          :mid-offset="28"
          :direction="arcUi.direction"
        />

        <ConnectionLine v-if="visibleConnections.apiToCiudadano" :visible="connections.apiToCiudadano"
          :animated="animatedConnections.apiToCiudadano" label="Solicitud Credenciales + Consentimiento" />

        <ConnectionLine v-if="visibleConnections.apiToIdp" :visible="connections.apiToIdp"
          :animated="animatedConnections.apiToIdp" label="Solicitud Token de Acceso" :one-way-down="true" :play-once="true" />

        <!-- Fase 3: Validación -->
        <ServidorIdpActor v-if="visibleActors.servidorIdp" :active="activeActors.servidorIdp"
          :show-description="showDescriptions" :current-action="actorActions.servidorIdp">
          <template #extras>
            <!-- Badge superior dentro del IdP -->
            <div v-if="idpBadgeSolicitudTokenVisible" class="top-badge">
              <svg class="badge-check" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="#9333EA" />
                <path d="M7 12.5l3 3L17 9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
              <span class="top-badge-text">Solicitud Token de acceso</span>
            </div>

            <div v-if="idpBadgeCredencialesVisible" class="bottom-badges">
              <div class="badge-item">
                <svg class="badge-check" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                  <path d="M7 12.5l3 3L17 9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
                <span class="badge-text">Credenciales</span>
              </div>
            </div>
          </template>
        </ServidorIdpActor>

        <ConnectionLine
          v-if="visibleConnections.idpToDirectorio"
          :visible="connections.idpToDirectorio"
          :animated="animatedConnections.idpToDirectorio"
          :label="lineLabels.idpToDirectorio"
          :label-check="lineLabelChecks.idpToDirectorio"
          :one-way-down="!lineDirectionUp.idpToDirectorio"
          :one-way-up="lineDirectionUp.idpToDirectorio"
          :play-once="true"
        />

        <DirectorioParticipantesActor v-if="visibleActors.directorioParticipantes"
          :active="activeActors.directorioParticipantes" :show-description="showDescriptions"
          :current-action="actorActions.directorioParticipantes" />

        <!-- IdP -> Gestor (se usa desde paso 9) -->
        <ConnectionLine v-if="visibleConnections.idpToGestor" :visible="connections.idpToGestor"
          :animated="animatedConnections.idpToGestor" label="Consentimiento" :label-check="true"
          :one-way-down="true" :play-once="true" />

        <!-- Fase 4: Consentimiento -->
        <GestorConsentimientoActor v-if="visibleActors.gestorConsentimiento" :active="activeActors.gestorConsentimiento"
          :show-description="showDescriptions" :current-action="actorActions.gestorConsentimiento" />

        <!-- Fase 5: Sistemas Core -->
        <SistemasCoreActor v-if="visibleActors.sistemasCore" :active="activeActors.sistemasCore"
          :show-description="showDescriptions" :show-services="true" :current-action="actorActions.sistemasCore" />

        <ConnectionLine v-if="visibleConnections.coreToIntegracion" :visible="connections.coreToIntegracion"
          :animated="animatedConnections.coreToIntegracion" label="Datos Periódicos" />

        <CapaIntegracionActor v-if="visibleActors.capaIntegracion" :active="activeActors.capaIntegracion"
          :show-description="showDescriptions" :current-action="actorActions.capaIntegracion" />

        <ConnectionLine v-if="visibleConnections.integracionToTercero" :visible="connections.integracionToTercero"
          :animated="animatedConnections.integracionToTercero" label="Datos Transaccionales" />

        <!-- Fase 6: Análisis -->
        <ExperianActor v-if="visibleActors.experian" :active="activeActors.experian"
          :show-description="showDescriptions" :current-action="actorActions.experian" />

        <ConnectionLine v-if="visibleConnections.experianToTercero" :visible="connections.experianToTercero"
          :animated="animatedConnections.experianToTercero" label="Transactional Insights" />

        <ConnectionLine v-if="visibleConnections.terceroToCiudadano" :visible="connections.terceroToCiudadano"
          :animated="animatedConnections.terceroToCiudadano" label="¡Crédito Aprobado!" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from 'vue'
// Import all actor components
import CiudadanoActor from '../components/CiudadanoActor.vue'
import TerceroReceptorActor from '../components/TerceroReceptorActor.vue'
import ProveedorDatosActor from '../components/ProveedorDatosActor.vue'
import ApiManagerActor from '../components/ApiManagerActor.vue'
import ServidorIdpActor from '../components/ServidorIdpActor.vue'
import DirectorioParticipantesActor from '../components/DirectorioParticipantesActor.vue'
import GestorConsentimientoActor from '../components/GestorConsentimientoActor.vue'
import CapaIntegracionActor from '../components/CapaIntegracionActor.vue'
import SistemasCoreActor from '../components/SistemasCoreActor.vue'
import ExperianActor from '../components/ExperianActor.vue'
import ConnectionLine from '../components/ConnectionLine.vue'
import ArcConnection from '../components/ArcConnection.vue'

// Manual control
const STORAGE_STEP_KEY = 'technicalFlow.stepIndex'
const STORAGE_DESC_KEY = 'technicalFlow.showDescriptions'

const showDescriptions = ref(false)
const currentStep = ref(0)
let totalSteps = 0
const flowDiagramRef = ref<HTMLElement | null>(null)
const stepIndex = ref(0) // 0-based index for phases

// Current phase information
const currentPhase = ref({
  name: 'Inicializando...',
  description: ''
})

// Active actors state
const activeActors = reactive({
  ciudadano: false,
  terceroReceptor: false,
  proveedorDatos: false,
  apiManager: false,
  servidorIdp: false,
  directorioParticipantes: false,
  gestorConsentimiento: false,
  capaIntegracion: false,
  sistemasCore: false,
  experian: false
})

// Actor current actions
const actorActions = reactive({
  ciudadano: 'Esperando...',
  terceroReceptor: 'Esperando...',
  proveedorDatos: 'Esperando...',
  apiManager: 'Esperando...',
  servidorIdp: 'Esperando...',
  directorioParticipantes: 'Esperando...',
  gestorConsentimiento: 'Esperando...',
  capaIntegracion: 'Esperando...',
  sistemasCore: 'Esperando...',
  experian: 'Esperando...'
})

// Connection visibility
const connections = reactive({
  ciudadanoToTercero: false,
  terceroToApi: false,
  terceroToProveedor: false,
  proveedorToApi: false,
  apiToCiudadano: false,
  apiToIdp: false,
  idpToDirectorio: false,
  directorioToIdp: false,
  idpToGestor: false,
  coreToIntegracion: false,
  integracionToTercero: false,
  experianToTercero: false,
  terceroToCiudadano: false,
  apiArcToCiudadano: false
})

// Animated connections (moving circles)
const animatedConnections = reactive({
  ciudadanoToTercero: false,
  terceroToApi: false,
  terceroToProveedor: false,
  proveedorToApi: false,
  apiToCiudadano: false,
  apiToIdp: false,
  idpToDirectorio: false,
  directorioToIdp: false,
  idpToGestor: false,
  coreToIntegracion: false,
  integracionToTercero: false,
  experianToTercero: false,
  terceroToCiudadano: false,
  apiArcToCiudadano: false
})

// Visibility control - only show actors when they appear in the flow
const visibleActors = reactive({
  ciudadano: false,
  terceroReceptor: false,
  proveedorDatos: false,
  apiManager: false,
  servidorIdp: false,
  directorioParticipantes: false,
  gestorConsentimiento: false,
  capaIntegracion: false,
  sistemasCore: false,
  experian: false
})

// Visibility control for connections
const visibleConnections = reactive({
  ciudadanoToTercero: false,
  terceroToApi: false,
  terceroToProveedor: false,
  proveedorToApi: false,
  apiToCiudadano: false,
  apiToIdp: false,
  idpToDirectorio: false,
  directorioToIdp: false,
  idpToGestor: false,
  coreToIntegracion: false,
  integracionToTercero: false,
  experianToTercero: false,
  terceroToCiudadano: false,
  apiArcToCiudadano: false
})

let animationInterval: number | null = null
let animationTimeouts: number[] = []
const PRE_SCROLL_FROM_INDEX = 5 // 0-based; 5 => Paso 6 y siguientes
const LINE_DOWN_ONCE_MS = 1800
const apiBadgeCredencialesVisible = ref(false)
const apiBadgeConsentimientoVisible = ref(false)
const apiBadgeConsentimientoFading = ref(false)
const idpBadgeCredencialesVisible = ref(false)
const idpBadgeSolicitudTokenVisible = ref(false)

const clearTimers = () => {
  animationTimeouts.forEach(timeout => clearTimeout(timeout))
  animationTimeouts = []
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

// Arc UI state for steps 4 and 5
const arcUi = reactive({
  durationMs: 3600,
  top: 140,
  right: -70,
  widthPx: 450,
  heightPx: 1000,
  bulgeFactor: 1.10,
  midLabel1: 'Solicitud',
  midLabel2: 'Credenciales + Consentimiento',
  mid2Label1: 'Credenciales',
  mid2Label2: '+ Consentimiento',
  activeMid: 1 as 1 | 2,
  checkVisible: false,
  direction: 'up' as 'up' | 'down'
})

// Dynamic line labels, checks and direction flags (reuse same line both ways)
const lineLabels = reactive({
  idpToDirectorio: ''
})
const lineLabelChecks = reactive({
  idpToDirectorio: false
})
const lineDirectionUp = reactive({
  idpToDirectorio: false
})

// Animation phases definition
const phases = [
  {
    name: '1. Solicitud de crédito',
    description: 'Ciudadano inicia solicitud',
    actions: () => {
      resetAll()
      visibleActors.ciudadano = true
      activeActors.ciudadano = true
      actorActions.ciudadano = 'Inicia solicitud de crédito'
      autoScrollToBottom()

      // Paso 1 secuencia solicitada:
      // - 3s después: mostrar TRD
      // - 1s después: mostrar línea de conexión
      // - después: bola baja una sola vez
      const t1 = window.setTimeout(() => {
        visibleActors.terceroReceptor = true
        activeActors.terceroReceptor = true
        actorActions.terceroReceptor = 'Procesa solicitud de crédito'
        autoScrollToBottom()
      }, 3000)

      const t2 = window.setTimeout(() => {
        visibleConnections.ciudadanoToTercero = true
        connections.ciudadanoToTercero = true
        autoScrollToBottom()
      }, 3000 + 1000)

      // Esperar a que la línea se revele (0.6s) para iniciar la bola
      const t3 = window.setTimeout(() => {
        animatedConnections.ciudadanoToTercero = true
        autoScrollToBottom()
      }, 3000 + 1000 + 600)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
      animationTimeouts.push(t3 as unknown as number)
    }
  },
  {
    name: '2. Solicitud Creación de Consentimiento',
    description: 'Proveedor de datos y línea hacia abajo',
    actions: () => {
      // Asegurar que Ciudadano y TRD estén visibles
      visibleActors.ciudadano = true
      activeActors.ciudadano = true
      visibleActors.terceroReceptor = true
      activeActors.terceroReceptor = true
      actorActions.terceroReceptor = 'Solicita creación de consentimiento'

      // Aparece tarjeta Proveedor de Datos
      visibleActors.proveedorDatos = true
      activeActors.proveedorDatos = true
      actorActions.proveedorDatos = 'Prepara canales de datos'

      // 1s después aparece la línea TRD → Proveedor
      const t1 = window.setTimeout(() => {
        connections.terceroToProveedor = true
        visibleConnections.terceroToProveedor = true
        autoScrollToBottom()
      }, 1000)

      // Tras revelar la línea (0.6s), inicia la bola hacia abajo una vez
      const t2 = window.setTimeout(() => {
        animatedConnections.terceroToProveedor = true
        autoScrollToBottom()
      }, 1000 + 600)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
    }
  },
  {
    name: '3. Solicitud Creación de Consentimiento 2',
    description: 'API Manager Gateway abajo de Proveedor',
    actions: () => {
      // Asegurar contexto previo
      visibleActors.ciudadano = true
      activeActors.ciudadano = true
      visibleActors.terceroReceptor = true
      activeActors.terceroReceptor = true
      visibleActors.proveedorDatos = true
      activeActors.proveedorDatos = true

      // Aparece tarjeta API Manager Gateway
      visibleActors.apiManager = true
      activeActors.apiManager = true
      actorActions.apiManager = 'Recibe solicitud de creación de consentimiento'

      // 1s después aparece la línea Proveedor → API
      const t1 = window.setTimeout(() => {
        connections.proveedorToApi = true
        visibleConnections.proveedorToApi = true
        autoScrollToBottom()
      }, 1000)

      // Tras revelar la línea (0.6s), inicia la bola hacia abajo una vez
      const t2 = window.setTimeout(() => {
        animatedConnections.proveedorToApi = true
        autoScrollToBottom()
      }, 1000 + 600)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
    }
  },
  {
    name: '4. Consentimiento hacia el Ciudadano',
    description: 'Arco API Manager → Ciudadano, bola sube 1 vez',
    actions: () => {
      // Asegurar actores a la vista
      visibleActors.ciudadano = true
      activeActors.ciudadano = true
      visibleActors.terceroReceptor = true
      activeActors.terceroReceptor = true
      visibleActors.proveedorDatos = true
      activeActors.proveedorDatos = true
      visibleActors.apiManager = true
      activeActors.apiManager = true

      // Mostrar arco especial y animar (sube)
      connections.apiArcToCiudadano = true
      visibleConnections.apiArcToCiudadano = true
      arcUi.activeMid = 1
      arcUi.checkVisible = false
      arcUi.direction = 'up'
      const t1 = window.setTimeout(() => {
        animatedConnections.apiArcToCiudadano = true
        autoScrollToBottom()
      }, 600)
      animationTimeouts.push(t1 as unknown as number)
    }
  },
  {
    name: '5. Confirmación de Credenciales',
    description: 'Texto cambia con check y bola baja 1 vez',
    actions: () => {
      // Asegurar actores visibles y arco activo
      visibleActors.ciudadano = true
      activeActors.ciudadano = true
      visibleActors.terceroReceptor = true
      activeActors.terceroReceptor = true
      visibleActors.proveedorDatos = true
      activeActors.proveedorDatos = true
      visibleActors.apiManager = true
      activeActors.apiManager = true

      connections.apiArcToCiudadano = true
      visibleConnections.apiArcToCiudadano = true

      // Cambiar texto: fade out grupo 1 y fade in grupo 2 con check
      arcUi.activeMid = 2
      arcUi.checkVisible = true
      arcUi.direction = 'down'

      // Reiniciar animación de la bola en dirección descendente tras 1s
      animatedConnections.apiArcToCiudadano = false
      // Forzar re-montaje del arco para reiniciar la animación de SVG con garantías
      const remountDelay = 50
      visibleConnections.apiArcToCiudadano = false
      const t0 = window.setTimeout(() => {
        visibleConnections.apiArcToCiudadano = true
      }, remountDelay)
      const t1 = window.setTimeout(() => {
        animatedConnections.apiArcToCiudadano = true
        autoScrollToBottom()
      }, 1000 + remountDelay)
      // Al terminar la bajada, mostrar badges inferiores en API Manager
      apiBadgeCredencialesVisible.value = false
      apiBadgeConsentimientoVisible.value = false
      idpBadgeCredencialesVisible.value = false
      const t2 = window.setTimeout(() => {
        apiBadgeCredencialesVisible.value = true
        apiBadgeConsentimientoVisible.value = true
      }, 1000 + remountDelay + arcUi.durationMs)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t0 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
    }
  },
  {
    name: '6. Solicitud Token Acceso',
    description: 'Aparece Servidor IdP, línea y bola baja',
    actions: () => {
      // Asegurar API Manager visible
      visibleActors.apiManager = true
      activeActors.apiManager = true
      // Aparece tarjeta Servidor IdP
      visibleActors.servidorIdp = true
      activeActors.servidorIdp = true
      actorActions.servidorIdp = 'Recibe solicitud de token de acceso'

      // 1s después aparece la línea API → IdP
      const t1 = window.setTimeout(() => {
        visibleConnections.apiToIdp = true
        connections.apiToIdp = true
        autoScrollToBottom()
      }, 1000)

      // Tras revelar la línea (0.6s), inicia la bola hacia abajo una vez
      const t2 = window.setTimeout(() => {
        animatedConnections.apiToIdp = true
        autoScrollToBottom()
      }, 1000 + 600)

      // Al terminar la bajada, primero mostrar badge superior "Solicitud Token de acceso" en IdP
      const finishDown = 1000 + 600 + LINE_DOWN_ONCE_MS
      const t3 = window.setTimeout(() => {
        apiBadgeCredencialesVisible.value = false
        idpBadgeSolicitudTokenVisible.value = true
      }, finishDown)

      // Luego (suavemente después) aparece badge "Credenciales" dentro de IdP
      const t4 = window.setTimeout(() => {
        idpBadgeCredencialesVisible.value = true
      }, finishDown + 600)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
      animationTimeouts.push(t3 as unknown as number)
      animationTimeouts.push(t4 as unknown as number)
    }
  },
  {
    name: '7. Validación Registro Tercero Receptor De Datos',
    description: 'Directorio de Participantes (SFC), línea y bola hacia abajo',
    actions: () => {
      // Asegurar Servidor IdP visible del paso anterior
      visibleActors.servidorIdp = true
      activeActors.servidorIdp = true
      actorActions.servidorIdp = 'Valida registro del TRD'

      // Aparece tarjeta Directorio de Participantes (SFC)
      visibleActors.directorioParticipantes = true
      activeActors.directorioParticipantes = true
      actorActions.directorioParticipantes = 'Valida registro técnico del TRD'

      // 1s después aparece la línea IdP → Directorio
      const t1 = window.setTimeout(() => {
        visibleConnections.idpToDirectorio = true
        connections.idpToDirectorio = true
        lineLabels.idpToDirectorio = 'Validación Registro TRD'
        lineLabelChecks.idpToDirectorio = false
        lineDirectionUp.idpToDirectorio = false
        autoScrollToBottom()
      }, 1000)

      // Tras revelar la línea (0.6s), inicia la bola hacia abajo una vez
      const t2 = window.setTimeout(() => {
        animatedConnections.idpToDirectorio = true
        autoScrollToBottom()
      }, 1000 + 600)

      animationTimeouts.push(t1 as unknown as number)
      animationTimeouts.push(t2 as unknown as number)
    }
  },
  {
    name: '8. Certificado SSA',
    description: 'La bola sube por la misma línea y el label cambia con check',
    actions: () => {
      // Asegurar tarjetas visibles
      visibleActors.servidorIdp = true
      activeActors.servidorIdp = true
      visibleActors.directorioParticipantes = true
      activeActors.directorioParticipantes = true
      actorActions.directorioParticipantes = 'Emite Certificado SSA'

      // Reutilizar misma línea: cambiar label y dirección hacia arriba
      visibleConnections.idpToDirectorio = true
      connections.idpToDirectorio = true
      lineLabels.idpToDirectorio = 'Certificado SSA'
      lineLabelChecks.idpToDirectorio = true
      lineDirectionUp.idpToDirectorio = true

      // Reiniciar animación de la bola (toggle)
      animatedConnections.idpToDirectorio = false
      const t1 = window.setTimeout(() => {
        animatedConnections.idpToDirectorio = true
        autoScrollToBottom()
      }, 60)

      animationTimeouts.push(t1 as unknown as number)
    }
  },
  {
    name: '9. Gestor de Consentimientos',
    description: 'Desaparece SFC; aparece Gestor, línea y bola baja',
    actions: () => {
      // 1) Desaparecer suavemente Directorio de Participantes y su línea
      animatedConnections.idpToDirectorio = false
      lineLabels.idpToDirectorio = ''
      lineLabelChecks.idpToDirectorio = false
      // fade de la línea
      const hideLine = window.setTimeout(() => {
        visibleConnections.idpToDirectorio = false
        connections.idpToDirectorio = false
      }, 200)
      // fade out del actor (quitando active) y luego ocultarlo
      activeActors.directorioParticipantes = false
      const hideActor = window.setTimeout(() => {
        visibleActors.directorioParticipantes = false
      }, 600)

      // 2) Aparecer Gestor de Consentimientos
      const showGestor = window.setTimeout(() => {
        visibleActors.gestorConsentimiento = true
        activeActors.gestorConsentimiento = true
        actorActions.gestorConsentimiento = 'Almacena consentimiento del usuario'
      }, 700)

      // 3) 1s después, línea IdP → Gestor y bola que baja una vez
      const showLine = window.setTimeout(() => {
        visibleConnections.idpToGestor = true
        connections.idpToGestor = true
      }, 700 + 1000)

      const animateBall = window.setTimeout(() => {
        animatedConnections.idpToGestor = true
      }, 700 + 1000 + 600)

      // Al mismo tiempo, ocultar suavemente el badge de "Consentimiento" en API Manager
      const fadeConsent = window.setTimeout(() => {
        apiBadgeConsentimientoFading.value = true
        const finalize = window.setTimeout(() => {
          apiBadgeConsentimientoVisible.value = false
          apiBadgeConsentimientoFading.value = false
        }, 350)
        animationTimeouts.push(finalize as unknown as number)
      }, 700 + 1000)

      animationTimeouts.push(hideLine as unknown as number)
      animationTimeouts.push(hideActor as unknown as number)
      animationTimeouts.push(showGestor as unknown as number)
      animationTimeouts.push(showLine as unknown as number)
      animationTimeouts.push(animateBall as unknown as number)
      animationTimeouts.push(fadeConsent as unknown as number)
    }
  },
  {
    name: '10. Validación TRD',
    description: 'Verificando registro',
    actions: () => {
      visibleConnections.idpToDirectorio = true
      connections.idpToDirectorio = true
      actorActions.servidorIdp = 'Valida registro del TRD'
      setTimeout(() => {
        animatedConnections.idpToDirectorio = true
        autoScrollToBottom()
      }, 300)
    }
  },
  {
    name: '11. Directorio Participantes',
    description: 'Validando participante',
    actions: () => {
      visibleActors.directorioParticipantes = true
      activeActors.directorioParticipantes = true
      actorActions.directorioParticipantes = 'Valida registro técnico del TRD'
      autoScrollToBottom()
    }
  },
  {
    name: '12. Certificado SSA',
    description: 'Emitiendo certificado',
    actions: () => {
      visibleConnections.directorioToIdp = true
      connections.directorioToIdp = true
      actorActions.directorioParticipantes = 'Emite certificado SSA'
      setTimeout(() => {
        animatedConnections.directorioToIdp = true
        autoScrollToBottom()
      }, 300)
    }
  },
  {
    name: '13. Almacenar Consentimiento',
    description: 'Guardando consentimiento',
    actions: () => {
      visibleActors.gestorConsentimiento = true
      activeActors.gestorConsentimiento = true
      actorActions.gestorConsentimiento = 'Almacena consentimiento del usuario'
      autoScrollToBottom()
    }
  },
  {
    name: '14. Sistemas Core Activos',
    description: 'Preparando datos',
    actions: () => {
      visibleActors.sistemasCore = true
      activeActors.sistemasCore = true
      actorActions.sistemasCore = 'Servicios cloud y legacy activos'
      autoScrollToBottom()
    }
  },
  {
    name: '15. Datos a Integración',
    description: 'Enviando datos periódicos',
    actions: () => {
      visibleConnections.coreToIntegracion = true
      connections.coreToIntegracion = true
      actorActions.sistemasCore = 'Envía datos periódicos'
      setTimeout(() => {
        animatedConnections.coreToIntegracion = true
        autoScrollToBottom()
      }, 300)
    }
  },
  {
    name: '16. Capa de Integración',
    description: 'Base de datos réplica',
    actions: () => {
      visibleActors.capaIntegracion = true
      activeActors.capaIntegracion = true
      actorActions.capaIntegracion = 'Base de datos réplica actualizada'
      autoScrollToBottom()
    }
  },
  {
    name: '17. Datos Transaccionales',
    description: 'Enviando datos al TRD',
    actions: () => {
      visibleConnections.integracionToTercero = true
      connections.integracionToTercero = true
      actorActions.capaIntegracion = 'Envía datos transaccionales'
      setTimeout(() => {
        animatedConnections.integracionToTercero = true
        autoScrollToBottom()
      }, 300)
    }
  },
  {
    name: '18. Análisis Experian',
    description: 'Procesando insights',
    actions: () => {
      visibleActors.experian = true
      activeActors.experian = true
      actorActions.experian = 'Genera transactional insights'
      visibleConnections.experianToTercero = true
      connections.experianToTercero = true
      setTimeout(() => {
        animatedConnections.experianToTercero = true
        autoScrollToBottom()
      }, 300)
    }
  },
  {
    name: '19. Resultado Final',
    description: 'Notificando al ciudadano',
    actions: () => {
      visibleConnections.terceroToCiudadano = true
      connections.terceroToCiudadano = true
      actorActions.terceroReceptor = 'Comunica decisión de crédito'
      actorActions.ciudadano = '¡Crédito Aprobado!'
      setTimeout(() => {
        animatedConnections.terceroToCiudadano = true
        autoScrollToBottom()
      }, 300)
    }
  }
]

// Derivar total
totalSteps = phases.length

// Persistencia de estado
watch(() => stepIndex.value, (val) => {
  localStorage.setItem(STORAGE_STEP_KEY, String(val))
  currentStep.value = val + 1
})

watch(showDescriptions, (v) => {
  localStorage.setItem(STORAGE_DESC_KEY, v ? '1' : '0')
})

// Auto-scroll function
const autoScrollToBottom = async () => {
  await nextTick()
  if (flowDiagramRef.value) {
    flowDiagramRef.value.scrollTo({
      top: flowDiagramRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

// Reset all states
const resetAll = () => {
  Object.keys(activeActors).forEach(key => {
    activeActors[key as keyof typeof activeActors] = false
  })
  Object.keys(connections).forEach(key => {
    connections[key as keyof typeof connections] = false
  })
  Object.keys(animatedConnections).forEach(key => {
    animatedConnections[key as keyof typeof animatedConnections] = false
  })
  Object.keys(visibleActors).forEach(key => {
    visibleActors[key as keyof typeof visibleActors] = false
  })
  Object.keys(visibleConnections).forEach(key => {
    visibleConnections[key as keyof typeof visibleConnections] = false
  })
  Object.keys(actorActions).forEach(key => {
    actorActions[key as keyof typeof actorActions] = 'Esperando...'
  })
  apiBadgeCredencialesVisible.value = false
  apiBadgeConsentimientoVisible.value = false
  apiBadgeConsentimientoFading.value = false
  idpBadgeCredencialesVisible.value = false
  idpBadgeSolicitudTokenVisible.value = false
  lineLabels.idpToDirectorio = ''
  lineLabelChecks.idpToDirectorio = false
  lineDirectionUp.idpToDirectorio = false
}

// Manual step control
const applyPhase = (index: number) => {
  if (index < 0 || index >= phases.length) return
  clearTimers()
  currentStep.value = index + 1
  currentPhase.value = phases[index]
  if (index >= PRE_SCROLL_FROM_INDEX) {
    // Pre-scroll antes de iniciar el paso
    autoScrollToBottom()
    const t = window.setTimeout(() => {
      phases[index].actions()
    }, 150)
    animationTimeouts.push(t as unknown as number)
  } else {
    phases[index].actions()
  }
}

const goToStep = (index: number) => {
  if (index < 0) index = 0
  if (index >= phases.length) index = phases.length - 1
  // Rebuild state up to target step
  clearTimers()
  resetAll()
  for (let i = 0; i < index; i++) {
    phases[i].actions()
  }
  stepIndex.value = index
  currentStep.value = index + 1
  currentPhase.value = phases[index]
  if (index >= PRE_SCROLL_FROM_INDEX) {
    autoScrollToBottom()
    const t = window.setTimeout(() => {
      phases[index].actions()
    }, 150)
    animationTimeouts.push(t as unknown as number)
  } else {
    phases[index].actions()
  }
}

const nextStep = () => {
  if (stepIndex.value < phases.length - 1) {
    stepIndex.value += 1
    applyPhase(stepIndex.value)
  }
}

const prevStep = () => {
  if (stepIndex.value > 0) {
    stepIndex.value -= 1
    goToStep(stepIndex.value)
  }
}

const resetAnimation = () => {
  clearTimers()
  stepIndex.value = 0
  resetAll()
  // Show first phase (Ciudadano) immediately
  applyPhase(0)
}

const toggleDescriptions = () => {
  showDescriptions.value = !showDescriptions.value
}

onMounted(() => {
  // Restaurar estado desde almacenamiento
  const savedStep = parseInt(localStorage.getItem(STORAGE_STEP_KEY) || '0', 10)
  const savedDesc = localStorage.getItem(STORAGE_DESC_KEY)
  showDescriptions.value = savedDesc === '1'
  if (!Number.isNaN(savedStep) && savedStep > 0) {
    goToStep(savedStep)
  } else {
    resetAnimation()
  }
})

onUnmounted(() => {
  animationTimeouts.forEach(timeout => clearTimeout(timeout))
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style scoped>
.technical-flow-container {
  width: 100vw;
  height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  color: #1f2937;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(186, 45, 125, 0.15) 0%, transparent 50%);
  animation: backgroundFlow 20s ease-in-out infinite;
}

@keyframes backgroundFlow {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 0.6;
  }
}

.title-section {
  text-align: center;
  margin-bottom: 2rem;
  z-index: 10;
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, rgb(97, 40, 120), rgb(186, 45, 125));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {

  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.3);
  }
}

.subtitle {
  font-size: 1.2rem;
  color: #6b7280;
  margin: 0;
  opacity: 0.95;
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  max-width: 900px;
  width: 100%;
  position: relative;
  padding: 2rem 1rem;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  scroll-behavior: smooth;
}

/* Stack group to eliminate internal gaps so the line touches actor edges */
.stack-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.node {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 180px;
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}

.node.active {
  transform: scale(1) translateY(0);
  opacity: 1;
  border-color: #6366f1;
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
  animation: nodeGlow 3s ease-in-out infinite;
}

@keyframes nodeGlow {

  0%,
  100% {
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
    border-color: #6366f1;
  }

  50% {
    box-shadow: 0 0 60px rgba(99, 102, 241, 0.9);
    border-color: #8b5cf6;
  }
}

.node-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.node-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e2e8f0;
  line-height: 1.3;
}

.ciudadano-node .node-icon {
  filter: drop-shadow(0 0 10px #fbbf24);
}

.tercero-node .node-icon {
  filter: drop-shadow(0 0 10px #06b6d4);
}

.arrow-connection {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.arrow-connection.visible {
  opacity: 1;
}

.moving-circle {
  filter: drop-shadow(0 0 12px currentColor);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.moving-circle.active {
  opacity: 1;
  animation: circleGlow 1.5s ease-in-out infinite;
}

@keyframes circleGlow {

  0%,
  100% {
    filter: drop-shadow(0 0 12px currentColor);
  }

  50% {
    filter: drop-shadow(0 0 20px currentColor);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .technical-flow-container {
    padding: 1rem;
  }

  .flow-diagram {
    gap: 1.5rem;
    max-width: 300px;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .node {
    min-width: 150px;
    padding: 1.5rem;
  }

  .node-icon {
    font-size: 2.5rem;
  }

  .arrow-connection {
    width: 80px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }

  .flow-diagram {
    gap: 1rem;
    max-width: 250px;
  }

  .node {
    min-width: 120px;
    padding: 1rem;
  }

  .node-icon {
    font-size: 2rem;
  }

  .node-label {
    font-size: 0.9rem;
  }

  .arrow-connection {
    width: 60px;
    height: 120px;
  }
}

/* Phase indicator */
.phase-indicator {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.phase-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

.phase-step {
  font-size: 0.9rem;
  color: #6b7280;
  opacity: 0.9;
}

/* Flow controls */
.flow-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  z-index: 100;
}

.control-btn {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.control-btn:hover {
  background: linear-gradient(21deg, rgb(107, 50, 130) 0%, rgb(196, 55, 135) 100%);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(97, 40, 120, 0.4);
}

.control-btn.active {
  background: linear-gradient(21deg, rgb(117, 60, 140) 0%, rgb(206, 65, 145) 100%);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 6px 25px rgba(97, 40, 120, 0.5);
}

.control-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Scrollbar styling for webkit browsers */
.flow-diagram::-webkit-scrollbar {
  width: 6px;
}

.flow-diagram::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.flow-diagram::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.flow-diagram::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .flow-controls {
    gap: 0.3rem;
    margin-top: 1rem;
  }

  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .phase-indicator {
    margin-top: 0.5rem;
  }

  .phase-name {
    font-size: 1rem;
  }

  .phase-step {
    font-size: 0.8rem;
  }

  .flow-diagram {
    max-height: 60vh;
    padding: 1rem 0;
  }
}

/* API Manager bottom badges */
.bottom-badges {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  opacity: 0;
  transform: translateY(6px);
  animation: fadeUp 0.45s ease forwards;
}
.badge-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(76, 175, 80, 0.08);
  border: 1px solid rgba(76, 175, 80, 0.25);
  border-radius: 999px;
  padding: 4px 10px;
}
.badge-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #ffffff;
}
.badge-check { display: block; }
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(6px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fadeOut {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(4px); }
}
.badge-item.fade-out {
  animation: fadeOut 0.35s ease forwards;
}

/* Top badge inside actor (used in IdP) */
.top-badge {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
  color: #fff;
  padding: 2px 16px; /* menos alto, más ancho */
  min-width: 220px; /* más ancho visual */
  border-radius: 999px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  opacity: 0;
  transform-origin: top center;
  animation: fadeDrop 0.35s ease forwards;
}
.top-badge .badge-check { width: 14px; height: 14px; }
.top-badge-text { font-size: 0.8rem; font-weight: 700; line-height: 1.1; }
@keyframes fadeDrop {
  0% { opacity: 0; transform: translate(-50%, -4px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
</style>
