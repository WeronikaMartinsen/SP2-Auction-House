import { API_BASE_URL, API_KEY } from "../constants.js"

export async function createAPIKey(apiKeyData) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiKeyData),
    })

    if (!response.ok) {
      throw new Error("Failed to create API key")
    }

    const apiKey = await response.json()
    return apiKey
  } catch (error) {
    throw new Error(`Failed to create API key: ${error.message}`)
  }
}
