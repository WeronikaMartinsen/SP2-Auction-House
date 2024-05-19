export function userFeedback(message, callback) {
  const overlay = document.createElement("div")
  overlay.classList.add(
    "overlayUserFeedback",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "border",
  )

  const messageBox = document.createElement("div")
  messageBox.classList.add("messageBox")

  const content = document.createElement("h5")
  content.classList.add("text-center", "text-wrap")
  content.textContent = message

  messageBox.append(content)

  overlay.append(messageBox)
  document.body.append(overlay)

  const waitForCallback = async () => {
    if (callback) {
      await callback()
    }
    overlay.remove()
  }

  setTimeout(waitForCallback, 2000)
}
