import { defineStore } from 'pinia'

export type EntityModule = 'consent-manager' | 'transactional-insights' | 'api-platform'

interface EntityModulesState {
  visitedModules: Set<EntityModule>
}

export const useEntityModulesStore = defineStore('entityModules', {
  state: (): EntityModulesState => ({
    visitedModules: new Set<EntityModule>()
  }),

  getters: {
    isModuleVisited: (state) => {
      return (module: EntityModule) => state.visitedModules.has(module)
    },
    
    getVisitedModules: (state) => {
      return Array.from(state.visitedModules)
    },
    
    completedModulesCount: (state) => {
      return state.visitedModules.size
    },
    
    allModulesCompleted: (state) => {
      return state.visitedModules.size === 3
    }
  },

  actions: {
    markModuleAsVisited(module: EntityModule) {
      this.visitedModules.add(module)
      this.saveToLocalStorage()
    },

    clearAllModules() {
      this.visitedModules.clear()
      this.removeFromLocalStorage()
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('entity-visited-modules')
        if (saved) {
          const modules = JSON.parse(saved) as EntityModule[]
          this.visitedModules = new Set(modules)
        }
      } catch (error) {
        console.warn('Error loading entity modules from localStorage:', error)
        this.visitedModules = new Set()
      }
    },

    saveToLocalStorage() {
      try {
        const modules = Array.from(this.visitedModules)
        localStorage.setItem('entity-visited-modules', JSON.stringify(modules))
      } catch (error) {
        console.warn('Error saving entity modules to localStorage:', error)
      }
    },

    removeFromLocalStorage() {
      try {
        localStorage.removeItem('entity-visited-modules')
      } catch (error) {
        console.warn('Error removing entity modules from localStorage:', error)
      }
    }
  }
})