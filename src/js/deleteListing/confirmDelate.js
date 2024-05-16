import { deleteListing } from "./delete.js"
import { handleError } from "../userFeedback/errorMessage.js"

export function confirmDelateListing(message, listingId) {
  console.log("Attempting to delete listing with id:", listingId)
  const overlay = document.createElement("div")
  overlay.classList.add("overlayConfirmDelate", "border")

  const messageBox = document.createElement("div")
  messageBox.classList.add("messageBox")

  const content = document.createElement("span")
  content.classList.add("text-center", "text-wrap", "mt-3", "mb-4")

  content.textContent = message

  const buttonsContainer = document.createElement("div")
  buttonsContainer.classList.add("p-0", "m-0", "d-flex", "gap-2")

  const yesBtn = document.createElement("button")
  yesBtn.textContent = "Delete"
  yesBtn.classList.add("btn", "btn-primary", "custom-shadow", "text-white")
  yesBtn.addEventListener("click", async () => {
    try {
      console.log("Attempting to delete listing with id:", listingId)
      await deleteListing(listingId)
      document.body.removeChild(overlay)
    } catch (error) {
      console.error("Error deleting listing:", error)
      handleError("Error deleting listing.")
    }
  })

  const noBtn = document.createElement("button")
  noBtn.classList.add("btn", "border-secondary", "custom-shadow")

  noBtn.textContent = "Close"
  noBtn.addEventListener("click", () => {
    deleteListing(false)
    document.body.removeChild(overlay)
  })

  buttonsContainer.append(noBtn)
  buttonsContainer.append(yesBtn)

  messageBox.append(content)
  messageBox.append(buttonsContainer)

  document.body.append(overlay)
  overlay.append(messageBox)
}
