import { API_BASE_URL, PLACE_BID } from "../api/constants.js"

export async function placeBid(listingId, bidAmount) {
  const placeBidURL = API_BASE_URL + PLACE_BID

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if required
    },
    body: JSON.stringify({ amount: bidAmount }),
  }

  try {
    const response = await fetch(placeBidURL, requestOptions)
    if (!response.ok) {
      throw new Error("Failed to place bid")
    }
    const data = await response.json()
    // Handle the response data if needed
    console.log("Bid placed successfully:", data)
    return data // Return the response data if needed
  } catch (error) {
    console.error("Error placing bid:", error.message)
    // Handle the error appropriately
  }
}
