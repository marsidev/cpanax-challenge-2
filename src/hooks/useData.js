import { useEffect, useState } from 'react'
import axios from 'axios'

export const useData = page => {
	const [loading, setLoading] = useState()
	const [data, setData] = useState()
	const [errors, setErrors] = useState(false)

	useEffect(() => {
		async function fetchData () {
			// const url = '/data.json'
			const skip = (page - 1) * 16
			const url = `https://dummyjson.com/users?skip=${skip}&limit=16`
			setLoading(true)

			axios
				.get(url)
				.then(res => {
					setData(res.data)
					setErrors(false)
				})
				.catch(error => {
					console.error(error)
					setErrors(true)
				})
				.finally(() => setLoading(false))
		}

		if (page) fetchData()
	}, [page])

	return { loading, data, errors }
}
