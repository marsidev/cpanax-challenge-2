import { useData } from '../hooks/useData'
import { usePagination } from '../hooks/usePagination'
import { Layout } from './Layout'
import { Pagination } from './Pagination'
import { Table } from './Table'

export const App = () => {
	const { page, onUpdatePage } = usePagination()
	const { data, errors, loading } = useData(page)

	if (!data || loading) {
		return (
			<Layout>
				<div className='h-full flex items-center'>
					<span>Loading...</span>
				</div>
			</Layout>
		)
	}

	if (errors) {
		return (
			<Layout>
				<div className='h-full flex items-center'>
					<span>Something went wrong while fetching the data.</span>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<header className='flex flex-col w-full'>
				<h1 className='text-4xl font-bold mb-8'>Users</h1>

				<div className='flex flex-col md:flex-row justify-between pb-4'>
					<Pagination current={page} pages={7} onUpdatePage={onUpdatePage} />
				</div>
			</header>

			<Table data={data.users} />
		</Layout>
	)
}

export default App
