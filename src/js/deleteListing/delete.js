import { API_BASE_URL, LISTINGS, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function deleteListing(id) {
  console.log("Attempting to delete listing with id:", id)
  const token = load("token")
  const getProfileFromToken = load("profile")
  const user = getProfileFromToken.userName
  try {
    if (!id) {
      throw new Error("Delete requires a listing ID.")
    }
    const deleteListingURL = API_BASE_URL + LISTINGS + `/` + id
    const response = await fetch(deleteListingURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
    })

    if (response.ok) {
      userFeedback("You have successfully deleted your listing.", () => {
        // Callback function to execute after the timeout
        window.location.href = `/html/listings/listings.html?name=${user}`
      })
    }
  } catch (error) {
    handleError("Error when trying to delate listing")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
