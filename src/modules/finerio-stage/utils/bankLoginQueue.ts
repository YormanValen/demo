interface BankQueueItem {
  id: string
  name: string
  initials: string
  color: string
}

export class BankLoginQueue {
  private static readonly QUEUE_KEY = 'bankLoginQueue'
  private static readonly INDEX_KEY = 'currentBankIndex'
  private static readonly TOTAL_KEY = 'totalBanks'

  static getCurrentBankInfo() {
    const queueStr = localStorage.getItem(this.QUEUE_KEY)
    const indexStr = localStorage.getItem(this.INDEX_KEY)
    const totalStr = localStorage.getItem(this.TOTAL_KEY)

    if (!queueStr || !indexStr || !totalStr) {
      return null
    }

    const queue: BankQueueItem[] = JSON.parse(queueStr)
    const currentIndex = parseInt(indexStr)
    const total = parseInt(totalStr)

    return {
      queue,
      currentIndex,
      total,
      currentBank: queue[currentIndex],
      isLastBank: currentIndex === queue.length - 1,
      progress: `${currentIndex + 1}/${total}`
    }
  }

  static moveToNextBank(): BankQueueItem | null {
    const info = this.getCurrentBankInfo()
    if (!info || info.isLastBank) {
      this.clearQueue()
      return null
    }

    const nextIndex = info.currentIndex + 1
    localStorage.setItem(this.INDEX_KEY, nextIndex.toString())

    return info.queue[nextIndex]
  }

  static clearQueue() {
    localStorage.removeItem(this.QUEUE_KEY)
    localStorage.removeItem(this.INDEX_KEY)
    localStorage.removeItem(this.TOTAL_KEY)
  }

  static isMultipleFlow(): boolean {
    return localStorage.getItem(this.QUEUE_KEY) !== null
  }

  static getRemainingBanks(): BankQueueItem[] {
    const info = this.getCurrentBankInfo()
    if (!info) return []

    return info.queue.slice(info.currentIndex + 1)
  }

  static async continueToNextBank(router: any): Promise<boolean> {
    const currentInfo = this.getCurrentBankInfo()
    
    if (!currentInfo) {
      return false
    }
    
    const nextBank = this.moveToNextBank()
    
    if (!nextBank) {
      // No hay más bancos, limpiar la cola y retornar false
      return false
    }

    // Ir al siguiente banco
    const newInfo = this.getCurrentBankInfo()
    
    await router.push({
      path: '/financial/validation',
      query: {
        bankName: nextBank.name,
        bankInitials: nextBank.initials,
        bankColor: nextBank.color,
        isMultipleFlow: 'true',
        currentBank: newInfo ? (newInfo.currentIndex + 1).toString() : '1',
        totalBanks: currentInfo.total.toString()
      }
    })
    
    return true
  }
}