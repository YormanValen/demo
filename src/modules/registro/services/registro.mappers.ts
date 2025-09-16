import type { SelectOption, TipoDocumento } from '../types/registro.types'

export function mapTiposDocumentoToSelectOptions(
  tipos: TipoDocumento[]
): SelectOption[] {
  return tipos.map((tipo) => ({
    label: tipo.label,
    value: tipo.id
  }))
}
