const formatDate = (date) => {
  date = new Date(date)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return {
    format: `${day} ${month} ${year}`,
    today: `${year}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`,
  }
}

export default formatDate
