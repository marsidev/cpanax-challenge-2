import classNames from 'classnames/bind'

const styles = {
	common: 'px-2 md:px-3 py-1 md:py-2 border border-gray-300 cursor-pointer',
	active: 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700',
	notActive: 'leading-tight text-gray-500 bg-white hover:bg-gray-200 hover:text-gray-700'
}

const cx = classNames.bind(styles)

export const Pagination = ({ pages, current, onUpdatePage }) => {
	return (
		<nav aria-label='Page navigation'>
			<ul className='inline-flex -space-x-px'>
				<button
					className='cursor-pointer px-2 md:px-3 py-1 md:py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-200 hover:text-gray-700 disabled:opacity-50 disabled:cursor-auto'
					disabled={current === 1}
					onClick={() => onUpdatePage(current - 1)}>
					Previous
				</button>

				{Array.from({ length: pages }).map((_, pageIndex) => {
					const className = cx({
						common: true,
						active: current === (pageIndex + 1),
						notActive: current !== (pageIndex + 1)
					})

					return (
						<button
							key={pageIndex}
							aria-current={current === pageIndex ? 'page' : null}
							className={className}
							href='#'
							onClick={() => onUpdatePage(pageIndex + 1)}
						>
							{pageIndex + 1}
						</button>
					)
				})}

				<button
					className='cursor-pointer px-2 md:px-3 py-1 md:py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-200 hover:text-gray-700  disabled:opacity-50 disabled:cursor-auto'
					disabled={current === pages}
					onClick={() => onUpdatePage(current + 1)}>
					Next
				</button>
			</ul>
		</nav>
	)
}
