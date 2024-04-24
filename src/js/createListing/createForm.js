import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export function createNewListing() {
  try {
    const getForm = document.getElementById("createListing")

    if (getForm) {
      getForm.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("Form submitted!")
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
          endsAt: new Date(deadline).toISOString(), // Convert deadline to ISO string
        }

        // Call the createListing function with the newListing object
        createListing(newListing)

        // Provide user feedback
        userFeedback("Your listing has been added!", () => {
          location.reload()
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
