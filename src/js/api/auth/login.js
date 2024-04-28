import { API_BASE_URL, LOGIN } from "../constants.js"
import { save } from "../storage/storeToken.js"
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

    const response = await fetch(loginURL, postData)
    const json = await response.json()

    console.log("Response Data:", json)

    if (response.ok) {
      const accessToken = json.data.accessToken
      if (!accessToken) {
        console.error("Access token not found in response:", json)
        throw new Error("Access token not found in response")
      }
      save("token", accessToken)
      console.log("Access token saved successfully:", accessToken)
      save("profile", {
        userName: json.data.name,
        userEmail: json.data.email,
        userCredit: json.data.credits,
        userAvatar: json.data.avatar,
        userWins: json.data.wins,
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
