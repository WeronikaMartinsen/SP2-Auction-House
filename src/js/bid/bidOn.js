import {
  API_BASE_URL,
  LISTING,
  id,
  PLACE_BID,
  API_KEY_NAME,
} from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function bidOnListing(newBid) {
  const token = load("token")
  if (!id) {
    throw new Error("Update requires a listing ID.")
  }

  const bidOnListingURL = `${API_BASE_URL}${LISTING}/${id}${PLACE_BID}`
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify(newBid),
    }
    const response = await fetch(bidOnListingURL, postData)
    const result = await response.json()

    if (response.ok) {
      userFeedback("You have successfully added bid.", () => {
        // Callback function to execute after the timeout
        location.reload()
      })
      return result
    }
    if (result.statusCode === 400) {
      userFeedback("Your bid must be higher than the current one.", () => {
        // Callback function to execute after the timeout
        location.reload()
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error adding bid. Please try again.")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
