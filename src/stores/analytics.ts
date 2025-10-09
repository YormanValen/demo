import { defineStore } from 'pinia'

export interface ExperienceVisit {
  type: 'usuario' | 'entidad'
  timestamp: number
  sessionId: string
}

export interface FormCompletion {
  step: 'basic-information' | 'financial-information' | 'verification' | 'complete'
  timestamp: number
  sessionId: string
  formData?: any
}

export interface TransactionalInsightVisit {
  menuItem: 'categorizacion' | 'agregados' | 'affordability' | 'alertas' | 'income' | 'proyectados' | 'perfil' | 'score'
  timestamp: number
  sessionId: string
}

export interface AnalyticsState {
  experienceVisits: ExperienceVisit[]
  formCompletions: FormCompletion[]
  transactionalInsightVisits: TransactionalInsightVisit[]
  sessionStartTime: number
  currentSessionId: string
}

const STORAGE_KEY = 'analytics_data'

// Helper functions for localStorage persistence
function loadFromStorage(): AnalyticsState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.warn('Error loading analytics data from localStorage:', error)
  }
  return {
    experienceVisits: [],
    formCompletions: [],
    transactionalInsightVisits: [],
    sessionStartTime: Date.now(),
    currentSessionId: generateSessionId()
  }
}

function saveToStorage(state: AnalyticsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Error saving analytics data to localStorage:', error)
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export const useAnalyticsStore = defineStore('analytics', {
  state: (): AnalyticsState => loadFromStorage(),
  
  getters: {
    // Experience visits metrics
    experienceVisitCounts: (state) => {
      const counts = { usuario: 0, entidad: 0 }
      state.experienceVisits.forEach(visit => {
        counts[visit.type]++
      })
      return counts
    },
    
    // Form completion metrics
    formCompletionCounts: (state) => {
      const counts = {
        'basic-information': 0,
        'financial-information': 0,
        'verification': 0,
        'complete': 0
      }
      state.formCompletions.forEach(completion => {
        counts[completion.step]++
      })
      return counts
    },
    
    // Transactional insights menu metrics
    transactionalInsightCounts: (state) => {
      const counts = {
        categorizacion: 0,
        agregados: 0,
        affordability: 0,
        alertas: 0,
        income: 0,
        proyectados: 0,
        perfil: 0,
        score: 0
      }
      state.transactionalInsightVisits.forEach(visit => {
        counts[visit.menuItem]++
      })
      return counts
    },
    
    // Total metrics
    totalExperienceVisits: (state) => state.experienceVisits.length,
    totalFormCompletions: (state) => state.formCompletions.length,
    totalTransactionalInsightVisits: (state) => state.transactionalInsightVisits.length,
    
    // Session metrics
    currentSessionDuration: (state) => Date.now() - state.sessionStartTime,
    
    // Most visited transactional insight
    mostVisitedTransactionalInsight: (state) => {
      const counts = state.transactionalInsightVisits.reduce((acc, visit) => {
        acc[visit.menuItem] = (acc[visit.menuItem] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      const entries = Object.entries(counts)
      if (entries.length === 0) return null
      
      return entries.reduce((max, [item, count]) => 
        count > max.count ? { item, count } : max
      , { item: entries[0][0], count: entries[0][1] })
    },
    
    // Recent activity (last 24 hours)
    recentActivity: (state) => {
      const last24Hours = Date.now() - (24 * 60 * 60 * 1000)
      return {
        experienceVisits: state.experienceVisits.filter(v => v.timestamp > last24Hours),
        formCompletions: state.formCompletions.filter(f => f.timestamp > last24Hours),
        transactionalInsightVisits: state.transactionalInsightVisits.filter(t => t.timestamp > last24Hours)
      }
    }
  },
  
  actions: {
    // Track experience selection
    trackExperienceVisit(type: 'usuario' | 'entidad') {
      const visit: ExperienceVisit = {
        type,
        timestamp: Date.now(),
        sessionId: this.currentSessionId
      }
      this.experienceVisits.push(visit)
      saveToStorage(this.$state)
    },
    
    // Track form completion steps
    trackFormCompletion(step: FormCompletion['step'], formData?: any) {
      const completion: FormCompletion = {
        step,
        timestamp: Date.now(),
        sessionId: this.currentSessionId,
        formData
      }
      this.formCompletions.push(completion)
      saveToStorage(this.$state)
    },
    
    // Track transactional insight menu visits
    trackTransactionalInsightVisit(menuItem: TransactionalInsightVisit['menuItem']) {
      const visit: TransactionalInsightVisit = {
        menuItem,
        timestamp: Date.now(),
        sessionId: this.currentSessionId
      }
      this.transactionalInsightVisits.push(visit)
      saveToStorage(this.$state)
    },
    
    // Start new session
    startNewSession() {
      this.currentSessionId = generateSessionId()
      this.sessionStartTime = Date.now()
      saveToStorage(this.$state)
    },
    
    // Clear all analytics data
    clearAllData() {
      this.experienceVisits = []
      this.formCompletions = []
      this.transactionalInsightVisits = []
      this.sessionStartTime = Date.now()
      this.currentSessionId = generateSessionId()
      
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch (error) {
        console.warn('Error clearing analytics data from localStorage:', error)
      }
    },
    
    // Export data for analysis
    exportData() {
      return {
        experienceVisits: this.experienceVisits,
        formCompletions: this.formCompletions,
        transactionalInsightVisits: this.transactionalInsightVisits,
        exportTimestamp: Date.now(),
        sessionInfo: {
          currentSessionId: this.currentSessionId,
          sessionStartTime: this.sessionStartTime,
          sessionDuration: this.currentSessionDuration
        }
      }
    }
  }
})