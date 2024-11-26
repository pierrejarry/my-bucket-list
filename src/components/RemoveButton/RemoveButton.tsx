import { ListElement } from "../../context/bucketListContext";
import { useBucketList } from "../../context/bucketListContext";
import './RemoveButton.css'

function RemoveButton({item}: {item: ListElement}) {
    const { temporaryList, setTemporaryList, setModal } = useBucketList();

    /* Remove element */
    const removeElementFromBucketList = (item: ListElement) => {
        const newBucketList = temporaryList.filter(elem => elem !== item);
        setTemporaryList(newBucketList);
        setModal(prevModal => ({
            ...prevModal,
            show: false,
            hasButtons: false,
            action: () => { }
        }))
    }

    const removeElement = (item: ListElement) => {
        setModal({
            show: true,
            text: 'Are you sure you want to remove this element from your list?',
            hasButtons: true,
            action: () => removeElementFromBucketList(item)
        })
    }

    return (
        <button 
            onClick={() => removeElement(item)} 
            title='Remove element'
            className="remove-button"
        >
            <span></span>
        </button>
    )
}

export default RemoveButton/*  */