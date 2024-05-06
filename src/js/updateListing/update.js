import { API_BASE_URL, LISTINGS, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { id } from "../api/constants.js"

export async function updateListing(editedListing) {
  const updateListingURL = `${API_BASE_URL}${LISTINGS}/${id}`
  const token = load("token")

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify(editedListing),
    }

    const response = await fetch(updateListingURL, postData)
    const result = await response.json()

    if (response.ok) {
      window.href
        .location`../listings/listings.html?id=${result.data.id}&title=${result.data.title}`
    } else {
      // Handle error cases
      console.error("Error:", response.statusText)
      handleError("Error updating listing. Please try again.")
      userFeedback("Something went wrong. Please, try again.", () => {
        // Callback function to execute after the timeout
        location.reload()
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error updating listing. Please try again.")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
