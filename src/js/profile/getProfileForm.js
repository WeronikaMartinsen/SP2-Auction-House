import { getProfile } from "./getProfile.js"
import { handleError } from "../userFeedback/errorMessage.js"

export async function getProfileForm() {
  try {
    const profile = await getProfile()

    const userName = document.querySelector("#name")
    const userEmail = document.querySelector("#email")
    const userAvatar = document.querySelector("#avatar")
    const userCredits = document.querySelector("#credits")

    userName.textContent = profile.name
    userEmail.textContent = profile.email
    userAvatar.src = profile.avatar || "/images/avatar-bidme.png"
    userAvatar.alt = "User image."
    userCredits.textContent = profile.credits

    return profile
  } catch (error) {
    handleError("Error fetching user profile.")
  }
}
