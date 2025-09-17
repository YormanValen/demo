import type {
  RegistrationFormData,
  RegistrationResponse,
  TipoDocumento
} from '../types/registration.types'

const MOCK_TIPOS_DOCUMENTO: TipoDocumento[] = [
  { id: 'cc', label: 'Cédula de ciudadanía' },
  { id: 'ce', label: 'Cédula de extranjería' }
]

export async function fetchTiposDocumento(): Promise<TipoDocumento[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_TIPOS_DOCUMENTO), 300)
  })
}

export async function submitRegistration(
  payload: RegistrationFormData
): Promise<RegistrationResponse> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          success: true,
          message: `¡Gracias por registrarte, ${payload.nombres}!`
        }),
      600
    )
  })
}