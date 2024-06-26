import { API_BASE_URL, LISTINGS, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function createListing(newListing) {
  const createListingURL = API_BASE_URL + LISTINGS
  const token = load("token")

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify(newListing),
    }

    const response = await fetch(createListingURL, postData)

    const result = await response.json()

    if (response.ok) {
      // Redirect to the single listing page if the response is successful
      window.location.href = `/html/listings/singleListing.html?id=${result.data.id}&title=${result.data.title}`
    } else {
      // Handle error cases
      console.error("Error:", response.statusText)
      handleError("Error adding listing. Please try again.")
    }
  } catch (error) {
    console.error(error)
    handleError("Error adding listing. Please try again.")
    userFeedback("Something went wrong. Please try again.")
  }
}
