import { createListing } from "./create.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"

export function createNewListing() {
  try {
    const getForm = document.querySelector("#createListing")

    if (getForm) {
      getForm.addEventListener("sumbit", (event) => {
        event.preventDefault()
        const form = event.target
        const title = form.querySelector("#title").value
        const description = form.querySelector("#description").value
        const media1 = form.querySelector("#media1").value
        const media2 = form.querySelector("#media2").value
        const media3 = form.querySelector("#media3").value
        const deadline = form.querySelector("#deadline").value
        const newListing = {
          title,
          description,
          media1,
          media2,
          media3,
          deadline,
        }
        createListing(newListing)
        userFeedback("Your post has been added!", () => {
          location.reload()
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}
