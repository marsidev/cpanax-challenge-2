import BaseTable, { AutoResizer, Column, SortOrder } from 'react-base-table'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import 'react-base-table/styles.css'
import axios from 'axios'

const MAX_USERS = 100
const USERS_PER_PAGE = 10
const defaultSort = { key: 'id', order: SortOrder.ASC }

const generateData = data => {
	return data.map(user => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		age: user.age,
		username: user.username,
		ip: user.ip,
		image: user.image
	}))
}

const Age = ({ age }) => {
	return <span className={classNames({
		'text-green-500': age <= 25,
		'text-yellow-500': age > 25 && age <= 45,
		'text-orange-500': age > 45 && age <= 65,
		'text-pink-500': age > 65
	})}>
		{age}
	</span>
}

const Avatar = ({ src }) => {
	return <span><img className='object-cover h-16 w-16' src={src} /></span>
}

const Loader = () => {
	return (
		<>
			<span className='animate-ping absolute inline-flex h-6 w-6 rounded-full bg-sky-400 opacity-75' />
			<span className='relative inline-flex rounded-full h-4 w-4 bg-sky-500' />
		</>
	)
}

const EmptyContainer = ({ children }) => {
	return (
		<span className='flex items-center justify-center h-full'>
			{children}
		</span>
	)
}

const columns = [
	{
		key: 'firstName',
		title: 'First name',
		dataKey: 'firstName',
		width: 0,
		flexGrow: 2,
		flexShrink: 0,
		resizable: true,
		sortable: true,
		frozen: Column.FrozenDirection.LEFT,
		align: Column.Alignment.CENTER
	},
	{
		key: 'lastName',
		title: 'Last name',
		dataKey: 'lastName',
		width: 0,
		flexGrow: 2,
		flexShrink: 0,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER
	},
	{
		key: 'age',
		title: 'Age',
		dataKey: 'age',
		width: 0,
		maxWidth: 100,
		flexGrow: 1,
		flexShrink: 0,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER,
		cellRenderer: ({ cellData: age }) => <Age age={age}>{age}</Age>
	},
	{
		key: 'username',
		title: 'Username',
		dataKey: 'username',
		width: 0,
		flexGrow: 1,
		flexShrink: 0,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER
	},
	{
		key: 'ip',
		title: 'IP',
		dataKey: 'ip',
		width: 0,
		maxWidth: 150,
		flexGrow: 1,
		flexShrink: 0,
		resizable: true,
		sortable: true,
		align: Column.Alignment.RIGHT
	},
	{
		key: 'image',
		title: 'Avatar',
		dataKey: 'image',
		width: 0,
		flexGrow: 1,
		flexShrink: 0,
		resizable: false,
		sortable: false,
		align: Column.Alignment.CENTER,
		cellRenderer: ({ cellData: src }) => <Avatar src={src} />
	}
]

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

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

	async function fetchData(skip = 0, limit = USERS_PER_PAGE) {
		const url = `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
		await delay(1000)

		return axios
			.get(url)
			.then(res => res.data)
			.catch(error => console.error(error))
	}

	async function loadData() {
		setLoading(true)
		const rawData = await fetchData()
		const data = generateData(rawData.users)
		setData(data)
		setLoading(false)
		// setLoadedAll(data.length === MAX_USERS)
	}

	async function loadMore() {
		setLoadingMore(true)
		const rawData = await fetchData(data.length) // skip={data.length}
		const newData = generateData(rawData.users)
		const mergedData = [...data, ...newData]
		setData(mergedData)
		setLoadingMore(false)
		setLoadedAll(mergedData.length === MAX_USERS)
	}

	function onEndReached () {
		if (loading || loadingMore || loadedAll) return
		loadMore()
	}

	function sortData(data) {
		const order = sortBy.order === SortOrder.ASC ? 1 : -1
		const _data = [...data]
		_data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order))
		return _data
	}

	function onColumnSort (sortBy) {
		const sorted = sortData(data)
		setSortBy(sortBy)
		setData(sorted)
	}

	return (
		<div className='w-full'>
			<AutoResizer height={700}>
				{({ width, height }) => (
					<BaseTable
						columns={columns}
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
