import { API_BASE_URL, LISTINGS } from "../api/constants.js"
import { load, save } from "../api/storage/storeToken.js"
import { showLoadingIndicator } from "../ui/loadingIndicator.js"
import { hideLoadingIndicator } from "../ui/loadingIndicator.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function getListings() {
  const getListingsURL = API_BASE_URL + LISTINGS + `?_seller=true`
  const token = load("token")

  try {
    showLoadingIndicator()
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
      console.log(listings)
      return listings
    }
  } catch (error) {
    handleError("Error fecthing posts.")
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
