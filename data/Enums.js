export const Priority = {
  none: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export const GetPriority = (index) => {
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

export const GetPriorityByName = (name) => {
  let priority = Priority[name.toLowerCase()]
  if (priority === undefined) {
    priority = Priority.none
  }

  return priority
}
