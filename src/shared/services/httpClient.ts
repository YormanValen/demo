interface HttpClientOptions {
  baseUrl?: string
}

export class HttpClient {
  private readonly baseUrl: string

  constructor({ baseUrl = '' }: HttpClientOptions = {}) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) {
      throw new Error('Error en la petición GET')
    }
    return (await response.json()) as T
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      throw new Error('Error en la petición POST')
    }

    return (await response.json()) as T
  }
}

export const httpClient = new HttpClient()
