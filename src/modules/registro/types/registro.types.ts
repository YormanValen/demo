export interface TipoDocumento {
  id: string
  label: string
}

export interface SelectOption {
  label: string
  value: string
}

export interface RegistroFormData {
  nombres: string
  apellidos: string
  correo: string
  tipoDocumento: string
  numeroDocumento: string
  aceptaTerminos: boolean
}

export interface RegistroResponse {
  success: boolean
  message: string
}
