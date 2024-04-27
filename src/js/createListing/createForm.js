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
          const userProfile = await getProfile()
          const userName = userProfile.name

          const form = event.target
          const title = form.querySelector("#title").value
          const description = form.querySelector("#description").value
          const deadline = form.querySelector("#deadline").value

          // Collect media URLs as an array
          const mediaInputs = Array.from(form.querySelectorAll(".media-input"))
          const media = mediaInputs
            .map((input) => input.value.trim())
            .filter((url) => url !== "")

          // Create a new listing object with media property
          const newListing = {
            title,
            description,
            media, // Include media property here
            endsAt: new Date(deadline).toISOString(),
            seller: { name: userName },
          }
          console.log("New Listing:", newListing)

          // Call the createListing function with the newListing object
          const createdListing = await createListing(newListing)
          console.log("Created Listing:", createdListing)

          // Provide user feedback
          userFeedback("Your listing has been added!")

          // Display the new listing
          const listingsContainer = document.querySelector("#listings")
          displayFilteredListings(
            getProfile,
            listingsContainer,
            false,
            newListing,
          )
          listingsContainer, newListing

          // Reload the page to reflect the new listing
          location.reload()
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
