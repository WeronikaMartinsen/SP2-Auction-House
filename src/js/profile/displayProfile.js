import { getProfile } from "./getProfile.js"

export async function displayUserProfile() {
  try {
    const response = await getProfile()

    if (!response || !response.data) {
      console.error("User profile data not found.")
      return
    }

    const userProfile = response.data

    console.log("Retrieved User Profile Data:", userProfile)
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
}

displayUserProfile()
