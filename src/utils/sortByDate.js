const sortByDate = (list) => {
  const sortedList = list.sort(
    (prev, next) => new Date(next.date) - new Date(prev.date)
  )
  return sortedList
}

export default sortByDate
