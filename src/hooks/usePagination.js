import { useEffect, useState } from 'react'

export const usePagination = () => {
	const [page, setPage] = useState()

	const onUpdatePage = page => {
		const url = new URL(window.location)
		url.searchParams.set('page', page)
		window.history.replaceState(null, '', url.toString())
		setPage(page)
	}

	useEffect(() => {
		const { searchParams } = new URL(document.location)

		if (searchParams.get('page') !== null) {
			const page = parseInt(searchParams.get('page'))

			if (isNaN(page))	onUpdatePage(1)
			else if (page < 1) onUpdatePage(1)
			else if (page > 7) onUpdatePage(7)
			else setPage(page)
		} else setPage(1) // there is no a `page` query param, update useState only
	}, [])

	return { page, onUpdatePage }
}
