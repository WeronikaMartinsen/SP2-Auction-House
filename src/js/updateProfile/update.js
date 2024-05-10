/* import { API_BASE_URL, PROFILES, API_KEY_NAME } from "../api/constants.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export async function updateProfile(editedProfile) {
  const updateProfileURL = `${API_BASE_URL}${PROFILES}/${user}`
  const token = load("token")
  const getProfileFromToken = load("profile")
  const user = getProfileFromToken.userName

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

    if (response.ok) {
      userFeedback("You have successfully updated your profile.", () => {
        window.location.href = `/html/profiles/profile.html?name=${user}`
      })
    } else {
      // Handle error cases
      console.error("Error:", response.statusText)
      handleError("Error updating listing. Please try again.")
      userFeedback("Something went wrong. Please, try again.", () => {
        // Callback function to execute after the timeout
        location.reload()
      })
    }
  } catch (error) {
    console.error(error)
    handleError("Error updating listing. Please try again.")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
 */
