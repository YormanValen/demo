import { ref, readonly } from 'vue'

export interface BankQueueItem {
  id: string
  name: string
  initials: string
  color: string
}

const selectedBanks = ref<BankQueueItem[]>([])
const currentBankIndex = ref(0)

export function useBankQueueStore() {
  const setSelectedBanks = (banks: BankQueueItem[]) => {
    selectedBanks.value = [...banks]
    currentBankIndex.value = 0
  }

  const getCurrentBank = (): BankQueueItem | null => {
    if (currentBankIndex.value >= selectedBanks.value.length) {
      return null
    }
    return selectedBanks.value[currentBankIndex.value]
  }

  const moveToNextBank = (): BankQueueItem | null => {
    currentBankIndex.value++
    return getCurrentBank()
  }

  const hasMoreBanks = (): boolean => {
    return currentBankIndex.value < selectedBanks.value.length
  }

  const isLastBank = (): boolean => {
    return currentBankIndex.value === selectedBanks.value.length - 1
  }

  const getTotalBanks = (): number => {
    return selectedBanks.value.length
  }

  const getCurrentBankNumber = (): number => {
    return currentBankIndex.value + 1
  }

  const getProgressPercentage = (): number => {
    if (selectedBanks.value.length === 0) return 0
    return (getCurrentBankNumber() / getTotalBanks()) * 100
  }

  const reset = () => {
    selectedBanks.value = []
    currentBankIndex.value = 0
  }

  const isMultipleFlow = (): boolean => {
    return selectedBanks.value.length > 1
  }

  return {
    selectedBanks: readonly(selectedBanks),
    currentBankIndex: readonly(currentBankIndex),
    setSelectedBanks,
    getCurrentBank,
    moveToNextBank,
    hasMoreBanks,
    isLastBank,
    getTotalBanks,
    getCurrentBankNumber,
    getProgressPercentage,
    reset,
    isMultipleFlow
  }
}