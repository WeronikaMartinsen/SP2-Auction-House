export function showModal() {
  const modal = document.getElementById("profileModal")
  const modalBackdrop = document.getElementById("modalBackdrop")
  modalBackdrop.classList.add("show")
  modal.style.display = "block"
}

// Event listener for avatar click to show modal
const avatarLink = document.getElementById("avatar-small-navbar")
avatarLink.addEventListener("click", () => {
  showModal()
})

// Close modal function
function closeModal() {
  const modal = document.getElementById("profileModal")
  const modalBackdrop = document.getElementById("modalBackdrop")
  modalBackdrop.classList.remove("show")
  modal.style.display = "none"
}

// Close modal when backdrop clicked
const modalBackdrop = document.getElementById("modalBackdrop")
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal()
  }
})

// Function to handle logout
function handleLogout() {}

// Profile and logout options
const profileContent = `
  <div class="modal-body">
    <!-- Profile content -->
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" id="logoutBtn">Logout</button>
  </div>
`

// Render the modal
const modalContainer = document.createElement("div")
modalContainer.innerHTML = `
  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="profileModalLabel">Profile</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        ${profileContent}
      </div>
    </div>
  </div>
`
document.body.appendChild(modalContainer)

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", () => {
  handleLogout()
})
