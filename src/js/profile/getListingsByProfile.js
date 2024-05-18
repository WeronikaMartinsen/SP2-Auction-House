import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { API_BASE_URL, PROFILES, API_KEY_NAME } from "../api/constants.js"
import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from "../ui/loadingIndicator.js"

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

export async function getListingsByProfile() {
  showLoadingIndicator()

  const sellerName = getQueryParam("name")

  if (!sellerName) {
    console.error("Profile name is required.")
    hideLoadingIndicator()
    return null
  }

  const token = load("token")
  const getProfileURL = `${API_BASE_URL}${PROFILES}/${sellerName}/listings?_seller=true&_bids=true&`

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch listings by profile: ${response.status}`)
    }

    const fetchedListings = await response.json()
    hideLoadingIndicator()

    return fetchedListings
  } catch (error) {
    // Handle errors
    console.error("Error fetching listings by profile:", error)
    handleError(`Error fetching listings by profile: ${error.message}`)
    hideLoadingIndicator()
    return null
  }
}
