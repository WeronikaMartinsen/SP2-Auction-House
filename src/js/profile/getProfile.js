import { load } from "../api/storage/storeToken.js"

import { API_BASE_URL, PROFILES } from "../api/constants.js"

import { handleError } from "../userFeedback/errorMessage.js"

export async function getProfile() {
  const userName = localStorage.getItem("name")
  const getProfileURL = `${API_BASE_URL}${PROFILES}/${userName}`
  const user = load("token")

  try {
    const response = await fetch(getProfileURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    })
    const currentUser = await response.json()
    if (response.ok) {
      return currentUser
    }
  } catch (error) {
    handleError("Error fetching users profile.")
  }
}
