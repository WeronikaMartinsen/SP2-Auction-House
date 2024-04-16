import { API_BASE_URL, LOGIN } from "../constants.js"
import * as storage from "../storage/storeToken.js"
import { userFeedback } from "../../userFeedback/feedbackOverlay.js"
import { handleError } from "../../userFeedback/errorMessage.js"

/**
 * Logs in the user and stores the token and profile data.
 * Redirects to the feed page upon successful login.
 * @param {Object} user - The user object containing email and password.
 * @throws {Error} Throws an error if login fails or if an unexpected error occurs.
 */
export async function login(user) {
  const loginURL = API_BASE_URL + LOGIN

  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }

    const response = await fetch(loginURL, postData)
    const json = await response.json()

    if (response.ok) {
      storage.save("token", json.accessToken)
      storage.save("profile", {
        userName: json.name,
        userEmail: json.email,
      })

      window.location.href = "../listings/listings.html"
    } else {
      const status = json.statusCode
      if (status === 401) {
        userFeedback(
          "Login failed. Please check your email and password.",
          () => {
            // Callback function to execute after the timeout
            location.reload()
          },
        )
        throw new Error("Wrong email or password!")
      } else {
        throw new Error(`Login failed with status ${status}.`)
      }
    }
  } catch (error) {
    handleError("An unexpected error occurred. Please try again.")
    userFeedback("Login failed. Please check your email and password.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}
