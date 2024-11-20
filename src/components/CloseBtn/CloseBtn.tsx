import './CloseBtn.css'
import { useBucketList } from '../../context/bucketListContext'

function CloseBtn() {
    const { setModal } = useBucketList();

    return (
        <button 
            className='closeBtn' 
            title="Close icon"
            onClick={() => setModal( prevState => ({
                ...prevState,
                show: false
            }))}
        ></button>
    )
}

export default CloseBtn