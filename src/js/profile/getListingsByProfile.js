import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { API_BASE_URL, PROFILES, API_KEY_NAME } from "../api/constants.js"

export async function getListingsByProfile() {
  const token = load("token")
  const getProfile = load("profile")
  const userName = getProfile.userName
  console.log(getProfile)
  console.log(userName)

  // Check if the profile name is provided
  if (!userName) {
    console.error("Profile name is required.")
    return null
  }

  const getProfileURL = `${API_BASE_URL}${PROFILES}/${userName}/listings?_listings=true&_wins=true`

  try {
    // Fetch listings by profile
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
    })

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch listings by profile: ${response.status}`)
    }

    // Parse the response JSON
    const fetchedListings = await response.json()

    console.log("Listings fetched successfully:", fetchedListings)
    return fetchedListings
  } catch (error) {
    // Handle errors
    console.error("Error fetching listings by profile:", error)
    handleError(`Error fetching listings by profile: ${error.message}`)
    return null
  }
}
