import { API_BASE_URL, LISTINGS, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function updateListing(id) {
  const updateListingURL = `${API_BASE_URL}${LISTINGS}/${id}?_seller=true&_bids=true`
  const token = load("token")

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify(id),
    }

    const response = await fetch(updateListingURL, postData)
    console.log(response)

    if (response.ok) {
      const updateListing = await response.json()
      return updateListing
    } else {
      // Handle error cases
      console.error("Error:", response.statusText)
      handleError("Error adding listing. Please try again.")
      userFeedback("Something went wrong. Please, try again.", () => {
        // Callback function to execute after the timeout
        location.reload()
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error adding listing. Please try again.")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
