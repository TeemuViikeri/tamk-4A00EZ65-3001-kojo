export const Priority = {
  none: 0,
  high: 1,
  medium: 2,
  low: 3,
}

// Uses switch conditional statement to get correct Priority property
export const getPriority = (index) => {
  switch (index) {
    case 1:
      return Priority.high
    case 2:
      return Priority.medium
    case 3:
      return Priority.low
    default:
      return Priority.none // Default: Any other case which is not covered above
  }
}

// Gets priority number by priority name
export const getPriorityByName = (name) => {
  let priority = Priority[name.toLowerCase()]
  if (priority === undefined) {
    priority = Priority.none
  }

  return priority
}
