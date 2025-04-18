import { OAUTH_URL } from '../constants'
import InvalidToken from './invalid-token'

interface TokenizedClass {
  token: string | null
}

export default class TokenManager {
  private static osuBody: string
  private static osuToken: string | null = null

  static init(clientId: number, clientSecret: string) {
    this.osuBody = new URLSearchParams({
      client_id: clientId.toString(),
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scope: 'public',
    }).toString()
  }

  static async getOsuToken(): Promise<string> {
    if (this.osuToken) return this.osuToken

    const res = await fetch(OAUTH_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: TokenManager.osuBody,
    })
    if (!res.ok) throw new Error('Failed to get osu token')
    const json = (await res.json()) as osuToken

    TokenManager.osuToken = json.access_token
    return TokenManager.osuToken
  }

  public static TokenValidator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value
    const MAX_RETRIES = 2

    descriptor.value = async function (this: TokenizedClass, ...args: any[]) {
      let retryCount = 0
      let lastError: Error | null = null
      while (retryCount <= MAX_RETRIES) {
        try {
          this.token = await TokenManager.getOsuToken()
          return await originalMethod.apply(this, args)
        } catch (error) {
          lastError = error as Error
          if (error instanceof InvalidToken) {
            TokenManager.osuToken = null

            retryCount++
            if (retryCount > MAX_RETRIES) {
              throw new Error(
                `Failed after ${MAX_RETRIES} retries. Last error: ${lastError.message}`
              )
            }
            await new Promise((resolve) => setTimeout(resolve, 1000))
            continue
          }

          throw error
        } finally {
          this.token == null
        }
      }
    }
    return descriptor
  }
}