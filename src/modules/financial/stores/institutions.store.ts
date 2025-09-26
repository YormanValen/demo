import { readonly, ref } from 'vue'

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

const connectedInstitutions = ref<ConnectedInstitution[]>([])

export function useInstitutionsStore() {
  const addInstitution = (institution: ConnectedInstitution) => {
    const existingIndex = connectedInstitutions.value.findIndex(inst => inst.id === institution.id)
    if (existingIndex === -1) {
      connectedInstitutions.value.push(institution)
    }
  }

  const removeInstitution = (institutionId: number) => {
    const index = connectedInstitutions.value.findIndex(inst => inst.id === institutionId)
    if (index !== -1) {
      connectedInstitutions.value.splice(index, 1)
    }
  }

  const getInstitutionById = (id: number) => {
    return connectedInstitutions.value.find(inst => inst.id === id)
  }

  const hasConnectedInstitutions = () => {
    return connectedInstitutions.value.length > 0
  }

  const clearAllInstitutions = () => {
    connectedInstitutions.value = []
  }

  return {
    connectedInstitutions: readonly(connectedInstitutions),
    addInstitution,
    removeInstitution,
    getInstitutionById,
    hasConnectedInstitutions,
    clearAllInstitutions
  }
}