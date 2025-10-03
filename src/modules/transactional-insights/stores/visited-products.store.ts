import { defineStore } from 'pinia'

const STORAGE_KEY = 'visited-transactional-products'

export interface VisitedProduct {
  id: string
  name: string
  visitedAt: string
}

export const useVisitedProductsStore = defineStore('visited-products', {
  state: () => ({
    visitedProducts: new Set<string>()
  }),

  getters: {
    isProductVisited: (state) => (productId: string): boolean => {
      return state.visitedProducts.has(productId)
    },

    getVisitedCount(): number {
      return this.visitedProducts.size
    }
  },

  actions: {
    markProductAsVisited(productId: string) {
      this.visitedProducts.add(productId)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      const productsArray = Array.from(this.visitedProducts)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsArray))
    },

    loadFromLocalStorage() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const productsArray = JSON.parse(stored)
          this.visitedProducts = new Set(productsArray)
        } catch (error) {
          console.warn('Error parsing visited products:', error)
          this.visitedProducts = new Set()
          this.saveToLocalStorage()
        }
      }
    },

    clearVisitedProducts() {
      this.visitedProducts.clear()
      this.saveToLocalStorage()
    }
  }
})