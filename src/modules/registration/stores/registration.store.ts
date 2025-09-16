import { readonly, ref } from 'vue'
import { fetchTiposDocumento, submitRegistration } from '../services/registration.api'
import { mapTiposDocumentoToSelectOptions } from '../services/registration.mappers'
import type { RegistrationFormData, SelectOption } from '../types/registration.types'

const tipoOptionsState = ref<SelectOption[]>([])
const isLoadingTipos = ref(false)
const tiposError = ref<string | null>(null)
let hasLoadedTipos = false

export function useRegistrationStore() {
  const isSubmitting = ref(false)
  const feedbackMessage = ref<string | null>(null)

  const loadTiposDocumento = async () => {
    if (hasLoadedTipos || isLoadingTipos.value) {
      return
    }

    isLoadingTipos.value = true
    tiposError.value = null

    try {
      const tipos = await fetchTiposDocumento()
      tipoOptionsState.value = mapTiposDocumentoToSelectOptions(tipos)
      hasLoadedTipos = true
    } catch (error) {
      console.error(error)
      tiposError.value = 'No pudimos cargar los tipos de documento.'
    } finally {
      isLoadingTipos.value = false
    }
  }

  const submit = async (payload: RegistrationFormData) => {
    isSubmitting.value = true
    feedbackMessage.value = null

    try {
      const response = await submitRegistration(payload)
      feedbackMessage.value = response.message
      return response
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    tipoOptions: readonly(tipoOptionsState),
    isLoadingTipos: readonly(isLoadingTipos),
    tiposError: readonly(tiposError),
    isSubmitting: readonly(isSubmitting),
    feedbackMessage: readonly(feedbackMessage),
    loadTiposDocumento,
    submit
  }
}