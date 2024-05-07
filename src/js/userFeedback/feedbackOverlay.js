export function userFeedback(message, callback) {
  const overlay = document.createElement("div")
  overlay.classList.add("overlayUserFeedback", "border")

  const messageBox = document.createElement("div")
  messageBox.classList.add("messageBox")

  const content = document.createElement("span")
  content.classList.add("text-center", "text-wrap")

  content.textContent = message

  const containerForCloseBtn = document.createElement("div")
  containerForCloseBtn.classList.add("ms-auto", "mb-2")

  const closeBtn = document.createElement("i")
  closeBtn.classList.add(
    "d-flex",
    "align-items-center",
    "btn",
    "fa-solid",
    "justify-content-end",
    "align-item-end",
    "fa-xmark",
    "text-end",
    "userFeedback",
  )

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay)
  })

  containerForCloseBtn.append(closeBtn)
  overlay.append(containerForCloseBtn)
  messageBox.append(content)

  document.body.append(overlay)
  overlay.append(messageBox)

  const waitForCallback = async () => {
    if (callback) {
      await callback()
    }
    overlay.remove()
  }

  setTimeout(waitForCallback, 2000)
}
