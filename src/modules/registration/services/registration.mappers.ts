import type { SelectOption, TipoDocumento } from '../types/registration.types'

export function mapTiposDocumentoToSelectOptions(
  tipos: TipoDocumento[]
): SelectOption[] {
  return tipos.map((tipo) => ({
    label: tipo.label,
    value: tipo.id
  }))
}