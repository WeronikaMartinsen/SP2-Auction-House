import { API_BASE_URL, LISTINGS, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { displayListings } from "../listings/displayListings.js"
import { getListings } from "../listings/getListings.js"

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
    console.log(response)

    if (response.ok) {
      const resultNewListing = await response.json()
      // Display user feedback for successful response
      userFeedback("Listing added successfully!", () => {
        setTimeout(async () => {
          // Reload the page after a delay
          location.reload()

          // Fetch updated listings after a short delay
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Adjust delay as needed
          const updatedListings = await getListings()
          displayListings(updatedListings, resultNewListing)
        }, 2000) // Adjust the delay time as needed (in milliseconds)
      })

      return resultNewListing
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
