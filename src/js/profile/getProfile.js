import { load } from "../api/storage/storeToken.js"
import { API_BASE_URL, PROFILES, API_KEY_NAME } from "../api/constants.js"
import { handleError } from "../userFeedback/errorMessage.js"

/**
 * Fetches the user's profile data from the server.
 * @param {string} sellerName The name of the seller whose profile to fetch.
 * @returns {Promise<Object|null>} A promise that resolves with the user's profile data if successful, or null if not found.
 */
export async function getProfile(sellerName) {
  const token = load("token")

  // Check if the seller name is provided
  if (!sellerName) {
    console.error("Seller name is required.")
    return null
  }

  const getProfileURL = `${API_BASE_URL}${PROFILES}/${sellerName}`

  try {
    // Fetch the user's profile
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`)
    }

    // Parse the response JSON
    const fetchedProfile = await response.json()

    return fetchedProfile
  } catch (error) {
    // Handle errors
    console.error("Error fetching user profile:", error)
    handleError(`Error fetching user profile: ${error.message}`)
    return null
  }
}
