import { load } from "../api/storage/storeToken.js"

/**
 * Sets the profile link based on the user's profile data from the stored token.
 * The link is updated to navigate to the user's profile page.
 * @example
 * // Calling the function sets the profile link.
 * profileLink();
 */
export function profileLink() {
  const getProfileFromToken = load("profile")
  const user = getProfileFromToken.userName

  const getProfileLink = document.querySelector("#profile")
  const getProfileLinkLogo = document.querySelector("#profile-logo")

  if (getProfileLink) {
    getProfileLink.href = `/html/profiles/profile.html?name=${user}`
  }
  if (getProfileLinkLogo) {
    getProfileLinkLogo.href = `/html/listings/listings.html?name=${user}`
  }
}

profileLink()
