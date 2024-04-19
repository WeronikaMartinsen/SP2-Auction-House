function formatDateTime(date) {
  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour format
  }
  return new Intl.DateTimeFormat("en-GB", options).format(date)
}
function formatEndDateTime(date) {
  const options = {
    hour: "numeric",
    minute: "numeric",
  }
  const time = new Intl.DateTimeFormat("en-US", options).format(date)

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  let relativeTime
  if (date.toDateString() === today.toDateString()) {
    relativeTime = "TODAY"
  } else if (date.toDateString() === tomorrow.toDateString()) {
    relativeTime = "TOMORROW"
  } else {
    const options = { month: "long", day: "numeric" }
    relativeTime = new Intl.DateTimeFormat("en-US", options).format(date)
  }

  return `${time}, ${relativeTime}`
}

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

  const contentContainer = document.createElement("div")
  contentContainer.classList.add("contentContainer")

  card.appendChild(contentContainer)

  const sellerContainer = document.createElement("div")
  sellerContainer.classList.add("sellerContainer")
  const avatarImg = document.createElement("img")
  avatarImg.src = listing.seller.avatar || "/images/avatar-bidme.png"
  avatarImg.alt = "Avatar"
  avatarImg.classList.add("sellerAvatar")

  const sellerName = document.createElement("a")
  sellerName.textContent = listing.seller.name

  contentContainer.appendChild(sellerContainer)
  sellerContainer.appendChild(avatarImg)
  sellerContainer.appendChild(sellerName)

  // Other details

  const details = document.createElement("div")
  details.classList.add("details")
  const createdDate = new Date(listing.created)
  const formattedDate = formatDateTime(createdDate)
  details.textContent = `${formattedDate}`

  const endDate = new Date(listing.endsAt)
  const formattedEndDate = formatEndDateTime(endDate)
  const endDateElement = document.createElement("p")
  endDateElement.textContent = `${formattedEndDate}`
  endDateElement.classList.add("auctionEnds")
  details.appendChild(endDateElement)

  contentContainer.appendChild(details)

  // Title
  const title = document.createElement("h2")
  title.textContent = listing.title
  contentContainer.appendChild(title)

  // Description
  const description = document.createElement("p")
  description.textContent = listing.description
  contentContainer.appendChild(description)

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
    contentContainer.appendChild(tagsContainer)
  }

  return card
}
