import BaseTable, { AutoResizer, Column, SortOrder } from 'react-base-table'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import 'react-base-table/styles.css'

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

export const Table = ({ data: rawData }) => {
	const [sortBy, setSortBy] = useState(defaultSort)
	const defaultData = useMemo(() => sortData(generateData(rawData)), [rawData])
	const [data, setData] = useState(defaultData)

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
						fixed={false}
						height={height}
						rowHeight={60}
						sortBy={sortBy}
						width={width}
						onColumnSort={onColumnSort}
					/>
				)}
			</AutoResizer>
		</div>
	)
}
