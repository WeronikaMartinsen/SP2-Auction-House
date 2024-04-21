import { load } from "../api/storage/storeToken.js"

import { API_BASE_URL, PROFILES, sellerName } from "../api/constants.js"

import { handleError } from "../userFeedback/errorMessage.js"

export async function getProfile() {
  const getProfileURL = `${API_BASE_URL}${PROFILES}?_seller=true&_bids=true&`
  const token = load("token")
  if (!sellerName) {
    return // Return or handle this case appropriately
  }

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const currentUser = await response.json()
    if (response.ok) {
      return currentUser
    }
  } catch (error) {
    handleError("Error fetching users posts.")
  }
}
