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
  const card = document.createElement("div")
  card.classList.add("listing-card")
  const listingId = listing && listing.id ? listing.id : "Unknown ID"

  // Image
  const imageContainer = document.createElement("div")
  imageContainer.classList.add("image-container")
  imageContainer.href = `/html/listings/singleListing.html?id=${listingId}`
  imageContainer.addEventListener("click", () => {
    window.location.href = imageContainer.href
  })

  const image = document.createElement("img")
  if (listing.media && listing.media.length > 0) {
    image.src = listing.media[0]
  } else {
    image.src = "/images/defaultImage.png"
  }
  image.alt = "Listing Image"

  image.onerror = function () {
    this.src = "/images/defaultImage.png"
  }
  imageContainer.appendChild(image)

  card.appendChild(imageContainer)

  const sellerContainer = document.createElement("div")
  sellerContainer.classList.add("sellerContainer")

  // Append sellerContainer to card
  card.appendChild(sellerContainer)

  // Avatar
  const avatarImg = document.createElement("img")
  avatarImg.src =
    listing.seller && listing.seller.avatar
      ? listing.seller.avatar
      : "/images/avatar-bidme.png"
  avatarImg.alt = "Avatar"
  avatarImg.classList.add("sellerAvatar")

  // Append avatarImg to sellerContainer
  sellerContainer.appendChild(avatarImg)

  const avatarAndDate = document.createElement("div")
  avatarAndDate.classList.add("avatarAndDate")

  // Append avatarAndDate to sellerContainer
  sellerContainer.appendChild(avatarAndDate)

  // Other details

  const sellerName = document.createElement("a")
  sellerName.textContent =
    listing.seller && listing.seller.name
      ? listing.seller.name
      : "Unknown Seller"
  sellerName.classList.add("h6", "text-dark")
  sellerContainer.addEventListener("click", () => {
    if (listing.seller && listing.seller.name) {
      window.location.href = `/html/profiles/profile.html?name=${encodeURIComponent(listing.seller.name)}`
    }
  })

  // Append sellerName to avatarAndDate
  avatarAndDate.appendChild(sellerName)

  const details = document.createElement("div")
  details.classList.add("details")
  const createdDate = new Date(listing.created)
  const formattedDate = formatDateTime(createdDate)
  details.textContent = `${formattedDate}`

  // Append details to avatarAndDate
  avatarAndDate.appendChild(details)

  const contentContainer = document.createElement("div")
  contentContainer.classList.add("contentContainer")
  card.appendChild(contentContainer)

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

  // Title
  const title = document.createElement("h6")
  title.textContent = listing.title
  title.classList.add("mt-1")
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

  // Bids
  const bidsCount = listing._count.bids || 0 // Get the count of bids
  const bidsContainer = document.createElement("div")
  bidsContainer.classList.add("bids-container")

  if (bidsCount > 0) {
    const lastBid = listing.bids[listing.bids.length - 1] // Get the last bid

    const bidsCountElement = document.createElement("p")
    bidsCountElement.textContent = `Bids: ${bidsCount}`
    bidsContainer.appendChild(bidsCountElement)

    contentContainer.appendChild(bidsContainer)

    const lastBidContainer = document.createElement("div")
    lastBidContainer.classList.add("last-bid-container")

    const lastBidderName = document.createElement("a")
    const lastBidAmount = document.createElement("div")
    lastBidAmount.classList.add("d-flex", "gap-1")
    lastBidAmount.innerHTML = `<h2 class="text-primary">${lastBid.amount},-</h2><span class="small-font-size">bidder:</span><a class="bidder small-font-size">${lastBid.bidderName}</a>`

    lastBidContainer.appendChild(lastBidAmount)
    lastBidContainer.appendChild(lastBidderName)

    bidsContainer.appendChild(lastBidContainer)
  }

  // SEE MORE (link to ID)

  const seeMore = document.createElement("a")
  seeMore.textContent = "SEE MORE"
  seeMore.classList.add("seeMore")

  card.appendChild(seeMore)

  const btnContainer = document.createElement("div")
  btnContainer.classList.add("btnContainer")

  const bidBtn = document.createElement("button")
  bidBtn.textContent = "BID"
  bidBtn.classList.add("btn", "btn-primary", "text-white")

  btnContainer.appendChild(bidBtn)

  card.appendChild(btnContainer)

  return card
}
