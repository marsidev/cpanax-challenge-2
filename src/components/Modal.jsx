import { useEffect, useRef } from 'react'

const Overlay = ({ children, open = false, onClose, closeOnEsc = true, closeOnClickOutside = true }) => {
	const containerRef = useRef(null)

	useEffect(() => {
		const onKeyPress = e => {
			if (closeOnEsc && open && e.key === 'Escape') onClose()
		}

		window.addEventListener('keydown', onKeyPress)

		return () => window.removeEventListener('keydown', onKeyPress)
	}, [closeOnEsc, onClose, open])

	const onOverlayClick = e => {
		if (!containerRef.current?.contains(e.target)) onClose()
	}

	return (
		<aside
			aria-hidden='true'
			aria-labelledby='modal-title'
			aria-modal='true'
			className='fixed inset-0 z-10 bg-gray-600/90 flex items-center'
			role='dialog'
			tabIndex='-1'
			onClick={closeOnClickOutside ? onOverlayClick : undefined}
		>
			<div ref={containerRef} className='relative w-full max-w-2xl mx-auto rounded-lg'>
				<div className='bg-white rounded-lg shadow'>
					{children}
				</div>
			</div>
		</aside>
	)
}

const Head = ({ children, onClose }) => (
	<div className='flex justify-between items-start p-4 rounded-t-lg border-b' id='modal-title'>
		<h1 className='text-xl font-semibold text-gray-900'>{children}</h1>

		<button
			className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
			title='Close modal'
			type='button'
			onClick={onClose}
		>
			<svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path clipRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' fillRule='evenodd' /></svg>
			<span className='sr-only'>Close modal</span>
		</button>
	</div>
)

const Body = ({ children }) => (
	<div className='rounded-b-lg md:pr-2'>
		<div className='max-h-[80vh] overflow-auto rounded-b p-6 space-y-6'>{children}</div>
	</div>
)

export const Modal = { Overlay, Head, Body }
