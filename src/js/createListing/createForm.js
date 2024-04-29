import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { displayFilteredListings } from "../listings/displayListings.js"

export async function createNewListing() {
  try {
    const getForm = document.getElementById("createListing")

    if (getForm) {
      getForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log("Form submitted!")

        try {
          // Fetch the user's profile to get the seller's name
          console.log("Fetching user profile...")
          const userProfile = await getProfile()
          console.log("User profile fetched:", userProfile)
          const userName = userProfile.data.name

          const form = event.target
          const title = form.querySelector("#title").value
          const description = form.querySelector("#description").value
          const deadline = form.querySelector("#deadline").value

          const mediaInputs = Array.from(form.querySelectorAll(".media-input"))
          const media = mediaInputs
            .map((input) => {
              const url = input.value.trim()
              return url ? { url, alt: "Listing Image" } : null
            })
            .filter((media) => media !== null)

          const newListing = {
            title,
            description,
            media,
            endsAt: new Date(deadline).toISOString(),
            seller: { name: userName },
          }

          const createdListing = await createListing(newListing)
          console.log("Created Listing:", createdListing)

          const listingsContainer = document.querySelector("#listings")
          if (listingsContainer) {
            console.log("Displaying filtered listings...")
            displayFilteredListings(
              [createdListing],
              getProfile,
              listingsContainer,
              true,
            )
          }
        } catch (error) {
          console.error("Error creating listing:", error)
          userFeedback("Something went wrong. Please try again.")
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
}
