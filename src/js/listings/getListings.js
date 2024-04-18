import { API_BASE_URL, LISTINGS } from "../api/constants.js"
import { load, save } from "../api/storage/storeToken.js"
import { showLoadingIndicator } from "../ui/loadingIndicator.js"
import { hideLoadingIndicator } from "../ui/loadingIndicator.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function getListings() {
  const getListingsURL = API_BASE_URL + LISTINGS
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

export async function getListing(id) {
  const getSingleListingUrl =
    API_BASE_URL + LISTINGS + `/` + id + `?_author=true`
  const token = load("token")

  try {
    showLoadingIndicator()
    let response = await fetch(getSingleListingUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const listing = await response.json()
    if (response.ok) {
      hideLoadingIndicator()
      return listing
    }
  } catch (error) {
    handleError("Error fetching post.")
  }
}
