export function showModal(title, modalMessage) {
  // Create modal container
  const modalContainer = document.createElement("div")
  modalContainer.classList.add("modal", "fade")
  modalContainer.id = "customModal"
  modalContainer.setAttribute("tabindex", "-1")
  modalContainer.setAttribute("aria-labelledby", "customModalLabel")
  modalContainer.setAttribute("aria-hidden", "true")

  // Modal dialog
  const modalDialog = document.createElement("div")
  modalDialog.classList.add("modal-dialog", "modal-dialog-centered")
  modalContainer.appendChild(modalDialog)

  // Modal content
  const modalContent = document.createElement("div")
  modalContent.classList.add("modal-content")
  modalDialog.appendChild(modalContent)

  // Modal header
  const modalHeader = document.createElement("div")
  modalHeader.classList.add("modal-header")
  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.classList.add("btn-close")
  closeButton.setAttribute("data-bs-dismiss", "modal")
  closeButton.setAttribute("aria-label", "Close")
  modalHeader.appendChild(closeButton)
  modalContent.appendChild(modalHeader)

  // Modal body
  const modalBody = document.createElement("div")
  modalBody.classList.add(
    "modal-body",
    "gap-3",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
  )
  modalContent.appendChild(modalBody)

  // Title
  const modalTitle = document.createElement("h3")
  modalTitle.classList.add("fs-5")
  modalTitle.textContent = title
  modalBody.appendChild(modalTitle)

  // Create message container
  const messageContainer = document.createElement("div")
  messageContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "flex-column",
    "gap-3",
  )
  modalBody.appendChild(messageContainer)

  // Message
  const messageElement = document.createElement("p")
  messageElement.textContent = modalMessage // Use the function parameter here
  messageContainer.appendChild(messageElement)

  // Create a container for the buttons
  const buttonsContainer = document.createElement("div")
  buttonsContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-3",
  )

  // Login button
  const loginButton = document.createElement("a")
  loginButton.href = "html/login/index.html"
  loginButton.classList.add("btn", "btn-primary", "text-white")
  loginButton.textContent = "Login"
  buttonsContainer.appendChild(loginButton)

  // Register button
  const registerButton = document.createElement("a")
  registerButton.href = "html/register/register.html"
  registerButton.classList.add("btn", "btn-outline-primary", "text-dark")
  registerButton.textContent = "Register"
  buttonsContainer.appendChild(registerButton)

  // Append buttons container to messageContainer
  messageContainer.appendChild(buttonsContainer)

  // Append modal container to body
  document.body.appendChild(modalContainer)

  // Show the modal
  const customModal = new bootstrap.Modal(modalContainer)
  customModal.show()
}
