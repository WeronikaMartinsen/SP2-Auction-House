const modalContent = `
    <div class="modal fade" id="updateListingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Update Listing
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body gap-3">
                    <form id="updateListing">
                    <label for="updateTitle" class="d-none"></label>
                    <input
                        name="updateTitle"
                        id="updateTitle"
                        type="text"
                        placeholder="Title*"
                        class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
                        required
                    />
                    <label for="updateDescription" class="d-none"></label>
                    <textarea
                        name="updateDescription"
                        id="updateDescription"
                        type="text-area"
                        placeholder="Description*"
                        class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
                        required
                    ></textarea>

                    <label for="updateMedia1" class="d-none">Media URL 1:</label>
                    <input
                        name="updateMedia1"
                        id="updateMedia1"
                        type="url"
                        placeholder="Media Url*"
                        class="media-input form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
                        required
                    />

                    <label for="updateMedia2" class="d-none">Media URL 2:</label>
                    <input
                        name="updateMedia2"
                        id="updateMedia2"
                        type="url"
                        placeholder="Media Url"
                        class="media-input form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
                    />

                    <label for="updateMedia3" class="d-none">Media URL 3:</label>
                    <input
                        name="updateMedia3"
                        id="updateMedia3"
                        type="url"
                        placeholder="Media Url"
                        class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1 media-input"
                    />

                    <label for="updateDeadline" class="d-none"></label>
                    <input
                        name="updateDeadline"
                        id="updateDeadline"
                        type="datetime-local"
                        placeholder="Deadline date*"
                        class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
                        required
                    />
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary text-white">Submit</button>
                </div>
            </div>
        </div>
    </div>
`

// Function to show the modal
export function showModal() {
  // Create a div element to hold the modal content
  const modalContainer = document.createElement("div")
  modalContainer.innerHTML = modalContent.trim() // Trim to remove leading/trailing whitespace

  // Append the modal to the document body
  document.body.appendChild(modalContainer.firstChild)

  // Initialize the modal using Bootstrap
  const modal = new bootstrap.Modal(
    document.getElementById("updateListingModal"),
  )
  modal.show()
}

// Add an event listener to the button to show the modal when clicked
const btnUpdate = document.createElement("button")
btnUpdate.textContent = ". . ."
btnUpdate.classList.add("pe-auto")
btnUpdate.addEventListener("click", showModal)
