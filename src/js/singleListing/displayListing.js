import { getListing } from "../listings/getListings.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { createListingCard } from "./singleListingCard.js"

export async function displayListing(listingId) {
  try {
    console.log("Fetching single listing...")
    const listing = await getListing(listingId)

    if (!listing) {
      console.error("Error: getListing did not return a listing:", listing)
      return
    }

    console.log("Listing fetched successfully:", listing)

    const singleListingsContainer = document.querySelector("#singleListing")
    const listingCard = createListingCard(listing)
    singleListingsContainer.appendChild(listingCard)
  } catch (error) {
    console.error("Error fetching and displaying listing:", error)
    handleError("Error fetching and displaying listing")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
