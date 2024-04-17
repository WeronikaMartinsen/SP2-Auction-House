/* import { getListings } from "./getListings.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function displayListings() {
  try {
    let allListings = await getListings()
    const getProfile = load("profile")
    // Process the listings and profile data here
  } catch (error) {
    handleError("Error fetching and displaying posts")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
 */
