import { getListings } from "./getListings.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { createListingCard } from "./listingCard.js"

const LISTINGS_PER_PAGE = 10

export async function displayListings() {
  try {
    console.log("Fetching listings...")
    let allListings = await getListings()
    const getProfile = load("profile")

    if (!Array.isArray(allListings)) {
      console.error("Error: getListings did not return an array:", allListings)
      return
    }

    console.log("Listings fetched successfully:", allListings)

    allListings.sort((a, b) => new Date(b.created) - new Date(a.created))

    const searchInput = document.querySelector("#search")
    const listingsContainer = document.querySelector("#listings")
    const filterOptionOne = document.querySelector("#new-to-old")
    const filterOptionTwo = document.querySelector("#old-to-new")
    const filterOptionThree = document.querySelector("#all-listings")
    const filterOptionFour = document.querySelector("#active-listings")
    const loadMoreBtn = document.querySelector("#loadMore")
    const bidLessThan100Option = document.querySelector("#bid-less-than-100")
    const bidLessThan200Option = document.querySelector("#bid-less-than-200")

    let currentPage = 1

    filterOptionOne.addEventListener("click", function () {
      console.log("Sorting listings from new to old...")
      const sortedListings = [...allListings].sort(
        (a, b) => new Date(b.created) - new Date(a.created),
      )
      displayFilteredListings(sortedListings, getProfile, listingsContainer)
    })

    filterOptionTwo.addEventListener("click", function () {
      console.log("Sorting listings from old to new...")
      const sortedListings = [...allListings].sort(
        (a, b) => new Date(b.created) - new Date(a.created),
      )
      displayFilteredListings(sortedListings, getProfile, listingsContainer)
    })

    filterOptionThree.addEventListener("click", function () {
      console.log("Displaying all listings...")
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })

    filterOptionFour.addEventListener("click", function () {
      console.log("Filtering for active listings...")
      const activeListings = allListings.filter(
        (listing) => listing.active === true,
      )
      displayFilteredListings(activeListings, getProfile, listingsContainer)
    })

    bidLessThan100Option.addEventListener("click", function () {
      console.log("Filtering listings with bids less than 100...")
      const bidLessThan100Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount < 100
      })
      displayFilteredListings(
        bidLessThan100Listings,
        getProfile,
        listingsContainer,
      )
    })

    bidLessThan200Option.addEventListener("click", function () {
      console.log("Filtering listings with bids less than 200...")
      const bidLessThan200Listings = allListings.filter((listing) => {
        const lastBid = getLastBid(listing.bids)
        return lastBid && lastBid.amount > 100 && lastBid.amount < 200
      })
      displayFilteredListings(
        bidLessThan200Listings,
        getProfile,
        listingsContainer,
      )
    })

    searchInput.addEventListener("keyup", function (event) {
      console.log("Searching listings...")
      const searchValue = event.target.value.trim().toLowerCase()
      const filteredListings = allListings.filter(function (listing) {
        return (
          listing.title.toLowerCase().includes(searchValue) ||
          listing.description.toLowerCase().includes(searchValue) ||
          listing.seller.name.toLowerCase().includes(searchValue)
        )
      })

      displayFilteredListings(filteredListings, getProfile, listingsContainer)
    })

    loadMoreBtn.addEventListener("click", function () {
      console.log("Loading more listings...")
      currentPage++
      const startIndex = (currentPage - 1) * LISTINGS_PER_PAGE
      const endIndex = startIndex + LISTINGS_PER_PAGE
      const nextListings = allListings.slice(startIndex, endIndex)
      displayFilteredListings(nextListings, getProfile, listingsContainer, true)

      // Disable the button if there are no more listings to load
      if (endIndex >= allListings.length) {
        loadMoreBtn.disabled = true
      }
    })

    console.log("Displaying initial listings...")
    displayFilteredListings(
      allListings.slice(0, LISTINGS_PER_PAGE),
      getProfile,
      listingsContainer,
    )
  } catch (error) {
    console.error("Error fetching and displaying listings:", error)
    handleError("Error fetching and displaying listings")
    userFeedback("Something went wrong. Please, try again.", () => {
      // Callback function to execute after the timeout
      location.reload()
    })
  }
}

function displayFilteredListings(
  listings,
  getProfile,
  listingsContainer,
  append = false,
) {
  if (!append) {
    listingsContainer.innerHTML = ""
  }
  console.log("Filtered Listings:", listings) // Log filtered listings

  // Sort listings by creation date in descending order
  listings.sort((a, b) => new Date(b.created) - new Date(a.created))

  listings.forEach((listing) => {
    const card = createListingCard(listing, getProfile)
    listingsContainer.append(card)
  })
}
function getLastBid(bids) {
  if (!bids || bids.length === 0) {
    return null
  }
  return bids[bids.length - 1]
}
