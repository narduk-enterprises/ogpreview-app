import { SignJWT, importPKCS8 } from 'jose'

export const GA_SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
export const GSC_SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

let cachedToken: string | null = null
let tokenExpiration = 0

async function getGoogleAuthToken(scopes: string[]): Promise<string> {
  const config = useRuntimeConfig()
  const keyJsonStr = config.googleServiceAccountKey

  if (!keyJsonStr) {
    throw createError({ statusCode: 500, statusMessage: 'Google Service Account Key not configured' })
  }

  try {
    const creds = JSON.parse(keyJsonStr)
    const clientEmail = creds.client_email
    const privateKey = creds.private_key

    const now = Math.floor(Date.now() / 1000)
    // Only use cached token if it's the exact same scopes? Usually service accounts can request multiple. 
    // We'll keep it simple: if cached token is still valid, return it.
    if (cachedToken && now < tokenExpiration - 300) {
      return cachedToken
    }

    const alg = 'RS256'
    const privateKeyObj = await importPKCS8(privateKey, alg)

    const jwt = await new SignJWT({
      iss: clientEmail,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
      .setProtectedHeader({ alg, typ: 'JWT' })
      .sign(privateKeyObj)

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Failed to get access token: ${errorData}`)
    }

    const data = await response.json()
    cachedToken = data.access_token
    tokenExpiration = now + data.expires_in
    return cachedToken as string
  } catch (error: unknown) {
    const err = error as Error
    throw createError({ statusCode: 500, statusMessage: `Google Auth Error: ${err.message}` })
  }
}

export async function googleApiFetch(url: string, scopes: string[], options: RequestInit = {}): Promise<any> {
  const token = await getGoogleAuthToken(scopes)
  
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')
  
  const response = await fetch(url, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    const errorData = await response.text()
    throw createError({ statusCode: response.status, statusMessage: `Google API Error: ${errorData}` })
  }
  
  return response.json()
}
