import { BASE_URL } from '../constants'
import InvalidToken from './invalid-token'

export default async function fetchWithUrl<T>(
  endpoint: string,
  requestInit?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, requestInit)

    switch (res.status) {
      case 200:
        return (await res.json()) as T
      case 401:
        throw new InvalidToken('Unauthorized: Invalid or expired token')
      case 403:
        throw new Error('Forbidden: Access denied')
      case 404:
        throw new Error('Not Found: The requested resource could not be found')
      case 429:
        throw new Error('Too Many Requests: Rate limit exceeded')
      case 500:
        throw new Error(
          'Internal Server Error: Something went wrong on the server'
        )
      default:
        throw new Error(`Error fetching data from ${endpoint}: ${res.statusText}`)
    }
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Network error: ${error.message}. Please check your connection.`
      )
    } else {
      throw error
    }
  }
}
