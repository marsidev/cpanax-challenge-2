import BaseTable, { Column, SortOrder } from 'react-base-table'
import { useMemo, useState } from 'react'
import classNames from 'classnames'
import 'react-base-table/styles.css'

const defaultSort = { key: 'id', order: SortOrder.ASC }

const generateData = _data => {
	return _data.map(user => ({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		age: user.age,
		username: user.username,
		ip: user.ip
	}))
}

const Age = ({ age }) => {
	return <span className={classNames({
		'text-green-500': age <= 25,
		'text-yellow-500': age > 25 && age <= 45,
		'text-orange-500': age > 45 && age <= 65,
		'text-pink-500': age > 65
	})}>{age}</span>
}

const columns = [
	{
		key: 'firstName',
		title: 'First name',
		dataKey: 'firstName',
		width: 120,
		resizable: true,
		sortable: true,
		frozen: Column.FrozenDirection.LEFT,
		align: Column.Alignment.CENTER
	},
	{
		key: 'lastName',
		title: 'Last name',
		dataKey: 'lastName',
		width: 120,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER
	},
	{
		key: 'age',
		title: 'Age',
		dataKey: 'age',
		width: 80,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER,
		cellRenderer: ({ cellData: age }) => <Age age={age}>{age}</Age>
	},
	{
		key: 'username',
		title: 'Username',
		dataKey: 'username',
		width: 120,
		resizable: true,
		sortable: true,
		align: Column.Alignment.CENTER
	},
	{
		key: 'ip',
		title: 'IP',
		dataKey: 'ip',
		width: 150,
		resizable: true,
		sortable: true,
		align: Column.Alignment.RIGHT
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
			<BaseTable fixed columns={columns} data={data} height={700} sortBy={sortBy} width={650} onColumnSort={onColumnSort} />
		</div>
	)
}
