import { API_BASE_URL, PROFILES } from "../api/constants"
import { load } from "../api/storage/storeToken"
import { handleError } from "../userFeedback/errorMessage"

export async function getProfile(username) {
  const token = load("token")
  const getProfileURL = `${API_BASE_URL}${PROFILES}/${username}`

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`)
    }

    const userProfile = await response.json()
    return userProfile
  } catch (error) {
    handleError(`Error fetching user profile: ${error.message}`)
    return null
  }
}
