const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  return []
}

export async function fetchCollection(collection, endpoint = `${API_BASE_URL}/api/${collection}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${collection}`)
  return responseItems(await response.json())
}