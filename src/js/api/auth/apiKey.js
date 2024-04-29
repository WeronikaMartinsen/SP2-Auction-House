import { API_BASE_URL, API_KEY } from "../constants.js"
import { load, save } from "../storage/storeToken.js"

export async function createApiKey() {
  const apiKeyUrl = API_BASE_URL + API_KEY
  const accessToken = load("accessToken")

  try {
    const response = await fetch(apiKeyUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "My API Key name",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create API key")
    }

    const json = await response.json()
    const apiKey = json.data.key

    save("apiKey", apiKey)

    console.log("API key created successfully:", apiKey)
    return apiKey
  } catch (error) {
    console.error("Error creating API key:", error)
    return null
  }
}
