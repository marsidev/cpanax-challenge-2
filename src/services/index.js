import axios from 'axios'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const USERS_PER_PAGE = 16

export async function fetchUsersData(skip = 0, limit = USERS_PER_PAGE) {
	const url = `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
	await delay(1000)

	return axios
		.get(url)
		.then(res => res.data.users)
		.catch(error => console.error(error))
}
