import { API_BASE_URL, LISTINGS } from "../api/constants.js"
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
      },
      body: JSON.stringify(newListing),
    }

    const response = await fetch(createListingURL, postData)
    const resultNewListing = await response.json()

    console.log("Response from createListing:", resultNewListing) // Added console log

    if (resultNewListing.ok) {
      return resultNewListing
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
