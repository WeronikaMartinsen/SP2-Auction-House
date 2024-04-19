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
    day: "numeric",
    month: "short",
  }
  const dateFormatted = new Intl.DateTimeFormat("en-US", options).format(date)

  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }
  const time = new Intl.DateTimeFormat("en-US", hourOptions).format(date)

  return {
    date: dateFormatted,
    time: time,
  }
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

  const auctionsEnd = document.createElement("div")
  auctionsEnd.classList.add("auctionEnds")
  card.appendChild(auctionsEnd)

  const endDate = new Date(listing.endsAt)
  const formattedEndDateTime = formatEndDateTime(endDate)

  const dateElement = document.createElement("p")
  dateElement.textContent = formattedEndDateTime.date

  const timeElement = document.createElement("p")
  timeElement.textContent = formattedEndDateTime.time

  auctionsEnd.appendChild(timeElement)
  auctionsEnd.appendChild(dateElement)

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
