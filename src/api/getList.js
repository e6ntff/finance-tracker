import sortByDate from "../utils/sortByDate"

async function getList() {
  try {
		const response = await fetch(
			'https://mocki.io/v1/608dac7e-961c-4d60-a1fa-c5fa1bfb60d4'
		)
		const list = await response.json()
		return sortByDate(list)
	} catch (err) {
		alert('Failed to fetch')
	}
}

export default getList