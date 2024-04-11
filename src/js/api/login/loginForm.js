import { login } from "../api/auth/login.js"

export function getUser() {
  const getForm = document.querySelector("#loginForm")

  if (getForm) {
    getForm.addEventListener("submit", (event) => {
      event.preventDefault()
      const form = event.target

      const email = form.email.value
      const password = form.password.value

      const user = {
        email,
        password,
      }

      login(user)
    })
  }
}
