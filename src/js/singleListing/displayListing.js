import { getListing } from "../listings/getListings.js"

const urlParams = new URLSearchParams(window.location.search)
const listingId = urlParams.get("id")

export async function updateListingDetails() {
  try {
    // Get the listing data
    const listing = await getListing(listingId)

    // Log the retrieved data for debugging
    console.log("Retrieved Listing Data:", listing)

    // Update HTML elements with listing data
    document.getElementById("title").innerText =
      listing.title || "Title Not Available"
    document.getElementById("description").innerText =
      listing.description || "Description Not Available"
    document.getElementById("seller").innerText =
      `Seller: ${listing.seller?.name || "Unknown Seller"}`

    // Additional updates for other listing details
    // Add similar lines for other details you want to display
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}

// Call the function to update listing details when the page loads
updateListingDetails()
