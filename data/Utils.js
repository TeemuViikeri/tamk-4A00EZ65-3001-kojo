export const getDate = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }