import { API_BASE_URL, LISTINGS } from "../api/constants.js"
import { load, save } from "../api/storage/storeToken.js"
import { showLoadingIndicator } from "../ui/loadingIndicator.js"
import { hideLoadingIndicator } from "../ui/loadingIndicator.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function getListings() {
  const getListingsURL = `${API_BASE_URL}${LISTINGS}?_seller=true&_bids=true&`
  const token = load("token")

  try {
    showLoadingIndicator()
    console.log("Fetching listings...")
    const response = await fetch(getListingsURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const listings = await response.json()
    if (response.ok) {
      hideLoadingIndicator()
      save("listings", listings)
      console.log("Listings fetched successfully:", listings)
      return listings
    } else {
      console.log("Error fetching listings:", listings)
    }
  } catch (error) {
    console.error("Error fetching listings:", error)
    handleError("Error fetching listings.")
  }
}
export async function getListing(id, sellerId) {
  const queryParams = new URLSearchParams()
  queryParams.append("_seller", true) // Assuming this parameter is always included
  queryParams.append("seller", sellerId) // Append the seller ID

  const getSingleListingUrl = `${API_BASE_URL}${LISTINGS}/${id}?${queryParams.toString()}`
  const token = load("token")

  try {
    showLoadingIndicator()
    const response = await fetch(getSingleListingUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const listing = await response.json()
    if (response.ok) {
      hideLoadingIndicator()
      return listing // Return the retrieved single listing
    } else {
      console.error("Error fetching listing:", listing)
      throw new Error("Failed to fetch listing")
    }
  } catch (error) {
    handleError("Error fetching single listing.")
    throw error // Rethrow the error for further handling if needed
  }
}
