import { API_BASE_URL, API_KEY } from "../constants.js"
export async function createApiKey() {
  try {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error("No access token found")
    }

    const registerURL = API_BASE_URL + API_KEY

    const postData = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(registerURL, postData)

    if (!response.ok) {
      throw new Error("Failed to create API key")
    }

    const data = await response.json()
    console.log("API Key created successfully:", data.data.key)
    return data.data.key
  } catch (error) {
    console.error("Error creating API key:", error.message)
    throw error // Rethrow the error to propagate it to the caller
  }
}

createApiKey()
