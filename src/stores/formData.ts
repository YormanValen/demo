import { defineStore } from 'pinia'

// Tipos usados por el PDF
export type DatosSolicitante = {
  tipoDocumento?: string
  numeroIdentificacion?: string
  primerNombre?: string
  primerApellido?: string
  fechaExpedicion?: string
  celular?: string
  correo?: string
}

export type SolicitudCredito = {
  tipoCredito?: string
  ingresosMensuales?: string
  otrosIngresos?: string
  montoSolicitado?: string
  actividadEconomica?: string
  antiguedad?: string
  estadoCivil?: string
  nivelEducativo?: string
  gastosMensuales?: string
  numeroRadicacion?: string
}

export type DatosGenerales = {
  fechaTramite?: { dia?: string; mes?: string; anio?: string }
}

type State = {
  datosGenerales: DatosGenerales
  solicitante: DatosSolicitante
  solicitud: SolicitudCredito
}

const STORAGE_KEY = 'formData'

// Helper functions for localStorage persistence
function loadFromStorage(): State {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.warn('Error loading form data from localStorage:', error)
  }
  return {
    datosGenerales: {},
    solicitante: {},
    solicitud: {},
  }
}

function saveToStorage(state: State): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Error saving form data to localStorage:', error)
  }
}

export const useFormDataStore = defineStore('formData', {
  state: (): State => loadFromStorage(),
  getters: {
    hasData: (state): boolean => {
      return (
        Object.keys(state.datosGenerales).length > 0 ||
        Object.keys(state.solicitante).length > 0 ||
        Object.keys(state.solicitud).length > 0
      )
    },
    asPdfProps: (state) => ({
      datosGenerales: state.datosGenerales,
      solicitante: state.solicitante,
      solicitud: state.solicitud,
    }),
  },
  actions: {
    setFromRegistrationStep1(payload: Partial<DatosSolicitante> & Partial<DatosGenerales>) {
      const s = this.solicitante
      if (payload.tipoDocumento !== undefined) s.tipoDocumento = payload.tipoDocumento
      if (payload.numeroIdentificacion !== undefined) s.numeroIdentificacion = payload.numeroIdentificacion
      if (payload.primerNombre !== undefined) s.primerNombre = payload.primerNombre
      if (payload.primerApellido !== undefined) s.primerApellido = payload.primerApellido
      if (payload.fechaExpedicion !== undefined) s.fechaExpedicion = payload.fechaExpedicion
      if (payload.celular !== undefined) s.celular = payload.celular
      if (payload.correo !== undefined) s.correo = payload.correo
      if (payload.fechaTramite !== undefined) this.datosGenerales.fechaTramite = payload.fechaTramite
      
      // Persist to localStorage
      saveToStorage(this.$state)
    },
    setFromFinancialForm(payload: Partial<SolicitudCredito>) {
      const t = this.solicitud
      if (payload.tipoCredito !== undefined) t.tipoCredito = payload.tipoCredito
      if (payload.ingresosMensuales !== undefined) t.ingresosMensuales = payload.ingresosMensuales
      if (payload.otrosIngresos !== undefined) t.otrosIngresos = payload.otrosIngresos
      if (payload.montoSolicitado !== undefined) t.montoSolicitado = payload.montoSolicitado
      if (payload.actividadEconomica !== undefined) t.actividadEconomica = payload.actividadEconomica
      if (payload.antiguedad !== undefined) t.antiguedad = payload.antiguedad
      if (payload.estadoCivil !== undefined) t.estadoCivil = payload.estadoCivil
      if (payload.nivelEducativo !== undefined) t.nivelEducativo = payload.nivelEducativo
      if (payload.gastosMensuales !== undefined) t.gastosMensuales = payload.gastosMensuales
      if (payload.numeroRadicacion !== undefined) t.numeroRadicacion = payload.numeroRadicacion
      
      // Persist to localStorage
      saveToStorage(this.$state)
    },
    setFechaTramite(fecha?: DatosGenerales['fechaTramite']) {
      this.datosGenerales.fechaTramite = fecha
      
      // Persist to localStorage
      saveToStorage(this.$state)
    },
    setNumeroRadicacion(numero?: string) {
      this.solicitud.numeroRadicacion = numero
      
      // Persist to localStorage
      saveToStorage(this.$state)
    },
    reset() {
      this.datosGenerales = {}
      this.solicitante = {}
      this.solicitud = {}
      
      // Clear localStorage
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (error) {
        console.warn('Error clearing form data from localStorage:', error)
      }
    },
    // New method to manually save to localStorage
    persist() {
      saveToStorage(this.$state)
    },
    // New method to manually load from localStorage
    restore() {
      const savedData = loadFromStorage()
      this.datosGenerales = savedData.datosGenerales
      this.solicitante = savedData.solicitante
      this.solicitud = savedData.solicitud
    },
  },
})
