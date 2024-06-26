import { getListingsByProfile } from "./getListingsByProfile.js"
import { createListingCard } from "../listings/listingCard.js"

export async function displayListingsByProfile(sellerName) {
  try {
    // Fetch listings by profile
    const response = await getListingsByProfile(sellerName)

    // Check if response contains data
    if (!response || !response.data || !Array.isArray(response.data)) {
      console.error("Error: Unable to fetch listings by profile.")
      return
    }

    const listings = response.data

    // Get the container element where listings will be displayed
    const listingsContainer = document.getElementById("listings")

    // Verify that the listings container element is selected
    if (!listingsContainer) {
      console.error("Listings container element not found.")
      return
    }

    // Clear existing content in the container
    listingsContainer.innerHTML = ""

    // Create listing cards for each listing and append them to the container
    listings.forEach((listing) => {
      const card = createListingCard(listing)
      listingsContainer.appendChild(card)
    })
  } catch (error) {
    console.error("Error fetching and displaying listings by profile:", error)
    // Handle error
  }
}
