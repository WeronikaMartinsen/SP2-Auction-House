import { API_BASE_URL, REGISTER } from "../constants.js"
import { userFeedback } from "../../userFeedback/feedbackOverlay.js"
import { handleError } from "../../userFeedback/errorMessage.js"

export async function register(user) {
  const registerURL = API_BASE_URL + REGISTER
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
    const response = await fetch(registerURL, postData)
    const json = await response.json()

    const status = json.statusCode
    if (response.ok) {
      userFeedback(
        "You have successfully registered now! Log in to enter the page.",
        () => {
          window.location.href = "/html/login/index.html"
        },
      )
    } else if (status === 400) {
      userFeedback("This profile already exists! Try again, please.", () => {})
    }
  } catch (error) {
    handleError("An unexpected error occurred. Please try again.")
  }
}
