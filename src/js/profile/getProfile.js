import { loadProfile } from "../api/storage/storeToken.js"

import { API_BASE_URL, PROFILES } from "../api/constants.js"

import { handleError } from "../userFeedback/errorMessage.js"

export async function getProfile() {
  const userProfile = loadProfile()

  if (!userProfile || !userProfile.userName) {
    console.error("User profile not found or incomplete.")
    return null // Return null if profile data is missing or incomplete
  }

  const getProfileURL = `${API_BASE_URL}${PROFILES}/${userProfile.userName}`
  const userToken = userProfile.token // Assuming token is stored in the profile data

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`)
    }

    const currentUser = await response.json()
    return currentUser
  } catch (error) {
    handleError(`Error fetching user profile: ${error.message}`)
    return null
  }
}
