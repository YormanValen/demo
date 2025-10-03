import { defineStore } from 'pinia'
import { useInstitutionsStore } from '../../financial/stores/institutions.store'

const STORAGE_KEY = 'user-experience-counter'

export const useUserExperienceCounterStore = defineStore('user-experience-counter', {
  state: () => ({
    visitCount: 0
  }),

  actions: {
    incrementVisit() {
      this.visitCount++
      this.saveToLocalStorage()
      
      // Clear connected institutions when counter reaches 2
      if (this.visitCount >= 2) {
        const institutionsStore = useInstitutionsStore()
        institutionsStore.clearAllInstitutions()
        
        // Reset counter to 1 after clearing
        this.visitCount = 1
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ visitCount: this.visitCount }))
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.visitCount = data.visitCount || 0
        } catch (error) {
          console.warn('Error parsing stored user experience counter:', error)
          this.visitCount = 0
          this.saveToLocalStorage()
        }
      }
    },

    resetCounter() {
      this.visitCount = 0
      this.saveToLocalStorage()
    }
  }
})