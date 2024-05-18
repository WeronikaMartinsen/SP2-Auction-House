export function startCountdown(listing, endsAtElement) {
  if (listing.endsAt) {
    const endsAt = new Date(listing.endsAt).getTime()

    // Function to calculate and display the countdown
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = endsAt - now

      if (distance < 0) {
        clearInterval(countdownInterval)
        endsAtElement.textContent = "Auction ended"
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        endsAtElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`
      }
    }

    updateCountdown()

    const countdownInterval = setInterval(updateCountdown, 1000)
  }
}
