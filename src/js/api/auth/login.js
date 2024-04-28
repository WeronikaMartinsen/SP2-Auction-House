import { API_BASE_URL, LOGIN } from "../constants.js"
import * as storage from "../storage/storeToken.js"
import { userFeedback } from "../../userFeedback/feedbackOverlay.js"
import { handleError } from "../../userFeedback/errorMessage.js"

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

    // Log the postData being sent in the request
    console.log("Request Data:", postData)

    const response = await fetch(loginURL, postData)

    // Log the response received from the server
    console.log("Response:", response)

    const json = await response.json()

    // Log the JSON data received from the server
    console.log("JSON Data:", json)

    if (response.ok) {
      storage.save("token", json.accessToken)
      storage.save("profile", {
        userName: json.name,
        userEmail: json.email,
        userCredit: json.credits,
        userAvatar: json.avatar,
        userWins: json.wins,
      })
    } else {
      const status = json.statusCode
      if (status === 401) {
        userFeedback(
          "Login failed. Please check your email and password.",
          () => {
            location.reload()
          },
        )
        throw new Error("Wrong email or password!")
      } else {
        throw new Error(`Login failed with status ${status}.`)
      }
    }
  } catch (error) {
    // Log any unexpected errors that occur during login
    console.error("An unexpected error occurred:", error)

    handleError("An unexpected error occurred. Please try again.")

    userFeedback("Login failed. Please check your email and password.", () => {
      location.reload()
    })
  }
}
