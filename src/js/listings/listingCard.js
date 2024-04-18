export function createListingCard(listing) {
  console.log(listing)
  const card = document.createElement("div")
  card.classList.add("listing-card")

  // Image
  if (listing.media && listing.media.length > 0) {
    const imageContainer = document.createElement("div")
    imageContainer.classList.add("image-container")

    listing.media.forEach((imageUrl) => {
      const image = document.createElement("img")
      image.src = imageUrl
      image.alt = "Listing Image"
      imageContainer.appendChild(image)
    })

    card.appendChild(imageContainer)
  }
  // Title
  const title = document.createElement("h2")
  title.textContent = listing.title
  card.appendChild(title)

  // Description
  const description = document.createElement("p")
  description.textContent = listing.description
  card.appendChild(description)

  // Tags
  if (listing.tags && listing.tags.length > 0) {
    const tagsContainer = document.createElement("div")
    tagsContainer.classList.add("tags-container")
    listing.tags.forEach((tag) => {
      const tagElement = document.createElement("span")
      tagElement.classList.add("tag")
      tagElement.textContent = tag
      tagsContainer.appendChild(tagElement)
    })
    card.appendChild(tagsContainer)
  }

  // Other details
  const createdDate = new Date(listing.created).toLocaleDateString()
  const details = document.createElement("div")
  details.classList.add("details")
  details.innerHTML = `
    <p>Created: ${createdDate}</p>
    <p>Bids: ${listing._count.bids}</p>
  `
  card.appendChild(details)

  return card
}
