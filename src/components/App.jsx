import { useState } from 'react'
import { Layout } from './Layout'
import { Table } from './Table'
import { Modal } from './Modal'

export const App = () => {
	const [modalUserData, setModalUserData] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const handleOpenModal = userData => {
		delete userData.userAgent
		setModalUserData(userData)
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setModalUserData(null)
		setShowModal(false)
	}

	return (
		<>
			<Layout>
				<Table handleOpenModal={handleOpenModal} />
			</Layout>

			{showModal && modalUserData && (
				<Modal.Overlay
					open={showModal}
					onClose={handleCloseModal}
				>
					<Modal.Head onClose={handleCloseModal}>User data</Modal.Head>
					<Modal.Body>
						<pre>{JSON.stringify(modalUserData, null, 2)}</pre>
					</Modal.Body>
				</Modal.Overlay>
			)}
		</>
	)
}

export default App
