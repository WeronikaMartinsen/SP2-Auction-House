import { getProfile } from "./getProfile.js"

export async function displayUserProfile() {
  const userProfile = await getProfile()
  if (userProfile) {
    console.log("User Profile:", userProfile)
    // Display user profile data on the frontend
  } else {
    console.log("User profile could not be fetched.")
    // Handle error or display appropriate message to the user
  }
}

displayUserProfile()
