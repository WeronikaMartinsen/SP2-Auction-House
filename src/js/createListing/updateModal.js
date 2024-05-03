export function showModal(modalId, modalContent) {
  const modal = document.getElementById(modalId)
  console.log("Modal Element:", modal) // Add console log to check the modal element
  if (!modal) {
    console.error("Modal with ID", modalId, "not found.")
    return
  }

  const modalBody = modal.querySelector(".modal-body")
  console.log("Modal Body Element:", modalBody) // Add console log to check the modal body element
  if (!modalBody) {
    console.error("Modal body element not found.")
    return
  }

  modalBody.innerHTML = modalContent // Set the innerHTML of the modal body

  const modalInstance = new bootstrap.Modal(modal)
  modalInstance.show()
}

export function hideModal(modalId) {
  const modal = document.getElementById(modalId)
  if (!modal) {
    console.error("Modal with ID", modalId, "not found.")
    return
  }

  const modalInstance = bootstrap.Modal.getInstance(modal)
  if (modalInstance) {
    modalInstance.hide()
  } else {
    console.error("Modal instance not found.")
  }
}
export function createListingModalContent() {
  return `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Update Listing</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body gap-3">
          <form id="updateListing">
            <label for="title" class="d-none"></label>
            <input
              name="title"
              id="updateTitle"
              type="text"
              placeholder="Title*"
              class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
              required
            />
            <label for="description" class="d-none"></label>
            <textarea
              name="description"
              id="updateDescription"
              type="text-area"
              placeholder="Description*"
              class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
              required
            ></textarea>

            <label for="media1" class="d-none">Media URL 1:</label>
            <input
              name="media1"
              id="updateMedia1"
              type="url"
              placeholder="Media Url*"
              class="media-input form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
              required
            />

            <label for="media2" class="d-none">Media URL 2:</label>
            <input
              name="media2"
              id="updateMedia2"
              type="url"
              placeholder="Media Url"
              class="media-input form-label w-100 rounded border border-light shadow-sm mb-3 p-1"
            />

            <label for="media3" class="d-none">Media URL 3:</label>
            <input
              name="media3"
              for="media3"
              id="updateMedia3"
              type="url"
              placeholder="Media Url"
              class="form-label w-100 rounded border border-light shadow-sm mb-3 p-1 media-input"
            />

            <label for="date" class="d-none"></label>
            <input
              name="deadline"
              for="deadline"
              id="updateTitle"
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
  `
}
