import { getListing } from "../listings/getListings.js"
import { id } from "../api/constants.js"

export async function updateListingDetails() {
  try {
    const listing = await getListing(id)

    console.log("Retrieved Listing Data:", listing)

    // Update HTML elements with listing data
    document.getElementById("id").innerText = listing.id || "N/A"
    document.getElementById("title").innerText = listing.title || "N/A"
    document.getElementById("created-date").innerText =
      listing.created_at || "N/A"
    document.getElementById("description").innerText =
      listing.description || "N/A"
    document.getElementById("seller").innerText =
      `Seller: ${listing.seller?.name || "Unknown Seller"}`
    // Update other elements as needed
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}
