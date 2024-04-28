import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { getProfile } from "../profile/getProfile.js"
import { displayFilteredListings } from "../listings/displayListings.js"
import { getListings } from "../listings/getListings.js"

export async function createNewListing() {
  try {
    const getForm = document.getElementById("createListing")
    const allListings = await getListings()

    if (getForm) {
      getForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log("Form submitted!")

        try {
          // Fetch the user's profile to get the seller's name
          console.log("Fetching user profile...")
          const userProfile = await getProfile()
          console.log("User profile fetched:", userProfile)
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
          console.log("Creating new listing...")
          const createdListing = await createListing(newListing)
          console.log("Created Listing:", createdListing)

          const listingsContainer = document.querySelector("#listings")
          console.log("Displaying filtered listings...")
          displayFilteredListings(
            allListings.concat(createdListing), // Concatenate the new listing with existing listings
            getProfile,
            listingsContainer,
            true, // Set append to true to indicate that we're appending the new listing
            createdListing, /// Set append to true to indicate that we're appending the new listing
          )
          // Provide user feedback
          userFeedback("Your listing has been added!")
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
