import { API_BASE_URL } from "../constants.js"
import { load } from "../storage/storeToken.js"

export async function createApiKey() {
  try {
    const token = load("accessToken")
    if (!token) {
      throw new Error("No access token found")
    }

    const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    })

    if (!response.ok) {
      throw new Error("Failed to create API key")
    }

    const data = await response.json()
    console.log("API Key created successfully:", data.data.key)
    return data.data.key
  } catch (error) {
    console.error("Error creating API key:", error.message)
  }
}

createApiKey()
