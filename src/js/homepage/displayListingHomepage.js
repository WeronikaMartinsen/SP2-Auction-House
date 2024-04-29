import { getListings } from "../listings/getListings.js"
import { load } from "../api/storage/storeToken.js"
import { handleError } from "../userFeedback/errorMessage.js"
import { userFeedback } from "../userFeedback/feedbackOverlay.js"
import { createListingCard } from "./listingCardForHomepage.js"

const LISTINGS_PER_PAGE = 10

export async function displayListings() {
  try {
    console.log("Fetching listings...")

    const response = await getListings()
    let allListings = response.data

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

    let currentPage = 1

    filterOptionOne.addEventListener("click", function () {
      console.log("Sorting listings from new to old...")
      sortListingsByCreationDateDesc(allListings)
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })
    filterOptionTwo.addEventListener("click", function () {
      console.log("Sorting listings from old to new...")
      sortListingsByCreationDateAsc(allListings)
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })

    filterOptionThree.addEventListener("click", function () {
      console.log("Sorting listings from old to new...")
      sortListingsByCreationDateDesc(allListings)
      displayFilteredListings(allListings, getProfile, listingsContainer)
    })

    filterOptionFour.addEventListener("click", function () {
      console.log("Filtering for active listings...")
      const activeListings = allListings.filter(
        (listing) => listing.active === true,
      )
      displayFilteredListings(activeListings, getProfile, listingsContainer)
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

function sortListingsByCreationDateDesc(listings) {
  listings.sort((a, b) => new Date(b.created) - new Date(a.created))
}

function sortListingsByCreationDateAsc(listings) {
  listings.sort((a, b) => new Date(a.created) - new Date(b.created))
}

export function displayFilteredListings(
  listings,
  getProfile,
  listingsContainer,
  append = false,
) {
  if (!append) {
    listingsContainer.innerHTML = ""
  }
  console.log("Filtered Listings:", listings) // Log filtered listings

  listings.forEach((listing) => {
    const card = createListingCard(listing, getProfile)
    listingsContainer.append(card)
  })
}
