import { remove } from "../storage/storeToken.js"
import { userFeedback } from "../../userFeedback/feedbackOverlay.js"
/**
 * Logs the user out by removing the token and profile information from local storage.
 * Redirects the user to the index page after successful logout.
 * @function logout
 * @returns {void} This function does not return a value.
 */

export function logout() {
  const logoutBtn = document.querySelector("#logout")

  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("Logout button clicked")
    remove("token")
    remove("profile")
    remove("apiKey")
    userFeedback("Your have successfully log out now!", () => {
      window.location.href = "/html/login/index.html"
    })
  })
}
