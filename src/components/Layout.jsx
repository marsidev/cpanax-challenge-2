export const Layout = ({ children }) => {
	return (
		<main className='min-h-screen w-full bg-gray-100 flex justify-center px-4 py-16'>
			<div className='w-full max-w-7xl flex flex-col items-center'>
				<header className='flex flex-col w-full'>
					<h1 className='text-4xl font-bold mb-8'>Users</h1>
				</header>
				{children}
			</div>
		</main>
	)
}
