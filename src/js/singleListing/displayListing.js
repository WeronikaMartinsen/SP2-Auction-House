import { getListing } from "../listings/getListings.js"

// Get the listing ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search)
const listingId = urlParams.get("id")

// Function to update HTML elements with listing data
export async function updateListingDetails() {
  try {
    // Get the listing data
    const listing = await getListing(listingId)

    // Update HTML elements with listing data
    document.getElementById("listing-title").innerText = listing.title
    document.getElementById("listing-description").innerText =
      listing.description
    document.getElementById("listing-seller").innerText =
      `Seller: ${listing.seller}`

    // Additional updates for other listing details
    // Add similar lines for other details you want to display
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}

// Call the function to update listing details when the page loads
updateListingDetails()
