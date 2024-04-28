import { API_BASE_URL, LOGIN, API_KEY } from "../constants.js"
import * as storage from "../storage/storeToken.js"
import { userFeedback } from "../../userFeedback/feedbackOverlay.js"
import { handleError } from "../../userFeedback/errorMessage.js"
import { getApiKey } from "./apiKey.js"

/**
 * Logs in the user and stores the token and profile data.
 * Redirects to the feed page upon successful login.
 * @param {Object} user - The user object containing email and password.
 * @throws {Error} Throws an error if login fails or if an unexpected error occurs.
 */
export async function login(user) {
  try {
    // Fetch the API key
    const apiKey = await getApiKey(API_BASE_URL + API_KEY)

    // Construct the login URL with the API key
    const loginURL = API_BASE_URL + LOGIN

    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey.json.key,
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
        userCredit: json.credits,
        userAvatar: json.avatar,
        userWins: json.wins,
      })

      userFeedback("You are successfully logged in!", () => {
        window.location.href = "/html/listings/listings.html"
      })
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
