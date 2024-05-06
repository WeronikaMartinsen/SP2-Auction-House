export function formatDateTime(date) {
  try {
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }
    return new Intl.DateTimeFormat("en-US", options).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

export function formatEndDateTime(dateString) {
  const date = new Date(dateString)
  const options = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }

  return new Intl.DateTimeFormat("en-US", options).format(date)
}
