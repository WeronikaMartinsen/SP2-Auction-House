import { getListing } from "../listings/getListings.js"
import { id } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"

export async function updateListingDetails() {
  try {
    const listing = await getListing(id)
    const getProfile = load("profile")

    console.log("Retrieved Listing Data:", listing)

    const singleListingContainer = document.querySelector("singleListing")
    document.getElementById("title").innerText =
      listing.title || "Title Not Available"
    document.getElementById("description").innerText =
      listing.description || "Description Not Available"
    document.getElementById("seller").innerText =
      `Seller: ${listing.seller?.name || "Unknown Seller"}`

    const singleCard = updateListingDetails(listing, getProfile)
    singleListingContainer.appendChild(singleCard)
  } catch (error) {
    console.error("Error fetching listing:", error)
  }
}
