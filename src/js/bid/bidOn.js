import { API_BASE_URL, LISTING, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function bidOnListing(bidAmount) {
  const token = load("token")
  const searchParams = new URLSearchParams(window.location.search)
  const id = searchParams.get("id")
  if (!id) {
    console.error("Update requires a post ID.")
    throw new Error("Update requires a post ID.")
  }

  const bidOnListingURL = `${API_BASE_URL}${LISTING}/bids`
  console.log("Bid URL:", bidOnListingURL)

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify({
        amount: bidAmount.amount,
      }),
    }

    console.log("Post Data:", postData)

    const response = await fetch(bidOnListingURL, postData)
    console.log("Response:", response)
    const result = await response.json()

    console.log("Result:", result)

    if (response.ok) {
      userFeedback("You have successfully placed a bid.")

      const bidAmount = result.data._count.bids // Extract the bid amount from the response data

      // Update the "last-bid" element with the bid amount
      bidOnListing(bidAmount)
      setTimeout(() => {
        location.reload()
      }, 2000)
      return result
    } else if (result.statusCode === 400) {
      userFeedback("Your bid must be higher than the current bid.")
    }
  } catch (error) {
    console.error("Error placing bid:", error)
    handleError("Something went wrong. Please try again.")
    return null
  }
}
