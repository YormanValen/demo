import type {
  RegistrationFormData,
  RegistrationResponse,
  TipoDocumento
} from '../types/registration.types'

const MOCK_TIPOS_DOCUMENTO: TipoDocumento[] = [
  { id: 'dni', label: 'DNI' },
  { id: 'ce', label: 'Carné de Extranjería' },
  { id: 'passport', label: 'Pasaporte' }
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
    // simulamos latencia y respuesta exitosa
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