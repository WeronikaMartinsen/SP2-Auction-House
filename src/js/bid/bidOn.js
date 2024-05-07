import { API_BASE_URL, LISTING, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function bidOnListing(listingId, bidAmount) {
  const token = load("token")

  const bidOnListingURL = `${API_BASE_URL}${LISTING}${listingId}/bids`

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify({
        amount: bidAmount,
      }),
    }

    const response = await fetch(bidOnListingURL, postData)
    const result = await response.json()

    if (response.ok) {
      userFeedback("You have successfully placed a bid.")
      return result.data
    } else {
      handleError("Failed to place bid. Please try again.")
      return null
    }
  } catch (error) {
    console.error("Error placing bid:", error)
    handleError("Something went wrong. Please try again.")
    return null
  }
}
