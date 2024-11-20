import { useBucketList } from "../../context/bucketListContext"
import Button from "../Button/Button"
import CloseBtn from "../CloseBtn/CloseBtn"
import './Modal.css'

interface ModalProps {
    show: boolean,
    text: string,
    hasButtons: boolean
}

function Modal({ show, text, hasButtons }: ModalProps) {
    const sessionStorageName = 'myBucketList';
    const { modal, setModal, setList, setTitle, setShowList } = useBucketList();

    

    const hideModal = () => {
        setModal( prevState => ({
            ...prevState,
            show: false
        }))
    }

    if (!show) return;

    return (
        <>
            <div className='backdrop' onClick={hideModal}></div>
            <div className='modal'>
                <h3>{text}</h3>
                <CloseBtn />
                {hasButtons &&
                    <div className="btn-container">
                        {/* Cancel */}
                        <Button
                            type='secondary'
                            text='Cancel'
                            title="Cancel"
                            action={hideModal}
                        />
                        {/* Confirm */}
                        <Button
                            type='primary'
                            text='Confirm'
                            title="Confirm"
                            action={modal.action}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default Modal