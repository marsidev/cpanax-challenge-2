export const Button = ({ children, ...rest }) => {
	return (
		<>
			<button
				className='text-white text-xs md:text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-1 md:px-3 py-1 md:py-2 focus:outline-none transition duration-150 ease-in-out hover:scale-105'
				{...rest}
			>
				{children}
			</button>
		</>
	)
}
