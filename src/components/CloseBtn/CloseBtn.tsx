import './CloseBtn.css'
import { useBucketList } from '../../context/bucketListContext'

function CloseBtn() {
    const { hideModal } = useBucketList();

    return (
        <button 
            className='closeBtn' 
            title="Close icon"
            onClick={hideModal}
        ></button>
    )
}

export default CloseBtn