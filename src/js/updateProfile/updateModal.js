/* import { handleError } from "../userFeedback/errorMessage.js"

export function updateAvatarModal(message, user) {
  const overlay = document.createElement("div")
  overlay.classList.add("overlayConfirmDelate", "border")

  const messageBox = document.createElement("div")
  messageBox.classList.add("messageBox")

  const content = document.createElement("span")
  content.classList.add("text-center", "text-wrap", "mb-4")

  content.textContent = message

  const containerForCloseBtn = document.createElement("div")
  containerForCloseBtn.classList.add("ms-auto")

  const deleteButton = document.createElement("i")

  deleteButton.classList.add(
    "d-flex",
    "align-items-center",
    "btn",
    "fa-solid",
    "justify-content-end",
    "align-item-end",
    "fa-xmark",
  )

  deleteButton.addEventListener("click", () => {
    document.body.removeChild(overlay)
  })

  const buttonsContainer = document.createElement("div")
  buttonsContainer.classList.add("buttons-confirm")

  const yesBtn = document.createElement("button")
  yesBtn.textContent = "Delete"
  yesBtn.classList.add("btn", "btn-primary", "custom-shadow", "text-white")
  yesBtn.addEventListener("click", async () => {
    try {
      console.log("Attempting to delete listing with id:", listingId)
      await update(avatar)
      document.body.removeChild(overlay)
    } catch (error) {
      console.error("Error deleting listing:", error)
      handleError("Error deleting listing.")
    }
  })

  buttonsContainer.append(yesBtn)

  containerForCloseBtn.append(deleteButton)
  overlay.append(containerForCloseBtn)
  messageBox.append(content)
  messageBox.append(buttonsContainer)

  document.body.append(overlay)
  overlay.append(messageBox)
}
 */
