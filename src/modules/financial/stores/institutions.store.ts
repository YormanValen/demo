import { defineStore } from 'pinia'

export interface ConnectedInstitution {
  id: number
  name: string
  logo: string
  status: string
  connected: boolean
  initialDate: string
  expirationDate: string
  bankInitials: string
  bankColor: string
}

const STORAGE_KEY = 'connected-institutions'

export const useInstitutionsStore = defineStore('institutions', {
  state: () => ({
    connectedInstitutions: [] as ConnectedInstitution[]
  }),

  getters: {
    hasConnectedInstitutions(): boolean {
      return this.connectedInstitutions.length > 0
    },

    getInstitutionById: (state) => (id: number) => {
      return state.connectedInstitutions.find(inst => inst.id === id)
    }
  },

  actions: {
    addInstitution(institution: ConnectedInstitution) {
      const existingIndex = this.connectedInstitutions.findIndex(inst => inst.id === institution.id)
      if (existingIndex === -1) {
        this.connectedInstitutions.push(institution)
        this.saveToLocalStorage()
      }
    },

    removeInstitution(institutionId: number) {
      const index = this.connectedInstitutions.findIndex(inst => inst.id === institutionId)
      if (index !== -1) {
        this.connectedInstitutions.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    clearAllInstitutions() {
      this.connectedInstitutions = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.connectedInstitutions))
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          this.connectedInstitutions = JSON.parse(stored)
        } catch (error) {
          console.warn('Error parsing stored institutions:', error)
          this.clearAllInstitutions()
        }
      }
    },

    initializeStore() {
      this.clearAllInstitutions()
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})