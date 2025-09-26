import { ref, readonly } from 'vue'
import type { FinancialFormData } from '../types/financial.types'

const creditAmountState = ref<string>('')
const financialDataState = ref<FinancialFormData>({
  gastosMensuales: '',
  ingresosMensualesPromedio: '',
  montoSolicitado: ''
})

export function useFinancialStore() {
  const setCreditAmount = (amount: string) => {
    creditAmountState.value = amount
  }

  const setFinancialData = (data: FinancialFormData) => {
    financialDataState.value = { ...data }
    creditAmountState.value = data.montoSolicitado
  }

  const getCreditAmount = () => {
    return creditAmountState.value
  }

  const getFinancialData = () => {
    return { ...financialDataState.value }
  }

  return {
    creditAmount: readonly(creditAmountState),
    financialData: readonly(financialDataState),
    setCreditAmount,
    setFinancialData,
    getCreditAmount,
    getFinancialData
  }
}