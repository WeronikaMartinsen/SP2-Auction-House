export function showLoadingIndicator() {
  const loadingContainer = document.querySelector(".loaderContainer")
  loadingContainer.style.display = "block"
}

export function hideLoadingIndicator() {
  const loadingContainer = document.querySelector(".loaderContainer")
  loadingContainer.style.display = "none"
}
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
