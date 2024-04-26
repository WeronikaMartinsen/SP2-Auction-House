import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { createListingCard } from "../listings/listingCard.js"

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

          // Create a new listing object
          const newListing = {
            title,
            description,
            media,
            endsAt: new Date(deadline).toISOString(),
            seller: { name: userName }, // Include the seller's name
          }

          // Call the createListing function with the newListing object
          const createdListing = await createListing(newListing)
          console.log("Created Listing:", createdListing)

          // Provide user feedback
          userFeedback("Your listing has been added!")

          setTimeout(() => {
            // Reload the page to reflect the new listing
            location.reload()

            // Display the new listing
            const listingsContainer = document.querySelector("#listings")
            displayNewListing(listingsContainer, createdListing)
          }, 19000)
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

export async function displayNewListing(listingsContainer, newListing) {
  try {
    const userProfile = await getProfile()

    // Create a new listing card for the newly created listing
    const card = createListingCard(newListing, userProfile)

    // Prepend the new listing card to the top of the listings container
    listingsContainer.prepend(card)
  } catch (error) {
    console.error("Error displaying new listing:", error)
    // Handle error or provide user feedback
    userFeedback("Something went wrong. Please try again.")
  }
}
