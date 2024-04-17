import { API_BASE_URL, LISTINGS } from "../api/constants.js"
import { load, save } from "../api/storage/storeToken.js"
import { showLoadingIndicator } from "../ui/loadingIndicator.js"
import { hideLoadingIndicator } from "../ui/loadingIndicator.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function getListings() {
  const getListingsURL = API_BASE_URL + LISTINGS + `?_author=true`
  const token = load(token)

  try {
    showLoadingIndicator()
    const response = await fetch(getListingsURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const posts = await response.json()
    if (response.ok) {
      hideLoadingIndicator()

      save("posts", posts)
      return posts
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
    const post = await response.json()
    if (response.ok) {
      hideLoadingIndicator()
      return post
    }
  } catch (error) {
    handleError("Error fetching post.")
  }
}
