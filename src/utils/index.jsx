import { Column, SortOrder } from 'react-base-table'
import { Avatar } from '../components/Avatar'
import { Age } from '../components/Age'

export const generateTableData = data => {
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

export const columnsData = [
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
		align: Column.Alignment.CENTER,
		headerClassName: 'select-none'
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
		align: Column.Alignment.CENTER,
		headerClassName: 'select-none'
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
		cellRenderer: ({ cellData: age }) => <Age age={age}>{age}</Age>,
		headerClassName: 'select-none'
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
		align: Column.Alignment.CENTER,
		headerClassName: 'select-none'
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
		align: Column.Alignment.RIGHT,
		headerClassName: 'select-none'
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
		cellRenderer: ({ cellData: src }) => <Avatar src={src} />,
		headerClassName: 'select-none'
	}
]

export const sortTableData = (data, sortBy) => {
	const order = sortBy.order === SortOrder.ASC ? 1 : -1
	const _data = [...data]
	_data.sort((a, b) => (a[sortBy.key] > b[sortBy.key] ? order : -order))
	return _data
}
