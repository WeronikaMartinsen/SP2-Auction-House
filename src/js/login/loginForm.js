import { login } from "../api/auth/login.js"
import { API_BASE_URL, API_KEY } from "../api/constants.js"
import { createApiKey } from "../api/auth/apiKey.js"

export async function getUser() {
  const getForm = document.querySelector("#loginForm")

  if (getForm) {
    getForm.addEventListener("submit", async (event) => {
      event.preventDefault()
      const form = event.target

      const email = form.email.value
      const password = form.password.value

      const user = {
        email,
        password,
      }

      const loginSuccess = await login(user)
      if (loginSuccess) {
        console.log("Login successful")

        const apiKeyFetchSuccess = await createApiKey(API_BASE_URL + API_KEY)
        if (apiKeyFetchSuccess) {
          console.log("API key fetched successfully")
        } else {
          console.log("Failed to fetch API key")
        }
      } else {
        console.log("Login failed")
      }
    })
  }
}
