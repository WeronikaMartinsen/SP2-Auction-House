import { API_BASE_URL, PROFILES, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function updateProfile(editedProfile) {
  const token = load("token")
  const getProfileFromToken = load("profile")
  const user = getProfileFromToken.userName
  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${user}`

  try {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY_NAME,
      },
      body: JSON.stringify(editedProfile),
    }

    const response = await fetch(updateProfileURL, postData)
    const result = await response.json()

    if (response.ok) {
      location.reload()
    } else if (response.status === 500) {
      userFeedback("There is a problem on our end. Please try again later.")
    } else if (response.status === 400) {
      userFeedback(
        "An error has occurred. Please make sure image URL is working and publicly accessible.",
      )
    }

    return result
  } catch (error) {
    console.error(error)
    handleError("Error updating profile. Please try again later.")
  }
}
