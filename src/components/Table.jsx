import BaseTable, { AutoResizer, SortOrder } from 'react-base-table'
import { useEffect, useState } from 'react'
import 'react-base-table/styles.css'
import { columnsData, generateTableData as genData, sortTableData } from '../utils'
import { Loader } from '../components/Loader'
import { EmptyContainer } from '../components/EmptyContainer'
import { fetchUsersData } from '../services'

const MAX_USERS = 100
const defaultSort = { key: 'id', order: SortOrder.ASC }

export const Table = () => {
	const [sortBy, setSortBy] = useState(defaultSort)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)
	const [loadedAll, setLoadedAll] = useState(false)

	useEffect(() => {
		loadData()
	}, [])

	const emptyRenderer = () => {
		if (loading) {
			return (
				<EmptyContainer>
					<Loader />
				</EmptyContainer>
			)
		}

		if (data.length === 0) return <EmptyContainer>No data available</EmptyContainer>
	}

	const footerRenderer = () => {
		if (!loadingMore) return null

		return (
			<EmptyContainer>
				<Loader />
			</EmptyContainer>
		)
	}

	async function loadData() {
		setLoading(true)
		const rawData = await fetchUsersData()
		const data = genData(rawData)
		setData(data)
		setLoading(false)
	}

	async function loadMore() {
		setLoadingMore(true)
		const rawData = await fetchUsersData(data.length) // skip={data.length}
		const newData = genData(rawData)
		const mergedData = [...data, ...newData]
		setData(mergedData)
		setLoadingMore(false)
		setLoadedAll(mergedData.length === MAX_USERS)
	}

	function onEndReached () {
		if (loading || loadingMore || loadedAll) return
		loadMore()
	}

	function onColumnSort (sortBy) {
		const sorted = sortTableData(data, sortBy)
		setSortBy(sortBy)
		setData(sorted)
	}

	return (
		<div className='w-full'>
			<AutoResizer height={700}>
				{({ width, height }) => (
					<BaseTable
						columns={columnsData}
						data={data}
						disabled={loading}
						emptyRenderer={emptyRenderer}
						fixed={false}
						footerHeight={loadingMore ? 50 : 0}
						footerRenderer={footerRenderer}
						height={height}
						rowHeight={60}
						sortBy={sortBy}
						width={width}
						onColumnSort={onColumnSort}
						onEndReached={onEndReached}
						onEndReachedThreshold={100}
					/>
				)}
			</AutoResizer>
		</div>
	)
}
