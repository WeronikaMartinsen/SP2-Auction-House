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

        // Collect media URLs as an array
        const media = []
        const media1 = form.querySelector("#media1").value
        const media2 = form.querySelector("#media2").value
        const media3 = form.querySelector("#media3").value
        if (media1.trim() !== "") media.push(media1)
        if (media2.trim() !== "") media.push(media2)
        if (media3.trim() !== "") media.push(media3)

        const deadline = form.querySelector("#deadline").value

        // Include media array in the newListing object
        const newListing = {
          title,
          description,
          media,
          deadline,
        }

        createListing(newListing)
        userFeedback("Your listing has been added!", () => {
          location.reload()
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
