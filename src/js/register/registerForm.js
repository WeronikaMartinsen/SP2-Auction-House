import { register } from "../api/auth/register.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

/**
 * Event listener for the form submission.
 * @param {Event} event - The form submission event.
 */

export function registerUser() {
  const getForm = document.querySelector("#registerForm")

  if (getForm) {
    getForm.addEventListener("submit", async (event) => {
      event.preventDefault()
      const form = event.target

      const name = form.name.value
      const email = form.email.value
      const password = form.password.value
      const avatarUrl = form.avatar.value
      const avatar = avatarUrl ? { url: avatarUrl, alt: "Avatar alt text" } : {}

      const user = {
        name,
        email,
        password,
        avatar,
      }

      try {
        await register(user)
      } catch (error) {
        handleError("An unexpected error occurred.")
        userFeedback(
          "Registration failed. Please check your email and password.",
          () => {
            // Callback function to execute after the timeout
            location.reload()
          },
        )
      }
    })
  }
}
