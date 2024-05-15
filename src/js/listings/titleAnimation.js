const titleAnimation = document.querySelector(".title-animation")
const words = ["Discover", "Unique", "Treasures", "and", "Unforgettable Deals!"]
let index = 0

export function animateTitle() {
  titleAnimation.textContent = words[index]
  index = (index + 1) % words.length
}

setInterval(animateTitle, 1000)
