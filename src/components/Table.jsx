import 'react-base-table/styles.css'
import BaseTable, { AutoResizer, Column, SortOrder } from 'react-base-table'
import { useEffect, useState } from 'react'
import { columnsData, sortTableData } from '../utils'
import { Loader } from '../components/Loader'
import { EmptyContainer } from '../components/EmptyContainer'
import { Button } from '../components/Button'
import { fetchUsersData } from '../services'

const MAX_USERS = 100
const defaultSort = { key: 'id', order: SortOrder.ASC }

export const Table = ({ handleOpenModal }) => {
	const [sortBy, setSortBy] = useState(defaultSort)
	const [usersData, setUsersData] = useState([])
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)
	const [loadedAll, setLoadedAll] = useState(false)

	const columns = [...columnsData, {
		key: 'action',
		width: 0,
		flexGrow: 1,
		flexShrink: 0,
		align: Column.Alignment.CENTER,
		cellRenderer: ({ rowData }) => {
			return (
				<Button onClick={() => handleOpenModal(rowData)}>
					See more
				</Button>
			)
		}
	}]

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

		if (usersData.length === 0) return <EmptyContainer>No data available</EmptyContainer>
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
		setUsersData(rawData)
		setLoading(false)
	}

	async function loadMore() {
		setLoadingMore(true)
		const rawData = await fetchUsersData(usersData.length) // skip={data.length}
		const mergedData = [...usersData, ...rawData]

		setUsersData(mergedData)
		setLoadingMore(false)
		setLoadedAll(mergedData.length === MAX_USERS)
	}

	function onEndReached () {
		if (loading || loadingMore || loadedAll) return
		loadMore()
	}

	function onColumnSort (sortBy) {
		const sorted = sortTableData(usersData, sortBy)
		setSortBy(sortBy)
		setUsersData(sorted)
	}

	return (
		<div className='w-full'>
			<AutoResizer height={700}>
				{({ width, height }) => (
					<BaseTable
						className='shadow-lg'
						columns={columns}
						data={usersData}
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
