import { API_BASE_URL, LISTING, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

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
      body: JSON.stringify(bidAmount),
    }

    console.log("Post Data:", postData)

    const response = await fetch(bidOnListingURL, postData)
    const result = await response.json()

    if (response.ok) {
      userFeedback("You have successfully added a bid!")
      setTimeout(function () {
        location.reload()
      }, 1000)
      return result
    }
    if (result.statusCode === 400) {
      userFeedback("Your bid must be higher than current bid!")
    }
  } catch (error) {
    console.error(error)
  }
}
