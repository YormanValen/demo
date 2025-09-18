export interface TipoDocumento {
  id: string
  label: string
}

export interface SelectOption {
  label: string
  value: string
}

export interface RegistrationFormData {
  nombres: string
  primerApellido: string
  segundoApellido: string
  tipoDocumento: string
  numeroIdentificacion: string
  fechaExpedicionDocumento: string
  departamentoExpedicion: string
  ciudadExpedicion: string
  celular: string
  correo: string
  esPEP: boolean
  autorizaTratamientoDatos: boolean
  autorizaFinesComerciales: boolean
}

export interface RegistrationResponse {
  success: boolean
  message: string
}
