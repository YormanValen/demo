<template>
  <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="modal-title">
          <h2>Configuración de Clave API</h2>
          <p class="api-key-name">{{ apiKey?.keyMasked }}</p>
        </div>
        <button class="close-btn" @click="$emit('close')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" />
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button class="tab-btn" :class="{ active: activeTab === 'parameters' }" @click="activeTab = 'parameters'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 20h9" stroke="currentColor" stroke-width="2" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="2" />
          </svg>
          Parámetros
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'configuration' }" @click="activeTab = 'configuration'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              stroke="currentColor" stroke-width="2" />
          </svg>
          Configuración de API
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Parameters Tab -->
        <div v-if="activeTab === 'parameters'" class="tab-panel">
          <div class="form-section">
            <div class="section-header">
              <h3>Parámetros</h3>
              <button class="add-btn" @click="addParameter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" />
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" />
                </svg>
                Agregar Parámetro
              </button>
            </div>

            <div class="parameters-list">
              <div v-for="(param, index) in parameters.list" :key="index" class="parameter-item">
                <div class="parameter-select">
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="param.selected">
                    <span class="checkmark"></span>
                  </label>
                </div>

                <div class="parameter-type">
                  <select v-model="param.type" @change="updateDefaultValue(param)" class="form-select">
                    <option value="api_key">Clave API</option>
                    <option value="api_secret">Clave secreta</option>
                    <option value="created_at">Fecha de Creación</option>
                    <option value="expiration_date">Fecha de Expiración</option>
                  </select>
                </div>

                <div class="parameter-value">
                  <input type="text" v-model="param.value" class="form-input" :placeholder="getPlaceholder(param.type)">
                </div>

                <div class="parameter-actions">
                  <button class="delete-btn" @click="removeParameter(index)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" />
                      <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
                        stroke="currentColor" stroke-width="2" />
                    </svg>
                  </button>
                </div>
              </div>

              <div v-if="parameters.list.length === 0" class="empty-state">
                <p>No hay parámetros configurados</p>
                <button class="add-btn-secondary" @click="addParameter">
                  Agregar primer parámetro
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- API Configuration Tab -->
        <div v-if="activeTab === 'configuration'" class="tab-panel">
          <div class="form-section">
            <h3>Configuración General de API</h3>
            <div class="config-grid">
              <div class="config-item">
                <label>Transportes</label>
                <div class="config-value">
                  <span class="transport-tag">HTTP</span>
                  <span class="transport-tag">HTTPS</span>
                </div>
              </div>

              <div class="config-item">
                <label>Seguridad de API</label>
                <div class="config-value">
                  <span class="security-badge">OAuth2</span>
                </div>
              </div>

              <div class="config-item">
                <label>Control de Acceso</label>
                <div class="config-value">
                  <span class="access-control">Ninguno</span>
                </div>
              </div>

              <div class="config-item">
                <label>Estado del Flujo de Trabajo</label>
                <div class="config-value">
                  <span class="status-dash">-</span>
                </div>
              </div>

              <div class="config-item">
                <label>Visibilidad en Portal de Desarrollador</label>
                <div class="config-value">
                  <span class="visibility-badge public">Público</span>
                </div>
              </div>

              <div class="config-item">
                <label>Planes de Negocio</label>
                <div class="config-value">
                  <span class="plan-badge">Ilimitado</span>
                </div>
              </div>

              <div class="config-item">
                <label>Etiquetas</label>
                <div class="config-value">
                  <span class="status-dash">-</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="endpoints-header">
              <h3>🔗 Puntos de Acceso</h3>
            </div>

            <div class="endpoints-grid">
              <div class="endpoint-item">
                <label>Punto de Acceso de Producción</label>
                <div class="endpoint-value">
                  <input type="url" v-model="configuration.productionEndpoint" class="form-input endpoint-input"
                    readonly>
                  <button class="copy-endpoint-btn" @click="copyEndpoint(configuration.productionEndpoint)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="endpoint-item">
                <label>Punto de Acceso de Pruebas</label>
                <div class="endpoint-value">
                  <input type="url" v-model="configuration.sandboxEndpoint" class="form-input endpoint-input" readonly>
                  <button class="copy-endpoint-btn" @click="copyEndpoint(configuration.sandboxEndpoint)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor"
                        stroke-width="2" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="endpoint-item">
                <label>Seguridad del Punto de Acceso</label>
                <div class="config-value">
                  <span class="status-dash">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button class="btn-secondary" @click="$emit('close')">
          Cancelar
        </button>
        <button class="btn-primary" @click="saveConfiguration">
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

interface Props {
  show: boolean
  apiKey: any
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const activeTab = ref('parameters')

const parameters = reactive({
  list: [
    { type: 'api_key' as ParameterType, value: 'sk_***************', selected: true },
    { type: 'api_secret' as ParameterType, value: 'wh_***************', selected: true },
    { type: 'created_at' as ParameterType, value: '20***-**-**', selected: true },
    { type: 'expiration_date' as ParameterType, value: '20***-**-**', selected: true }
  ]
})

const configuration = reactive({
  productionEndpoint: 'https://localhost:9443/am/sample/pizzashack/v1/api/',
  sandboxEndpoint: 'https://localhost:9443/am/sample/pizzashack/v1/api/',
  name: '',
  expirationDate: ''
})

const handleOverlayClick = () => {
  emit('close')
}

const addParameter = () => {
  const defaultValues: Record<ParameterType, string> = {
    api_key: 'sk_***************',
    api_secret: 'wh_***************',
    created_at: '20***-**-**',
    expiration_date: '20***-**-**'
  }

  parameters.list.push({
    type: 'api_key' as ParameterType,
    value: defaultValues.api_key,
    selected: false
  })
}

const removeParameter = (index: number) => {
  parameters.list.splice(index, 1)
}

type ParameterType = 'api_key' | 'api_secret' | 'created_at' | 'expiration_date'

const getPlaceholder = (type: ParameterType) => {
  const placeholders: Record<ParameterType, string> = {
    api_key: 'Ingresa la Clave API',
    api_secret: 'Ingresa la Clave secreta',
    created_at: 'AAAA-MM-DD',
    expiration_date: 'AAAA-MM-DD'
  }
  return placeholders[type] || 'Ingresa el valor'
}

const updateDefaultValue = (param: { type: ParameterType; value: string; selected: boolean }) => {
  const defaultValues: Record<ParameterType, string> = {
    api_key: 'sk_***************',
    api_secret: 'wh_***************',
    created_at: '20***-**-**',
    expiration_date: '20***-**-**'
  }
  param.value = defaultValues[param.type] || ''
}

const copyEndpoint = (endpoint: string) => {
  navigator.clipboard.writeText(endpoint).then(() => {
    // Podrías mostrar una notificación aquí
    console.log('Punto de acceso copiado al portapapeles:', endpoint)
  })
}

const saveConfiguration = () => {
  // Aquí guardarías la configuración
  console.log('Guardando configuración:', { parameters, configuration })
  emit('close')
}

// Restablecer formulario cuando se abre el modal
watch(() => props.show, (newVal) => {
  if (newVal && props.apiKey) {
    // Restablecer a valores por defecto o cargar desde apiKey
    activeTab.value = 'parameters'
    configuration.name = `Clave API ${props.apiKey.id}`
    configuration.expirationDate = props.apiKey.expirationDate
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.api-key-name {
  font-size: 0.9rem;
  color: #6b7280;
  font-family: monospace;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #374151;
  background: #f3f4f6;
}

.tab-navigation {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}

.tab-btn:hover {
  color: #374151;
  background: #f1f5f9;
}

.tab-btn.active {
  color: #3b82f6;
  background: white;
  border-bottom-color: #3b82f6;
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.form-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  padding: 0;
  border: none;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background: #2563eb;
}

.add-btn-secondary {
  padding: 12px 24px;
  background: #f8fafc;
  color: #3b82f6;
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn-secondary:hover {
  background: #eff6ff;
}

.parameters-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.parameter-item {
  display: grid;
  grid-template-columns: 40px 180px 1fr 40px;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.parameter-item:hover {
  background: #f1f5f9;
  border-color: #d1d5db;
}

.parameter-select {
  display: flex;
  justify-content: center;
}

.parameter-type .form-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
}

.parameter-value .form-input {
  margin: 0;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.parameter-actions {
  display: flex;
  justify-content: center;
}

.delete-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: #fef2f2;
  color: #dc2626;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.empty-state p {
  margin: 0 0 16px 0;
  font-size: 0.9rem;
}

/* API Configuration Styles */
.config-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.config-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.config-item label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.config-value {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.transport-tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.security-badge {
  background: #dcfce7;
  color: #166534;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.access-control {
  color: #6b7280;
  font-style: italic;
  font-size: 0.9rem;
}

.status-dash {
  color: #9ca3af;
  font-size: 1.2rem;
  font-weight: 300;
}

.visibility-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.visibility-badge.public {
  background: #fef3c7;
  color: #92400e;
}

.plan-badge {
  background: #e0e7ff;
  color: #3730a3;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.endpoints-header {
  margin-bottom: 16px;
}

.endpoints-header h3 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
}

.endpoints-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.endpoint-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.endpoint-item label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.endpoint-value {
  display: flex;
  gap: 8px;
  align-items: center;
}

.endpoint-input {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  font-family: monospace;
  font-size: 0.8rem;
}

.copy-endpoint-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.copy-endpoint-btn:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

.form-group {
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item,
.radio-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
}

.checkbox-item input,
.radio-item input {
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
}

.btn-secondary,
.btn-primary {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #9ca3af;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-container {
    max-width: 100%;
    max-height: 95vh;
  }

  .modal-header,
  .tab-content,
  .modal-footer {
    padding: 16px;
  }

  .tab-btn {
    padding: 12px 16px;
    font-size: 0.8rem;
  }

  .form-section {
    padding: 16px;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .parameter-item {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px;
  }

  .parameter-select {
    order: -1;
    justify-content: flex-start;
  }

  .parameter-type {
    order: 1;
  }

  .parameter-value {
    order: 2;
  }

  .parameter-actions {
    order: 3;
    justify-content: flex-end;
  }

  .config-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .endpoint-value {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .copy-endpoint-btn {
    align-self: flex-end;
  }
}
</style>